// Web Component Types

declare type CustomEvents<K extends string> = { 
    [key in K] : (event: CustomEvent) => void 
}

declare type CustomElement<T, K extends string> = 
    Partial<T & DOMAttributes<T> & 
    { children: any } & 
    { name: string } & CustomEvents<`on${K}`>>


// Adventure Types

declare interface Adventure {
    attributes: AdventureAttributes
    content: string
    raw: string
    toc: TableOfContentsItem[]
}

declare interface AdventureAttributes {
    title: string
    titleShort: string
    tagline: string
    summary: string
    version: string
    author: string
    authorLink: string
    tags: string[]
    created: Date
    modified: Date
    seed: string
    credits: {
        name: string
        role: string
        link: string
    }[]
}

declare interface TableOfContentsItem {
    href: string
    text: string
    level: number
}

declare interface AdventureNote {
    id: string
    type: 'highlight' | 'note'
    content: string
    created: string
    modified: string
    selection: string
}
