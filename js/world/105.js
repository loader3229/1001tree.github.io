addLayer("105", {
    symbol: "T",
    resource: "层数",
    row: 1,
    position: 5,
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
        "main-display",
        "gridcompact"
    ],
    grid: {
        rows: 9,
        cols: 9,
        getStartData(id) {
            return "000"
        },
        getCanClick(data, id) {
            return true
        },
        onClick(data, id) {

        },
        getStyle(data, id) {
            let backgroundImage = `url(pic/105_${data}.png)`

            if(id == 505) backgroundImage = "url(pic/105_player.png)," + backgroundImage

            let style = {
                width: "80px",
                height: "80px",
                borderRadius: "unset",
                backgroundImage,
                backgroundSize: "cover",
            }

            return style
        },
    },
    layerShown() { return getGridData('main', this.layer) },
    hotkeys: [
    ],
});