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
                    return `你所获得的最高点数是 <h2 class = 'nmpt'>${formatWhole(player[this.layer].points)}</h2>`
                }],
                ["display-text", function () {
                    return (player._104.losetrig) ? `你输了, 请重新开始一盘游戏!` : ``
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
        if (player._104.cnt == 16){
            player._104.losetrig = true
            return
        }
        while (1) {
            let r1 = (Math.floor(Math.random() * 4) + 1) * 100
            let r2 = (Math.floor(Math.random() * 4) + 1)
            if (player[this.layer].grid[r1 + r2].eq(0)) {
                player[this.layer].grid[r1 + r2] = _D2
                player._104.cnt++
                player[this.layer].points = player[this.layer].points.max(2)
                break
            }
        }
    },
    updateGrid(fx) {
        if(player._104.losetrig) return
        let a = []
        if(fx == 1){
            a = [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304, 401, 402, 403, 404]
        }
        if(fx == 2){
            a = [401, 402, 403, 404, 301, 302, 303, 304, 201, 202, 203, 204, 101, 102, 103, 104]
        }
        if(fx == 3){
            a = [101, 201, 301, 401, 102, 202, 302, 402, 103, 203, 303, 403, 104, 204, 304, 404]
        }
        if(fx == 4){
            a = [104, 204, 304, 404, 103, 203, 303, 403, 102, 202, 302, 402, 101, 201, 301, 401]
        }
        for(j = 0; j < 3; j++)
            for (k = 0; k<a.length; k++) {
                let i = a[k]
                let x = Math.floor(i / 100)
                let y = Math.floor(i % 100)
                if (fx == 1) x--
                if (fx == 2) x++
                if (fx == 3) y--
                if (fx == 4) y++
                if (x <= 0 || y <= 0 || x >= 5 || y >= 5) continue
                let z = x * 100 + y
                t = player[this.layer].grid[z]
                t1 = player[this.layer].grid[i]
                if (t.eq(t1)) {
                    player[this.layer].grid[z] = t.add(t1)
                    player[this.layer].grid[i] = _D0
                    if(t.neq(0)) player._104.cnt--                
                    player[this.layer].points = player[this.layer].points.max(player[this.layer].grid[z])
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
        12: {
            title() { return `DOWN` },
            display: "向下",
            onClick() {
                layers[this.layer].updateGrid(2)
                layers[this.layer].numGen()
            },
            unlocked() { return true },
            canClick() { return true },
        },
        13: {
            title() { return `LEFT` },
            display: "向左",
            onClick() {
                layers[this.layer].updateGrid(3)
                layers[this.layer].numGen()
            },
            unlocked() { return true },
            canClick() { return true },
        },
        14: {
            title() { return `RIGHT` },
            display: "向右",
            onClick() {
                layers[this.layer].updateGrid(4)
                layers[this.layer].numGen()
            },
            unlocked() { return true },
            canClick() { return true },
        },
        21: {
            title() { return `RESTART` },
            display: "开始一盘新游戏",
            onClick() {
                for(i in player[this.layer].grid){
                    player[this.layer].grid[i] = _D0
                }
                player._104.losetrig = false
                player._104.cnt = 0
            },
            unlocked() { return player._104.losetrig },
            canClick() { return player._104.losetrig },
            style: {"margin-top":"15px"}
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
            if (data.eq(16)) return { "border": "2px solid", "borderRadius": "2%", "borderColor": "#00bbff75", "backgroundColor": "#00bbff", "fontSize": "15px" }
            if (data.eq(32)) return { "border": "2px solid", "borderRadius": "2%", "borderColor": "#2acf7a75", "backgroundColor": "#2acf7a", "fontSize": "15px" }
            if (data.eq(64)) return { "border": "2px solid", "borderRadius": "2%", "borderColor": "#cacf2a75", "backgroundColor": "#cacf2a", "fontSize": "15px" }
        },
    },
})