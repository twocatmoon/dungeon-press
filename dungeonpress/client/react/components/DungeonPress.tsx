import React, { HTMLAttributes } from 'react'

import AdventureContent from './AdventureContent'
import FooterNav from './FooterNav'
import HeaderNav from './HeaderNav'
import HeaderTitle from './HeaderTitle'
import Hero from './Hero'
import NoteEditor from './NoteEditor'
import TableOfContents from './TableOfContents'

import { useAppState } from '../hooks/useAppState'
import { useAnchorLinks } from '../hooks/useAnchorLinks'
import { useAdventureRerender } from '../hooks/useAdventureRerender'
import { useThemes } from '../hooks/useThemes'
import { useNoteEditorState } from '../hooks/useNoteEditorState'
import { SocialIconName } from './SocialIcon'

import './DungeonPress.sass'


export interface DungeonPressConfig {
    build: {
        baseUrl: string
    },
    template: {
        heroImgSrc: string
        footerLinks: {
            text: string
            link: string
        }[]
        socialLinks: {
            icon: SocialIconName
            link: string
        }[]
    }
}

export interface DungeonPressProps extends HTMLAttributes<HTMLDivElement> {
    adventure: Adventure
    config: DungeonPressConfig
}

export default function DungeonPress (props: DungeonPressProps) {
    const [ appState, dispatchAppState ] = useAppState(props.adventure)
    const [ noteEditorState, dispatchNoteEditorState ] = useNoteEditorState()

    useAdventureRerender(appState, dispatchAppState)
    useAnchorLinks()
    useThemes(appState.settings.theme)

    const adventure = appState.adventure
    const attributes = appState.adventure.attributes
    const config = props.config

    const openNoteEditor = () => {
        dispatchNoteEditorState({
            type: 'SET_VISIBLE',
            value: true
        })
    }

    const closeNoteEditor = () => {
        dispatchNoteEditorState({
            type: 'SET_VISIBLE',
            value: false
        })
    }

    return (
        <div className='DungeonPress'>

            <header>
                <div>
                    <div>
                        <HeaderTitle 
                            titleShort={attributes.titleShort} 
                        />
                    </div>
                    <aside>
                        <HeaderNav 
                            author={attributes.author}
                            authorLink={attributes.authorLink}
                            toc={adventure.toc}
                            appState={appState}
                            dispatchAppState={dispatchAppState}
                            onOpenNotesClick={openNoteEditor}
                        />
                    </aside>
                </div>
            </header>

            <div>
                <main>
                    <article>
                        <Hero 
                            attributes={attributes}
                            heroImgSrc={config.template.heroImgSrc}
                        />
                        <AdventureContent
                            id='adventure-content'
                            content={adventure.content}
                            userData={appState.userData}
                            dispatchAppState={dispatchAppState}
                            noteEditorState={noteEditorState}
                            dispatchNoteEditorState={dispatchNoteEditorState}
                        />
                        <footer>
                            <FooterNav 
                                titleShort={attributes.titleShort}
                                author={attributes.author}
                                authorLink={attributes.authorLink}
                                version={attributes.version}
                                footerLinks={config.template.footerLinks}
                                socialLinks={config.template.socialLinks}
                            />
                        </footer>
                    </article>
                    <aside>
                        <TableOfContents
                            id='table-of-contents'
                            toc={adventure.toc} 
                        />
                    </aside>
                </main>
            </div>

            <aside>
                <NoteEditor 
                    notes={appState.userData.notes}
                    dispatchAppState={dispatchAppState}
                    noteEditorState={noteEditorState}
                    dispatchNoteEditorState={dispatchNoteEditorState}
                    onClose={closeNoteEditor}
                    visible={noteEditorState.visible}
                />
            </aside>

        </div>
    )
}
