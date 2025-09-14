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
    requires() {
        return (hasUpgrade("_3021", 15) ? _D(200) : _DInf)
            .mul(hasMilestone(this.layer, 5) ? _D2 : _D1)
    },
    exponent: _D(1),
    base: _D(1.1),
    baseAmount() { return player._3022.points },
    baseResource: "拗谝",
    tabFormat: {
        里程碑: {
            content: [
                ["display-text", function () {
                    let g = layers[this.layer].pointsGain()
                    return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拘谞<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})`
                }],
                ["display-text", function () {
                    if (hasMilestone(this.layer, 6)) return `你有<h3 class="p4pt"> ${format(player[302][3].power)} </h3><span class='c1'>五彩能量</span>`
                }],
                "blank",
                ['prestige-button', "飙卂"],
                'resource-display',
                'milestones'
            ]
        },
        挑战: {
            content: [
                ["display-text", function () {
                    let g = layers[this.layer].pointsGain()
                    return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拘谞<br>
            (${g[0].lte(0) ? `${format(g[0])}/s` : (g[1].lte(2) ? `+${format(g[0])}/s` : `×${format(g[1])}/s`)})<br>
                    拘谞挑战不会被重置`
                }],
                'blank',
                'challenges',
            ],
            unlocked() { return player[302].unlock[1] }
        },
        五彩能量: {
            content: [
                ["display-text", function () {
                    if (hasMilestone(this.layer, 6)) return `你有<h3 class="p4pt"> ${format(player[302][3].power)} </h3><span class='c1'>五彩能量</span>`
                }],
                "blank",
                "clickables"
            ],
            unlocked() { return hasUpgrade("_3022", 35) }
        }
    },
    challenges: {
        11: {
            name: "全自动化",
            challengeDescription: "直接获得三无产品,四无忌惮和六根清净,五效升级无效,进入和退出时重置拖谜层和拗谝层",
            goalDescription: "500拖谜",
            rewardDescription: "三无产品效果×2,且飙卂时不重置三无产品",
            canComplete() { return player["_3021"].points.gte(500) },
            rewardEffect() { return _D2 },
            onEnter() {
                player["_3022"].upgrades.push(13, 14, 21)
            },
            onExit() {
            },
            onComplete() {
                playsound("cc")
            }
        }
    },
    clickables: {
        11: {
            title() { return "<span class='c1'>五彩献祭</span>" },
            display() { return "把你的<span class='c1'>五彩能量</span>转化为拙谟" },
            canClick() { return player[302][3].power.gt(0) },
            onClick() {
                player._3024.points = player[302][3].power
                player[302][3].power = _D0
            },
            unlocked() { return true }
        },
    },
    milestones: {
        1: {
            requirementDescription() { return `1 拘谞 | 隔代亲` },
            effectDescription() { return `这是你的第一个拘谞,也就是说你距离拜谢更进一步!基于拘谞获得更多拖谜<br>效果: ×${format(this.effect())}` },
            done() { return player[this.layer].points.gte(1) },
            effect() { return player[this.layer].points.add(1).pow(1 / 3) }
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
            effect() { return _D(0.9).pow(player[this.layer].points.add(1).pow(0.5)).add(0.05) }
        },
        4: {
            requirementDescription() { return `4 拘谞 | 乾犭瓜离光` },
            effectDescription() { return `九经沙场在飙卂时不会重置<br>但是,正如你看到的,神人作者没有保留它的必须升级,所以它暂时没有效果!` },
            done() { return player[this.layer].points.gte(4) },
        },
        5: {
            requirementDescription() { return `5 拘谞 | 找不到升级十二` },
            effectDescription() { return `解锁一系列新的拗谝升级<br>为了强迫你购买这些升级,飙卂价格被提升` },
            done() { return player[this.layer].points.gte(5) },
        },
        6: {
            requirementDescription() { return `6 拘谞 | 有了,加一些新东西` },
            effectDescription() { return `解锁<span class="c1">五彩能量</span><br>它很好看,飙卂后你会获得等量<span class="c1">五彩能量</span>` },
            done() { return player[this.layer].points.gte(6) },
        },
    },
    onPrestige(gain) {
        player[302].unlock[1] = true
        player[302][3].power = player[302][3].power.add(gain)
    },
    doReset(resettingLayer) {
        if (["_3024", "_3025", "_3026"].includes(resettingLayer)) {
            if (resettingLayer == "_3024") {
                player[302].fool = true
                layerDataReset(this.layer, ["challenges","milestones"])
            } else {
                layerDataReset(this.layer, ["challenges"])
            }
        }
    },
    canBuyMax() { return false },
    hotkeys: [
        { key: "2", description: "[302] 2: 飙卂", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[0] },
    branches: ["_3024"],
});