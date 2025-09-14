addLayer("_3025", {
    symbol: "拚谠",
    resource: "拚谠",
    color: "radial-gradient(hsl(140,60%,50%), hsl(210,45%,50%))",
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
    type: "normal",
    requires: _D10,
    exponent: _D(0.5),
    baseAmount() { return player._3024.points },
    baseResource: "拙谟",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拚谠<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        "blank",
        ['prestige-button', "飜卅"],
        'resource-display'
    ],
    upgrades: {
    },
    milestones: {
    },
    onPrestige(gain) {
        player[302].unlock[3] = true
    },
    doReset(resettingLayer) {
        if (["_3026"].includes(resettingLayer)) {
            layerDataReset(this.layer)
        }
    },
    hotkeys: [
        { key: "5", description: "[302] 5: 飜卅", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[2] },
    branches: ["_3026"],
});