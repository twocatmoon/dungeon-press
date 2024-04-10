// Util
import { sha1, sha256 } from './crypto'
import { debounce } from './debounce'
import { getCountAndSize, getAverage, modifyRoll, scaleRoll } from './dice'
import { clamp } from './math'
import { getSkillAbility, getAbilityAbbr } from './skillsAndAbilities'
import { capitalize } from './strings'
import { stringToSeed } from './stringToSeed'

export const crypto =  {
    sha1,
    sha256,
}

export const dice = {
    getCountAndSize,
    getAverage,
    modifyRoll,
    scaleRoll,
}

export const math = {
    clamp,
}

export const skillsAndAbilities = {
    getSkillAbility,
    getAbilityAbbr,
}

export const strings = {
    capitalize,
    stringToSeed,
}

export const util = {
    debounce,
}
