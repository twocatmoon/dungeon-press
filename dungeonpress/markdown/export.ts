// Markdown & Parsers Functions
import { markdown } from './index'
import { splitAdventureParts, parseAttributesFromYaml, parseContentFromMarkdown, parseAdventure } from './parser'

// Util
import { defineElements } from './components/util/defineElements'

// Default Extensions
import { checkbox } from './extensions/checkbox'
import { heading } from './extensions/heading'
import { table } from './extensions/table'

// Custom Extensions
import { infoBlock, narrativeBlock, thingBlock } from './extensions/custom/detailsBlock'
import { descriptionList, description } from './extensions/custom/descriptionList'
import { details } from './extensions/custom/details'
import { dialog } from './extensions/custom/dialog'
import { diceRoll } from './extensions/custom/diceRoll'
import { difficultyCheck } from './extensions/custom/difficultyCheck'
import { dynamicValue } from './extensions/custom/dynamicValue'
import { inlineCheckbox } from './extensions/custom/inlineCheckbox'
import { abilityScores } from './extensions/custom/abilityScores'

export const parser = {
    markdown,
    splitAdventureParts,
    parseAttributesFromYaml,
    parseContentFromMarkdown,
    parseAdventure,
}

export const util = {
    defineElements,
}

export const extensions = {
    checkbox,
    heading,
    table,
}

export const customExtensions = {
    infoBlock,
    narrativeBlock,
    thingBlock,
    descriptionList,
    description,
    details,
    dialog,
    diceRoll,
    difficultyCheck: difficultyCheck,
    dynamicValue,
    inlineCheckbox,
    abilityScores,
}
