export function markHighlights(el: HTMLElement, notes: AdventureNote[]): void {
    const markText = (node: ChildNode, note: AdventureNote) => {
        const textContent = (node.textContent || '')
            .replace(/\n/g, ' ')
            .replace(/\s{,2}/g, ' ')
            .trim()

        const selection = note.selection
            .replace(/\n/g, ' ')
            .replace(/\s{,2}/g, ' ')
            .trim()

        const matchIndex = textContent.indexOf(selection)
    
        if (matchIndex === -1) return
    
        // Split the text node into three parts: before, match, and after
        const beforeText = textContent.slice(0, matchIndex)
        const afterText = textContent.slice(matchIndex + selection.length)
        const markedText = document.createTextNode(selection)
    
        // Create the <mark> element and append the matched text node to it
        const markElement = document.createElement('mark')
        markElement.appendChild(markedText)
        markElement.setAttribute('data-note-id', note.id)
    
        // Create text nodes for the before and after text
        const beforeTextNode = document.createTextNode(beforeText)
        const afterTextNode = document.createTextNode(afterText)
    
        // Replace the original text node with before, mark, and after nodes
        const parent = node.parentNode!
        parent.insertBefore(beforeTextNode, node)
        parent.insertBefore(markElement, node)
        parent.insertBefore(afterTextNode, node)
    
        // Remove the original text node
        parent.removeChild(node)
    }

    const traverseNodes = (node: ChildNode) => {
        if (node.nodeType === Node.TEXT_NODE) {
            notes.forEach((note) => {
                if (note.type !== 'highlight') return

                const textContent = (node.textContent || '')
                    .replace(/\n/g, ' ')
                    .replace(/\s{,2}/g, ' ')
                    .trim()

                const selection = note.selection
                    .replace(/\n/g, ' ')
                    .replace(/\s{,2}/g, ' ')
                    .trim()

                if (textContent.includes(selection)) {
                    markText(node, note)
                }
            })
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array
                .from(node.childNodes)
                .forEach(traverseNodes)
        }
    }
  
    Array
        .from(el.childNodes)
        .forEach(traverseNodes)
}
