import React, { HTMLAttributes, useRef } from 'react'

import './HeaderTitle.sass'

export interface HeaderTitleProps extends HTMLAttributes<HTMLDivElement> {
    titleShort: string
}

export default function HeaderTitle (props: HeaderTitleProps) {
    const elRef = useRef<HTMLDivElement>(null)
    
    const onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div ref={elRef} className='HeaderTitle' onClick={onClick}>
            <img src='/icon.svg' alt={props.titleShort} />
            <span>{props.titleShort}</span>
        </div>
    )
}
