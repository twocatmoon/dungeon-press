import { Reducer, useReducer } from 'react'
import { SelectionState } from './useTextSelection'

export interface NoteEditorState {
    visible: boolean
    currentNote: AdventureNote | null
}

interface NoteEditorStateActionSetVisible {
    type: 'SET_VISIBLE'
    value: boolean
}

interface NoteEditorStateActionSetCurrentNote {
    type: 'SET_CURRENT_NOTE'
    value: AdventureNote | null
}


export type NoteEditorStateAction = 
    NoteEditorStateActionSetVisible |
    NoteEditorStateActionSetCurrentNote

export function useNoteEditorState (): [ state: NoteEditorState, dispatch: React.Dispatch<NoteEditorStateAction> ] {
    const reducer: Reducer<NoteEditorState, NoteEditorStateAction> = (state, action) => {
        switch (action.type) {
            case 'SET_VISIBLE':
                return {
                    ...state,
                    visible: action.value,
                    currentNote: action.value ? state.currentNote : null
                }
            case 'SET_CURRENT_NOTE':
                return {
                    ...state,
                    visible: action.value ? true : state.visible,
                    currentNote: action.value
                }
            default:
                throw new Error()
        }
    }
    
    const initialState: NoteEditorState = {
        visible: false,
        currentNote: null,
    }
    
    const [ state, dispatch ] = useReducer(
        reducer, 
        initialState
    )
    
    return [ state, dispatch ]
}

export async function getEmptyNote (type: AdventureNote[ 'type' ], state?: SelectionState): Promise<AdventureNote> {
    return {
        id: '',
        type,
        content: '',
        selection: state?.selection || '',
        created: (new Date()).toISOString(),
        modified: (new Date()).toISOString(),
    }
}

export function sortByLastModified (a: AdventureNote, b: AdventureNote) {
    return new Date(b.modified).getTime() - new Date(a.modified).getTime()
}

