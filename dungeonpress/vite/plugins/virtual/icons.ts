import { HmrContext } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'

function cleanSvg (svg: string) {
    return svg
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>/, '')
        .replace(/fill="[^"]*"/g, '')
}

export default function adventure () {
    const virtualModuleId = 'virtual:icons'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
  
    return {
        name: 'icons',

        resolveId (id: string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        
        async load (id: string) {
            if (id === resolvedVirtualModuleId) {
                const fileNames = await fs.readdir(
                    path.join(__dirname, '../../../../public/icons')
                )

                const iconNames = fileNames.map(
                    (fileName: string) => fileName.replace('.svg', '')
                )

                const iconSvgs = await Promise.all(
                    fileNames.map(
                        (fileName: string) => fs.readFile(
                            path.join(__dirname, '../../../../public/icons', fileName), 
                            'utf8'
                        )
                    )
                )

                const icons = iconNames.map((iconName: string, index: number) => {
                    const iconSvg = iconSvgs[index]
                    const iconSize = parseInt(iconName.split('_')[ 1 ].replace('x', ''))

                    return JSON.stringify({
                        id: iconName,
                        svg: cleanSvg(iconSvg),
                        size: iconSize,
                    })
                }).join(',\n')

                return {
                    code: `
                        export default [
                            ${icons}
                        ];
                    `
                }
            }
        },

        async handleHotUpdate ({ server, file }: HmrContext) {
            if (file.endsWith('.svg')) {
                const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId)!
                server.reloadModule(virtualModule)
            }
        }
    }
}
