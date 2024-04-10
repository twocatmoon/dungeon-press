export function defineElements (elements: ((typeof HTMLElement) & { name: string })[]) {
    for (const element of elements) {
        customElements.define(element.name, element)
    }
}
