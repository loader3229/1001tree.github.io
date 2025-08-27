addLayer("main", {
    name: "时之狭间",
    symbol: "🌏️",
    resource: "梦力",
    row: 0,
    position: 0,
    color: "#9b43f4",
    update(diff) {
    },
    startData() {
        return {
            unlocked: true,
            points: _D1
        }
    },
    type: "none",
    tabFormat: {
        "Dream": {
            content: [
                "main-display",
                "blank",
                "grid"
            ]
        }
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return false
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            return player[this.layer].points.gte(1) && !data && getGameName(id)[0] != "未完成游戏"
        },
        onClick(data, id) {
            player[this.layer].points = player[this.layer].points.sub(1)
            setGridData(this.layer, id, true)
        },
        getDisplay(data, id) {
            return `<h2>${getGameName(id)[0]}</h2><br>${getGameName(id)[1]}<br>${data?"已解锁":"未解锁"}`
        },
        getStyle(data, id) {
            return {
                width: "110px",
                height: "110px"
            }
        }
    },
    milestones: {
    },
    layerShown() { return true },
    hotkeys: [
    ],
    branches: []
});