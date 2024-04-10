import { TokenizerAndRendererExtension } from 'marked'
import { checkbox } from '../checkbox'

export const inlineCheckbox: TokenizerAndRendererExtension = {
    name: 'inlineCheckbox',

    level: 'inline',

    start: (src) => src.match(/\[[ x]\]/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^\[[ x]\]/
        const match = rule.exec(src)

        if (match) {
            const trimmed = match[0].trim().toLowerCase()

            const token = {
                type: 'inlineCheckbox',
                raw: match[0],
                checked: trimmed === '[x]',
                tokens: []
            }

            return token
        }
        return undefined
    },

    renderer (token) {
        return checkbox.renderer!.checkbox!(token.checked)
    }
}
