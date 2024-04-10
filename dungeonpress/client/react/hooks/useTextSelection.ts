import { useState } from 'react'

export interface SelectionState {
    selection: string
    selectionStart: number
    selectionEnd: number
    parentElement: HTMLElement | null
    cursorPos: { x: number, y: number }
}

function initialState (): SelectionState {
    return {
        selection: '',
        selectionStart: 0,
        selectionEnd: 0,
        parentElement: null,
        cursorPos: { x: 0, y: 0 }
    }
}

export function useTextSelection (): [ 
    state: SelectionState, 
    onMouseUp: (e: React.MouseEvent) => void,
    clearSelection: () => void
] {
    const [ state, setState ] =  useState<SelectionState>(initialState())
    
    const onMouseUp = (e: React.MouseEvent) => {
        e.preventDefault()
    
        const selectionObj = (window.getSelection && window.getSelection())
        if (!selectionObj) return setState(initialState())
    
        const selection = selectionObj.toString()
        if (!selection) return setState(initialState())
        if (selection === state.selection) return setState(initialState())
    
        const anchorNode = selectionObj.anchorNode
        if (!anchorNode) return setState(initialState())
        if (!anchorNode.parentElement) return setState(initialState())
        const anchorNodeParentEl = anchorNode.parentElement as HTMLElement
        if (anchorNodeParentEl.tagName.toLowerCase() === 'mark') return setState(initialState())
    
        const focusNode = selectionObj.focusNode
        if (!focusNode) return setState(initialState())
        if (!focusNode.parentElement) return setState(initialState())
        const focusNodeParentEl = focusNode.parentElement as HTMLElement
        if (focusNodeParentEl.tagName.toLowerCase() === 'mark') return setState(initialState())
    
        if (anchorNode !== focusNode) return setState(initialState())
        if (anchorNodeParentEl !== focusNodeParentEl) return setState(initialState())
    
        const anchorOffset = selectionObj.anchorOffset
        const focusOffset = selectionObj.focusOffset
        const position = anchorNode.compareDocumentPosition(focusNode)
    
        let forward = false
        if (position === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
            forward = true
        } else if (position === 0) {
            forward = (focusOffset - anchorOffset) > 0
        }
    
        let selectionStart = forward ? anchorOffset : focusOffset
    
        if (forward) {
            if (anchorNodeParentEl.getAttribute('data-order')
                && anchorNodeParentEl.getAttribute('data-order') === 'middle') {
                selectionStart += state.selectionStart
            }
            if (anchorNodeParentEl.getAttribute('data-order')
                && anchorNodeParentEl.getAttribute('data-order') === 'last') {
                selectionStart += state.selectionEnd
            }
        } else {
            if (focusNodeParentEl.getAttribute('data-order')
                && focusNodeParentEl.getAttribute('data-order') === 'middle') {
                selectionStart += state.selectionStart
            }
            if (focusNodeParentEl.getAttribute('data-order')
                && focusNodeParentEl.getAttribute('data-order') === 'last') {
                selectionStart += state.selectionEnd
            }
        }
    
        const selectionEnd = selectionStart + selection.length
    
        setState({
            selection,
            selectionStart,
            selectionEnd,
            parentElement: anchorNodeParentEl,
            cursorPos: { x: e.clientX, y: e.clientY }
        })
    }

    const clearSelection = () => {
        setState(initialState())
    }

    return [
        state,
        onMouseUp,
        clearSelection,
    ]
}
