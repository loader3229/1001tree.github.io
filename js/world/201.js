addLayer("201", {
    symbol: "+",
    resource: "点数",
    row: 2,
    position: 1,
    color: "#aaa",
    update(diff) { 
        if(hasUpgrade("201",11)){
            if(hasUpgrade("201",21)) player._201.base = player._201.base.add(layers[this.layer].calcbase())
            player._201.gen = player._201.gen.times(player._201.bzmul[1].times(player._201.bzbase[1]).pow(diff))
            player[this.layer].points = player[this.layer].points.add(player._201.base.times(player._201.gen).pow(layers[this.layer].engineeff()[0]).times(diff))
            if(hasUpgrade("201",15)) player[this.layer].points = player[this.layer].points.times(layers[this.layer].calcP1().pow(diff))
        }
        player._201.bzmul[1] = player._201.bzmul[1].times(player._201.bzmul[2].pow(diff))
        player._201.bzmul[2] = player._201.bzmul[2].times(player._201.bzmul[3].pow(diff))
        if(hasUpgrade("201",42)) player._201.point1 = player._201.point1.times(player._201.bzmul[2].times(player._201.bzbase[2]).pow(diff))
        else if(hasUpgrade("201",15)) player._201.point1 = player[this.layer].points.add(1).log10().sqrt()
        if(hasUpgrade("201",25)) player._201.engine = player._201.engine.add(layers[this.layer].enginegen().times(diff))
        if(hasUpgrade("201",43)) player._201.engine = player._201.engine.times(player._201.bzmul[2].times(player._201.bzbase[2]).pow(diff))
    },
    calcbase(){
        b = _D1
        if(hasUpgrade("201",21)) b = upgradeEffect("201",21)
        return b
    },
    calcmul(){ 
        mult = _D1
        if(hasUpgrade("201",12)) mult = _D(1.03)
        if(hasUpgrade("201",13)) mult = mult.add(upgradeEffect("201",13))
        if(hasUpgrade("201",14)) mult = mult.add(upgradeEffect("201",14))
        if(hasUpgrade("201",44)) mult = mult.pow(layers[this.layer].engineeff()[1])
        else if(hasUpgrade("201",25)) mult = mult.times(layers[this.layer].engineeff()[1])
        if(hasUpgrade("201",15)) mult = mult.pow(1.25)
        if(hasUpgrade("201",25)) mult = mult.pow(1.333)
        player._201.bzbase[1] = mult
        mult2 = _D1
        if(hasUpgrade("201",41)) mult2 = _D(1.03)
        if(hasUpgrade("201",51)) mult2 = mult2.add(upgradeEffect("201",51))
        if(hasUpgrade("201",45)) mult2 = mult2.pow(1.2)
        player._201.bzbase[2] = mult2
    },
    calcP1(){
        p = _D1
        p = player._201.point1.add(1).ln().div(100).add(1)
        if (hasUpgrade("201",22)) p = p.times(2)
        if (hasUpgrade("201",23)) p = p.times(upgradeEffect("201",23))
        if (hasUpgrade("201",24)) p = p.times(upgradeEffect("201",24))
        return p
    },
    enginegen(){
        g = _D1
        g = g.times(buyableEffect("201",11))
        g = g.times(buyableEffect("201",12))
        if(hasUpgrade("201",31)) g = g.times(upgradeEffect("201",31))
        return hasUpgrade("201",25) ? g:_D0
    },
    engineeff(){
        eff1 = player._201.engine.add(1).log10().pow(0.5).div(100).add(1)
        if(hasUpgrade("201",35)) eff1 = eff1.pow(1.25)
        eff2 = Decimal.pow(1.02,player._201.engine.add(1).ln())
        if(hasUpgrade("201",35)) eff2 = eff2.pow(1.25)
        return hasUpgrade("201",25)?[eff1,eff2.log(hasUpgrade("201",44) ? 10 : 1).add(1)] : [_D1,_D1]
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat:{
        Main:{
            content:[
                ["display-text", function () {
                    return `你有 <h2 class='nmpt'> ${format(player[this.layer].points)} </h2> 点数 (+${format(hasUpgrade("201",11) ? player._201.base.times(player._201.gen).pow(layers[this.layer].engineeff()[0]) : _D0)}/s),到达1F308完成世界`
                }],
                ["display-text", function () {
                    return hasUpgrade("201",15)? `你有 <h2 class='nmpt'> ${format(player._201.point1)} </h2> 压缩点数 ,每秒将点数乘以${format(layers[this.layer].calcP1())}` : ``
                }],
                "blank",
                "upgrades",
                "milestones"
            ]
        },
        engine:{
            content:[
                ["display-text", function () {
                    return `你有 <h2 class='nmpt'> ${format(player[this.layer].points)} </h2> 点数 (+${format(hasUpgrade("201",11) ? player._201.base.times(player._201.gen).pow(layers[this.layer].engineeff()[0]) : _D0)}/s),到达1F308完成世界`
                }],
                ["display-text", function () {
                    return `你有 <h2 class='nmpt'> ${format(player._201.engine)} </h2> 指数引擎(+${format(layers[this.layer].enginegen())}/s), 点数获取变为^${format(layers[this.layer].engineeff()[0])}, 暴涨I效果`+(hasUpgrade("201",44) ? `^`:`x`)+`${format(layers[this.layer].engineeff()[1])}`
                }],
                "blank",
                "buyables",
                "blank",
            ],
            unlocked(){return hasUpgrade("201",25)}
        }
    },
    upgrades: {
        11: {
            title: "粗糙的开始",
            description: "每秒获取1点数",
            cost: _D(0),
        },
        12: {
            title: "暴涨I",
            description(){return `每秒将点数获取乘以${format(player._201.bzmul[1])}`},
            effect() {
                return player._201.bzmul[1]
            },
            cost: _D(10),
        },
        13: {
            title: "加速乘数",
            description: "基于点数加成暴涨I效果",
            effect(){
                return player[this.layer].points.add(1).log(hasUpgrade("201",33) ? 5 : 10).div(100)
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
                return player._201.gen.add(1).log(hasUpgrade("201",34) ? 5 : 10).div(50)
            },
            effectDisplay(){
                return `+${format(this.effect())}`
            },
            cost: _D(5000),
        },
        15: {
            title: "指数能量",
            description: "暴涨I效果变为^1.25, 解锁压缩点数",
            effect(){
                return _D(1.25)
            },
            cost: _D(1e7),
        },
        21: {
            title: "暴涨I+",
            description: "暴涨I以较弱效果加成基础点数获取",
            effect(){
                return upgradeEffect("201",12).pow(0.5).div(30).pow(hasUpgrade("201",32) ? upgradeEffect("201",32) : _D1)
            },
            effectDisplay(){
                return `+${format(this.effect())}/s`
            },
            cost: _D(1e30),
        },
        22: {
            title: "好了我知道这很无聊",
            description: "压缩点数效果翻倍",
            cost: _D(1e100),
        },
        23: {
            title: "压缩暴涨",
            description: "暴涨I效果加成压缩点数效果",
            cost: _D(1e300),
            effect(){
                return upgradeEffect("201",12).pow(0.5)
            },
            effectDisplay(){
                return `x${format(this.effect())}`
            },
        },
        24: {
            title: "连锁暴涨",
            description: "点数加成压缩点数效果",
            cost: _D("1e650"),
            effect(){
                return player[this.layer].points.add(1).log(10).add(1).log(hasUpgrade("201",45) ? 2 : 10).pow(2)
            },
            effectDisplay(){
                return `x${format(this.effect())}`
            },
        },
        25: {
            title: "指数递归",
            description: "暴涨I效果变为^1.333, 解锁指数引擎",
            cost: _D("1e1200"),
            effect(){
                return _D(1.333)
            }
        },
        31: {
            title: "压缩引擎",
            description: "压缩点数加成指数引擎获取",
            cost: _D("1e3000"),
            effect(){
                return player._201.point1.pow(0.25)
            },
            effectDisplay(){
                return `x${format(this.effect())}`
            }
        },
        32: {
            title: "二次生效",
            description: "暴涨I效果加成暴涨I+效果",
            cost: _D("1e6000"),
            effect(){
                return upgradeEffect("201",12).pow(2).add(1).log10().div(20).add(1)
            },
            effectDisplay(){
                return `^${format(this.effect())}`
            }
        },
        33: {
            title: "时间墙削弱",
            description: "加速乘数效果log10->log5",
            cost: _D("1e9000"),
        },
        34: {
            title: "时间墙再削弱",
            description: "连击乘数效果log10->log5",
            cost: _D("1e12000"),
        },
        35: {
            title: "血肉苦弱",
            description: "指数引擎效果^1.25",
            cost: _D("1e15000"),
        },
        41: {
            title: "暴涨II",
            description(){return `暴涨I效果每秒乘以${format(player._201.bzmul[2])}`},
            cost: _D("1e15000"),
        },
        42: {
            title: "压缩暴涨I",
            description(){return `压缩点数获取改为暴涨II乘数`},
            cost: _D("1e20000"),
        },
        43: {
            title: "引擎暴涨I",
            description(){return `暴涨II加成指数引擎获取`},
            cost: _D("1e24000"),
        },
        44: {
            title: "高速引擎超频",
            description(){return `指数引擎第二个效果取对数然后改为指数`},
            cost: _D("1e30000"),
        },
        45: {
            title: "说真的你不该这样",
            description(){return `连锁暴涨中的log10 -> log2, 暴涨II效果变为^1.2`},
            cost: _D("1e45000"),
        },
        51: {
            title: "你他妈到底在干什么",
            description(){return `基于压缩点数加成暴涨II, 解锁随机引擎`},
            effect(){
                return player._201.point1.pow(2).add(1).log10().div(2000)
            },
            effectDisplay(){
                return `+${format(this.effect())}`
            },
            cost: _D("1e60000"),
        },
    },
    buyables:{
        11: {
            title() { return `线性增量` },
            display() {
                return `指数引擎获取x`+(`${format(buyableEffect("201",13).add(2))}`)+`
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return Decimal.pow(10,x.pow(1.5).div(10).add(1)) },
            effect(x) { return Decimal.pow(buyableEffect("201",13).add(2),x) },
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player._201.engine = player._201.engine.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style:{"height":"140px","width":"140px","min-height":"100px","border":"4px solid","border-color":"#999"}
        },
        12: {
            title() { return `持续增量` },
            display() {
                return `指数引擎获取乘以log10(log10(点数))^(数量`+(getBuyableAmount("201",13).gt(0) ? `x${format(buyableEffect("201",13).add(1))})`:`)`)+`
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return Decimal.pow(20,x.pow(2).div(10)).times(1e6) },
            effect(x) { return player[this.layer].points.add(1).log10().add(1).log10().pow((x.times(buyableEffect("201",13).add(1)))) },
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player._201.engine = player._201.engine.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style:{"height":"140px","width":"140px","min-height":"100px","border":"4px solid","border-color":"#999"}
        },
        13: {
            title() { return `增量增量` },
            display() {
                return `前两个可购买底数+0.2
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return Decimal.pow(100,x.pow(3).add(1)).times(1e13) },
            effect(x) { return x.times(0.2) },
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player._201.engine = player._201.engine.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style:{"height":"140px","width":"140px","min-height":"100px","border":"4px solid","border-color":"#999"}
        },
    },
    layerShown() { return getGridData('main', this.layer) && (options.hideWorld || !player.world[this.layer]) },
    hotkeys: [
    ],
});