addLayer("302", {
    symbol: "⚰️",
    resource: "拜谢",
    color: "hsl(140,100%,50%)",
    update(diff) {
        if (player.pause[this.layer]) return
        if (!player.world[this.layer] && player[this.layer].points.gte(1)) {
            completeWorld(this.layer)
        }
        player[this.layer][3].power = player[this.layer][3].power.add(layers[this.layer].effect().mul(diff))
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            fool: false,
            unlock: [false, false],
            1: {
                charge: _D0,
                power: _D0,
                level: _D0,
                exp: _D0,
            },
            3: {
                power: _D0
            }
        }
    },
    type: "normal",
    requires: _D(150),
    exponent: _D1,
    base: _D1,
    baseAmount() { return player[3024].points },
    baseResource: "招谡",
    tabFormat: [
        ["display-text", function () {
            return `你有<h2 class="p4pt"> ${format(player[3021].points)} </h2>拘谞`
        }],
        ["display-text", function () {
            return `你有<h2 class="p4pt"> ${format(player[3022].points)} </h2>拙谟`
        }],
        ["display-text", function () {
            if (player[302].unlock[0]) return `你有<h2 class="p4pt"> ${format(player[3023].points)} </h2>拚谠`
        }],
        ["display-text", function () {
            if (player[302].unlock[1]) return `你有<h2 class="p4pt"> ${format(player[3024].points)} </h2>招谡`
        }],
        ["display-text", function () {
            if (player[this.layer].points.neq(0)) return `你有 <h2 class="p4pt">${format(player[this.layer].points)}</h2> 拜谢,每秒获得 <h2 class="p4pt">${format(layers[this.layer].effect())}</h2> <span class="c1">五彩能量</span>`
        }],
        ["blank", "20px"],
        ["tree", [
            ['3021', '3022', '3023', '3024'],
        ]],
        ["row", [
            ["layer-proxy", ["3022", [['prestige-button', "飛卄"]]]],
            ["layer-proxy", ["3023", [['prestige-button', "飜卅"]]]],
            ["layer-proxy", ["3024", [['prestige-button', "飝卆"]]]],
        ]],
        ["row", [
            ['prestige-button', "飞升"],
        ]],
        "blank",
        "milestones"
    ],
    effect() {
        if (hasUpgrade("3023", 41)) return player[this.layer].points.add(1).pow(1.25).div(100)
        return player[this.layer].points.div(1000)
    },
    hotkeys: [
        { key: "4", description: "[302] 4: 飞升", onPress() { doReset(this.layer) } },
    ],
    milestones: {
        1: {
            requirementDescription() { return `<img src="resources/pic/bx.gif" height="40px"/>` },
            effectDescription() { return `获得1额外梦力,你终于<img src="resources/pic/bx.gif" height="16px"/>了!` },
            done() { return player[this.layer].points.gte(1) },
            onComplete() { player.main.points = player.main.points.add(1) },
        },
        2: {
            requirementDescription() { return `1,145,141,919<img src="resources/pic/bx.gif" height="40px"/>` },
            effectDescription() { return `获得1额外梦力,这个真的值得吗?` },
            done() { return player[this.layer].points.gte(1145141919) },
            onComplete() { player.main.points = player.main.points.add(1) },
        },
        3: {
            requirementDescription() { return `e13333333<img src="resources/pic/bx.gif" height="40px"/>` },
            effectDescription() { return `终局` },
            done() { return player[this.layer].points.gte("e13333333") },
            onComplete() { player.main.points = player.main.points.add(1) },
        }
    },
    passiveGeneration() {
        if (player.pause[302]) return _D0
        return getEffect("3023", 35, _D0)
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    leftTab: true
});