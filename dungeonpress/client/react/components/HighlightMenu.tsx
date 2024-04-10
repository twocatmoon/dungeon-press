import React, { HTMLAttributes, useRef } from 'react'
import { Transition } from 'react-transition-group'

import Icon from './Icon'

import './HighlightMenu.sass'

const duration = 100

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
    opacity: 0,
    transform: 'translate(-50%, -100%) scale(0.5)'
}

const transitionStyles: Record<string, any> = {
    entering: { opacity: 1, transform: 'translate(-50%, -100%) scale(1)' },
    entered:  { opacity: 1, transform: 'translate(-50%, -100%) scale(1)' },
    exiting:  { opacity: 0, transform: 'translate(-50%, -100%) scale(0.5)' },
    exited:   { opacity: 0, transform: 'translate(-50%, -100%) scale(0.5)' },
}

export interface HighlightMenuProps extends HTMLAttributes<HTMLDivElement> {
    position: { x: number, y: number }
    visible: boolean
    onHighlightClick: () => void
}

export default function HighlightMenu (props: HighlightMenuProps) {
    const elRef = useRef<HTMLUListElement>(null)

    const x = Math.round(props.position.x)
    const y = Math.round(props.position.y)

    const style = {
        top: `${y}px`,
        left: `${x}px`
    }

    return (
        <Transition 
            nodeRef={elRef} 
            in={props.visible} 
            timeout={duration}
            mountOnEnter={false}
            unmountOnExit={true}
        >
            {(state) => (
                <ul 
                    ref={elRef} 
                    className='HighlightMenu' 
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                        ...style,
                    }}
                >
                    <li onClick={props.onHighlightClick}>
                        <Icon name='marker_x16' />
                    </li>
                </ul>
            )}
        </Transition>
    )
}
