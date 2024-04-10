export function getCountAndSize (roll: string) {
    return roll.split(/[d]/).map(Number)
}

export function getAverage (roll: string, modifier = 0) {
    const [ diceCount, diceSize ] = getCountAndSize(roll)
    const average = diceCount * ((diceSize + 1) / 2) + modifier
    
    return Math.floor(average)
}

export function modifyRoll (roll: string, modifier: number, amount: number): [ string, number ] {
    const [ 
        diceCount, 
        diceSize 
    ] = getCountAndSize(roll)

    return [ 
        `${diceCount}d${diceSize}`, 
        Math.max(0, modifier + amount)
    ]
}

export function scaleRoll (roll: string, modifier: number, scale: number): [ string, number ] {
    const [ 
        diceCount, 
        diceSize 
    ] = getCountAndSize(roll)

    const fn = (value: number) => {
        if (scale >= 1) return Math.ceil(value)
        else return Math.round(value)
    }

    if (diceCount === 0) {
        return [ 
            `${diceCount}d${diceSize}`, 
            fn(modifier * scale)
        ]
    }

    return [ 
        `${Math.max(1, fn(diceCount * scale))}d${diceSize}`, 
        fn(modifier * scale)
    ]
}
