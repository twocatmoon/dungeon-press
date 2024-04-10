export const SCROLL_OFFSET = 100

export function scrollToEl (target: HTMLElement) {
    const top = (
        target.getBoundingClientRect().top + 
        document.documentElement.scrollTop -
        SCROLL_OFFSET
    )

    window.scrollTo({
        top,
        behavior: 'smooth'
    })
}
