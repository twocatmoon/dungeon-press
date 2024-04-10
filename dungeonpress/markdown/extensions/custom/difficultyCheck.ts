import { TokenizerAndRendererExtension } from 'marked'
import { getSkillAbility } from '../../../util/skillsAndAbilities'
import { capitalize } from '../../../util/strings'
import { markdown } from '../..'

function skillToStr (skill: string) {
    return (
        !getSkillAbility(skill)
            ? `${capitalize(skill)}`
            : `${capitalize(getSkillAbility(skill))} (${capitalize(skill)})`
    )
}

export const difficultyCheck: TokenizerAndRendererExtension = {
    name: 'difficultyCheck',

    level: 'inline',
    
    start: (src) => src.match(/dc[\d]*/)?.index,

    tokenizer (src, _tokens) {
        const rule = /^dc[\d]*(?:\|\w+)*[~%]{0,2}/
        const match = rule.exec(src)

        if (match) {
            const trimmed = match[0].trim()

            if (trimmed.replace(/[~%]/g, '') === 'dc') {
                return undefined
            }

            const isPct = trimmed.includes('%')
            const isInverted = trimmed.includes('~')

            const skills = trimmed.replace(/[~%]/g, '').split('|')
            const challenge = skills.shift()

            const skillsStr = skills
                .map(skill => skillToStr(skill))
                .join(' or ')

            const challengeValue = challenge !== 'dc'
                ? Math.floor(
                    parseInt(challenge?.replace('dc', '') || '0') + 
                    (
                        isPct
                            ? markdown.getChallengeScale(isInverted)
                            : markdown.getChallengeModifier(isInverted)
                    )
                )
                : -1

            const text = challenge !== 'dc'
                ? `DC ${challengeValue} ${skillsStr}`
                : skillsStr

            const token = {
                type: 'difficultyCheck',
                raw: match[0],
                text,
                challenge: challengeValue,
                skills: skills.join(','),
                tokens: []
            }

            return token
        }
        
        return undefined
    },

    renderer (token) {
        return `<dice-roll challenge="${token.challenge}" skills="${token.skills}">${token.text}</dice-roll>`
    }
}
