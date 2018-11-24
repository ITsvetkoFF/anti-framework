export class AppElement extends HTMLElement {
    constructor() {
        super()

        this.template = document.createElement("template")
        this.template.innerHTML = "<slot />"

        var shadow = this.attachShadow({mode: 'open'})

        var header = document.createElement('h1')
        header.setAttribute('class','af-app-title')

        // Take attribute content and put it inside header
        var text = this.getAttribute('title')
        header.textContent = text

        var style = document.createElement('style')

        style.textContent = `
        .af-app-title {
            color: yellow;
        }
        `

        shadow.appendChild(style)
        shadow.appendChild(header)        
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    }
    
}