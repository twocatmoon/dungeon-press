import { MarkedExtension } from 'marked'
import { markdown } from '..'

export const checkbox: MarkedExtension = {
    renderer: {
        checkbox () {
            return `<input data-id="${markdown.nextId()}" type="checkbox" />`
        }
    }
}
