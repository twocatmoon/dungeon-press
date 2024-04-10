import { TokenizerAndRendererExtension } from 'marked'
import { markdown } from '../../index'
import { getAverage, modifyRoll, scaleRoll } from '../../../util/dice'

export const diceRoll: TokenizerAndRendererExtension = {
    name: 'diceRoll',

    level: 'inline',

    start: (src) => src.match(/\d+[d]\d+/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^\d+[d]\d+(?:[+\-]\d+)*[~%]{0,2}/
        const match = rule.exec(src)

        if (match) {
            let trimmed = match[0].trim()

            const symbol = (trimmed.match(/[\+\-]/) ? trimmed.match(/[\+\-]/)![ 0 ] : ' ')
            const isEmptySymbol = symbol === ' '

            if (symbol !== ' ' && symbol !== '+' && symbol !== '-') {
                return undefined
            }

            const tail = trimmed.slice(trimmed.length - 2)
            const isPct = tail.includes('%')
            const isInverted = tail.includes('~')

            trimmed = trimmed.replace(/[~%]/g, '')

            const [ origDice, origModifier ] = trimmed
                .split(symbol)
                .map(str => str.trim())

            const [ dice, modifier ] = isPct
                ? scaleRoll(origDice, parseInt(origModifier || '0'), markdown.getChallengeScale(isInverted))
                : modifyRoll(origDice, parseInt(origModifier || '0'), markdown.getChallengeModifier(isInverted))

            const textSymbol = isEmptySymbol ? '' : symbol

            const formatted = (isEmptySymbol)
                ? dice
                : (
                    `${dice}${textSymbol}${Math.abs(modifier)}`
                        .replace('+', ' + ')
                        .replace('-', ' - ')
                )

            const text = getAverage(
                dice, 
                (isEmptySymbol ? 0 : modifier) * (symbol === '-' ? -1 : 1)
            ) + ` (${formatted})`

            const token = {
                type: 'diceRoll',
                raw: match[0],
                roll: `${dice}${symbol}${Math.abs(modifier)}`,
                text,
                tokens: []
            }
            
            return token
        }

        return undefined
    },
    
    renderer (token) {
        return `<dice-roll roll=${token.roll}>${token.text}</dice-roll>`
    }
}
