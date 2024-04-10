export function stringToSeed (string: string) {
    let hash = 0

    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }

    return hash
}
