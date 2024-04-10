import { MarkedExtension, Tokens } from 'marked'
import { markdown } from '../index'

function splitCells (tableRow: string, count?: number) {
    const row = tableRow.replace(/\|/g, (_match, offset, str) => {
        let escaped = false
        let curr = offset
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          return '|'
        } else {
          return ' |'
        }
    })
    
    const cells = row.split(/ \|/);
    let i = 0
  
    if (!cells[0].trim()) {
      cells.shift()
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
      cells.pop()
    }
  
    if (count) {
      if (cells.length > count) {
        cells.splice(count)
      } else {
        while (cells.length < count) cells.push('')
      }
    }
  
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(/\\\|/g, '|')
    }
    return cells
}

export const table: MarkedExtension = {
    renderer: {

    },
    tokenizer: {
        table (src: string): Tokens.Table | undefined {
            const cap = (this as any).rules.block.table.exec(src);
            if (cap) {
                if (!/[:|]/.test(cap[2])) {
                    return
                }

                let randomizedRows: false | string = false;
            
                const item: Tokens.Table = {
                    type: 'table',
                    raw: cap[0],
                    header: splitCells(cap[1]).map(c => {
                        const regexp = /^[dr]\d+(?:[\s\n]|$)/g
                        const match = regexp.exec(c)
                        
                        if (match !== null) {
                            randomizedRows = match[ 0 ]
                        }

                        return { text: c.replace(/^[dr]\d+(?:[\s\n]|$)/g, ''), tokens: [] };
                    }),
                    align: cap[2].replace(/^\||\| *$/g, '').split('|'),
                    rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : []
                };

                if (randomizedRows) {
                    const startsWith = (randomizedRows as string).slice(0, 1)
                    const value = parseInt((randomizedRows as string).slice(1))

                    const indicies = item.rows.map((_, i) => i)
                    let rows: Tokens.TableCell[][] = []
                    
                    if (value === item.rows.length) {
                        rows = item.rows
                    } else {
                        for (let i = 0; i < value; i++) {
                            const nextIndex = indicies.splice(Math.floor(markdown.nextRandom() * indicies.length), 1)[0]
                            rows.push(item.rows[ nextIndex ])
                        }
                    }

                    if (startsWith === 'd') {
                        rows = rows.map((row, i) => {
                            return (`| ${i+1} ` + row) as unknown as Tokens.TableCell[]
                        })

                        item.header.unshift({ text: randomizedRows, tokens: [] })
                        item.align.unshift(':-------:' as any)
                    }

                    item.rows = rows
                }
        
                if (item.header.length === item.align.length) {
                    let l = item.align.length;
                    let i, j, k, row;
                    for (i = 0; i < l; i++) {
                        const align = item.align[i];
                        if (align) {
                            if (/^ *-+: *$/.test(align)) {
                                item.align[i] = 'right';
                            } else if (/^ *:-+: *$/.test(align)) {
                                item.align[i] = 'center';
                            } else if (/^ *:-+ *$/.test(align)) {
                                item.align[i] = 'left';
                            } else {
                                item.align[i] = null;
                            }
                        }
                    }
            
                    l = item.rows.length;
                    for (i = 0; i < l; i++) {
                        item.rows[i] = splitCells(item.rows[i] as unknown as string, item.header.length).map(c => {
                            return { text: c, tokens: [] };
                        });
                    }
            
                    l = item.header.length;
                    for (j = 0; j < l; j++) {
                        item.header[j].tokens = (this as any).lexer.inline(item.header[j].text);
                    }
            
                    l = item.rows.length;
                    for (j = 0; j < l; j++) {
                        row = item.rows[j];
                        for (k = 0; k < row.length; k++) {
                            row[k].tokens = (this as any).lexer.inline(row[k].text);
                        }
                    }
            
                    return item
                }
            }
        }
    }
}
