declare global {
    namespace JSX {
        interface IntrinsicElements {
            [ 'dice-roll' ]: CustomElement<DiceRollElement, any>
        }
    }
}

export default class DiceRollElement extends HTMLElement {
    static name = 'dice-roll'
    static observedAttributes = [ 'roll', 'challenge', 'skills' ]

    constructor () {
        super()
    }
}
