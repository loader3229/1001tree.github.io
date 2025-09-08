addLayer("201", {
    symbol: "+",
    resource: "点数",
    row: 2,
    position: 1,
    color: "#a0a0a0",
    update(diff) { 
        if(hasUpgrade("201",11)){
            player._201.gen = player._201.gen.times(layers[this.layer].calcmul().pow(diff))
            player[this.layer].points = player[this.layer].points.add(player._201.gen.times(diff))
            player[this.layer].points = player[this.layer].points.add(layers[this.layer].calcP1().pow(diff))
        }
        player._201.point1 = player[this.layer].points.add(1).log10().sqrt()
    },
    calcmul(){ 
        mult = _D1
        if(hasUpgrade("201",12)) mult = _D(1.03)
        if(hasUpgrade("201",13)) mult = mult.add(upgradeEffect("201",13))
        if(hasUpgrade("201",14)) mult = mult.add(upgradeEffect("201",14))
        if(hasUpgrade("201",15)) mult = mult.pow(1.25)
        return mult
    },
    calcP1(){
        p = _D1
        p = player._201.point1.add(1).ln().div(100).add(1)
        return p
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
        ["display-text", function () {
            return `你有 <h2 class='nmpt'> ${format(player[this.layer].points)} </h2> 点数 (+${format(player._201.gen)}/s),到达1F308完成世界`
        }],
        ["display-text", function () {
            return hasUpgrade("201",15)? `你有 <h2 class='nmpt'> ${format(player._201.point1)} </h2> 压缩点数 ,每秒将点数乘以${format(layers[this.layer].calcP1())}` : ``
        }],
        "blank",
        "blank",
        "blank",
        "upgrades",
        "milestones"
    ],
    upgrades: {
        11: {
            title: "粗糙的开始",
            description: "每秒获取1点数",
            cost: _D(0),
        },
        12: {
            title: "暴涨I",
            description(){return `每秒将点数获取乘以${format(layers[this.layer].calcmul())}`},
            effect() {
                return _D(1.03)
            },
            cost: _D(10),
        },
        13: {
            title: "加速乘数",
            description: "基于点数加成暴涨I效果",
            effect(){
                return player[this.layer].points.add(1).log10().div(100)
            },
            effectDisplay(){
                return `+${format(this.effect())}`
            },
            cost: _D(200),
        },
        14: {
            title: "连击乘数",
            description: "基于点数获取加成暴涨I效果",
            effect(){
                return player._201.gen.add(1).log10().div(50)
            },
            effectDisplay(){
                return `+${format(this.effect())}`
            },
            cost: _D(5000),
        },
        15: {
            title: "指数能量",
            description: "暴涨I效果变为^1.25, 解锁指数引擎",
            effect(){
                return _D(1.5)
            },
            cost: _D(1e7),
        },
    },
    layerShown() { return getGridData('main', this.layer) },
    hotkeys: [
    ],
});