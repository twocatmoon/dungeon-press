import { MarkedExtension } from 'marked'
import { markdown } from '..'

export const heading: MarkedExtension = {
    renderer: {
        heading (text, level) {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

            if (level >= 1 && level <= 3) {
                markdown.addToToc(escapedText, text, level)
            }

            const adjustedLevel = Math.min(level + 1, 6)

            return (
                `<h${adjustedLevel} id="${escapedText}" tabindex="-1" data-heading>
                    ${level >= 1 && level <= 3 ? `<a name="${escapedText}" class="anchor" href="#${escapedText}">#</a>` : ''}
                    ${text}
                </h${adjustedLevel}>`
            )
        }
    }
}
