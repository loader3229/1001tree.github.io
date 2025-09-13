addLayer("_3024", {
    symbol: "拙谟",
    resource: "拙谟",
    color: "radial-gradient(hsl(140,45%,50%), hsl(210,30%,50%))",
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
    baseAmount() { return player._3023.points },
    baseResource: "拘谞",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拙谟<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        "blank",
        ['prestige-button',"飛卄"],
        'resource-display'
    ],
    upgrades: {
    },
    milestones: {
    },
    onPrestige(gain) {
        player[302].unlock[2] = true
    },
    doReset(resettingLayer) {
        if ([ "_3025", "_3026"].includes(resettingLayer)) {
            layerDataReset(this.layer)
        }
    },
    hotkeys: [
        { key: "3", description: "[302] : 飛卄", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[1] },

});