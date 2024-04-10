import { Dispatch, useEffect, useRef } from 'react'
import { debounce } from '../../../util/debounce'
import { splitAdventureParts, parseContentFromMarkdown } from '../../../markdown/parser'
import { AppState, AppStateAction } from './useAppState'

export function useAdventureRerender (state: AppState, dispatch: Dispatch<AppStateAction>) {
    const firstRenderRef = useRef(true)
    
    useEffect(debounce(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        
        const parts = splitAdventureParts(state.adventure.raw)
        const { html, toc } = parseContentFromMarkdown(parts[1], state.adventure.attributes, state.context)

        dispatch({
            type: 'SET_CONTENT',
            value: { html, toc }
        })
    }, 100), [ state.context ])
}
