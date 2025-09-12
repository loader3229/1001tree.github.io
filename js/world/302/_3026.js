addLayer("_3026", {
    symbol: "招谡",
    resource: "招谡",
    color: "radial-gradient(hsl(140,75%,50%),hsl(210,60%,50%))",
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
    baseAmount() { return player._3025.points },
    baseResource: "拚谠",
    tabFormat: [
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>招谡<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
        }],
        "blank",
        ['prestige-button',"飝卆"],
        'resource-display'
    ],
    upgrades: {
    },
    milestones: {
    },
    onPrestige(gain) {
        player._302.unlock[4] = true
        doReset("_3025")
    },
    layerShown() { return player._302.unlock[3] },

});