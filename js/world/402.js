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
    tabFormat: {
        抽卡: {
            content: [

            ]
        },
        图鉴: {
            content: [
                ["display-text","<span class=''>垃圾</span>"]
                ["layer-proxy", [4021, ["grid"]]],
                // ["layer-proxy", [4022, ["grid"]]],
                // ["layer-proxy", [4023, ["grid"]]],
                // ["layer-proxy", [4024, ["grid"]]],
                // ["layer-proxy", [4025, ["grid"]]],
                // ["layer-proxy", [4026, ["grid"]]],
                // ["layer-proxy", [4027, ["grid"]]],
            ]
        },
    },
    upgrades: {
    },
    milestones: {
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});

addLayer("4021", {
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    grid: {
        rows(){
            return 1
        },
        cols: 5,
        getStartData(id) {
            return 0
        },
    }
})