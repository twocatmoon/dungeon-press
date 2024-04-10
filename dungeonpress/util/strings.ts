export function capitalize (str: string) {
    return str
        .replace(/_/g, ' ')
        .split(' ')
        .map(
            str => str
                .charAt(0)
                .toUpperCase() + str.slice(1)
        )
        .join(' ')
}
