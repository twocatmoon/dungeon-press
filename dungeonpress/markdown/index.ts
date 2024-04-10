import { MarkedExtension, marked } from 'marked'
import { customRandom } from 'nanoid'
import { stringToSeed } from '../util/stringToSeed'

// Overrides
import { checkbox } from './extensions/checkbox'
import { heading } from './extensions/heading'
import { table } from './extensions/table'
// Custom extensions
import { infoBlock, narrativeBlock, thingBlock } from './extensions/custom/detailsBlock'
import { descriptionList, description } from './extensions/custom/descriptionList'
import { details } from './extensions/custom/details'
import { dialog } from './extensions/custom/dialog'
import { diceRoll } from './extensions/custom/diceRoll'
import { difficultyCheck } from './extensions/custom/difficultyCheck'
import { dynamicValue } from './extensions/custom/dynamicValue'
import { inlineCheckbox } from './extensions/custom/inlineCheckbox'
import { abilityScores } from './extensions/custom/abilityScores'

export interface MarkdownContext {
    seed: string | number
    challenge: 'easy' | 'intended' | 'hard'
}

class Markdown {
    public nextRandom: () => number = () => 0
    public nextId: () => string = () => ''
    public nextIdSeeded: () => string = () => ''

    private challenge: MarkdownContext[ 'challenge' ] = 'intended'

    private toc: TableOfContentsItem[] = []

    public parse (markdown: string, context: MarkdownContext = { seed: 'dungeonpress', challenge: 'intended' }) {
        this.challenge = context.challenge
        this.toc = []

        let seed = typeof context.seed === 'string'
            ? stringToSeed(context.seed)
            : stringToSeed(context.seed.toString().replace('.', ''))

        this.nextRandom = function () {
            let t = seed += 0x6D2B79F5
            t = Math.imul(t ^ t >>> 15, t | 1)
            t ^= t + Math.imul(t ^ t >>> 7, t | 61)

            return ((t ^ t >>> 14) >>> 0) / 4294967296
        }

        let staticSeed = 256

        const nextRandomForNextId = function () {
            let t = staticSeed += 0x6D2B79F5
            t = Math.imul(t ^ t >>> 15, t | 1)
            t ^= t + Math.imul(t ^ t >>> 7, t | 61)

            return ((t ^ t >>> 14) >>> 0) / 4294967296
        }

        this.nextId = customRandom('1234567890abcdef', 5, (size) => {
            return (new Uint8Array(size)).map(() => 256 * nextRandomForNextId())
        })

        const html = marked.parse(markdown)
        const toc = this.toc

        return { html, toc }
    }

    public use (...args: MarkedExtension[]): void {
        marked.use(...args)
    }

    public getChallengeScale (inverted: boolean = false) {
        return (
            this.challenge === 'easy'
                ? (inverted ? 1.33 : 0.66)
                : (
                    this.challenge === 'hard'
                        ? (inverted ? 0.66 : 1.33)
                        : 1
                )
        )
    }

    public getChallengeModifier (inverted: boolean = false) {
        return (
            this.challenge === 'easy'
                ? (inverted ? 2 : -2)
                : (
                    this.challenge === 'hard'
                        ? (inverted ? -2 : 2)
                        : 0
                )
        )
    }

    public addToToc (href: string, text: string, level: number) {
        this.toc.push({ href, text, level })
    }
}

export const markdown = new Markdown()

marked.use(
    checkbox,
    heading, 
    table,
    {
        gfm: true,
        extensions: [
            abilityScores,
            infoBlock, 
            narrativeBlock, 
            thingBlock,
            descriptionList,
            description,
            details,
            dialog,
            diceRoll,
            difficultyCheck,
            dynamicValue,
            inlineCheckbox,
        ]
    }
)
