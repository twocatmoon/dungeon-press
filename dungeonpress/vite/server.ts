import express from 'express'
import { createServer as createViteServer } from 'vite'
import { bold, lightGreen, white, cyan, lightCyan } from 'kolorist'

async function createServer (templateDir: string) {
    const app = express()

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        let html
        try {
            const { buildPage } = await vite.ssrLoadModule('/dungeonpress/vite/ssr.ts')
            html = await buildPage(templateDir, vite, req.originalUrl)
        } catch (err: any) {
            vite.ssrFixStacktrace(err)
            return next(err)
        }

        res
            .status(200)
            .set({ 'content-type': 'text/html' })
            .end(html)
    })

    app.listen(5173)

    console.log(bold(lightGreen(`  |~\\    _  _  _  _  _   |~) _ _  _ _
  |_/|_|| |(_|(/_(_)| |  |~ | (/__\\_\\
              _|
    `)))
    
    console.log(`  ${lightGreen('➜')}  ${white('Local:')}   ${cyan('http://localhost:')}${lightCyan('5173')}${cyan('/')}`)
}

createServer('../..')
