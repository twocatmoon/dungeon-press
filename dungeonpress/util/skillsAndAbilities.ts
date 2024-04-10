export function getSkillAbility (skill: string) {    
    if (skill === 'athletics') return 'strength'
    if (skill === 'acrobatics' || skill === 'sleight_of_hand' || skill === 'stealth') return 'dexterity'
    if (skill === 'arcana' || skill === 'history' || skill === 'investigation' || skill === 'nature' || skill === 'religion') return 'intelligence'
    if (skill === 'animal_handling' || skill === 'insight' || skill === 'medicine' || skill === 'perception' || skill === 'survival') return 'wisdom'
    if (skill === 'deception' || skill === 'intimidation' || skill === 'performance' || skill === 'persuasion') return 'charisma'
    return ''
}

export function getAbilityAbbr (ability: string) {
    return ability.slice(0, 3).toUpperCase()
}
