import yaml from 'js-yaml'
import { MarkdownContext, markdown } from '.'

export function splitAdventureParts (adventure: string): [ yaml: string, markdown: string ] {
    adventure = adventure.trim().replace(/\r/g, '')

    const parts = adventure.match(/^---\n(?:.*|\n)*?\n---/g)

    if (parts === null) {
        throw new Error('Invalid adventure format.')
    }

    return [ 
        parts[0], 
        adventure.replace(parts[0], '').trim()
    ]
}

export function parseAttributesFromYaml (yamlString: string) {
    let attributes: AdventureAttributes
    try {
        attributes = yaml.load(
            yamlString
                .replace(/^---\n/, '')
                .replace(/\n---$/, '')
        ) as AdventureAttributes

        attributes.tags = (attributes.tags as unknown as string)
            .split(',')
            .map(tag => tag.trim())

        attributes.summary = markdown.parse(attributes.summary).html
    } catch (err) {
        throw err
    }

    const requiredKeys = [
        'title',
        'titleShort',
        'tagline',
        'summary',
        'version',
        'author',
        'authorLink',
        'tags',
        'created',
        'modified',
        'seed',
        'credits',
    ]

    const missingKeys = requiredKeys.filter(key => !(key in attributes))

    if (missingKeys.length > 0) {
        throw new Error(`Missing required keys: ${missingKeys.join(', ')}`)
    }

    return attributes
}

export function parseContentFromMarkdown (markdownString: string, attributes: AdventureAttributes, context: Partial<MarkdownContext>) {
    let html = ''
    let toc: TableOfContentsItem[] = []
    
    try {
        const result = markdown.parse(
            markdownString,
            {
                seed: attributes.seed,
                challenge: 'intended',
                ...context
            }
        )
        html = result.html.replace(/\r/g, '')
        toc = result.toc
    } catch (err) {
        throw err
    }

    return { html, toc }
}

export function parseAdventure (adventure: string, context: Partial<MarkdownContext> = {}) {
    const parts = splitAdventureParts(adventure)
    
    const attributes = parseAttributesFromYaml(parts[0])
    const { html, toc } = parseContentFromMarkdown(parts[1], attributes, context)

    return {
        attributes,
        html,
        toc,
    }
}
