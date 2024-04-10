import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import dungeonPress from './dungeonpress/vite/plugins'

export default defineConfig({
    plugins: [
        react(),
        dungeonPress(),
    ],
    assetsInclude: [
        '**/*.md',
    ],
})
