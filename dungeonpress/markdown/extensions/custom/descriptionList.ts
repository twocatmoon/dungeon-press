import 'marked';
import { TokenizerAndRendererExtension } from 'marked'

export const descriptionList: TokenizerAndRendererExtension = {
    name: 'descriptionList',

    level: 'block',

    start: (src) => src.match(/::[^:\n]/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^(?:::[^\n]+::[^\n]*(?:\n|$))+/
        const match = rule.exec(src)
        if (match) {
            const token = {
                type: 'descriptionList',
                raw: match[0],
                text: match[0].trim(),
                tokens: []
            }
            this.lexer.inline(token.text, token.tokens)

            return token
        }
    },

    renderer (token) {
        return `<dl>${this.parser.parseInline(token.tokens!)}\n</dl>`
    }
}

export const description: TokenizerAndRendererExtension = {
    name: 'description',

    level: 'inline',

    start: (src) => src.match(/::/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^::([^\n]+)::([^\n]*)(?:\n|$)/
        const match = rule.exec(src);
        if (match) {
            return {
                type: 'description',
                raw: match[0],
                dt: this.lexer.inlineTokens(match[1].trim()),
                dd: this.lexer.inlineTokens(match[2].trim())
            }
        }
    },

    renderer (token) {
        return `\n<dt>${this.parser.parseInline(token.dt)}</dt><dd>${this.parser.parseInline(token.dd)}</dd>`
    },
    
    childTokens: [ 'dt', 'dd' ],
}
