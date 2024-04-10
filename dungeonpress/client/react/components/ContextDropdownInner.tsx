import React, { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react'

import { DropdownList, DropdownListItem, DropdownLink } from './Dropdown'

import './ContextDropdownInner.sass'
import Icon from './Icon'
import { MarkdownContext } from '../../../markdown'
import { AppState } from '../hooks/useAppState'

interface ContextDropdownInnerProps extends HTMLAttributes<HTMLDivElement> {
    context: MarkdownContext
    originalSeed: string | number
    onContextChange: (context: MarkdownContext) => void
    theme: AppState[ 'settings' ][ 'theme' ]
    onAppearanceToggle: () => void
    onClearUserData: () => void
}

export default function ContextDropdownInner (props: ContextDropdownInnerProps) {
    // Context

    const setSeed = (seed: string | number) => {
        props.onContextChange({
            ...props.context,
            seed: seed
        })
    }

    const setChallenge = (challenge: MarkdownContext[ 'challenge' ]) => {
        props.onContextChange({
            ...props.context,
            challenge: challenge
        })
    }

    // Appearance

    const toggleAppearance = () => {
        props.onAppearanceToggle()
    }

    // Other

    const clearUserData = () => {
        props.onClearUserData()
    }

    return (
        <>
            <DropdownList>
                <DropdownListItem label='Seed'>
                    <ContextDropdownInput
                        seed={props.context.seed}
                        originalSeed={props.originalSeed}
                        onSeedChange={setSeed}
                    />
                </DropdownListItem>
                <DropdownListItem label='Difficulty'>
                    <ContextDropdownSelect
                        challenge={props.context.challenge}
                        onChallengeChange={setChallenge}
                    >
                        <option value='easy'>Casual</option>
                        <option value='intended'>Intended</option>
                        <option value='hard'>Difficult</option>
                    </ContextDropdownSelect>
                </DropdownListItem>
            </DropdownList>
            <hr />
            <DropdownList>
                <DropdownListItem label='Appearance'>
                    <ContextDropdownToggle
                        theme={props.theme}
                        onToggle={toggleAppearance}
                    />
                </DropdownListItem>
            </DropdownList>
            <hr />
            <p>
                <DropdownLink onClick={clearUserData}>
                    Clear User Data
                </DropdownLink>
            </p>
        </>
    )
}

interface ContextDropdownInputProps extends HTMLAttributes<HTMLInputElement> {
    seed: string | number
    originalSeed: string | number
    onSeedChange: (seed: string) => void
}

function ContextDropdownInput (props: ContextDropdownInputProps) {
    const resetSeed = () => {
        props.onSeedChange(props.originalSeed.toString())
    }
    
    const shuffleSeed = () => {
        const newSeed = Math.round(Math.random() * 89999 + 10000)
        props.onSeedChange(newSeed.toString())
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onSeedChange(event.target.value)
    }

    return (
        <fieldset className='control ContextDropdownInput'>
            <input 
                type='text' 
                onChange={onInputChange}
                value={props.seed.toString()}
            />
            <aside>
                <a onClick={resetSeed}><Icon name='sweep_x12' /></a>
                <a onClick={shuffleSeed}><Icon name='shuffle_x12' /></a>
            </aside>
        </fieldset>
    )
}

interface ContextDropdownSelectProps extends HTMLAttributes<HTMLSelectElement> {
    challenge: MarkdownContext[ 'challenge' ]
    onChallengeChange: (challenge: MarkdownContext[ 'challenge' ]) => void
}

function ContextDropdownSelect (props: ContextDropdownSelectProps) {
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        props.onChallengeChange(event.target.value as MarkdownContext[ 'challenge' ])
    }

    return (
        <fieldset className='control ContextDropdownSelect'>
            <select
                onChange={onChange}
                value={props.challenge}
            >
                {props.children}
            </select>
            <aside><Icon name='angleDown_x12' /></aside>
        </fieldset>
    )
}

interface ContextDropdownToggleProps extends HTMLAttributes<HTMLElement> {
    theme: AppState[ 'settings' ][ 'theme' ]
    onToggle: () => void
}

function ContextDropdownToggle (props: ContextDropdownToggleProps) {
    const onChange = () => {
        props.onToggle()
    }

    const [ theme, setTheme ] = useState(props.theme)
    useEffect(() => {
        if (props.theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(prefersDark ? 'dark' : 'light')
        } else {
            setTheme(props.theme)
        }
    }, [ props.theme ])

    return (
        <label className='ContextDropdownToggle'>
            <input 
                type='checkbox'
                onChange={onChange}
                checked={theme === 'dark'}
            />
            <aside>
                <span>
                    <Icon name='sun_x12' />
                    <Icon name='moon_x12' />
                </span>
            </aside>
        </label>
    )
}
