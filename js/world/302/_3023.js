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
    type: "normal",
    requires() { return hasUpgrade("_3021", 15) ? _D(200) : _DInf },
    exponent: _D(0.75),
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
        'resource-display'
    ],
    upgrades: {
    },
    milestones: {
    },
    onPrestige(gain) {
        player._302.unlock[1] = true
        doReset("_3022")
    },
    doReset(resettingLayer) {
        if ([ "_3024", "_3025", "_3026"].includes(resettingLayer)) {
            layerDataReset(this.layer)
            doReset("_3022")
        }
    },
    layerShown() { return player._302.unlock[0] },

});