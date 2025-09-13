addLayer("203", {
    symbol: "🖱️",
    resource: "点数",
    color: "hsl(40,50%,50%)",
    startData() {
        return {
            unlocked: true,
            points: _D0,
			hp: _D10,
			maxhp: _D10,
			wallbreak: _D0,
			maxpoints: _D0,
			mode: 1,
			trig: false,
			trig2: false,
			divclick: _D0,
			subclick: _D0,
			timeplayed: _D0,
			click: _D0,
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    tabFormat: {
        点击墙: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p2pt"> ${format(player[this.layer].points)}/${format(player[this.layer].maxpoints)} </h2>点数`
                }],
                ["display-text", function () {
                    return `你已经击破了<h2 class="p2pt"> ${formatWhole(player[this.layer].wallbreak)} </h2>堵点击墙`
                }],
                ["display-text", function () {
                    return `你为了击破当前墙点击了<h2 class="p2pt"> ${formatWhole(player[this.layer].click)} </h2>次`
                }],
                "blank",
                ["clickable",11],
                "blank",
                ["clickables",[2]],
                ["clickable",31],
                "blank",
                "buyables",
                "blank",
                ["display-text", function () {
                    return hasMilestone(this.layer, 1) ? `里程碑2的效果为<h2 class="p2pt"> ${format(layers[this.layer].m2effect())} </h2>倍` : ``
                }],
            ]
        },
        挑战: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p2pt"> ${format(player[this.layer].points)}/${format(player[this.layer].maxpoints)} </h2>点数`
                }],
                ["display-text", function () {
                    return `你已经击破了<h2 class="p2pt"> ${formatWhole(player[this.layer].wallbreak)} </h2>堵点击墙`
                }],
                ["display-text", function () {
                    return `你完成的<h2 class="p2pt"> ${formatWhole(layers[this.layer].chalcomp())} </h2>个挑战使得点击墙变为<h2 class="p2pt"> ${format(layers[this.layer].chaleff())} </h2>次方!`
                }],
                ["display-text", function () {
                    return `注意:进入或退出挑战将导致你从头开始,因此最好合理安排进入时机来完成挑战,挑战难度不一定递增!`
                }],
                "blank",
                "challenges",
                "blank",
            ],
            unlocked() { return hasMilestone("203", 7) || player[203].trig }
        },
        里程碑: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p2pt"> ${format(player[this.layer].points)}/${format(player[this.layer].maxpoints)} </h2>点数`
                }],
                ["display-text", function () {
                    return `你已经击破了<h2 class="p2pt"> ${formatWhole(player[this.layer].wallbreak)} </h2>堵点击墙`
                }],
                ["display-text", function () {
                    return `记得常回来看看,尤其是完成挑战时,有惊喜哦!`
                }],
                "blank",
                "milestones",
            ]
        }
    },
    subpower() {
        spow = new Decimal(1)
        if (layers[this.layer].buyables[11].unlocked()) spow = spow.mul(buyableEffect(this.layer, 11))
        if (hasMilestone(this.layer, 1)) spow = spow.mul(layers[this.layer].m2effect())
        if (inChallenge(this.layer, 11)) spow = spow.mul(4)
        if (hasChallenge(this.layer, 22)) spow = spow.mul(Decimal.pow(1.1, getBuyableAmount(this.layer, 13)))
        if (hasChallenge(this.layer, 12)) spow = spow.mul(layers[this.layer].divpower().pow(2.5))
        if (hasMilestone(this.layer, 4)) spow = spow.pow(1.2)
        if (inChallenge(this.layer, 11)) spow = spow.mul(Decimal.pow(0.97, player[this.layer].subclick.max(0)))
        if (inChallenge(this.layer, 21)) spow = spow.pow(0.8)
        return spow.max(1)
    },
    m2effect() {
        eff = new Decimal(1)
        if (hasMilestone(this.layer, 1)) eff = eff.mul(Decimal.pow(player[this.layer].points.add(1).log10().div(100).add(1.285), player[this.layer].points.div(3).max(0)).pow(0.2))
        if (hasMilestone(this.layer, 6)) eff = eff.mul(player[this.layer].points.pow(0.3333))
        if (hasChallenge(this.layer, 11)) eff = eff.mul(player[this.layer].subclick.add(1).ln().div(2).add(1))
        if (inChallenge(this.layer, 12)) eff = eff.pow(0.5)
        return eff
    },
    calcmaxhp() {
        p = _D1
        p = p.times(layers[this.layer].chaleff())
        if (player[this.layer].wallbreak.gte(70)) return new Decimal("1.79e308")
        if (player[this.layer].wallbreak.lte(29)) return getYFromOrderedPoints([[0, 10], [10, 100], [20, 1000], [30, 100000]], player[this.layer].wallbreak.add(1)).pow(p)
        return Decimal.pow(getYFromOrderedPoints([[30, 2], [40, 2.5], [50, 3.25], [60, 4.5], [70, 7]], player[this.layer].wallbreak.add(1)), player[this.layer].wallbreak).pow(p)
    },
    divpower() {
        eff = new Decimal(3)
        if (hasChallenge(this.layer, 22)) eff = eff.add(0.5)
        if (layers[this.layer].buyables[13].unlocked()) eff = eff.add(buyableEffect(this.layer, 13))
        if (inChallenge(this.layer, 22)) eff = eff.mul(buyableEffect(this.layer, 11).pow(0.1))
        eff = eff.times(Decimal.pow(inChallenge(this.layer, 21) ? 0.667 : hasChallenge(this.layer, 21) ? 0.95 : 0.925, player[this.layer].divclick.max(0)))
        return eff.max(1)
    },
    chalcomp() {
        c = _D0
        if (hasChallenge(this.layer, 11)) c = c.add(1)
        if (hasChallenge(this.layer, 12)) c = c.add(1)
        if (hasChallenge(this.layer, 21)) c = c.add(1)
        if (hasChallenge(this.layer, 22)) c = c.add(1)
        return c
    },
    chaleff() {
        e = _D1
        e = Decimal.pow(0.9, layers[this.layer].chalcomp())
        return e
    },
    update(diff) {
        if (player.pause[this.layer]) return
        if (hasMilestone(this.layer, 9) && player[this.layer].wallbreak.lte(15)) layers[this.layer].clickables[11].onClick()
        player[this.layer].timeplayed = player[this.layer].timeplayed.add(diff)
    },
    clickables: {
        11: {
            title() { return `点击墙 #${formatWhole(player[this.layer].wallbreak)}` },
            display() { return `HP: ${format(player[this.layer].hp)}/${format(player[this.layer].maxhp)}` },
            onClick() {
                player[this.layer].click = player[this.layer].click.add(1)
                if (player[this.layer].mode == 1) {
                    player[this.layer].hp = player[this.layer].hp.sub(layers[this.layer].subpower())
                    if (hasMilestone(this.layer, 5) && (!inChallenge(this.layer, 21))) player[this.layer].divclick = player[this.layer].divclick.sub(hasMilestone(this.layer, 10) ? 0.08 : hasMilestone(this.layer, 7) ? 0.05 : 0.025)
                    if (layers[this.layer].subpower().gt(1)) player[this.layer].subclick = player[this.layer].subclick.add(1)
                } else {
                    player[this.layer].hp = player[this.layer].hp.div(layers[this.layer].divpower())
                    if (layers[this.layer].divpower().gt(1)) player[this.layer].divclick = player[this.layer].divclick.add(1)
                }
                if (player[this.layer].hp.lte(0)) {
                    player[this.layer].maxhp = layers[this.layer].calcmaxhp()
                    player[this.layer].wallbreak = player[this.layer].wallbreak.add(1)
                    player[this.layer].hp = player[this.layer].maxhp
                    player[this.layer].points = player[this.layer].points.add(player[this.layer].wallbreak)
                    player[this.layer].maxpoints = player[this.layer].maxpoints.add(player[this.layer].wallbreak)
                    player[this.layer].divclick = _D0
                    player[this.layer].subclick = _D0
                    player[this.layer].click = _D0
                }
            },
            onHold() {
                this.onClick()
            },
            canClick() { return player[this.layer].wallbreak.lte(70) },
            style: { "background-color"() { return player[203].wallbreak.eq(71) ? "#12a31c" : "hsl(40,50%,50%)" } }
        },
        21: {
            title() { return `减法器` },
            display() { return `效果:-${format(layers[this.layer].subpower())}` },
            onClick() {
                player[this.layer].click = player[this.layer].click.add(1)
                player[this.layer].mode = 1
            },
            canClick() { return player[this.layer].mode == 2 },
            style: { "width": "92.5px", "min-height": "75px", "background-color"() { return player[203].mode == 1 ? "#12a31c" : "hsl(40,50%,50%)" } },
        },
        22: {
            title() { return `除法器` },
            display() { return `效果:/${format(layers[this.layer].divpower())}` },
            onClick() {
                player[this.layer].click = player[this.layer].click.add(1)
                player[this.layer].mode = 2
            },
            canClick() { return player[this.layer].mode == 1 },
            unlocked() { return hasMilestone(this.layer, 3) },
            style: { "width": "92.5px",  "min-height": "75px", "background-color"() { return player[203].mode == 2 ? "#12a31c" :  "hsl(40,50%,50%)" } },
        },
        31: {
            title() { return `洗点并重置点击墙` },
            onClick() {
                player[this.layer].click = player[this.layer].click.add(1)
                setBuyableAmount(this.layer, 11, _D0)
                setBuyableAmount(this.layer, 12, _D0)
                setBuyableAmount(this.layer, 13, _D0)
                player[this.layer].points = player[this.layer].maxpoints
                if (hasMilestone(this.layer, 3)) {
                    player[this.layer].divclick = _D0
                }
                player[this.layer].subclick = _D0
                player[this.layer].hp = player[this.layer].maxhp
            },
            canClick() { return true },
            unlocked() { return hasMilestone(this.layer, 1) },
            style: { "width": "200px", "height": "75px", "margin-top": "0px", "min-height": "0px" },
        }
    },
    buyables: {
        11: {
            title() { return `定值电阻` },
            display() {
                return `减法器` + (inChallenge(this.layer, 22) ? `和除法器` : ``) + `效果x${format(buyableEffect(this.layer, 12).add(1.2))}<br>
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return getYFromOrderedPoints([[0, 1], [5, 4], [10, 12], [15, 21], [20, 37], [30, 59], [50, 80], [100, 155]], x) },
            effect(x) { return Decimal.pow(buyableEffect(this.layer, 12).add(1.2), x).pow(inChallenge(this.layer, 22) ? 0.25 : 1).pow((hasMilestone(this.layer, 9) && (inChallenge(this.layer, 11) || inChallenge(this.layer, 12) || inChallenge(this.layer, 21) || inChallenge(this.layer, 22))) ? 1.25 : 1).pow(inChallenge(this.layer, 12) ? (new Decimal(1).div(Decimal.pow(player[this.layer].timeplayed, 0.19))) : 1) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasMilestone(this.layer, 0) },
            buy() {
                player[this.layer].click = player[this.layer].click.add(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title() { return `电表` },
            display() {
                return `定值电阻基数` + (hasMilestone(this.layer, 8) ? `+0.07<br>` : `+0.05<br>`) +
                    `数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:+${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return getYFromOrderedPoints([[0, 10], [5, 20], [10, 40], [15, 60], [20, 100], [30, 140], [50, 250], [100, 800]], x) },
            effect(x) { return x.times(hasMilestone(this.layer, 8) ? 0.07 : 0.05) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasMilestone(this.layer, 2) },
            buy() {
                player[this.layer].click = player[this.layer].click.add(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title() { return `用电器` },
            display() {
                return `除法器基数+0.2<br>
                            数量:${format(getBuyableAmount(this.layer, this.id))}
                            效果:+${format(this.effect())}
                            下一个需要:${format(this.cost())}`
            },
            cost(x) { return getYFromOrderedPoints([[0, 10], [5, 30], [10, 60], [15, 100], [20, 150], [30, 210], [50, 360]], x).pow(hasMilestone(this.layer, 10) ? 0.85 : 1) },
            effect(x) { return x.times(0.2) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasMilestone(this.layer, 5) },
            buy() {
                player[this.layer].click = player[this.layer].click.add(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        }
    },
    challenges: {
        11: {
            name() { return `递减递减数列` },
            challengeDescription() { return `减法器也会随点击衰减.作为补偿,减法器效果x4` },
            goalDescription() { return `击破38堵点击墙` },
            rewardDescription() { return `基于减法器点击次数,略微提升里程碑2的效果` },
            canComplete() { return player[this.layer].wallbreak.gte(38) },
            onEnter() {
                layers[this.layer].clickwallReset()
            },
            onExit() {
                layers[this.layer].clickwallReset()
            }
        },
        12: {
            name() { return `电表会自己倒转` },
            challengeDescription() { return `定值电阻的效果随挑战时间而衰减至1,里程碑2效果^0.5` },
            goalDescription() { return `击破49堵点击墙` },
            rewardDescription() { return `除法器加成减法器效果` },
            canComplete() { return player[this.layer].wallbreak.gte(49) },
            onEnter() {
                layers[this.layer].clickwallReset()
            },
            onExit() {
                layers[this.layer].clickwallReset()
            }
        },
        21: {
            name() { return `倒果为因` },
            challengeDescription() { return `除法器衰减变得极快且无法被减法器回复,减法器效果^0.8` },
            goalDescription() { return `击破43堵点击墙` },
            rewardDescription() { return `除法器衰减弱一些` },
            canComplete() { return player[this.layer].wallbreak.gte(43) },
            onEnter() {
                layers[this.layer].clickwallReset()
            },
            onExit() {
                layers[this.layer].clickwallReset()
            }
        },
        22: {
            name() { return `无以为继的伤心欲绝` },
            challengeDescription() { return `定值电阻的效果变为^0.25,但其额外略微加成除法器` },
            goalDescription() { return `击破48堵点击墙` },
            rewardDescription() { return `除法器基数+0.5, 每个用电器额外将减法器效果x1.1` },
            canComplete() { return player[this.layer].wallbreak.gte(48) },
            onEnter() {
                layers[this.layer].clickwallReset()
            },
            onExit() {
                layers[this.layer].clickwallReset()
            }
        }
    },
    milestones: {
        0: {
            requirementDescription() { return `6点数` },
            effectDescription() { return `解锁一个可购买,为什么不呢?` },
            done() { return player[this.layer].maxpoints.gte(6) },
        },
        1: {
            requirementDescription() { return `120点数` },
            effectDescription() { return `减法器的效果随着当前点数变强,解锁洗点功能` },
            done() { return player[this.layer].maxpoints.gte(120) },
            unlocked() { return hasMilestone(this.layer, 0) }
        },
        2: {
            requirementDescription() { return `231点数` },
            effectDescription() { return `解锁另一个可购买` },
            done() { return player[this.layer].maxpoints.gte(231) },
            unlocked() { return hasMilestone(this.layer, 1) }
        },
        3: {
            requirementDescription() { return `496点数` },
            effectDescription() { return `解锁除法器,除法器的效果会随着点击次数衰减!` },
            done() { return player[this.layer].maxpoints.gte(496) },
            unlocked() { return hasMilestone(this.layer, 2) }
        },
        4: {
            requirementDescription() { return `630点数` },
            effectDescription() { return `减法器效果^1.2` },
            done() { return player[this.layer].maxpoints.gte(630) },
            unlocked() { return hasMilestone(this.layer, 3) },
        },
        5: {
            requirementDescription() { return `780点数` },
            effectDescription() { return `解锁最后一个可购买(应该吧),减法器点击能轻微恢复除法器效果` },
            done() { return player[this.layer].maxpoints.gte(780) },
            unlocked() { return hasMilestone(this.layer, 4) }
        },
        6: {
            requirementDescription() { return `990点数` },
            effectDescription() { return `这是一个很好的数字,里程碑2的效果更强` },
            done() { return player[this.layer].maxpoints.gte(990) },
            unlocked() { return hasMilestone(this.layer, 5) },
        },
        7: {
            requirementDescription() { return `1035点数` },
            effectDescription() { return `解锁挑战,减法器回复能力更强.初次解锁完成世界并回收1个梦力!` },
            done() { return player[this.layer].maxpoints.gte(1035) },
            onComplete() {
                if (player[this.layer].trig == false) {
                    completeWorld(this.layer)
                    player[this.layer].trig = true
                }
            },
            unlocked() { return hasMilestone(this.layer, 6) },
        },
        8: {
            requirementDescription() { return `1326点数` },
            effectDescription() { return `电表基数+0.02` },
            done() { return player[this.layer].maxpoints.gte(1326) },
            unlocked() { return hasMilestone(this.layer, 7) },
        },
        9: {
            requirementDescription() { return `1953点数` },
            effectDescription() { return `自动点击前15堵点击墙.在挑战中,定值电阻的效果变为^1.25(挑战开始时保留)` },
            done() { return player[this.layer].maxpoints.gte(1953) },
            unlocked() { return hasChallenge(this.layer, 22) },
        },
        10: {
            requirementDescription() { return `2346点数` },
            effectDescription() { return `用电器的价格增长减慢, 减法器恢复能力进一步加强(挑战开始时保留)` },
            done() { return player[this.layer].maxpoints.gte(2346) },
            unlocked() { return hasChallenge(this.layer, 12) },
        },
        11: {
            requirementDescription() { return `2556点数` },
            effectDescription() { return `恭喜获得额外梦力!` },
            done() { return player[this.layer].maxpoints.gte(2556) },
            onComplete() {
                if (player[this.layer].trig2 == false) {
                    player.main.points = player.main.points.add(1)
                    player[this.layer].trig2 = true
                }
            },
            unlocked() { return hasChallenge(this.layer, 11) && hasChallenge(this.layer, 12) && hasChallenge(this.layer, 21) && hasChallenge(this.layer, 22) },
        }
    },
    clickwallReset() {
        player[this.layer].wallbreak = _D0
        player[this.layer].mode = 1
        player[this.layer].maxhp = _D10
        player[this.layer].hp = _D10
        player[this.layer].maxpoints = _D0
        player[this.layer].points = _D0
        player[this.layer].divclick = _D0
        player[this.layer].subclick = _D0
        player[this.layer].timeplayed = _D0
        setBuyableAmount(this.layer, 11, _D0)
        setBuyableAmount(this.layer, 12, _D0)
        setBuyableAmount(this.layer, 13, _D0)
        if (hasMilestone(this.layer, 10)) player[this.layer].milestones = ['9', '10']
        else if (hasMilestone(this.layer, 9)) player[this.layer].milestones = ['9']
        else player[this.layer].milestones = []
        player[this.layer].click = _D0
    }
})