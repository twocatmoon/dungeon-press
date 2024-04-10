declare global {
    namespace JSX {
        interface IntrinsicElements {
            [ 'ability-scores' ]: CustomElement<AbilityScoresElement, any>
        }
    }
}

export default class AbilityScoresElement extends HTMLElement {
    static name = 'ability-scores'
    static observedAttributes = [ 'scores' ]

    constructor () {
        super()
    }
}
