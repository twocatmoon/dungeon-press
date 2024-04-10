import React, { HTMLAttributes } from 'react'

import './Note.sass'
import Icon from './Icon'
import { formatDistance } from 'date-fns'

const NOTE_SELECTION_TRUNCATE_LENGTH = 125

export interface NoteProps extends HTMLAttributes<HTMLDivElement> {
    note: AdventureNote
    onClickNote: (id: string) => void
    onClickDelete: (id: string) => void
    onClickEdit: (note: AdventureNote) => void
}

function formatTimeAgo (date: string) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export default function Note (props: NoteProps) {
    const selectionTruncated = props.note.selection?.length > NOTE_SELECTION_TRUNCATE_LENGTH
        ? props.note.selection?.substring(0, NOTE_SELECTION_TRUNCATE_LENGTH) + '...'
        : props.note.selection

    return (
        <div className={`Note Note--${props.note.type}`}>
            <div onClick={() => props.note.type === 'highlight' && props.onClickNote(props.note.id)}>
                {
                    props.note.content ? (
                        <pre>{props.note.content}</pre>
                    ) : <></>
                }
                {
                    props.note.selection ? (
                        <blockquote>
                            {selectionTruncated}
                        </blockquote>
                    ) : <></>
                }
            </div>
            <footer>
                <span>{formatTimeAgo(props.note.modified)}</span>
                <aside>
                    <a onClick={() => props.onClickDelete(props.note.id)}>
                        <Icon name='trash_x16' />
                    </a>
                    <a onClick={() => props.onClickEdit(props.note)}>
                        <Icon name='pencil_x16' />
                    </a>
                </aside>
            </footer>
        </div>
    )
}
