addLayer("402", {
    symbol: "🗳️",
    resource: "",
    color: "hsl(200,100%,50%)",
    update(diff) {
        if (player.pause[this.layer]) return
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