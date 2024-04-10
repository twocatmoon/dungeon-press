import React, { SVGProps } from 'react'

import './Icon.sass'

export interface IconProps extends SVGProps<SVGSVGElement> {
    name: string
}

export default function Icon (props: IconProps) {
    const size = props.name.split('_')[ 1 ]
    const className = `Icon Icon--${size}`

    return (
        <svg {...props} className={className}>
            <use xlinkHref={`#${props.name}`} />
        </svg>
    )
}
