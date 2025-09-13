addLayer("_3021", {
    symbol: "拖谜",
    resource: "拖谜",
    color: "radial-gradient(hsl(140,5%,50%), #888)",
    update(diff) {
        if (player.pause[302]) return

        player[this.layer].points = player[this.layer].points.add(this.pointsGain()[0].mul(diff))

        player[302][1].power = player[302][1].power.add(getEffect(this.layer, 13, _D0).mul(diff))

        let c = player[302][1].charge.mul(_D(0.5).pow(diff))
        player[302][1].charge = c.lte(0.001) ? _D0 : c
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
        }
    },
    pointsGain() {
        let g = player[302][1].charge

        if (hasUpgrade("_3022", 14)) g = g.sub(player[this.layer].points.sub(player[this.layer].points.mul(_D(0.95))))

        g = g.mul(getMilestoneEffect("_3023", 1, _D1))

        let o = player[this.layer].points.eq(0) ? _D0 : g.div(player[this.layer].points)

        return [g, o]
    },
    type: "none",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拖谜<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        ["display-text", function () {
            if (hasUpgrade(this.layer, 13)) return `你有<h3 class="p4pt"> ${format(player[302][1].power)} </h3>拖谜力量,它们现在是没用的东西<br>
            (+${format(getEffect(this.layer, 13, _D0))}/s)`
        }],
        "blank",
        "clickables",
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "飞升的第一步",
            description: "解锁拖谜池",
            cost: _D0,
        },
        12: {
            title: "飞升的左脚踩右脚",
            description: "拖谜池的充能效率基于充能微弱增加",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return decimalMax(player[302][1].charge.pow(1 / 2).sub(1), 0)
            },
            cost: _D(60),
            unlocked() { return hasUpgrade("_3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        13: {
            title: "飞升的点数",
            description: "拖谜池的容量未利用部分可生产拖谜力量",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return layers._3021.clickables[11].limit().sub(player[302][1].charge).pow(1/3)
            },
            cost: _D(90),
            unlocked() { return hasUpgrade("_3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        14: {
            title: "飞升的顺风而上",
            description: "基于风力加强三无产品",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return getEffect("_3022", 23, _D0).add(1).log(10).pow(0.5).div(2).add(1)
            },
            cost: _D(135),
            unlocked() { return hasUpgrade("_3022", 22) || hasUpgrade(this.layer, this.id) },
        },
        15: {
            title: "飞升的前五阶",
            description: "将飙卂的价格大幅降低",
            cost: _D(200),
            unlocked() { return hasUpgrade("_3022", 22) || hasUpgrade(this.layer, this.id) },
        },
    },
    clickables: {
        11: {
            title() { return `拖谜充能 <h3>${format(player[302][1].charge)}</h3> / <h3>${format(this.limit())}</h3><br>充能力量 <h3>${format(this.charge())}</h3> | 自动力量 <h3>${format(getEffect("_3022", 13, _D0))}</h3>` },
            canClick() {
                return !hasUpgrade("_3022", 21)
            },
            onClick() {
                player[302][1].charge = decimalMin(player[302][1].charge.add(this.charge()), this.limit())
            },
            onHold() { this.onClick() },
            charge() {
                let c = _D1

                c = c
                    .add(getEffect(this.layer, 12, 0))
                    .add(getEffect("_3022", 12, 0))

                return c
            },
            limit() {
                let b = _D10

                b = b
                    .add(getEffect("_3022", 11, 0))

                    .mul(getEffect("_3022", 24, 1))

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
    },
    doReset(resettingLayer) {
        if (["_3022", "_3023", "_3024", "_3025", "_3026"].includes(resettingLayer)) {
            layerDataReset(this.layer, resettingLayer == "_3022" ? ["upgrades"] : null)
            player[302][1].charge = _D0
        }
    },
    layerShown() { return true },
    branches: ["_3022"],
});