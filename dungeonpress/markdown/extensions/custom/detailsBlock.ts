import 'marked';
import { TokenizerAndRendererExtension } from 'marked'

function detailsBlockExtension (type: string): TokenizerAndRendererExtension {
    return {
        name: `${type}Block`,

        level: 'block',

        start: (src) => src.match(new RegExp(`\{\{ ${type}[^{}\n]`))?.index,

        tokenizer (src, _tokens) {
            const rule = new RegExp(`^\{\{ ${type}[^{}]+(?:\}\})+`)
            const match = rule.exec(src)
            if (match) {
                const token = {
                    type: `${type}Block`,
                    raw: match[0],
                    text: match[0]
                        .replace(type, '')
                        .replace(/[\{\}]/g, '')
                        .trim(),
                    tokens: []
                }
                
                this.lexer.blockTokens(token.text, token.tokens)

                return token
            }
        },
        
        renderer (token) {
            return `<details-block type="${type}">${this.parser.parse(token.tokens!)}</details-block>`
        }
    }
}

export const infoBlock: TokenizerAndRendererExtension = {
    ...detailsBlockExtension('info')
}

export const narrativeBlock: TokenizerAndRendererExtension = {
    ...detailsBlockExtension('narrative')
}

export const thingBlock: TokenizerAndRendererExtension = {
    ...detailsBlockExtension('thing')
}
