import { TokenizerAndRendererExtension } from 'marked'

export const details: TokenizerAndRendererExtension = {
    name: 'details',

    level: 'block',

    start: (src) => src.match(/\[\[ [^\n]/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^\[\[ ([^\n]+)([^\[\]]+)\]\]+/
        const match = rule.exec(src)

        if (match) {
            const isOpen = match[1]
                .trim()
                .endsWith(' open')

            const summary = match[1]
                .replace(/[\[\]]/g, '')
                .replace(/ open$/, '')
                .trim()

            const token = {
                type: 'details',
                raw: match[0], 
                open: isOpen,
                summary: this.lexer.inlineTokens(summary),
                text: match[2].replace(/[\[\]]/g, '').trim(),
                tokens: []
            }

            this.lexer.blockTokens(token.text, token.tokens)

            return token
        }
    },
    
    renderer (token) {
        return (`<details${token.open ? ' open' : ''}>
    <summary>
        <hr />
        <span>${this.parser.parseInline(token.summary)}</span>
    </summary>
    ${this.parser.parse(token.tokens!)}
</details>`)
    }
}
