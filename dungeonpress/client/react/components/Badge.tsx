import React, { HTMLAttributes } from 'react'

import './Badge.sass'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    value: string | number
}

export default function Badge (props: BadgeProps) {
    return (
        <span className='Badge'>
            {props.value}
        </span>
    )
}
