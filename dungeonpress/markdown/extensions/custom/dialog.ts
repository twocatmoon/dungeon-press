import { TokenizerAndRendererExtension } from 'marked'

export const dialog: TokenizerAndRendererExtension = {
    name: 'dialog',

    level: 'inline',

    start: (src) => src.match(/"\w/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^"+([^"]+?)"+/
        const match = rule.exec(src.replace(/\n/g, ' '))

        if (match) {
            const token = {
                type: 'dialog',
                raw: match[0],
                text: match[0].trim(),
                tokens: []
            }
            // this.lexer.inline(token.text, token.tokens)

            return token
        }

        return undefined
    },

    renderer (token) {
        return `<em>${token.text}</em>`
    }
}
