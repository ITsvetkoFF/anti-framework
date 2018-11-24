(async () => {
    let module = await import("./app.js")
    customElements.define('af-app', module.AppElement)
    let dashboardModule = await import("./elements/dashboard.js")
    customElements.define('af-dashboard', dashboardModule.DashboardElement)
})();