import adventure from 'virtual:adventure'
import config from 'virtual:config'
import icons from 'virtual:icons'

import { promises as fs } from 'fs'
import path from 'path'
import React from 'react'
import { fileURLToPath } from 'url'
import { ViteDevServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'

import DungeonPress from '../client/react/components/DungeonPress'

function iconsHtml () {
    const symbols = icons.map((icon) => {
            return (
                `<symbol id="${icon.id}" viewBox="0 0 ${icon.size} ${icon.size}" width="${icon.size}" height="${icon.size}">
                    ${icon.svg}
                </symbol>`
            )
        })

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">
            <defs>
                ${symbols.join('\n')}
            </defs>
        </svg>`
    )
}

async function render (template: string): Promise<string> {
    const props = { adventure, config }
    const componentInstance = React.createElement(DungeonPress, props, null)

    let bodyHtml = ''
    bodyHtml += iconsHtml() + '\n'
    bodyHtml += `<script>window.__ADVENTURE__ = ${JSON.stringify(adventure)}</script>\n`
    bodyHtml += `<script>window.__CONFIG__ = ${JSON.stringify(config)}</script>\n`

    let ssrOutput
    try {
        ssrOutput = renderToStaticMarkup(componentInstance)
    } catch (err: any) {
        throw err
    }

    let html = template
        .replace('{{body}}', bodyHtml)
        .replace('{{ssrOutput}}', ssrOutput)
        .replace(/\{\{template\.baseUrl\}\}/g, config.build.baseUrl)
        .replace(/\{\{template\.heroImgSrc\}\}/g, config.template.heroImgSrc)
        .replace(/\{\{template\.summary\}\}/g, JSON.stringify(adventure.attributes.summary).slice(1, -1))
        .replace(/\{\{template\.toc\}\}/g, adventure.toc.filter(item => item.level === 1).map(item => `"${item.text}"`).join(','))

    for (const [ key, value ] of Object.entries(adventure.attributes)) {
        html = html.replace(new RegExp(`\{\{attributes\.${key}\}\}`, 'g'), value)
    }

    return html
}

export async function buildPage (templateDir: string, server?: ViteDevServer, url?: string) {
    const dirname = path.dirname(fileURLToPath(import.meta.url))

    let template
    try {
        template = await fs.readFile(
            path.resolve(dirname, templateDir + '/index.html'), 
            'utf-8'
        )
        if (server) template = await server.transformIndexHtml(url!, template)
    } catch (err: any) {
        throw err
    }
    
    let html
    try {
        html = await render(template)
    } catch (err: any) {
        throw err
    }

    return html
}
