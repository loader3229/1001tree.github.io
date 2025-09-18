addLayer("3021", {
    symbol: "拘谞",
    resource: "拘谞",
    color: "radial-gradient(hsl(140,5%,50%), #888)",
    update(diff) {
        if (player.pause[302]) return

        player[this.layer].points = player[this.layer].points.add(this.pointsGain()[0].mul(diff))

        if (inChallenge("3023", 12)) player[this.layer].points = decimalMin(player[this.layer].points, 249)

        let p = getEffect(this.layer, 13, _D0)
            .add(getEffect("3023", 14, _D0))
            .mul(diff)
        player[302][1].power = player[302][1].power.add(p)

        let c = getEffect("3022", 13, _D0).mul(diff)
        player[302][1].charge = decimalMin(player[302][1].charge.add(c), layers[3021].clickables[11].limit())
        player[302][1].exp = player[302][1].exp.add(c)

        let d = player[302][1].charge.mul(_D(0.5).pow(diff))
        player[302][1].charge = d.lte(0.001) ? _D0 : d

        const expForNextLevel = _D(10).mul(_D(1.02).pow(player[302][1].level));

        if (player[302][1].exp.gte(expForNextLevel)) {
            let numerator = player[302][1].exp.mul(_D(1.02).sub(_D1)).div(expForNextLevel).add(_D1);
            let levelsGained = numerator.log(_D(1.02)).floor();
            let totalExpRequired = expForNextLevel.mul(_D(1.02).pow(levelsGained).sub(_D1)).div(_D(1.02).sub(_D1));
            player[302][1].level = player[302][1].level.add(levelsGained);
            player[302][1].exp = player[302][1].exp.sub(totalExpRequired);
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    pointsGain() {
        let g = player[302][1].charge

        if (hasUpgrade("3022", 14)) g = g
            .sub(player[this.layer].points
                .sub(player[this.layer].points
                    .mul(_D(0.95))))
            .add(getEffect("3022", 34, _D0))
            .add(getEffect("3023", 21, _D0))

        g = g.mul(getMilestoneEffect("3023", 1, _D1))

        let o = player[this.layer].points.eq(0) ? _D0 : g.div(player[this.layer].points)

        return [g, o]
    },
    type: "none",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拘谞<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(1) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        ["display-text", function () {
            if (hasUpgrade(this.layer, 13) || hasUpgrade("3023", 14)) return `你有<h3 class="p4pt"> ${format(player[302][1].power)} </h3>拘谞力量,它们使得你的拖咪获取×1.00<br>
            (+${format(getEffect(this.layer, 13, _D0).add(getEffect("3023", 14, _D0)))}/s)`
        }],
        "blank",
        "clickables",
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "飞升的第一步[不重置]",
            description: "解锁拘谞池",
            cost: _D0,
        },
        12: {
            title: "飞升的左脚踩右脚",
            description: "拘谞池的充能效率基于充能微弱增加",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return decimalMax(player[302][1].charge.add(1).pow(1 / 2).sub(1), 0)
            },
            cost: _D(60),
            unlocked() { return hasUpgrade("3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        13: {
            title: "飞升的点数",
            description: "拘谞池的容量未利用部分可生产拘谞力量",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                if (inChallenge("3023", 12)) return _D0
                return layers[3021].clickables[11].limit().sub(player[302][1].charge).pow(1 / 2).div(3)
                    .mul(getEffect("3023", 11, _D1))
            },
            cost: _D(90),
            unlocked() { return hasUpgrade("3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        14: {
            title: "飞升的顺风而上",
            description: "基于风力加强三无产品",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return getEffect("3022", 23, _D0).add(1).log(10).pow(0.5).div(2).add(1)
            },
            cost: _D(135),
            unlocked() { return hasUpgrade("3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        15: {
            title: "飞升的前五阶",
            description: "将飜卅的价格大幅降低",
            cost: _D(200),
            unlocked() { return hasUpgrade("3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        21: {
            title: "飞升的第二步[不重置]",
            description: "解锁拘谞池之池",
            cost: _D(1000),
            unlocked() { return hasChallenge("3023", 12) || hasUpgrade(this.layer, this.id) },
        },
        22: {
            title: "飞升的经验之力",
            description: "改善拘谞池的效果公式",
            cost: _D(200),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        23: {
            title: "飞升的老朋友",
            description: "四无忌惮获取的拙谟变为33%",
            effect() {
                return divNum(3)
            },
            cost: _D(400),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        24: {
            title: "飞升的六亲不认",
            description: "[六根清净]的价格×0.5",
            effect() {
                return divNum(2)
            },
            cost: _D(800),
            unlocked() { return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, this.id) },
        },
        25: {
            title: "飞升的拚谠",
            description: "拥有[六根清净]才能解锁,获得 1 拚谠<br>为什么会有这么没用的升级?",
            onPurchase() {
                player[3023].points = player[3023].points.add(1)
            },
            cost: _D(2000),
            unlocked() { return hasUpgrade(this.layer, 21) && hasUpgrade("3022", 21) || hasUpgrade(this.layer, this.id) },
        },
    },
    clickables: {
        11: {
            title() { return `拘谞充能 <h3>${format(player[302][1].charge)}</h3> / <h3>${format(this.limit())}</h3><br>充能力量 <h3>${format(this.charge())}</h3> | 自动力量 <h3>${format(getEffect("3022", 13, _D0))}</h3>` },
            canClick() {
                return !hasUpgrade("3022", 21)
            },
            onClick() {
                player[302][1].charge = decimalMin(player[302][1].charge.add(this.charge()), this.limit())
            },
            onHold() { this.onClick() },
            charge() {
                let c = _D1

                c = c
                    .add(getEffect(this.layer, 12, 0))
                    .add(getEffect("3022", 12, 0))

                return c
            },
            limit() {
                let b = _D10

                b = b
                    .add(getEffect("3022", 11, 0))

                    .mul(getEffect("3022", 24, 1))
                    .mul(layers[this.layer].clickables[12].effect())

                return b
            },
            unlocked() {
                return hasUpgrade(this.layer, 11)
            },
            progress() {
                let result = player[302][1].charge / this.limit()
                return decimalBetween(result, 0, 1)
            },
            width: "500px",
            height: "60px",
            borderColor: "hsl(140,100%,50%)",
            fillColor: "#DA0",
            backColor: "#430",
            fontColor: "#FFF",
            style() {
                let w = this.width
                let h = this.height
                let b; if (typeof this.borderColor == 'undefined') b = 'var(--color)'; else b = this.borderColor
                let f; if (typeof this.fillColor == 'undefined') f = 'var(--color)'; else f = this.fillColor
                let g; if (typeof this.backColor == 'undefined') g = 'transparent'; else g = this.backColor
                let t; if (typeof this.fontColor == 'undefined') t = 'unset'; else t = this.fontColor
                let p = formatPersent(this.progress())
                let i = `linear-gradient(to right, ${f} 0% ${p}, rgba(0,0,0,0) ${p} 100%),linear-gradient(${g})`
                return {
                    minWidth: h,
                    width: w,
                    minHeight: h,
                    height: h,
                    color: t,
                    background: "unset",
                    backgroundImage: i,
                    border: "3px solid",
                    borderRadius: "10px",
                    borderColor: b,
                    overflow: "hidden",
                    transform: "unset",
                }
            }
        },
        12: {
            title() { return `拘谞池等级 <h3>${formatWhole(player[302][1].level)}</h3> 容量 <h3>×${format(this.effect())}</h3><br>经验 <h3>${format(player[302][1].exp)}</h3> / <h3>${format(this.limit())}</h3>` },
            canClick() {
                return false
            },
            onHold() { this.onClick() },
            effect() {
                if(hasUpgrade(this.layer,22))return _D1.add(player[302][1].level.div(200/3))
                return _D1.add(player[302][1].level.div(100))
            },
            limit() {
                return _D10.mul(_D(1.02).pow(player[302][1].level))
            },
            unlocked() {
                return hasUpgrade(this.layer, 21)
            },
            progress() {
                let result = player[302][1].exp / this.limit()
                return decimalBetween(result, 0, 1)
            },
            width: "500px",
            height: "60px",
            borderColor: "hsl(140,100%,50%)",
            fillColor: "#4A4",
            backColor: "#151",
            fontColor: "#FFF",
            style() {
                let w = this.width
                let h = this.height
                let b; if (typeof this.borderColor == 'undefined') b = 'var(--color)'; else b = this.borderColor
                let f; if (typeof this.fillColor == 'undefined') f = 'var(--color)'; else f = this.fillColor
                let g; if (typeof this.backColor == 'undefined') g = 'transparent'; else g = this.backColor
                let t; if (typeof this.fontColor == 'undefined') t = 'unset'; else t = this.fontColor
                let p = formatPersent(this.progress())
                let i = `linear-gradient(to right, ${f} 0% ${p}, rgba(0,0,0,0) ${p} 100%),linear-gradient(${g})`
                return {
                    minWidth: h,
                    width: w,
                    minHeight: h,
                    height: h,
                    color: t,
                    background: "unset",
                    backgroundImage: i,
                    border: "3px solid",
                    borderRadius: "10px",
                    borderColor: b,
                    overflow: "hidden",
                    transform: "unset",
                }
            }
        },
    },
    doReset(resettingLayer) {
        if (["3022", "3023", "3024", "3025", "3026"].includes(resettingLayer)) {
            let dy = hasUpgrade(this.layer, 11)
            let de = hasUpgrade(this.layer, 21)

            layerDataReset(this.layer, (resettingLayer == "3022" || (resettingLayer == "3023"&& hasChallenge("3023",31))) ? ["upgrades"] : null)

            if (resettingLayer == "3023") {
                if (hasChallenge("3023", 21)) player[this.layer].upgrades.push(15)
            }

            player[302][1].charge = _D0

            if (dy) player[this.layer].upgrades.push(11)
            if (de) player[this.layer].upgrades.push(21)
        }
    },
    layerShown() { return true },
    branches: ["3022"],
});