import React, { HTMLAttributes } from 'react'

import './TableOfContents.sass'

export interface TableOfContentsProps extends HTMLAttributes<HTMLDivElement> {
    toc: TableOfContentsItem[]
    hideHeader?: boolean
    onLinkClick?: (item: TableOfContentsItem) => void
}

export default function TableOfContents (props: TableOfContentsProps) {
    return (
        <nav className='TableOfContents'>
            {
                !props.hideHeader ? <h6>Table of Contents</h6> : <></>
            }
            <div>
                <ol>
                    {props.toc.map((item, index) => (
                        <li key={index} data-level={item.level}>
                            <a href={`#${item.href}`} onClick={() => props.onLinkClick && props.onLinkClick(item)}>{item.text}</a>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}
