import { defineElements } from '../../markdown/components/util/defineElements'
import AbilityScoresElement from '../../markdown/components/AbilityScores'
import DetailsBlockElement from '../../markdown/components/DetailsBlock'
import DiceRollElement from '../../markdown/components/DiceRoll'

import React from 'react'
import { hydrateRoot as hydrateReactClient } from 'react-dom/client'
import DungeonPress, { DungeonPressConfig } from '../react/components/DungeonPress'

declare global {
    interface Window {
        __ADVENTURE__: Adventure
        __CONFIG__: DungeonPressConfig
    }
}

export function hydrateRoot (el: Element | Document) {
    defineElements([
        AbilityScoresElement,
        DetailsBlockElement,
        DiceRollElement,
    ])
    
    hydrateReactClient(
        el, 
        <DungeonPress 
            adventure={window.__ADVENTURE__}
            config={window.__CONFIG__}
        />
    )
}
