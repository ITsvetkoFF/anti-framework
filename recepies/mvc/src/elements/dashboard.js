export class DashboardElement extends HTMLElement {

    static get observedAttributes() {
        return ['widgets'];
    }
    // Called anytime the 'widgets' attribute is changed
    attributeChangedCallback(attrName, oldVal, newVal) {
        this[attrName] = newVal;
    }

    get widgets() {
        return this._widgets
    }

    set widgets(widgets) {
        this._widgets = widgets
        const widgetList = this.shadow.querySelectorAll('af-widget')

        // Kinda smart redraw.

        // Create a map of memoizeed dom nodes
        const currentWidgetMap = new Map();
        this.widgets.forEach(widgetModel => {
            const memoized = this.widgetMap.get(widgetModel)
            if (memoized) {
                currentWidgetMap.set(widgetModel, memoized)
            }
        })
        
        // remove All nodes that are not memoized
        const saveThem = Array.from(currentWidgetMap.values())
        widgetList.forEach((node, index) => {
            if (!saveThem.includes(node)) {
                node.remove()
            }
        })
        // after that weak map for remomved dom nodes will be cleared by GC at some point

        this.widgets.forEach(widgetModel => {
            const memoized = currentWidgetMap.get(widgetModel)
            if (memoized) {
                return
            }
            const widgetElement = document.createElement('af-widget')
            this.shadow.appendChild(widgetElement)

            widgetElement.setAttribute("title", widgetModel.title)
            widgetElement.setAttribute("description", widgetModel.description)
            widgetElement.setAttribute("widgetid", widgetModel.id)
            this.widgetMap.set(widgetModel, widgetElement)
        });
    }

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        let btnRemoveAll = document.createElement("button")
        btnRemoveAll.textContent = "sudo rm -rf"
        
        btnRemoveAll.addEventListener("click", (el, ev) => {
            this.shadow.dispatchEvent(
                new CustomEvent("widget-delete", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        all: true
                    }
                })
            )
        })
        this.shadow.appendChild(btnRemoveAll)
        this.widgetMap = new WeakMap()
        this.init()
    }

}