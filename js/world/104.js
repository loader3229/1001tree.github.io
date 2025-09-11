addLayer("104", {
    symbol: "⚜️",
    resource: "点数",
    row: 1,
    position: 4,
    color: "#aaa",
    startData() {
        return {
            unlocked: true,
            points: _D0,
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    tabFormat: {
        Normal: {
            content: [
                ["display-text", function () {
                    return `你所合成的最高点数是 <h2 class = 'nmpt'>${formatWhole(player[this.layer].points)}</h2>`
                }],
                "blank",
                "blank",
                "grid",
                "blank",
                "clickables"
            ]
        }
    },
    numGen() {
        if (player._104.cnt == 16) return
        while (1) {
            let r1 = (Math.floor(Math.random() * 4) + 1) * 100
            let r2 = (Math.floor(Math.random() * 4) + 1)
            console.log(r1 + r2)
            if (player[this.layer].grid[r1 + r2].eq(0)) {
                player[this.layer].grid[r1 + r2] = _D2
                player._104.cnt++
                break
            }
        }
    },
    updateGrid(fx) {
        for (i in player[this.layer].grid) {
            let x = Math.floor(i / 100)
            let y = Math.floor(i % 100)
            if (fx == 1) x--
            if (x <= 0 || y <= 0 || x >= 5 || y >= 5) continue
            let z = x * 100 + y
            t = player[this.layer].grid[z]
            t1 = player[this.layer].grid[i]
            if (t == t1) {
                player[this.layer].grid[z] = t + t1
                player[this.layer].grid[i] = _D0
            } else if (t.neq(0)) {
                continue
            } else {
                player[this.layer].grid[z] = t1
                player[this.layer].grid[i] = _D0
            }
        }
    },
    clickables: {
        11: {
            title() { return `UP` },
            display: "向上",
            onClick() {
                layers[this.layer].updateGrid(1)
                layers[this.layer].numGen()
            },
            unlocked() { return true },
            canClick() { return true },
        },
    },
    grid: {
        rows: 4,
        cols: 4,
        getStartData(id) {
            return _D0
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) {
            return
        },
        getDisplay(data, id) {
            return data
        },
        getStyle(data, id) {
            if (data.eq(0)) return { "border": "2px solid", "borderRadius": "0%", "borderColor": "white", "backgroundColor": "black" }
            if (data.eq(2)) return { "border": "2px solid", "borderRadius": "2%", "borderColor": "#bababa75", "backgroundColor": "#bababa", "fontSize": "15px" }
            if (data.eq(4)) return { "border": "2px solid", "borderRadius": "2%", "borderColor": "#ffa3a375", "backgroundColor": "#ffa3a3", "fontSize": "15px" }
            if (data.eq(8)) return { "border": "2px solid", "borderRadius": "2%", "borderColor": "#ffaa7875", "backgroundColor": "#ffaa78", "fontSize": "15px" }
        },
    },
})