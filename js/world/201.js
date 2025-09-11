addLayer("201", {
    symbol: "+",
    resource: "点数",
    row: 2,
    position: 1,
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        this.calcmul()
        if(player[this.layer].points.gte("10^^2025")&&player._201.trig){
            player._201.trig = false
            completeWorld(this.layer)
        }
        player._201.reff = player._201.reff.max(1)
        player._201.rg = Math.min(player._201.rg,100)
        if (hasUpgrade("201", 11)) {
            if (hasUpgrade("201", 21)) player._201.base = player._201.base.add(layers[this.layer].calcbase())
            player._201.gen = player._201.gen.times(player._201.bzmul[1].times(player._201.bzbase[1]).pow(diff))
            player[this.layer].points = player[this.layer].points.add(player._201.base.times(player._201.gen).pow(layers[this.layer].engineeff()[0]).times(diff))
            if (hasUpgrade("201", 15)) player[this.layer].points = player[this.layer].points.times(layers[this.layer].calcP1().pow(diff))
            if (hasUpgrade("201", 65)) player[this.layer].points = player[this.layer].points.tetrate(1.001)
        }
        player._201.bzmul[1] = player._201.bzmul[1].times(player._201.bzmul[2].times(player._201.bzbase[2]).pow(diff))
        player._201.bzmul[2] = player._201.bzmul[2].times(player._201.bzmul[3].times(player._201.bzbase[3]).pow(diff))
        player._201.bzmul[3] = player._201.bzmul[3].pow(Decimal.pow(layers[this.layer].hengineeff()[1].add(1.1),diff))
        if (hasUpgrade("201", 42)) player._201.point1 = player._201.point1.times(player._201.bzmul[2].times(player._201.bzbase[2]).pow(diff))
        else if (hasUpgrade("201", 15)) player._201.point1 = player[this.layer].points.add(1).log10().sqrt()
        if (hasUpgrade("201", 25)) player._201.engine = player._201.engine.add(layers[this.layer].enginegen().times(diff))
        if (hasUpgrade("201", 43)) player._201.engine = player._201.engine.times(player._201.bzmul[2].times(player._201.bzbase[2]).pow(diff))
        if (hasUpgrade("201", 51)) player._201.rengine = player._201.rengine.add(layers[this.layer].renginegen().times(diff))
        if (hasUpgrade("201", 53)) layers[this.layer].buyables[21].buy()
        if (hasUpgrade("201", 62)) layers[this.layer].buyables[23].buy()
        if (hasUpgrade("201", 63)) player._201.hengine = player._201.hengine.pow(layers[this.layer].hengineeff()[2].pow(diff))
    },
    calcbase() {
        b = _D1
        if (hasUpgrade("201", 21)) b = upgradeEffect("201", 21)
        return b
    },
    calcmul() {
        mult = _D1
        if (hasUpgrade("201", 12)) mult = _D(1.03)
        if (hasUpgrade("201", 13)) mult = mult.add(upgradeEffect("201", 13))
        if (hasUpgrade("201", 14)) mult = mult.add(upgradeEffect("201", 14))
        if (hasUpgrade("201", 44)) mult = mult.pow(layers[this.layer].engineeff()[1])
        else if (hasUpgrade("201", 25)) mult = mult.times(layers[this.layer].engineeff()[1])
        if (hasUpgrade("201", 15)) mult = mult.pow(1.5)
        if (hasUpgrade("201", 25)) mult = mult.pow(1.667)
        if (hasUpgrade("201", 52)) mult = mult.pow(2)
        player._201.bzbase[1] = mult
        mult2 = _D1
        if (hasUpgrade("201", 41)) mult2 = _D(1.03)
        if (hasUpgrade("201", 51)) mult2 = mult2.add(upgradeEffect("201", 51))
        if (hasUpgrade("201", 51)) mult2 = mult2.add(layers[this.layer].rengineeff()[1])
        if (hasUpgrade("201", 54)) mult2 = mult2.times(upgradeEffect("201", 54))
        if (hasUpgrade("201", 45)) mult2 = mult2.pow(1.2)
        if (hasUpgrade("201", 55)) mult2 = mult2.pow(1.4)
        player._201.bzbase[2] = mult2
        mult3 = _D1
        if (hasUpgrade("201", 61)) mult3 = _D(1.01)
        player._201.bzbase[3] = mult3
    },
    calcP1() {
        p = _D1
        p = player._201.point1.add(1).ln().div(100).add(1)
        if (hasUpgrade("201", 22)) p = p.times(2)
        if (hasUpgrade("201", 23)) p = p.times(upgradeEffect("201", 23))
        if (hasUpgrade("201", 24)) p = p.times(upgradeEffect("201", 24))
        return p
    },
    enginegen() {
        g = _D1
        g = g.times(buyableEffect("201", 11))
        g = g.times(buyableEffect("201", 12))
        if (hasUpgrade("201", 31)) g = g.times(upgradeEffect("201", 31))
        return hasUpgrade("201", 25) ? g : _D0
    },
    renginegen() {
        g = _D1
        g = g.times(buyableEffect("201",21))
        return hasUpgrade("201", 51) ? g : _D0
    },
    engineeff() {
        let eff1 = player._201.engine.add(1).log10().pow(0.5).div(100).add(1)
        eff1 = eff1.times(layers[this.layer].rengineeff()[0])
        if (hasUpgrade("201", 35)) eff1 = eff1.pow(1.25)
        let eff2 = Decimal.pow(hasUpgrade("501",52) ? 1.03 : 1.02, player._201.engine.add(1).ln())
        eff2 = eff2.times(layers[this.layer].rengineeff()[0])
        if (hasUpgrade("201", 35)) eff2 = eff2.pow(1.25)
        return hasUpgrade("201", 44) ? [eff1, eff2.log(10).add(1)] : hasUpgrade("201", 25) ? [eff1, eff2] : [_D1, _D1]
    },
    rengineeff() {
        let eff1 = player._201.rengine.add(1).log10().pow(0.05).add(1)
        eff1 = eff1.times(layers[this.layer].hengineeff()[0])
        let eff2 = player._201.rengine.add(1).log10().pow(8).div(200)
        eff2 = eff2.times(layers[this.layer].hengineeff()[0])
        return hasUpgrade("201", 51) ? [eff1, eff2] : [_D1, _D0]
    },
    hengineeff() {
        let eff1 = player._201.hengine.add(1).ln().add(1).ln().add(1).pow(2).minus(2)
        let eff2 = player._201.hengine.add(1).log10().add(1).log10().div(10)
        let eff3 = player._201.hengine.add(1).slog().pow(0.6).max(1.01)
        eff3 = eff3.times(buyableEffect("201",31))
        return hasUpgrade("201",63) ? [eff1, eff2, eff3] : [_D1, _D0, _D1]
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: {
        Main: {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class='nmpt'> ${format(player[this.layer].points)} </h2> 点数 (+${format(hasUpgrade("201", 11) ? player._201.base.times(player._201.gen).pow(layers[this.layer].engineeff()[0]) : _D0)}/s),到达1F2025完成世界`
                }],
                ["display-text", function () {
                    return hasUpgrade("201", 15) ? `你有 <h2 class='nmpt'> ${format(player._201.point1)} </h2> 压缩点数 ,每秒将点数乘以${format(layers[this.layer].calcP1())}` : ``
                }],
                "blank",
                "upgrades",
                "milestones"
            ]
        },
        engine: {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class='nmpt'> ${format(player[this.layer].points)} </h2> 点数 (+${format(hasUpgrade("201", 11) ? player._201.base.times(player._201.gen).pow(layers[this.layer].engineeff()[0]) : _D0)}/s),到达1F2025完成世界`
                }],
                ["display-text", function () {
                    return `你有 <h2 class='nmpt'> ${format(player._201.engine)} </h2> 指数引擎(+${format(layers[this.layer].enginegen())}/s)<br>点数获取变为^${format(layers[this.layer].engineeff()[0])}, 暴涨I效果` + (hasUpgrade("201", 44) ? `^` : `x`) + `${format(layers[this.layer].engineeff()[1])}`
                }],
                "blank",
                ["buyables",[1]],
                "blank",
                ["display-text", function () {
                    return hasUpgrade("201",51) ? `你有 <h2 class='nmpt'> ${format(player._201.rengine)} </h2> 随机引擎(+${format(layers[this.layer].renginegen())}/s)<br>指数引擎效果x${format(layers[this.layer].rengineeff()[0])}, 暴涨II效果+${format(layers[this.layer].rengineeff()[1])}` : ``
                }],
                "blank",
                ["buyables",[2]],
                "blank",
                ["display-text", function () {
                    return hasUpgrade("201",63) ? `你有 <h2 class='nmpt'> ${format(player._201.hengine)} </h2> 超越引擎<br>随机引擎效果x${format(layers[this.layer].hengineeff()[0])}, 暴涨III指数+${format(layers[this.layer].hengineeff()[1])}, 每秒将自身变为^${format(layers[this.layer].hengineeff()[2])}` : ``
                }],
                "blank",
                ["buyables",[3]]
            ],
            unlocked() { return hasUpgrade("201", 25) }
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
            description() { return `每秒将点数获取乘以${format(this.effect())}` },
            effect() {
                return player._201.bzmul[1].times(player._201.bzbase[1])
            },
            cost: _D(10),
        },
        13: {
            title: "加速乘数",
            description: "基于点数加成暴涨I效果",
            effect() {
                return player[this.layer].points.add(1).log(hasUpgrade("201",64) ? 1.002 : hasUpgrade("201", 33) ? 5 : 10).div(100)
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: _D(100),
        },
        14: {
            title: "连击乘数",
            description: "基于点数获取加成暴涨I效果",
            effect() {
                return player._201.gen.add(1).log(hasUpgrade("201",64) ? 1.001 : hasUpgrade("201", 34) ? 5 : 10).div(50)
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: _D(2000),
        },
        15: {
            title: "指数能量",
            description: "暴涨I效果变为^1.5, 解锁压缩点数",
            effect() {
                return _D(1.25)
            },
            cost: _D(1e6),
        },
        21: {
            title: "暴涨I+",
            description: "暴涨I以较弱效果加成基础点数获取",
            effect() {
                return upgradeEffect("201", 12).pow(0.5).div(30).pow(hasUpgrade("201", 32) ? upgradeEffect("201", 32) : _D1)
            },
            effectDisplay() {
                return `+${format(this.effect())}/s`
            },
            cost: _D(1e20),
        },
        22: {
            title: "好了我知道这很无聊",
            description: "压缩点数效果翻倍",
            cost: _D(1e70),
        },
        23: {
            title: "压缩暴涨",
            description: "暴涨I效果加成压缩点数效果",
            cost: _D(1e200),
            effect() {
                return upgradeEffect("201", 12).pow(0.5)
            },
            effectDisplay() {
                return `x${format(this.effect())}`
            },
        },
        24: {
            title: "连锁暴涨",
            description: "点数加成压缩点数效果",
            cost: _D("1e500"),
            effect() {
                return player[this.layer].points.add(1).log(10).add(1).log(hasUpgrade("201", 45) ? 2 : 10).pow(2)
            },
            effectDisplay() {
                return `x${format(this.effect())}`
            },
        },
        25: {
            title: "指数递归",
            description: "暴涨I效果变为^1.667, 解锁指数引擎",
            cost: _D("1e800"),
            effect() {
                return _D(1.333)
            }
        },
        31: {
            title: "压缩引擎",
            description: "压缩点数加成指数引擎获取",
            cost: _D("1e1000"),
            effect() {
                return player._201.point1.pow(0.25)
            },
            effectDisplay() {
                return `x${format(this.effect())}`
            }
        },
        32: {
            title: "二次生效",
            description: "暴涨I效果加成暴涨I+效果",
            cost: _D("1e3000"),
            effect() {
                return upgradeEffect("201", 12).pow(2).add(1).log10().div(20).add(1)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            }
        },
        33: {
            title: "时间墙削弱",
            description: "加速乘数效果log10→log5",
            cost: _D("1e5000"),
        },
        34: {
            title: "时间墙再削弱",
            description: "连击乘数效果log10→log5",
            cost: _D("1e7000"),
        },
        35: {
            title: "血肉苦弱",
            description: "指数引擎效果^1.25",
            cost: _D("1e10000"),
        },
        41: {
            title: "暴涨II",
            description() { return `暴涨I效果每秒乘以${format(this.effect())}` },
            effect() {
                return player._201.bzmul[2].times(player._201.bzbase[2])
            },
            cost: _D("1e12500"),
        },
        42: {
            title: "压缩暴涨I",
            description() { return `压缩点数获取改为暴涨II乘数` },
            cost: _D("1e15000"),
        },
        43: {
            title: "引擎暴涨I",
            description() { return `暴涨II加成指数引擎获取` },
            cost: _D("1e18000"),
        },
        44: {
            title: "高速引擎超频",
            description() { return `指数引擎第二个效果取对数然后改为指数` },
            cost: _D("1e20000"),
        },
        45: {
            title: "说真的你不该这样",
            description() { return `连锁暴涨中的log10→log2, 暴涨II效果变为^1.2` },
            cost: _D("1e25000"),
        },
        51: {
            title: "你他妈到底在干什么",
            description() { return `基于压缩点数加成暴涨II, 解锁随机引擎` },
            effect() {
                return player._201.point1.pow(hasUpgrade("201",55) ? 4 : 2).add(1).log10().div(hasUpgrade("201",55) ? 1 : 500)
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: _D("1e30000"),
        },
        52: {
            title: "增长太快了",
            description() { return `暴涨I效果平方, 指数引擎第二个效果底数+0.01` },
            cost: _D("1e2500000"),
        },
        53: {
            title: "自动随机",
            description() { return `自动进行随机超频, 解锁一个新可购买` },
            cost: _D("1e40000000"),
        },
        54: {
            title: "更多暴涨",
            description() { return `点数加成暴涨II效果` },
            effect() {
                return player[this.layer].points.add(1).log10().pow(0.6)
            },
            effectDisplay() {
                return `x${format(this.effect())}`
            },
            cost: _D("e2e8"),
        },
        55: {
            title: "一切都太快了",
            description() { return `随机超频不再减少暴涨I效果, 暴涨II效果^1.4, 本列第一个升级效果更好` },
            cost: _D("e1e9"),
        },
        61: {
            title: "暴涨III",
            description() { return `来点猛的, 暴涨II效果每秒乘以${format(player._201.bzmul[3].times(player._201.bzbase[3]))}<br>
                                    上面的效果每秒变为^${format(layers[this.layer].hengineeff()[1].add(1.1))}` },
            cost: _D("e1e10"),
            onPurchase(){
                player._201.bzmul[3] = _D(1.01)
            }
        },
        62: {
            title: "太强了",
            description() { return `随机基数不再削减点数获取, 自动随机基数.` },
            cost: _D("e1e30"),
        },
        63: {
            title: "我 索 求 更 多",
            description() { return `解锁超越引擎.` },
            cost: _D("e1e100"),
        },
        64: {
            title: "说真的, 没必要了",
            description() { return `大大削弱加速乘数和连击乘数的对数` },
            cost: _D("e1e500"),
        },
        65: {
            title: "最终暴涨",
            description() { return `点数获取每秒^^1.001` },
            cost: _D("e1e2000"),
        },
    },
    buyables: {
        11: {
            title() { return `线性增量` },
            display() {
                return `指数引擎获取x` + (`${format(buyableEffect("201", 13).add(2))}`) + `
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return Decimal.pow(10, x.pow(1.5).div(10).add(1)) },
            effect(x) { return Decimal.pow(buyableEffect("201", 13).add(2), x) },
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player._201.engine = player._201.engine.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
        12: {
            title() { return `持续增量` },
            display() {
                return `指数引擎获取乘以log10(log10(点数))^(数量` + (getBuyableAmount("201", 13).gt(0) ? `x${format(buyableEffect("201", 13).add(1))})` : `)`) + `
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return Decimal.pow(20, x.pow(2).div(10)).times(1e6) },
            effect(x) { return player[this.layer].points.add(1).log10().add(1).log10().pow((x.times(buyableEffect("201", 13).add(1)))) },
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player._201.engine = player._201.engine.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
        13: {
            title() { return `增量增量` },
            display() {
                return `前两个可购买底数+0.2
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return Decimal.pow(100, x.pow(3).add(1)).times(1e13) },
            effect(x) { return x.times(0.2) },
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player._201.engine = player._201.engine.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
        21: {
            title() { return `随机超频` },
            display() {
                return `购买时有${formatWhole(Math.max(player._201.rg,0))}%概率将随机引擎获取x${format(player._201.rb)}, 否则将随机引擎获取/10
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            购买将使暴涨I受暴涨II加成的部分变为^${format(this.cost())}`
            },
            cost(x) { return _D(0.9) },
            effect(x) { return player._201.reff},
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return hasUpgrade("201",51) },
            buy() {
                r = Math.floor(Math.random() * 100) + 1
                if(r<=Math.max(0,player._201.rg)) player._201.reff = player._201.reff.times(player._201.rb) 
                else player._201.reff = player._201.reff.div(10) 
                if(!hasUpgrade("201",55)) player._201.bzmul[1] = player._201.bzmul[1].pow(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
        22: {
            title() { return `随机奖励` },
            display() {
                return `购买时有50%概率将超频成功概率+5%, 否则-5%并将引擎获取/20
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:${format(this.effect())}%
                            购买将使压缩点数变为^${format(this.cost())}`
            },
            cost(x) { return _D(0.8) },
            effect(x) { return player._201.rg-50},
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return hasUpgrade("201",51) },
            buy() {
                r = Math.floor(Math.random() * 100) + 1
                if(r<=50) player._201.rg += 5
                else{
                    player._201.rg -= 5
                    player._201.reff = player._201.reff.div(20) 
                }
                player._201.point1 = player._201.point1.pow(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
        23: {
            title() { return `随机基数` },
            display() {
                return `购买时有50%概率将超频奖励基数x2.5, 否则点数获取^0.8
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            购买将使指数引擎变为^${format(this.cost())}`
            },
            cost(x) { return _D(0.8) },
            effect(x) { return player._201.rb.div(10)},
            canAfford() { return player._201.engine.gte(this.cost()) },
            unlocked() { return hasUpgrade("201",53) },
            buy() {
                r = Math.floor(Math.random() * 100) + 1
                if(r<=50) player._201.rb = player._201.rb.times(2.5)
                else{
                    if(!hasUpgrade("201",62)) plyaer._201.gen = player._201.gen.pow(0.8)
                }
                player._201.engine = player._201.engine.pow(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
        31: {
            title() { return `超越一切` },
            display() {
                return `自身获取指数x1.1
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要(除法):${format(this.cost())}`
            },
            cost(x) { return x.tetrate(x.add(1).slog().div(50).add(3)) },
            effect(x) { return Decimal.pow(1.2,x) },
            canAfford() { return player._201.hengine.gte(this.cost()) },
            unlocked() { return hasUpgrade("201",63) },
            buy() {
                player._201.hengine = player._201.hengine.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },        
        32: {
            title() { return `最终之塔` },
            display() {
                return `最终暴涨效果+0.0005
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:+${format(this.effect())}
                            下一个需要(除法):${format(this.cost())}`
            },
            cost(x) { return x.tetrate(3).times("e1e10000").add(1) },
            effect(x) { return x.times(0.0005) },
            canAfford() { return player._201.hengine.gte(this.cost()) },
            unlocked() { return hasUpgrade("201",63) },
            buy() {
                player._201.hengine = player._201.hengine.div(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { "height": "140px", "width": "140px", "min-height": "100px", "border": "4px solid", "border-color": "#999" }
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    hotkeys: [
    ],
});