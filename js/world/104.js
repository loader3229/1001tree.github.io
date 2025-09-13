addLayer("104", {
    symbol: "⚜️",
    resource: "点数",
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
    hotkeys: [
        {key: "w", description: "", onPress(){layers[this.layer].doMovement(1)}},
        {key: "a", description: "", onPress(){layers[this.layer].doMovement(3)}},
        {key: "s", description: "", onPress(){layers[this.layer].doMovement(2)}},
        {key: "d", description: "", onPress(){layers[this.layer].doMovement(4)}},
    ],
    doMovement(fx){
        if(player._104.losetrig) return
        player._104.canmove = false
        layers[this.layer].updateGrid(fx)
        layers[this.layer].mergeGrid(fx)
        layers[this.layer].updateGrid(fx)
        layers[this.layer].numGen()
        player._104.lastmove = fx
    },
    canMerge(fx){
        for(i in player[this.layer].grid){
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
            if(t!==undefined&&t.eq(t1)&&t.neq(0)){
                return true
            }
        }
        return false
    },
    numGen() {
        if (player._104.cnt == 16 && (!layers[this.layer].canMerge(1)) && (!layers[this.layer].canMerge(2)) && (!layers[this.layer].canMerge(3)) && (!layers[this.layer].canMerge(4))){
            player._104.losetrig = true
            return
        }else if(player._104.cnt == 16){
            return
        }else if(!player._104.canmove){
            return
        }
        while (1) {
            let r1 = (Math.floor(Math.random() * 4) + 1) * 100
            let r2 = (Math.floor(Math.random() * 4) + 1)
            let r3 = (Math.floor(Math.random() * 100) + 1)
            if (player[this.layer].grid[r1 + r2].eq(0)) {
                if(r3>10) player[this.layer].grid[r1 + r2] = _D2
                else player[this.layer].grid[r1 + r2] = _D4
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
                if (t.eq(0)&&t1.eq(0)){
                    continue
                }
                if (t.neq(0)) {
                    continue
                } else {
                    player._104.canmove = true
                    player[this.layer].grid[z] = t1
                    player[this.layer].grid[i] = _D0
                }
            }
    },
    mergeGrid(fx){
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
        for(k = 0; k<a.length; k++){
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
                if (t.eq(t1)&&(t.neq(0))) {
                    player._104.canmove = true
                    player[this.layer].grid[z] = t.add(t1)
                    player[this.layer].grid[i] = _D0
                    if(t.neq(0)) player._104.cnt--                
                    player[this.layer].points = player[this.layer].points.max(player[this.layer].grid[z])
                }
        }
    },
    clickables: {
        11: {
            title() { return `UP` },
            display: "向上",
            onClick() {
                layers[this.layer].doMovement(1)
            },
            unlocked() { return true },
            canClick() { return true },
        },
        12: {
            title() { return `DOWN` },
            display: "向下",
            onClick() {
                layers[this.layer].doMovement(2)
            },
            unlocked() { return true },
            canClick() { return true },
        },
        13: {
            title() { return `LEFT` },
            display: "向左",
            onClick() {
                layers[this.layer].doMovement(3)
            },
            unlocked() { return true },
            canClick() { return true },
        },
        14: {
            title() { return `RIGHT` },
            display: "向右",
            onClick() {
                layers[this.layer].doMovement(4)
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
                player._104.canmove = true
                player._104.cnt = 0
                layers[this.layer].numGen()
                layers[this.layer].numGen()
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
            if (data.eq(128)) return { "border": "2px solid", "borderRadius": "2%", "border-image": "linear-gradient(#8f41e9, #578aef)", "background":"linear-gradient( #e66465, #9198e5)", "fontSize": "15px" }
            if (data.eq(256)) return { "border": "2px solid", "borderRadius": "2%", "border-image": "linear-gradient(#0092db75, #13bd0075)", "background":"linear-gradient( #0092db, #13bd00)", "fontSize": "15px" }
            if (data.eq(512)) return { "border": "2px solid", "borderRadius": "2%", "border-image": "linear-gradient(#00249075, #4f009075)", "background":"linear-gradient( #002490ff, #4f0090ff )", "fontSize": "15px", "color":"white" }
            if (data.eq(1024)) return { "border": "2px solid", "borderRadius": "2%", "border-image": "linear-gradient(45deg, #ffa60075, #00a2ff75, #00da3675, #e400f075)", "background":"linear-gradient(45deg, #ffa600ff, #00a2ffff, #00da36ff, #e400f0ff )", "fontSize": "15px" }
            if (data.gte(2048)) return {"border": "2px solid", "borderRadius": "2%", "border-image": "linear-gradient(45deg, #ffa60075, #00a2ff75, #00da3675, #e400f075)", 	"background":`linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 80.71%),linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 80.71%),linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 80.71%)` , "fontSize": "15px" ,"color":"white"}
        },
    },
})
