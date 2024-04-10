import { HmrContext } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'

export default function adventure () {
    const virtualModuleId = 'virtual:config'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
  
    return {
        name: 'config',

        resolveId (id: string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        
        async load (id: string) {
            if (id === resolvedVirtualModuleId) {
                const filePath = path.join(__dirname, '../../../../dungeonpress.config.js')
                const config = await fs.readFile(filePath, 'utf8')

                return {
                    code: `
                        const config = ${config.replace(/^[\s]*export default[\s]*/, '')};
                        export default config;
                    `
                }
            }
        },

        async handleHotUpdate ({ server, file }: HmrContext) {
            if (file.endsWith('config.js')) {
                const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId)!
                server.reloadModule(virtualModule)
            }
        }
    }
}
