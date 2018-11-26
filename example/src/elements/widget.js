export class WidgetElement extends HTMLElement {

    static get observedAttributes() {
        return ['description', 'title', 'widgetid'];
    }

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        let tmpl = document.querySelector('#af-widget-template');
        this.shadow.appendChild(tmpl.content.cloneNode(true));

        const delButton = this.shadow.querySelector("button");
        
        delButton.addEventListener("click", (el, ev) => {
            this.shadow.dispatchEvent(
                new CustomEvent("widget-delete", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        id: this.widgetid
                    }
                })
            )
        })
    }

    // Called anytime the attribute is changed
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "widgetid") { // widgetId does not work
            this[attrName] = newVal 
        }
        if (attrName === "title") {
            this.shadow.querySelector("h3").textContent = newVal
        }
        if (attrName === "description") {
            this.shadow.querySelector("p").textContent = newVal
        }
    }

}