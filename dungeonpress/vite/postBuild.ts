import { createServer as createViteServer } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

async function build (templateDir: string) {
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    let html
    try {
        const { buildPage } = await vite.ssrLoadModule('/dungeonpress/vite/ssr.ts')
        html = await buildPage(templateDir)
    } catch (err: any) {
        vite.ssrFixStacktrace(err)
    }

    const dirname = path.dirname(fileURLToPath(import.meta.url))
    await fs.writeFile(path.resolve(dirname, templateDir + '/index.html'), html)
    
    vite.close()
}

build('../../dist')
