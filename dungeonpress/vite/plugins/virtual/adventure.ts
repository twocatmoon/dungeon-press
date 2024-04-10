import { HmrContext } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'

import { parseAdventure } from '../../../markdown/parser'

export default function adventure () {
    const virtualModuleId = 'virtual:adventure'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
  
    return {
        name: 'adventure',

        resolveId (id: string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        
        async load (id: string) {
            if (id === resolvedVirtualModuleId) {
                const filePath = path.join(__dirname, '../../../../adventure.md')
                const adventure = await fs.readFile(filePath, 'utf8')

                const { attributes, html, toc } = parseAdventure(adventure)

                return {
                    code: `
                        const attributes = ${JSON.stringify(attributes)};
                        const content = \`${html}\`;
                        const raw = \`${adventure}\`;
                        const toc = ${JSON.stringify(toc)};

                        export default { attributes, content, raw, toc };
                    `
                }
            }
        },

        async handleHotUpdate ({ server, file }: HmrContext) {
            if (
                file.endsWith('.md') || 
                file.endsWith('.css') || 
                file.endsWith('.js') ||
                file.endsWith('.html') ||
                file.endsWith('.png') ||
                file.endsWith('.jpg') ||
                file.endsWith('.jpeg') ||
                file.endsWith('.svg') ||
                file.endsWith('.webp')
            ) {
                const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId)!
                server.reloadModule(virtualModule)
            }
        }
    }
}
