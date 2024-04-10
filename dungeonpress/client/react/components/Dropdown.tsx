import React, { useRef, HTMLAttributes, useEffect } from 'react'
import { Transition } from 'react-transition-group'

import './Dropdown.sass'

const duration = 100

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
    opacity: 0,
    transform: 'scale(0.9)'
}

const transitionStyles: Record<string, any> = {
    entering: { opacity: 1, transform: 'scale(1)' },
    entered:  { opacity: 1, transform: 'scale(1)' },
    exiting:  { opacity: 0, transform: 'scale(0.9)' },
    exited:   { opacity: 0, transform: 'scale(0.9)' },
}

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    onClose?: () => void
}

export default function Dropdown (props: DropdownProps) {
    const elRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const clickOutsideHandler = (e: MouseEvent) => {
            if (elRef.current && !elRef.current.contains(e.target as Node)) {
                props.onClose?.()
            }
        }

        if (props.open) {
            setTimeout(() => {
                document.addEventListener('click', clickOutsideHandler)
            }, 100)
        }

        return () => {
            document.removeEventListener('click', clickOutsideHandler)
        }
    }, [ props.open ])
    
    return (
        <Transition 
            nodeRef={elRef} 
            in={props.open} 
            timeout={duration}
            mountOnEnter={false}
            unmountOnExit={true}
        >
            {(state) => (
                <div 
                    ref={elRef} 
                    className='Dropdown'
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    {props.children}
                </div>
                 
            )}
        </Transition>
    )
}

export function DropdownList (props: HTMLAttributes<HTMLElement>) {
    return (
        <ul className='DropdownList'>
            {props.children}
        </ul>
    )
}

interface DropdownListItemProps extends HTMLAttributes<HTMLElement> {
    label: string
}

export function DropdownListItem (props: DropdownListItemProps) {
    return (
        <li>
            <label>
                <span>{props.label}</span>
                <aside>{props.children}</aside>
            </label>
        </li>
    )
}

export function DropdownLink (props: HTMLAttributes<HTMLElement>) {
    return (
        <a className='DropdownLink' onClick={props.onClick}>
            {props.children}
        </a>
    )
}

export function DropdownHeader (props: HTMLAttributes<HTMLElement>) {
    return (
        <header className='DropdownHeader'>
            {props.children}
        </header>
    )
}

export function DropdownContent (props: HTMLAttributes<HTMLElement>) {
    return (
        <div className='DropdownContent'>
            {props.children}
        </div>
    )
}
