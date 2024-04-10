import React, { Dispatch, HTMLAttributes, useRef } from 'react'
import { Transition } from 'react-transition-group'

import Note from './Note'
import NoteForm from './NoteForm'
import Icon from './Icon'

import { NoteEditorState, NoteEditorStateAction, getEmptyNote, sortByLastModified } from '../hooks/useNoteEditorState'
import { scrollToEl } from '../../util/scrollToEl'
import { AppStateAction } from '../hooks/useAppState'

import './NoteEditor.sass'

const duration = 200

const defaultOverlayStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const overlayTransitionStyles: Record<string, any> = {
    entering: { opacity: 0.25 },
    entered:  { opacity: 0.25 },
    exiting:  { opacity: 0 },
    exited:   { opacity: 0 },
}

const defaultInnerStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateX(100%)',
}

const innerTransitionStyles: Record<string, any> = {
    entering: { transform: 'translateX(0)' },
    entered:  { transform: 'translateX(0)' },
    exiting:  { transform: 'translateX(100%)' },
    exited:   { transform: 'translateX(100%)' },
}

export interface NoteEditorProps extends HTMLAttributes<HTMLDivElement> {
    notes: AdventureNote[]
    dispatchAppState: Dispatch<AppStateAction>
    noteEditorState: NoteEditorState
    dispatchNoteEditorState: Dispatch<NoteEditorStateAction>
    onClose: () => void
    visible: boolean
}

export default function NoteEditor (props: NoteEditorProps) {
    const overlayElRef = useRef<HTMLDivElement>(null)
    const innerElRef = useRef<HTMLDivElement>(null)

    const onAddNoteClick = async () => {
        props.dispatchNoteEditorState({
            type: 'SET_CURRENT_NOTE',
            value: await getEmptyNote('note')
        })
    }

    const onDiscardNote = () => {
        props.dispatchNoteEditorState({
            type: 'SET_CURRENT_NOTE',
            value: null
        })
        props.dispatchNoteEditorState({
            type: 'SET_VISIBLE',
            value: false
        })
    }

    const onSubmitNote = (note: AdventureNote) => {
        props.dispatchAppState({
            type: 'ADD_OR_UPDATE_NOTE',
            value: note
        })
        props.dispatchNoteEditorState({
            type: 'SET_CURRENT_NOTE',
            value: null
        })
        props.onClose()
    }

    const onClickNote = (id: string) => {
        props.dispatchNoteEditorState({
            type: 'SET_VISIBLE',
            value: false
        })
        scrollToEl(document.querySelector(`[data-note-id="${id}"]`)!)
    }

    const onClickEdit = (note: AdventureNote) => {
        props.dispatchNoteEditorState({
            type: 'SET_CURRENT_NOTE',
            value: note
        })
    }

    const onClickDelete = (id: string) => {
        if (confirm('Are you sure?')) {
            props.dispatchAppState({
                type: 'REMOVE_NOTE',
                value: id
            })
        }
    }

    const onClickOverlay = () => {
        props.dispatchNoteEditorState({
            type: 'SET_VISIBLE',
            value: false
        })
    }

    const notesSorted = props.notes.sort(sortByLastModified)

    return (
        <div className={`NoteEditor ${props.visible ? '--isActive' : ''}`}>
            <Transition 
                nodeRef={overlayElRef} 
                in={props.visible} 
                timeout={duration}
                mountOnEnter={false}
                unmountOnExit={true}
            >
                {(state) => (
                    <div 
                        ref={overlayElRef}
                        className='NoteEditor__Overlay' 
                        onClick={onClickOverlay} 
                        style={{
                            ...defaultOverlayStyle,
                            ...overlayTransitionStyles[state]
                        }}
                    />
                )}
            </Transition>
            <Transition 
                nodeRef={innerElRef} 
                in={props.visible} 
                timeout={duration}
                mountOnEnter={false}
                unmountOnExit={true}
            >
                {(state) => (
                    <div 
                        ref={innerElRef}
                        className='NoteEditor__Inner'
                        style={{
                            ...defaultInnerStyle,
                            ...innerTransitionStyles[state]
                        }}
                    >
                        <header>
                            <h5>Notes {notesSorted.length ? `(${notesSorted.length})` : ''}</h5>
                            {
                                (!props.noteEditorState.currentNote && notesSorted.length)
                                    ? (
                                        <button 
                                            className='button button--primary button--small'
                                            onClick={onAddNoteClick}
                                        >
                                            Add a note
                                        </button>
                                    )
                                    : <></>
                            }
                            <aside>
                                <a onClick={props.onClose}>
                                    <Icon name='cross_x16' />
                                </a>
                            </aside>
                        </header>
                        
                        {
                            props.noteEditorState.currentNote
                                ? (
                                    <div className='NoteEditor__Form'>
                                        <NoteForm 
                                            note={props.noteEditorState.currentNote} 
                                            onDiscardNote={onDiscardNote}
                                            onSubmitNote={onSubmitNote}
                                        />
                                    </div>
                                ) : <></>
                        }
                        
                        <div className='NoteEditor__Notes'>
                            {
                                (notesSorted.length && props.noteEditorState.currentNote)
                                    ? <h6>Previous Notes</h6>
                                    : <></>
                            }
                            <div>
                            {
                                (!notesSorted.length && !props.noteEditorState.currentNote)
                                    ? (
                                        <div className='NoteEditor__Empty'>
                                            <img src='/images/notebook.png' alt='Notebook' />
                                            <button 
                                                className='button button--primary'
                                                onClick={onAddNoteClick}
                                            >
                                                Add a note
                                            </button>
                                        </div>
                                    )
                                    : (
                                        notesSorted.map((note, index) => (
                                                <Note 
                                                    key={index}
                                                    note={note}
                                                    onClickNote={onClickNote}
                                                    onClickDelete={onClickDelete}
                                                    onClickEdit={onClickEdit}
                                                />
                                            ))
                                    )
                            }
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    )
}
