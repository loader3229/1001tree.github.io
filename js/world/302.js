addLayer("302", {
    symbol: "⚰️",
    resource: "拜谢",
    color: "hsl(140,100%,50%)",
    update(diff) {
        if (player.pause[this.layer]) return
        if (!player.world[this.layer] && player[this.layer].points.gte(1)) {
            completeWorld(this.layer)
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            fool: false,
			unlock: [false, false, false, false],
			1: {
				charge: _D0,
				power: _D0,
			},
            3: {
                power: _D0
            }
        }
    },
    type: "normal",
    requires: _D10,
    baseAmount() { return player._3026.points },
    baseResource: "招谡",
    tabFormat: [
        ["display-text", function () {
            return `你有<h2 class="p4pt"> ${format(player._3021.points)} </h2>拖谜`
        }],
        ["display-text", function () {
            return `你有<h2 class="p4pt"> ${format(player._3022.points)} </h2>拗谝`
        }],
        ["display-text", function () {
            if (player[302].unlock[0]) return `你有<h2 class="p4pt"> ${format(player._3023.points)} </h2>拘谞`
        }],
        ["display-text", function () {
            if (player[302].unlock[1]) return `你有<h2 class="p4pt"> ${format(player._3024.points)} </h2>拙谟`
        }],
        ["display-text", function () {
            if (player[302].unlock[2]) return `你有<h2 class="p4pt"> ${format(player._3025.points)} </h2>拚谠`
        }],
        ["display-text", function () {
            if (player[302].unlock[3]) return `你有<h2 class="p4pt"> ${format(player._3026.points)} </h2>招谡`
        }],
        ["blank", "20px"],
        ["tree", [
            ['_3021', '_3022', '_3023'],
            ['_3026', '_3025', '_3024'],
        ]],
        ["row", [
            ["layer-proxy", ["_3022", [['prestige-button', "飘十"]]]],
            ["layer-proxy", ["_3023", [['prestige-button', "飙卂"]]]],
            ["layer-proxy", ["_3024", [['prestige-button', "飛卄"]]]],
        ]],
        ["row", [
            ["layer-proxy", ["_3025", [['prestige-button', "飜卅"]]]],
            ["layer-proxy", ["_3026", [['prestige-button', "飝卆"]]]],
            ['prestige-button', "飞升"],
        ]]
    ],
    hotkeys: [
        { key: "6", description: "[302] 6: 飞升", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    leftTab: true
});