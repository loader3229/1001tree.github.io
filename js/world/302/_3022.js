addLayer("_3022", {
    symbol: "拗谝",
    resource: "拗谝",
    color: "radial-gradient(hsl(140,15%,50%), hsl(210,5%,50%))",
    update(diff) {
        if (player.pause[302]) return

        player[302][1].charge = decimalMin(player[302][1].charge.add(getEffect(this.layer, 13, _D0).mul(diff)), layers._3021.clickables[11].limit())
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    pointsGain() {
        let g = tmp[this.layer].resetGain.times(tmp[this.layer].passiveGeneration)

        let o = player[this.layer].points.eq(0) ? _D0 : g.div(player[this.layer].points)

        return [g, o]
    },
    type: "normal",
    requires: _D10,
    exponent() { return getEffect(this.layer, 32, _D(0.5)) },
    baseAmount() { return player._3021.points },
    baseResource: "拖谜",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拗谝<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        "blank",
        ['prestige-button', "飘十"],
        'resource-display',
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "一托咪酯",
            description: "拖谜池的容量基于拗谝更大",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return decimalMax(player[this.layer].points.add(1).pow(0.8).sub(1), 0)
            },
            cost: _D1,
        },
        12: {
            title: "两情相悦",
            description: "拖谜池的充能效率基于依托咪酯略微增加",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return decimalMax(getEffect(this.layer, 11, _D0).add(1).pow(1 / 2).sub(1), 0)
            },
            cost: _D5,
        },
        13: {
            title: "三无产品",
            description() { return `每秒自动为拖谜池充能,速度为效率的${formatPersent(this.mult(), 0)}` },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            mult() {
                return _D(0.1)
                    .mul(getEffect(this.layer, 15, 1))
                    .mul(getEffect("_3021", 14, 1))
                    .mul(getChallengeEffect("_3023", 11, 1))
            },
            effect() {
                return layers._3021.clickables[11].charge().mul(this.mult())
                    .add(getMilestoneEffect("_3023", 2, _D0))
            },
            cost: _D10,
        },
        14: {
            title: "四无忌惮",
            description: "出现神秘力量每秒吞噬你5%的拖谜,但代价是你自动获得飘十时获得的拗谝的20%",
            effect() {
                return _D(0.2)
            },
            cost: _D(25),
        },
        15: {
            title: "五效升级",
            description: "三无产品效果更强居然整整五倍",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return inChallenge("_3023", 11) ? _D1 : _D5
            },
            cost: _D(50),
        },
        21: {
            title: "六根清净",
            description: "说真的,你需要舍弃这些身外之物,不再能手动填充拖谜池",
            cost() {
                return player[this.layer].points
                    .mul(getMilestoneEffect("_3023", 3, _D1))
            },
            unlocked() { return hasUpgrade(this.layer, 11) && hasUpgrade(this.layer, 12) && hasUpgrade(this.layer, 13) && hasUpgrade(this.layer, 14) && hasUpgrade(this.layer, 15) && hasUpgrade(this.layer, 15) || hasUpgrade(this.layer, this.id) },
        },
        22: {
            title: "七擒孟获",
            description: "解锁一些新的拖谜升级",
            cost: _D(30),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        23: {
            title: "八巴托斯",
            description: "基于拖谜力量加成此升级效果",
            effectDisplay() {
                return `${format(this.effect())}`
            },
            effect() {
                return player[302][1].power
                    .mul(getEffect(this.layer, 33, _D1))
            },
            cost: _D(60),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        24: {
            title: "九经沙场",
            description: "拖谜池的容量基于风力更大",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return getEffect("_3022", 23, _D0).add(1).pow(1 / 10)
            },
            cost: _D(90),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        25: {
            title: "十在抱歉",
            description: "这个升级的效果仍未制作,但如果你不买这个,你就无法解锁下一行升级,在你以后解锁之后",
            cost: _D(100),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        31: {
            title: "一些甜头",
            description: "这个升级是免费的,因为它没有用",
            cost() {
                return _D0
            },
            unlocked() { return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22) && hasUpgrade(this.layer, 23) && hasUpgrade(this.layer, 24) && hasUpgrade(this.layer, 25) && hasUpgrade(this.layer, 25) || hasUpgrade(this.layer, this.id) },
        },
        32: {
            title: "两不相欠",
            description: "降低飘十的价格",
            effectDisplay() {
                return `^0.5 → ^0.75`
            },
            effect() {
                return _D(0.75)
            },
            cost: _D(50),
            unlocked() { return hasUpgrade(this.layer, 31) || hasUpgrade(this.layer, this.id) },
        },
        33: {
            title: "三缄其口",
            description: "基于拖谜力量略微提升风力",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return decimalMax(player[302][1].power.add(1).log(10).pow(1 / 2), 1)
            },
            cost: _D(200),
            unlocked() { return hasUpgrade(this.layer, 31) || hasUpgrade(this.layer, this.id) },
        },
        34: {
            title: "四目棍母",
            description: "四无忌惮吞噬的拖谜减少1%",
            effectDisplay() {
                return `-${formatPersent(this.effect())}`
            },
            effect() {
                return _D(0.01)
            },
            cost: _D(600),
            unlocked() { return hasUpgrade(this.layer, 31) || hasUpgrade(this.layer, this.id) },
        },
        35: {
            title: "五彩缤纷<br>[飙卂不重置]",
            description: "解锁拘谞层的<span class='c1'>五彩能量</span>页面",
            cost: _D(1500),
            unlocked() { return hasUpgrade(this.layer, 31) || hasUpgrade(this.layer, this.id) },
        },
    },
    passiveGeneration() {
        return getEffect(this.layer, 14, _D0)
    },
    onPrestige(gain) {
        player[302].unlock[0] = true
    },
    doReset(resettingLayer) {
        if (["_3023", "_3024", "_3025", "_3026"].includes(resettingLayer)) {
            let rpu = hasUpgrade("_3022", 35)

            layerDataReset(this.layer)
            player[302][1].power = _D0

            if (resettingLayer == "_3023") {
                if (hasMilestone("_3023", 4)) player[this.layer].upgrades.push(24)
                if (hasChallenge("_3023", 11)) player[this.layer].upgrades.push(13)
                if (rpu) player[this.layer].upgrades.push(35)
            }
        }
    },
    hotkeys: [
        { key: "1", description: "[302] 1: 飘十", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return true },
    branches: ["_3023"],
});