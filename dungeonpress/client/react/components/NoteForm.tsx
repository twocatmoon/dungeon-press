import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

import './NoteForm.sass'
import Dropdown from './Dropdown'

export interface NoteFormProps extends HTMLAttributes<HTMLDivElement> {
    note: AdventureNote
    onSubmitNote: (note: AdventureNote) => void
    onDiscardNote: () => void
}

export default function NoteForm (props: NoteFormProps) {
    const [ note, setNote ] = useState(props.note)

    useEffect(() => {
        setNote(props.note)
    }, [ props.note ])

    const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote({
            ...props.note,
            content: event.target.value
        })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.onSubmitNote(note)
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [])

    return (
        <Dropdown open={true}>
            <form className='NoteForm' onSubmit={onSubmit}>
                {
                    props.note.selection ? (
                        <div className='NoteForm__Selection'>
                            <p>
                                <span>{props.note.selection}</span>
                            </p>
                        </div>
                    ) : <></>
                }
                <textarea
                    ref={textareaRef}
                    value={note.content} 
                    onChange={onContentChange}
                    placeholder='Write your note here...'
                />
                <footer>
                    <button
                        className='button'
                        onClick={props.onDiscardNote}
                    >
                        {!props.note.id ? 'Discard' : 'Cancel'}
                    </button>
                    <button 
                        className='button'
                        type='submit'
                        disabled={!note.content && note.type !== 'highlight'}
                    >
                        {
                            !props.note.id ? 'Save Note' : 'Save Changes'
                        }
                    </button>
                </footer>
            </form>
        </Dropdown>
    )
}
