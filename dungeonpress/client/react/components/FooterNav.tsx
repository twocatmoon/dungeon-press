import React, { HTMLAttributes } from 'react'

import './FooterNav.sass'
import SocialIcon from './SocialIcon'
import { DungeonPressConfig } from './DungeonPress'

export interface FooterNavProps extends HTMLAttributes<HTMLDivElement> {
    titleShort: string
    author: string
    authorLink: string
    version: string
    footerLinks: DungeonPressConfig[ 'template' ][ 'footerLinks' ]
    socialLinks: DungeonPressConfig[ 'template' ][ 'socialLinks' ]
}

export default function FooterNav (props: FooterNavProps) {
    return (
        <div className='FooterNav'>
            <hr />
            <div>
                <p>
                    <strong>{props.titleShort}</strong>
                    <br />
                    &copy;&nbsp;<span>{new Date().getFullYear()}</span>&nbsp;
                    <a href={props.authorLink} rel='noreferrer' target='_blank'>
                        <strong>{props.author}</strong>
                    </a>
                </p>
                {
                    (props.footerLinks.length || props.socialLinks.length) ? (
                        <ul>
                        {
                            props.footerLinks.length ? (
                                <li key='links'>
                                    <h6>Links</h6>
                                    <nav>
                                    {
                                        props.footerLinks.map((link, index) => (
                                            <p key={'links_' + index}>
                                                <a 
                                                    href={link.link} 
                                                    rel='noopener noreferrer' 
                                                    target='_blank'
                                                >
                                                    {link.text}
                                                </a>
                                            </p>
                                        ))
                                    }
                                    </nav>
                                </li>
                            ) : <></>
                        }
                        {
                            props.socialLinks.length ? (
                                <li key='socials'>
                                    <h6>Socials</h6>
                                    {
                                        props.socialLinks.map((link, index) => (
                                            <a 
                                                key={'socials_' + index} 
                                                href={link.link} 
                                                rel='noopener noreferrer' 
                                                target='_blank'
                                            >
                                                <SocialIcon name={link.icon} />
                                            </a>
                                        ))
                                    }
                                </li>
                            ) : <></>
                        }
                    </ul>
                    ) : <></>
                }
                <p>
                    <small>v.&nbsp;<span>{props.version}</span></small>
                </p>
                <br />
                <br />
                <p>
                    Powered by <a 
                        href='https://www.dungeonpress.com' 
                        rel='noopener noreferrer' 
                        target='_blank'
                    ><strong>Dungeon Press</strong></a>
                </p>
            </div>
        </div>
    )
}
