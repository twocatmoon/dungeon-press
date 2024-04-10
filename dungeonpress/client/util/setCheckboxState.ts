export function setCheckboxState (el: HTMLElement, checkboxIds: string[]) {
    const checkboxes = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')

    for (const checkbox of checkboxes) {
        checkbox.checked = checkboxIds.includes(checkbox.dataset.id!)
    }
}
