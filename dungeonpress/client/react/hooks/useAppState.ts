import { Reducer, useEffect, useReducer, useRef } from 'react'
import { MarkdownContext } from '../../../markdown'
import { parseAdventure } from '../../../markdown/parser'
import { nanoid } from 'nanoid'

export interface AppState {
    adventure: Adventure
    context: MarkdownContext
    settings: {
        theme: 'system' | 'light' | 'dark'
    }
    userData: {
        notes: AdventureNote[]
        checkboxes: string[]
    }
}

interface AppStateActionSetContent {
    type: 'SET_CONTENT'
    value: { html: string, toc: TableOfContentsItem[] }
}

interface AppStateActionSetSeed {
    type: 'SET_CONTEXT'
    value: MarkdownContext
}

interface AppStateActionSetTheme {
    type: 'SET_THEME'
    value: AppState[ 'settings' ][ 'theme' ]
}

interface AppStateActionToggleTheme {
    type: 'TOGGLE_THEME'
    value?: any
}

interface AppStateActionAddOrUpdateNote {
    type: 'ADD_OR_UPDATE_NOTE'
    value: AdventureNote
}

interface AppStateActionRemoveNote {
    type: 'REMOVE_NOTE'
    value: AdventureNote[ 'id' ]
}

interface AppStateActionToggleCheckbox {
    type: 'TOGGLE_CHECKBOX'
    value: string
}

interface AppStateActionClearUserData {
    type: 'CLEAR_USER_DATA'
    value?: any
}

interface AppStateActionRestoreState {
    type: 'RESTORE_STATE'
    value?: any
}

export type AppStateAction = 
    AppStateActionSetContent |
    AppStateActionSetSeed |
    AppStateActionSetTheme |
    AppStateActionToggleTheme |
    AppStateActionAddOrUpdateNote |
    AppStateActionRemoveNote |
    AppStateActionToggleCheckbox |
    AppStateActionClearUserData |
    AppStateActionRestoreState

export function useAppState (adventure: Adventure): [ state: AppState, dispatch: React.Dispatch<AppStateAction> ] {
    const reducer: Reducer<AppState, AppStateAction> = (state, action) => {
        switch (action.type) {
            case 'SET_CONTENT':
                return {
                    ...state,
                    adventure: {
                        ...state.adventure,
                        content: action.value.html,
                        toc: action.value.toc
                    }
                }

            case 'SET_CONTEXT':
                return saveAppState({
                    ...state,
                    context: action.value
                })

            case 'SET_THEME':
                return saveAppState({
                    ...state,
                    settings: {
                        ...state.settings,
                        theme: action.value
                    }
                })

            case 'TOGGLE_THEME':
                const theme = state.settings.theme === 'system'
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark')
                    : (state.settings.theme === 'light' ? 'dark' : 'light')

                return saveAppState({
                    ...state,
                    settings: {
                        ...state.settings,
                        theme
                    }
                })

            case 'ADD_OR_UPDATE_NOTE':
                const noteIndex = state.userData.notes.findIndex((note) => {
                    return note.id === action.value.id
                })

                if (noteIndex === -1) {
                    return saveAppState({
                        ...state,
                        userData: {
                            ...state.userData,
                            notes: [
                                ...state.userData.notes,
                                {
                                    ...action.value,
                                    id: nanoid(),
                                    created: (new Date()).toISOString(),
                                    modified: (new Date()).toISOString()
                                }
                            ]
                        }
                    })
                } else {
                    return saveAppState({
                        ...state,
                        userData: {
                            ...state.userData,
                            notes: state.userData.notes.map((note) => {
                                if (note.id === action.value.id) {
                                    return {
                                        ...action.value,
                                        modified: (new Date()).toISOString()
                                    }
                                }
                                return note
                            })
                        }
                    })
                }

            case 'REMOVE_NOTE':
                return saveAppState({
                    ...state,
                    userData: {
                        ...state.userData,
                        notes: state.userData.notes.filter((note) => {
                            return note.id !== action.value
                        })
                    }
                })

            case 'TOGGLE_CHECKBOX':
                const checkboxIndex = state.userData.checkboxes.findIndex((checkbox) => {
                    return checkbox === action.value
                })

                if (checkboxIndex === -1) {
                    return saveAppState({
                        ...state,
                        userData: {
                            ...state.userData,
                            checkboxes: [
                                ...state.userData.checkboxes,
                                action.value
                            ]
                        }
                    })
                } else {
                    return saveAppState({
                        ...state,
                        userData: {
                            ...state.userData,
                            checkboxes: state.userData.checkboxes.filter((checkbox) => {
                                return checkbox !== action.value
                            })
                        }
                    })
                }

            case 'CLEAR_USER_DATA':
                return saveAppState({
                    ...state,
                    userData: {
                        notes: [],
                        checkboxes: []
                    }
                })

            case 'RESTORE_STATE':
                const restoredState = restoreAppState()
                return {
                    ...state,
                    context: restoredState?.context ?? state.context,
                    settings: restoredState?.settings ?? state.settings,
                    userData: restoredState?.userData ?? state.userData
                }

            default:
                throw new Error()
        }
    }
    
    const initialState: AppState = {
        adventure: adventure,
        context: {
            seed: adventure.attributes.seed,
            challenge: 'intended'
        },
        settings: {
            theme: 'system'
        },
        userData: {
            notes: [],
            checkboxes: []
        }
    }
    
    const [ state, dispatch ] = useReducer(
        reducer, 
        initialState
    )
    
    useEffect(() => {
        const { html, toc } = parseAdventure(adventure.raw, state.context)
        dispatch({ type: 'SET_CONTENT', value: { html, toc } })
    }, [ state.context ])
    
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (!firstRenderRef.current) return
        firstRenderRef.current = false

        dispatch({ type: 'RESTORE_STATE' })
    })
    
    return [ state, dispatch ]
}

function saveAppState (state: AppState) {
    const saveState: Partial<AppState> = { ...state }
    delete saveState[ 'adventure' ]
    localStorage.setItem('dungeonPress:appState', JSON.stringify(saveState))
    return state
}

export function restoreAppState (): Partial<AppState> | undefined {
    const savedState = localStorage.getItem('dungeonPress:appState')
    if (savedState) return JSON.parse(savedState)
    return undefined
}
