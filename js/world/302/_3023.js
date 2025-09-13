addLayer("_3023", {
    symbol: "拘谞",
    resource: "拘谞",
    color: "radial-gradient(hsl(140,30%,50%), hsl(210,15%,50%))",
    update(diff) {
        if (player.pause[302]) return
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
    type: "static",
    requires() { return hasUpgrade("_3021", 15) ? _D(200) : _DInf },
    exponent: _D(1),
    base: _D(1.1),
    baseAmount() { return player._3022.points },
    baseResource: "拗谝",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拘谞<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        "blank",
        ['prestige-button', "飙卂"],
        'resource-display',
        'milestones'
    ],
    upgrades: {
    },
    milestones: {
        1: {
            requirementDescription() { return `1 拘谞 | 隔代亲` },
            effectDescription() { return `这是你的第一个拘谞,也就是说你距离拜谢更进一步!基于拘谞获得更多拖谜<br>效果: ×${format(this.effect())}` },
            done() { return player[this.layer].points.gte(1) },
            effect() { return player[this.layer].points.add(1).pow(0.2) }
        },
        2: {
            requirementDescription() { return `2 拘谞 | 容量利用` },
            effectDescription() { return `你都已经20了,是时候收集小道具了,三无产品充能效率最终增加拖谜池容量的5%<br>效果: +${format(this.effect())}` },
            done() { return player[this.layer].points.gte(2) },
            effect() { return layers._3021.clickables[11].limit().mul(0.05) }
        },
        3: {
            requirementDescription() { return `3 拘谞 | 唬人的家伙` },
            effectDescription() { return `我们无论遇到什么困难,都不要怕,六根清净的价格基于拘谞降低<br>效果: ×${formatPersent(this.effect())}` },
            done() { return player[this.layer].points.gte(3) },
            effect() { return _D(0.95).pow(player[this.layer].points.add(1).pow(0.5)) }
        },
        4: {
            requirementDescription() { return `4 拘谞 | 乾犭瓜离光` },
            effectDescription() { return `九经沙场在飙卂时不会重置<br>但是,正如你看到的,神人作者没有保留它的必须升级,所以它暂时没有效果!` },
            done() { return player[this.layer].points.gte(4) },
        },
    },
    onPrestige(gain) {
        player[302].unlock[1] = true
    },
    doReset(resettingLayer) {
        if (["_3024", "_3025", "_3026"].includes(resettingLayer)) {
            layerDataReset(this.layer)
        }
    },
    canBuyMax() { return false },
    hotkeys: [
        { key: "2", description: "[302] 2: 飙卂", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[0] },
    branches: ["_3024"],
});