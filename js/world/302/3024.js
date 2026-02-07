addLayer("3024", {
    symbol: "招谡",
    resource: "招谡",
    color: "radial-gradient(hsl(140,45%,50%), hsl(210,30%,50%))",
    update(diff) {
        if (player.pause[302]) return
        player[this.layer].a += 1
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            a: -114514
        }
    },
    type: "normal",
    requires() { return player[302].fool ? _DInf : _D1 },
    exponent: _D1,
    directMult() { return player[302].fool ? _D1 : divNum(_DInf) },
    baseAmount() { return player[3023].points },
    baseResource: "拚谠",
    tabFormat: [
        ["display-text", function () {
            return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>招谡,加成拙谟获取和容量利用硬上限×${format(layers[this.layer].effect())}`
        }],
        "blank",
        ['prestige-button', "飝卆"],
        'resource-display',
        ["display-text", function () {
            return `这个层级什么其他的东西都没有,因为我懒了,而且我不想再给你们加重置墙了(真的是不想吗?)`
        }],
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "滴滴得得滴滴得滴滴",
            description: "获得一个神秘的拘谞获取加成",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return Math.sin(Date.now() / 3725) / (Math.sin(Date.now() / 7014) /2 + 1) + (Math.sin(Date.now() / 4259) / 2 + 1.25) + (player[this.layer].a - player[this.layer].a)
            },
            cost: _D(-1),
            unlocked() { return true }
        }
    },
    effect() { return player[this.layer].points.add(1).pow(1 / 2).mul(getEffect("3023", 31, _D1)) },
    hotkeys: [
        { key: "3", description: "[302] 3: 飝卆", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[1] },
    branches: ["3025"],
});