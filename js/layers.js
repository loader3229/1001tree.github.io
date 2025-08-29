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
            points: _D2
        }
    },
    type: "none",
    tabFormat: {
        "Dream": {
            content: [
                "main-display",
                "blank",
                ["display-text","此条为宽度检测条,如果你无法看到这个条的两端<br>请在设置中将页面布局改为单页面(或减小浏览器缩放比例)以获得最佳显示"],
                ["bar",1],
                "blank",
                "grid"
            ]
        }
    },
    bars: {
        1: {
            direction: RIGHT,
            width: 725,
            height: 30,
            display() {
                return '<span style="color:#88888888">游戏完成进度</span>'
            },
            progress() {
                return player.points.div(25)
            }
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
            return `<h2>${getGameName(id)[0]}</h2><br>${getGameName(id)[1]}<br>${data ? "已解锁" : "未解锁"}`
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
});

/*
addLayer("", {
    name: getGameName(this.layer),
    symbol: "",
    resource: "",
    row: 1,
    position: 1,
    color: "#a0a0a0",
    update(diff) {
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
    layerShown() { return getGridData('main', this.layer) },
    hotkeys: [
    ],
});
*/