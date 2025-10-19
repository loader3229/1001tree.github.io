addLayer("402", {
    symbol: "🌼",
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
        探索: {
            content: [
            ]
        },
        背包: {
            content: [
            ]
        },
        合成: {
            content: [
            ]
        },
        天赋: {
            content: [
            ]
        },
        成就: {
            content: [
            ]
        },
        图鉴: {
            content: [
            ]
        },
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
        cols: 10,
        getStartData(id) {
            return 0
        },
    }
})