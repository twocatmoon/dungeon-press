import { TokenizerAndRendererExtension } from 'marked'
import { markdown } from '../..'

export const dynamicValue: TokenizerAndRendererExtension = {
    name: 'dynamicValue',

    level: 'inline',

    start: (src) => src.match(/#[\-+#]{1}/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^#[\-+#]{1}\d*[~%]{0,2}/g
        const match = rule.exec(src)

        if (match) {
            const isPct = match[0].includes('%')
            const isInverted = match[0].includes('~')

            let trimmed = match[0].replace(/[~%]/g, '').trim()
            const symbol = trimmed.substring(0, 2)
            trimmed = trimmed.replace(/[\-+#]/g, ' ')

            let value = parseInt(trimmed)
            if (isPct) {
                const scale = markdown.getChallengeScale(isInverted)
           
                value = (scale >= 1)
                    ? Math.ceil(value * scale)
                    : Math.round(value * scale)
            } else {
                value = value + markdown.getChallengeModifier(isInverted)
            }

            let text = value.toString()
            if (symbol === '#-') {
                text = '-' + text
            } else if (symbol === '#+') {
                text = '+' + text
            }

            const token = {
                type: 'dynamicValue',
                raw: match[0],
                value: 0,
                text,
                tokens: []
            }

            return token
        }

        return undefined
    },
    
    renderer (token) {
        return `<span>${token.text}</span>`
    }
}
