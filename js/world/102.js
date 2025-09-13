addLayer("102", {
    symbol: "⛏️",
    resource: "Hash点",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        if (player[this.layer].pause) return

        player[this.layer].tickt = player[this.layer].tickt.add(diff)
        player[this.layer].cold = decimalMax(player[this.layer].cold.sub(diff), _D0)

        if (player[this.layer].tickt.gte(this.getTickTime())) {
            player[this.layer].tickt = player[this.layer].tickt.sub(this.getTickTime())

            if (hasUpgrade(this.layer, 13)) {
                this.nextHash((buyableEffect(this.layer, 12) - 0))
            }

        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
			tickt: _D0,
			now: 0,
			rnd: Math.random(),
			level: 0,
			cold: _D0,
			salt: Date.now(),
			pause: false,
			right: 3
        }
    },
    type: "none",
    tabFormat: [
        "main-display",
        ["display-text", function () {
            return `你挖到了 ${player[this.layer].level} 狐币,挖到 500 个以完成世界`
        }],
        "blank",
        ["display-text", function () {
            if (!hasMilestone(this.layer, 11)) return `<div 
            class="tbox">
            当前检验 ${player[this.layer].now}<br>
            <span class="nmpt">${s256(`${player[this.layer].now}${player[this.layer].salt}`)}</span><br>
            <br>
            目标内容<br>
            <span class="nmpt">${layers[this.layer].getTarget()}</span>
            </div>`
        }],
        "blank",
        "clickables",
        "blank",
        "buyables",
        "blank",
        "upgrades",
        "milestones"
    ],
    getTickTime() {
        let s = divNum(buyableEffect(this.layer, 11))

        return s
    },
    getTarget() {
        return s256(`${player[this.layer].right.toString()}${player[this.layer].salt}`)
    },
    nextHash(num) {
        if (hasMilestone(this.layer, 11)) {
            while (num > 0) {
                let target = player[this.layer].right - player[this.layer].now
                if (target > num) {
                    player[this.layer].now += player[this.layer].now;
                    num = 0
                } else {
                    num -= target
                    this.next()
                    player[this.layer].points = player[this.layer].points.add(_D(64).mul(getMilestoneEffect(this.layer, 9, 1)))
                    continue
                }
                if (Math.random() < 0.0005) {
                    this.next()
                    player[this.layer].points = player[this.layer].points.add(_D(64).mul(getMilestoneEffect(this.layer, 9, 1)))
                }
            }
        } else {
            for (let i = 0; i < num; i++) {
                player[this.layer].now++
                if (this.checkHash(s256(`${player[this.layer].now}${player[this.layer].salt}`), this.getTarget())) {
                    this.next()
                    return
                }
                if (hasMilestone(this.layer, 10) && Math.random() < 0.0005) {
                    this.next()
                }
            }
        }
    },
    next() {
        player[this.layer].now = 0
        player[this.layer].level++
        player[this.layer].salt = Date.now()
        player[this.layer].rnd = Math.random()
        player[this.layer].right = Math.floor(getYFromOrderedPoints([
            [0, 6],
            [7, 30],
            [10, 100],
            [30, 200],
            [50, 400],
            [70, 600],
            [90, 800],
            [110, 1000],
            [130, 1500],
            [150, 2000],
            [170, 3000],
            [190, 4000],
            [210, 5000],
            [230, 6000],
            [250, 7000],
            [300, 8000],
            [400, 9000],
            [500, 10000],
            [1.79e308, 10000],
        ], player[this.layer].level) * player[this.layer].rnd + 1)
    },
    checkHash(a, b) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] == b[i]) player[this.layer].points = player[this.layer].points.add(
                _D1.mul(getMilestoneEffect(this.layer, 9, 1))
            )
        }

        if (a == b) return true
    },
    upgrades: {
        11: {
            title: "龟速哈希",
            description: "手动Hash计算冷却改为3秒",
            effect() {
                return _D3
            },
            cost: _D(64),
        },
        12: {
            title: "秒速哈希",
            description: "手动Hash计算冷却改为1秒",
            effect() {
                return _D1
            },
            cost: _D(128),
        },
        13: {
            title: "自动哈希",
            description: "每秒自动进行Hash计算",
            cost: _D(192),
        },
        14: {
            title: "快速哈希",
            description: "解锁两个可购买",
            cost: _D(256),
        },
        15: {
            title: "把这个东西关掉",
            description: "你开始卡了吗?<br>解锁暂停键",
            cost: _D(5e5),
        },
    },
    milestones: {
        1: {
            requirementDescription() { return `10狐币` },
            effectDescription() { return `你有一点钱,增加批量计算力量10%` },
            done() { return player[this.layer].level >= 10 },
            effect() { return _D(0.1) }
        },
        2: {
            requirementDescription() { return `30狐币` },
            effectDescription() { return `你有一些钱,增加批量计算力量50%` },
            done() { return player[this.layer].level >= 30 },
            effect() { return _D(0.5) },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        3: {
            requirementDescription() { return `100狐币` },
            effectDescription() { return `你有很多钱,增加批量计算力量100%` },
            done() { return player[this.layer].level >= 100 },
            effect() { return _D1 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        4: {
            requirementDescription() { return `300狐币` },
            effectDescription() { return `你有最多钱,增加批量计算力量200%` },
            done() { return player[this.layer].level >= 300 },
            effect() { return _D2 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        5: {
            requirementDescription() { return `500狐币` },
            effectDescription() { return `完成世界 获得一个梦力` },
            done() { return player[this.layer].level >= 500 },
            onComplete() {
                completeWorld(this.layer)
            },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        6: {
            requirementDescription() { return `1000狐币` },
            effectDescription() { return `前方似乎一片荆棘,但没关系,有我在这` },
            done() { return player[this.layer].level >= 1000 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        7: {
            requirementDescription() { return `1500狐币` },
            effectDescription() { return `无关紧要的加成,大幅降低批量计算价格` },
            done() { return player[this.layer].level >= 1500 },
            effect() { return 0.8 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        8: {
            requirementDescription() { return `2000狐币` },
            effectDescription() { return `批量计算最终力量基于狐币加成 效果:+${formatPersent(this.effect())}` },
            done() { return player[this.layer].level >= 2000 },
            effect() {
                let e = player[this.layer].level / 2000
                if (e > 10) e = (e / 10) ** 0.9 * 10
                if (e > 50) e = (e / 100) ** 0.8 * 50
                if (e > 250) e = (e / 1000) ** 0.7 * 250

                return e
            },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        9: {
            requirementDescription() { return `3000狐币` },
            effectDescription() { return `Hash点获取基于狐币加成 效果:+${formatPersent(this.effect())}` },
            done() { return player[this.layer].level >= 3000 },
            effect() { return (player[this.layer].level - 2500) / 500 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        10: {
            requirementDescription() { return `4000狐币` },
            effectDescription() { return `每次判定失败后有0.05%概率直接获得狐币` },
            done() { return player[this.layer].level >= 4000 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        11: {
            requirementDescription() { return `6000狐币` },
            effectDescription() { return `不再需要Hash判定,Hash匹配不再生产Hash点` },
            done() { return player[this.layer].level >= 6000 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
        12: {
            requirementDescription() { return `114514狐币` },
            effectDescription() { return `获得1个额外梦力` },
            onComplete() {
                player.main.points = player.main.points.add(1)
            },
            done() { return player[this.layer].level >= 114514 },
            unlocked() { return hasMilestone(this.layer, this.id - 1) },
        },
    },
    buyables: {
        11: {
            title: "<h2>刻速度</h2>",
            display() { return `<h3>目前的刻速度是<br>${format(this.effect())} 刻/秒<br><br>花费: ${format(this.cost())}</h3> Hash点` },
            cost(x) { return _D10.add(_D1.mul(x.pow(1.5))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return _D1.add(getBuyableAmount(this.layer, this.id).div(8))
            },
            unlocked() {
                return hasUpgrade(this.layer, 14)
            },
            purchaseLimit: 152
        },
        12: {
            title: "<h2>批量计算</h2>",
            display() { return `<h3>目前每刻计算<br>${format(this.effect())} Hash<br><br>花费: ${format(this.cost())}</h3> Hash点` },
            cost(x) { return _D(64).add(_D(32).mul(x.pow(getMilestoneEffect(this.layer, 7, 1.1)))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return _D1.add(getBuyableAmount(this.layer, this.id))
                    .mul(_D1
                        .add(getMilestoneEffect(this.layer, 1, 0))
                        .add(getMilestoneEffect(this.layer, 2, 0))
                        .add(getMilestoneEffect(this.layer, 3, 0))
                        .add(getMilestoneEffect(this.layer, 4, 0))
                        .mul(getMilestoneEffect(this.layer, 8, 1))
                    )
            },
            unlocked() {
                return hasUpgrade(this.layer, 14)
            },
            purchaseLimit: 5000
        },
    },
    clickables: {
        11: {
            title: "计算Hash",
            display() { return `计算下一个数的Hash${this.canClick() ? "" : `<br>冷却 ${formatTime(player[this.layer].cold)}`}` },
            canClick() {
                return player[this.layer].cold.lte(0)
            },
            onClick() {
                player[this.layer].cold = getEffect(this.layer, 12, getEffect(this.layer, 11, _D5))
                layers[this.layer].nextHash(1)
            },
            style: {
                minHeight: "90px",
                width: "160px"
            }
        },
        12: {
            title: "暂停/继续游戏",
            canClick() {
                return true
            },
            onClick() {
                player[this.layer].pause = !player[this.layer].pause
            },
            style: {
                minHeight: "90px",
                width: "160px"
            },
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});