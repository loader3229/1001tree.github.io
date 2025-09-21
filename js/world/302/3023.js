addLayer("3023", {
    symbol: "拚谠",
    resource: "拚谠",
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
    type: "static",
    requires() {
        return (hasUpgrade("3021", 15) ? _D(200) : _DInf)
            .mul(hasMilestone(this.layer, 5) ?
                getEffect(this.layer, 12, _D2)
                : _D1)
    },
    exponent: _D(1),
    base: _D(1.1),
    baseAmount() { return player[3022].points },
    baseResource: "拙谟",
    tabFormat: {
        里程碑: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拚谠`
                }],
                ["display-text", function () {
                    if (hasMilestone(this.layer, 6)) return `你有 <h3 class="c1">${format(player[302][3].power)}</h3> <span class='c1'>五彩能量</span>`
                }],
                "blank",
                ['prestige-button', "飜卅"],
                'resource-display',
                'milestones'
            ]
        },
        挑战: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p4pt"> ${format(player[this.layer].points)} </h2>拚谠<br>
                    拚谠挑战不会被重置<br>挑战二和挑战三是孱弱的`
                }],
                'blank',
                'challenges',
            ],
            unlocked() { return player[302].unlock[1] }
        },
        五彩能量: {
            content: [
                ["display-text", function () {
                    if (hasMilestone(this.layer, 6)) return `你有 <h2 class="c1">${format(player[302][3].power)}</h2> <span class='c1'>五彩能量</span>`
                }],
                "blank",
                "clickables",
                "upgrades"
            ],
            unlocked() { return hasUpgrade("3022", 35) }
        }
    },
    challenges: {
        11: {
            name: "全自动化",
            challengeDescription: "直接获得[三无产品],[四无忌惮]和[六根清净],[五效升级]无效,进入和退出时重置拘谞层和拙谟层",
            goalDescription: "100拘谞",
            rewardDescription: "飜卅时不重置三无产品",
            canComplete() { return player["3021"].points.gte(100) },
            onEnter() {
                player["3022"].upgrades.push(13, 14, 21)
                player[302][1].level = _D0
                player[302][1].exp = _D0
            },
            onComplete() {
                playsound("cc")
            }
        },
        12: {
            name: "懦弱之人",
            challengeDescription: "禁用拘谞力量,拘谞的上限为249,进入和退出时重置拘谞层和拙谟层",
            goalDescription: "300拙谟",
            rewardDescription: "解锁一些拘谞升级",
            canComplete() { return player["3022"].points.gte(300) },
            onEnter() {
                player[302][1].level = _D0
                player[302][1].exp = _D0
            },
            onComplete() {
                playsound("cc")
            },
            unlocked() { return hasChallenge(this.layer, 11) }
        },
        21: {
            name: "群众叛徒",
            challengeDescription: "直接获得[五效升级],[五效升级]的效果逆转,[容量利用]的效果降低为3%,进入和退出时重置拘谞层和拙谟层",
            goalDescription: "300拙谟",
            rewardDescription: "飜卅时直接获得[飞升的前五阶]",
            canComplete() { return player["3022"].points.gte(300) },
            onEnter() {
                player["3022"].upgrades.push(15)
                player[302][1].level = _D0
                player[302][1].exp = _D0
            },
            onComplete() {
                playsound("cc")
            },
            unlocked() { return hasChallenge(this.layer, 12) }
        },
        22: {
            name: "一起上吧",
            challengeDescription: "同时进行前三个挑战,且[五效升级]实际效果基于群众叛徒(这里面真有一个奖励关,叛徒!)",
            goalDescription: "购买[三缄其口]",
            rewardDescription: "完成世界<br>可获取最大拙谟,优化[三缄其口]的公式",
            canComplete() { return hasUpgrade("3022", 33) },
            onEnter() {
                player["3022"].upgrades.push(13, 14, 15, 21)
                player[302][1].level = _D0
                player[302][1].exp = _D0
            },
            onComplete() {
                playsound("cc")
                if (!player.world[302]) completeWorld(302)
            },
            countsAs: [11, 12, 21],
            unlocked() { return hasChallenge(this.layer, 21) }
        },
        31: {
            name: "<span class='c1'>五彩祭礼</span>",
            challengeDescription: "进入时会清空你当前的拚谠和<span class='c1'>五彩能量</span>,且重置拘谞层和拙谟层",
            goalDescription: "1<span class='c1'>五彩能量</span>",
            rewardDescription: "拘谞升级在飜卅时不重置<br>解锁<span class='c1'>五彩献祭</span>",
            canComplete() { return player[302][3].power.gte(1) },
            onEnter() {
                player[this.layer].points = _D0
                player[302][3].power = _D0
                player[302][1].level = _D0
                player[302][1].exp = _D0
            },
            onComplete() {
                playsound("cc")
            },
            unlocked() { return hasChallenge(this.layer, 22) }
        }
    },
    clickables: {
        11: {
            title() { return "<span class='c1'>五彩献祭</span>" },
            display() { return "把你的<span class='c1'>五彩能量</span>转化为招谡" },
            canClick() { return player[302][3].power.gt(0) },
            onClick() {
                player[3024].points = player[3024].points.add(player[302][3].power)
                player[302][3].power = _D0
            },
            unlocked() { return hasChallenge(this.layer, 31) }
        },
    },
    upgrades: {
        11: {
            title: "<span class='c1'>五彩力量</span>",
            description: "<span class='c1'>五彩能量</span>加成[飞升的点数]效果",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                return player[302][3].power.add(1)
            },
            cost: _D2,
            unlocked() { return hasMilestone(this.layer, 8) }
        },
        12: {
            title: "<span class='c1'>价格回档</span>",
            description: "清除[升级十二是]的负面效果",
            effect() {
                return _D1
            },
            cost: _D2,
            unlocked() { return hasMilestone(this.layer, 8) }
        },
        13: {
            title: "<span class='c1'>肆无忌惮</span>",
            description: "[四无忌惮]的价格变为 4 拙谟",
            effect() {
                return _D1
            },
            cost: _D2,
            unlocked() { return hasMilestone(this.layer, 8) }
        },
        14: {
            title: "<span class='c1'>拘谞之力</span>",
            description: "基于<span class='c1'>五彩能量</span>和[飞升的点数]获得拘谞力量",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                if (hasUpgrade(this.layer, 24)) return decimalMax(upgradeEffect("3021", 13).pow(1.25)
                    .mul(decimalMax(player[302][3].power.pow(0.66), 1)), 0)
                return decimalMax(upgradeEffect("3021", 13).pow(1 / 2)
                    .mul(decimalMax(player[302][3].power.pow(0.25), 1)), 0)
            },
            cost: _D2,
            unlocked() { return hasMilestone(this.layer, 8) }
        },
        15: {
            title: "<span class='c1'>分而治之</span>",
            description: "再次反转[五效升级]效果.如果你不在挑战四中,这个升级是无意义的",
            cost: _D2,
            unlocked() { return inChallenge(this.layer, 22) }
        },
        21: {
            title: "<span class='c1'>拘谞推进</span>",
            description: "拘谞基于<span class='c1'>五彩能量</span>和自身获取自身",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return decimalMax(player[3021].points.pow(1 / 3).sub(1), 0)
                    .mul(decimalMax(player[302][3].power.pow(1.25).div(10), 1))
            },
            cost: _D3,
            unlocked() { return hasUpgrade(this.layer, this.id - 10) || hasUpgrade(this.layer, this.id) },
        },
        22: {
            title: "<span class='c1'>虹色闪电</span>",
            description: "[隔代亲]的效果基于<span class='c1'>五彩能量</span>和拘谞的较大者",
            effect() {
                return decimalMax(player[this.layer].points, player[302][3].power)
            },
            cost: _D3,
            unlocked() { return hasUpgrade(this.layer, this.id - 10) || hasUpgrade(this.layer, this.id) },
        },
        23: {
            title: "<span class='c1'>有效升级</span>",
            description: "[五效升级]的价格变为 5 拙谟",
            cost: _D3,
            unlocked() { return hasUpgrade(this.layer, this.id - 10) || hasUpgrade(this.layer, this.id) },
        },
        24: {
            title: "<span class='c1'>效果推进</span>",
            description: "改善[<span class='c1'>拘谞之力</span>]的公式",
            cost: _D3,
            unlocked() { return hasUpgrade(this.layer, this.id - 10) || hasUpgrade(this.layer, this.id) },
        },
        25: {
            title: "<span class='c1'>动态规划</span>",
            description: "拘谞上限基于拘谞增加.如果你不在挑战四中,这个升级是无意义的",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return decimalMax(player["3021"].points.sub(248.5), 0)
            },
            cost: _D3,
            unlocked() { return hasUpgrade(this.layer, this.id - 10) && inChallenge(this.layer, 22) }
        },
        31: {
            title: "<span class='c1'>天空之城</span>",
            description: "基于风力加成招谡效果",
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            effect() {
                if (hasUpgrade(this.layer, 32)) return getEffect("3022", 23, _D0).add(1).pow(1 / 5)
                return getEffect("3022", 23, _D0).add(1).log(5).add(1)
            },
            cost: _D(50),
            unlocked() { return true },
        },
        32: {
            title: "<span class='c1'>仍未结束</span>",
            description: "飜卅不再重置拙谟升级<br>且[四无忌惮]不再吞噬拘谞因为再吞后面就要爆负数了我也不知道为什么但它在1e21拘谞的地方震荡起来了会NaN",
            cost: _D(100),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        33: {
            title: "<span class='c1'>更进一步</span>",
            description: "[<span class='c1'>天空之城</span>]的公式更好",
            cost: _D(150),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        34: {
            title: "<span class='c1'>最终之证</span>",
            description: "[三无产品]充能效率最终增加拘谞池容量的1%",
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            effect() {
                return layers[3021].clickables[11].limit().mul(0.01)
            },
            cost: _D(200),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        35: {
            title: "<span class='c1'>拜谢之力</span>",
            description: "每秒自动获得1000%飞升时获得的拜谢量",
            effect() {
                return 10
            },
            cost: _D(300),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        41: {
            title: "<span class='c1'>最终拜谢</span>",
            description: "拜谢效果公式更好",
            cost: _D(400),
            unlocked() { return hasUpgrade(this.layer, 35) },
        },
    },
    milestones: {
        1: {
            requirementDescription() { return `1 拚谠 | 隔代亲` },
            effectDescription() { return `这是你的第一个拚谠,也就是说你距离拜谢更进一步!基于拚谠获得更多拘谞<br>效果: ×${format(this.effect())}` },
            done() { return player[this.layer].points.gte(1) },
            effect() { return getEffect(this.layer, 22, player[this.layer].points).add(1).pow(1 / 3) }
        },
        2: {
            requirementDescription() { return `2 拚谠 | 容量利用` },
            effectDescription() { return `你都已经20了,是时候收集小道具了,[三无产品]充能效率最终增加拘谞池容量的5%<br>效果: +${format(this.effect())} (硬上限在${format(_D(100).mul(layers[3024].effect()))})` },
            done() { return player[this.layer].points.gte(2) },
            effect() {
                let e = layers[3021].clickables[11].limit().mul(
                    inChallenge(this.layer, 21) ? 0.03 : 0.05
                )

                let l = _D(100).mul(layers[3024].effect())
                if (e.gte(l)) e = l

                return e
            }
        },
        3: {
            requirementDescription() { return `3 拚谠 | 唬人的家伙` },
            effectDescription() { return `我们无论遇到什么困难,都不要怕,[六根清净]的价格基于拚谠降低<br>效果: ×${formatPersent(this.effect())}` },
            done() { return player[this.layer].points.gte(3) },
            effect() { return _D(0.85).pow(player[this.layer].points.pow(0.75)) }
        },
        4: {
            requirementDescription() { return `4 拚谠 | 乾犭瓜离光` },
            effectDescription() { return `[九经沙场]在飜卅时不会重置<br>但是,正如你看到的,神人作者没有保留它的必须升级,所以它暂时没有效果!` },
            done() { return player[this.layer].points.gte(4) },
        },
        5: {
            requirementDescription() { return `5 拚谠 | 升级十二是` },
            effectDescription() { return `解锁一系列新的拙谟升级<br>为了强迫你购买这些升级,飜卅价格被提升` },
            done() { return player[this.layer].points.gte(5) },
        },
        6: {
            requirementDescription() { return `6 拚谠 | 加一些新东西` },
            effectDescription() { return `解锁<span class="c1">五彩能量</span><br>它很好看,飜卅后你会获得等量<span class="c1">五彩能量</span>` },
            done() { return player[this.layer].points.gte(6) },
        },
        7: {
            requirementDescription() { return `7 <span class="c1">五彩能量</span> | <span class="c1">七彩虹</span>` },
            effectDescription() { return `<span class="c1">五彩能量升级和此里程碑永不重置</span>` },
            done() { return player[302][3].power.gte(7) },
        },
        8: {
            requirementDescription() { return `8 拚谠 | 彩虹的力量` },
            effectDescription() { return `解锁<span class="c1">五彩能量</span>升级<br>你会喜欢它们的` },
            done() { return player[this.layer].points.gte(8) },
        },
    },
    onPrestige(gain) {
        gain = _D(gain)

        player[302].unlock[1] = true
        player[302][1].level = _D0
        player[302][1].exp = _D0

        player[302][3].power = player[302][3].power.add(
            gain
        )
    },
    doReset(resettingLayer) {
        if (["3024"].includes(resettingLayer)) {
            let ch = hasMilestone(this.layer, 7)

            if (resettingLayer == "3024") {
                player[302].fool = true
                layerDataReset(this.layer, ["challenges", "milestones", ...(hasMilestone(this.layer, 7) ? ["upgrades"] : [])])
            } else {
                layerDataReset(this.layer, ["challenges", ...(hasMilestone(this.layer, 7) ? ["upgrades"] : [])])
            }

            if (ch) {
                if (!player[this.layer].milestones.includes(7)) player[this.layer].milestones.push(7)
                if (!player[this.layer].milestones.includes(8)) player[this.layer].milestones.push(8)
            }

        }
    },
    canBuyMax() { return hasChallenge(this.layer, 22) },
    hotkeys: [
        { key: "2", description: "[302] 2: 飜卅", onPress() { doReset(this.layer) } },
    ],
    layerShown() { return player[302].unlock[0] },
    branches: ["3024"],
});