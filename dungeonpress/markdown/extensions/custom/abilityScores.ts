import { TokenizerAndRendererExtension } from 'marked'
import { markdown } from '../..'

export const abilityScores: TokenizerAndRendererExtension = {
    name: 'abilityScores',

    level: 'block',

    start: (src) => src.match(/\|\|\d/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^\|\|(?:[\d]+,){5}[\d]+\|\|[~%]*/
        const match = rule.exec(src)

        const isPct = match?.[0].includes('%')
        const isInverted = match?.[0].includes('~')

        if (match) {
            const abilityScores = match[0]
                .replace(/[~%]/g, '')
                .replace(/\|/g, '')
                .split(',')
                .map(m => parseInt(m))
                .map(m => {
                    if (isPct) {
                        const scale = markdown.getChallengeScale(isInverted)
                    
                        return (scale >= 1)
                            ? Math.ceil(m * scale)
                            : Math.round(m * scale)
                    } else {
                        return m + markdown.getChallengeModifier(isInverted)
                    }
                })

            const token = {
                type: 'abilityScores',
                raw: match[0],
                abilityScores,
                tokens: []
            }

            return token
        }
    },
    
    renderer (token) {
        const modifiers = token.abilityScores
            .map((m: number) => Math.floor((m - 10) / 2))

        const abilities = [
            'STR',
            'DEX',
            'CON',
            'INT',
            'WIS',
            'CHA'
        ]

        return (`
            <ability-scores scores="${token.abilityScores.join(',')}">
                ${
                    abilities.map((a, i) => (`
                        <span>
                            <span>${a}</span>
                            <span>
                                ${token.abilityScores[i]} (${modifiers[i] > 0 ? '+' : ''}${modifiers[i]})
                            </span>
                        </span>
                    `)).join('')
                }
            </ability-scores>
        `)
    }
}
