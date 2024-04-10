import React, { Dispatch, HTMLAttributes, useRef, useEffect, useState } from 'react'

import { NoteEditorState, NoteEditorStateAction, getEmptyNote } from '../hooks/useNoteEditorState'
import { useTextSelection } from '../hooks/useTextSelection'
import HighlightMenu from './HighlightMenu'

import { AppState, AppStateAction } from '../hooks/useAppState'
import { markHighlights } from '../../util/markHighlights'
import { setCheckboxState } from '../../util/setCheckboxState'

import './AdventureContent.sass'

export interface AdventureContentProps extends HTMLAttributes<HTMLDivElement> {
    content: string
    userData: AppState[ 'userData' ]
    dispatchAppState: Dispatch<AppStateAction>
    noteEditorState: NoteEditorState
    dispatchNoteEditorState: Dispatch<NoteEditorStateAction>
}

export default function AdventureContent (props: AdventureContentProps) {
    const contentElRef = useRef<HTMLDivElement | null>(null)

    const [ state, onMouseUp, clearSelection ] = useTextSelection()
    const [ initialContent ] = useState(props.content)
    const [ menuPosition, setMenuPosition ] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    const onHighlightClick = async () => {
        props.dispatchNoteEditorState({
            type: 'SET_CURRENT_NOTE',
            value: await getEmptyNote('highlight', state)
        })
        clearSelection()
    }

    const onClick = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLElement) {
            (() => {
                const el = e.target.closest<HTMLSpanElement>('[data-note-id]')
                if (!el) return

                const noteId = el.dataset.noteId

                if (noteId) {
                    props.dispatchNoteEditorState({
                        type: 'SET_CURRENT_NOTE',
                        value: props.userData.notes.find(note => note.id === noteId) || null
                    })
                } else {
                    props.dispatchNoteEditorState({
                        type: 'SET_CURRENT_NOTE',
                        value: null
                    })
                }
            })();

            (() =>{
                const el = e.target.closest<HTMLInputElement>('input[type="checkbox"]')
                if (!el) return

                const checkboxId = el.dataset.id
                if (!checkboxId) return

                props.dispatchAppState({
                    type: 'TOGGLE_CHECKBOX',
                    value: checkboxId
                })
            })();
        }
    }

    useEffect(() => {
        if (state.parentElement) {
            const x = state.cursorPos.x
            const y = state.cursorPos.y + window.scrollY - 20
            setMenuPosition({ x, y })
        } else {
            setMenuPosition({ x: 0, y: 0 })
        }
    }, [ state.cursorPos ])
    
    const firstRenderRef = useRef(true)
    useEffect(() => {
        clearSelection()

        const contentEl = contentElRef.current
        if (!contentEl) return

        if (!firstRenderRef.current) contentEl.innerHTML = props.content
        markHighlights(contentEl, props.userData.notes)
        setCheckboxState(contentEl, props.userData.checkboxes)

        firstRenderRef.current = false
    }, [ props.content, props.userData ])

    return (
        <>
            <div
                ref={contentElRef}
                className='AdventureContent'
                onMouseUp={onMouseUp}
                onMouseDown={clearSelection}
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: initialContent }}
            />
            <HighlightMenu 
                position={menuPosition}
                onHighlightClick={onHighlightClick}
                visible={!!state.selection}
            />
        </>
    )
}

export function AdventureContentWrapper (props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className='AdventureContent'>
            {props.children}
        </div>
    )
}
