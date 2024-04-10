import React, { Dispatch, HTMLAttributes, useRef, useState } from 'react'

import Icon from './Icon'
import Badge from './Badge'
import Dropdown, { DropdownContent, DropdownHeader } from './Dropdown'
import ContextDropdownInner from './ContextDropdownInner'
import TableOfContents from './TableOfContents'

import { AppState, AppStateAction } from '../hooks/useAppState'
import { parseAttributesFromYaml, splitAdventureParts } from '../../../markdown/parser'
import { MarkdownContext } from '../../../markdown'

import './HeaderNav.sass'

export interface HeaderNavProps extends HTMLAttributes<HTMLDivElement> {
    author: string
    authorLink: string
    toc: TableOfContentsItem[]
    appState: AppState
    dispatchAppState: Dispatch<AppStateAction>
    onOpenNotesClick: () => void
}

export default function HeaderNav (props: HeaderNavProps) {
    const originalAttributesRef = useRef(
        parseAttributesFromYaml(
            splitAdventureParts(props.appState.adventure.raw)[0]
        )
    )

    const [ tocDropdownOpen, setTocDropdownOpen ] = useState(false)
    const toggleTocDropdown = () => setTocDropdownOpen(!tocDropdownOpen)
    const closeTocDropdown = () => setTocDropdownOpen(false)

    const [ contextDropdownOpen, setContextDropdownOpen ] = useState(false)
    const toggleContextDropdown = () => setContextDropdownOpen(!contextDropdownOpen)

    const onContextChange = (context: MarkdownContext) => {
        props.dispatchAppState({
            type: 'SET_CONTEXT',
            value: context
        })
    }

    const onAppearanceChange = () => {
        props.dispatchAppState({
            type: 'TOGGLE_THEME'
        })
    }

    const onClearUserDataClick = () => {
        props.dispatchAppState({
            type: 'CLEAR_USER_DATA'
        })
    }

    return (
        <nav className='HeaderNav'>
            <ul>
                <li className='--hide --inFlMedium --inFlWide'>
                    An adventure by&nbsp;
                    <a 
                        href={props.authorLink} 
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {props.author}
                    </a>
                </li>
                <li>
                    <span className='--hide --inFlSmall --inFlMedium'>
                        <Icon name='book_x16' onClick={toggleTocDropdown} />
                        <Dropdown open={tocDropdownOpen} onClose={toggleTocDropdown}>
                            <DropdownHeader>
                                <h6>Table of Contents</h6>
                            </DropdownHeader>
                            <DropdownContent>
                                <TableOfContents 
                                    hideHeader 
                                    toc={props.toc}
                                    onLinkClick={closeTocDropdown}
                                />
                            </DropdownContent>
                        </Dropdown>
                    </span>
                    <span>
                        <Icon name='settings_x16' onClick={toggleContextDropdown} />
                        <Dropdown open={contextDropdownOpen} onClose={toggleContextDropdown}>
                            <ContextDropdownInner
                                context={props.appState.context}
                                originalSeed={originalAttributesRef.current.seed}
                                onContextChange={onContextChange}
                                theme={props.appState.settings.theme}
                                onAppearanceToggle={onAppearanceChange}
                                onClearUserData={onClearUserDataClick}
                            />
                        </Dropdown>
                    </span>
                    <span>
                        <Icon name='note_x16' onClick={props.onOpenNotesClick} />
                        {
                            props.appState.userData.notes.length ? (
                                <Badge value={props.appState.userData.notes.length} />
                            ) : <></>
                        }
                    </span>
                </li>
            </ul>
        </nav>
    )
}
