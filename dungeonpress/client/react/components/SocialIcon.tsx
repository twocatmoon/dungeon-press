import React, { HTMLAttributes } from 'react'

import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './SocialIcon.sass'

const icons = {
    github: faGithub
}

Object
    .entries(icons)
    .forEach(([ , icon ]) => library.add(icon))

export type SocialIconName = keyof typeof icons

function nameToIcon (name: SocialIconName) {
    const icon = icons[ name ] as IconDefinition
    if (icon) return icon
    
    throw new Error(`Unknown icon name: ${name}`)
}

export interface SocialIconProps extends HTMLAttributes<HTMLDivElement> {
    name?: SocialIconName
    icon?: IconDefinition
}

export default function SocialIcon (props: SocialIconProps) {
    const icon = !!props.name
        ? nameToIcon(props.name) 
        : props.icon!

    return (
        <span className='SocialIcon'>
            <FontAwesomeIcon icon={icon} />
        </span>
    )
}
