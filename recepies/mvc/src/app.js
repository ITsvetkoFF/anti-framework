export class AppElement extends HTMLElement {
    constructor() {
        super()

        this.template = document.createElement("template")
        this.template.innerHTML = "<slot />"

        this.shadow = this.attachShadow({ mode: 'open' })

        var header = document.createElement('h1')
        header.setAttribute('class', 'af-app-title')

        // Take attribute content and put it inside header
        var text = this.getAttribute('title')
        header.textContent = text

        var style = document.createElement('style')

        style.textContent = `
        .af-app-title {
            color: yellow;
        }
        `

        this.shadow.appendChild(style)
        this.shadow.appendChild(header)
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true))

        this.shadow.addEventListener("widget-delete", (event) => {
            if (event.detail.all) {
                this.dashboardElement.widgets = [];
            } else {
                this.dashboardElement.widgets = this.dashboardElement.widgets.filter((w) => w.id !== event.detail.id)
            }
        })

        this.dashboardElement = document.querySelector("af-dashboard")

        // At this exact moment dashboardElement is not created
        this.dashboardElement.init = () => {
            this.dashboardElement.widgets = []
            for (let i = 0; i<1000; i++) {
                setTimeout(() => {
                    this.dashboardElement.widgets = [...this.dashboardElement.widgets, {
                        id: `${i}`,
                        title: `Widget #${i}`,
                        description: "Loremipsum-like text"
                    }]
                }, i)
            }
        }
    }
}