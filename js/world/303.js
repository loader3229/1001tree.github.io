addLayer("303", {
    symbol: "",
    resource: "",
    color: "#aaa",
    update(diff) {
        if (!getGridData('main', this.layer)||player.pause[this.layer]) return
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
    ],
    upgrades: {
    },
    milestones: {
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});