export class DashboardElement extends HTMLElement {

    constructor() {
        super()

        this.widgets = [
            {
                title: "w1",
                description: "description1 description1 description1 description1"
            },
            {
                title: "w2",
                description: "description1 description1 description1 description2"
            }
        ]

        var shadow = this.attachShadow({mode: 'open'})

        this.widgets.forEach(widgetModel => {
            const widgetElement = document.createElement('div')
            const wt = document.createElement("h3")
            wt.textContent = widgetModel.title
            widgetElement.appendChild(wt);
            const wd = document.createElement("p")
            wd.textContent = widgetModel.description
            widgetElement.appendChild(wd);
            shadow.appendChild(widgetElement);
        });
    }
    
}