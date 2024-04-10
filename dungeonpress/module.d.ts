declare module 'virtual:adventure' {
    const adventure: Adventure
    export default adventure
}

declare module 'virtual:icons' {
    const icons: {
        id: string
        size: number
        svg: string
    }[]
    export default icons
}

declare module 'virtual:config' {
    const config: DungeonPressConfig
    export default config
}
