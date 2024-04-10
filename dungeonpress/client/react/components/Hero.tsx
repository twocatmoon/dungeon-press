import React, { HTMLAttributes } from 'react'

import { AdventureContentWrapper } from './AdventureContent'

import './Hero.sass'

export interface HeroProps extends HTMLAttributes<HTMLDivElement> {
    attributes: AdventureAttributes
    heroImgSrc?: string
}

export default function Hero (props: HeroProps) {
    const credits = props.attributes.credits.reduce((acc, credit) => {
        if (!acc[credit.role]) acc[credit.role] = []
        acc[credit.role].push(credit)
        return acc
    }, {} as { [ key: string ]: AdventureAttributes[ 'credits' ] })

    return (
        <div className='Hero'>
            {
                props.heroImgSrc
                    ? (
                        <div className='Hero__Image'>
                            <img
                                src={props.heroImgSrc}
                                alt={props.attributes.titleShort}
                            />
                        </div>
                    )
                    : <></>
            }
            <AdventureContentWrapper>
                <h1>{props.attributes.title}</h1>
                {
                    props.attributes.tagline
                        ? <h6>{props.attributes.tagline}</h6>
                        : <></>
                }
                <div dangerouslySetInnerHTML={{ __html: props.attributes.summary }} />
                {
                    Object.keys(credits).length ? (
                        <>
                            <h4>Credits</h4>
                            <dl className='Hero__Credits'>
                                {
                                    Object.entries(credits).map(([ role, credits ], i) => (
                                        <React.Fragment key={i}>
                                            <dt>{role}</dt>
                                            <dd>
                                                {
                                                    credits.map((person, k) => (
                                                        <React.Fragment key={k}>
                                                            {
                                                                person.link
                                                                    ? <a href={person.link} target='_blank' rel='noopener noreferrer'>{person.name}</a>
                                                                    : <span>{person.name}</span>
                                                            }
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </dd>
                                        </React.Fragment>
                                    ))
                                }
                            </dl>
                        </>
                    ) : <></>
                }
            </AdventureContentWrapper>
        </div>
    )
}
