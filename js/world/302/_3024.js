addLayer("_3024", {
    symbol: "招谡",
    resource: "招谡",
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
    type: "normal",
    requires() { return player[302].fool ? _DInf : _D1 },
    exponent: _D1,
    directMult() { return player[302].fool ? _D1 : divNum(_DInf) },
    baseAmount() { return player._3023.points },
    baseResource: "拚谠",
    tabFormat: [
        ["display-text", function () {
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>招谡,加成拙谟获取×${format(layers[this.layer].effect())}`
        }],
        "blank",
        ['prestige-button', "飝卆"],
        'resource-display',
        ["display-text", function () {
            let g = layers[this.layer].pointsGain()
            return `这个层级什么都没有,因为我懒了,而且我不想再给你们加重置墙了(真的是不想吗?)`
        }],
    ],
    effect() { return player[this.layer].points.add(1).pow(1 / 4) },
    onPrestige(gain) {
        player[302].unlock[2] = true
    },
    doReset(resettingLayer) {
        if (["_3025", "_3026"].includes(resettingLayer)) {
            layerDataReset(this.layer)
        }
    },
    hotkeys: [
        { key: "3", description: "[302] 3: 飝卆", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[1] },
    branches: ["_3025"],
});