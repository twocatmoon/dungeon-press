import { useEffect, useRef } from 'react'
import { debounce } from '../../../util/debounce'
import { SCROLL_OFFSET, scrollToEl } from '../../util/scrollToEl'

function clickEventHandler (event: MouseEvent) {
    const anchor = (event.target as HTMLElement).closest('a')
    if (!anchor) return
    
    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('#')) return

    const id = href.replace('#', '')
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    window.history.pushState(null, '', href)

    scrollToEl(target)
}

function highlightActiveLink () {
    const anchors = document.querySelectorAll<HTMLAnchorElement>('#adventure-content .anchor')
    const links = document.querySelectorAll<HTMLAnchorElement>('#table-of-contents a')
    
    if (
        typeof(anchors) != 'undefined' && anchors != null && 
        typeof(links) != 'undefined' && links != null
    ) {
        links.forEach((link) => link.classList.remove('--active'))

        const scrollTop = window.scrollY
        
        for (var i = anchors.length - 1; i >= 0; i--) {
            const anchorTop = (
                anchors[i].getBoundingClientRect().top + 
                document.documentElement.scrollTop -
                SCROLL_OFFSET -
                30
            )

            if (scrollTop > anchorTop) {
                if (links[i]) links[i].classList.add('--active')
                break
            }
        }
    }
}

function scrollEventHandler () {
    return debounce(function () {
        highlightActiveLink()
    }, 100)
}

export function useAnchorLinks () {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false

            const hash = window.location.hash

            const id = hash.replace('#', '')
            if (!id) return

            const target = document.getElementById(id)
            if (target) {
                setTimeout(() => {
                    scrollToEl(target)
                    highlightActiveLink()
                }, 100)
            }
        }

        document.addEventListener('click', clickEventHandler)
        
        const wrappedScrollEventHandler = scrollEventHandler()
        window.addEventListener('scroll', wrappedScrollEventHandler)

        return () => {
            document.removeEventListener('click', clickEventHandler)
            window.removeEventListener('scroll', wrappedScrollEventHandler)
        }
    }, [])
}
