declare global {
    namespace JSX {
        interface IntrinsicElements {
            [ 'details-block' ]: CustomElement<DetailsBlockElement, any>
        }
    }
}
  
export default class DetailsBlockElement extends HTMLElement {
    static name = 'details-block'
    static observedAttributes = [ 'type' ]

    constructor () {
        super()
    }
}
