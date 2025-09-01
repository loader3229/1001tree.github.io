addLayer("102", {
    symbol: "⛏️",
    resource: "Hash点",
    row: 1,
    position: 2,
    color: "#a0a0a0",
    update(diff) {
        if (player._102.pause) return

        player._102.tickt = player._102.tickt.add(diff)
        player._102.cold = decimalMax(player._102.cold.sub(diff), _D0)

        if (player._102.tickt.gte(this.getTickTime())) {
            player._102.tickt = player._102.tickt.sub(this.getTickTime())

            if (hasUpgrade(this.layer, 13)) {
                this.nextHash((buyableEffect(this.layer, 12) - 0))
            }

        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
        "main-display",
        ["display-text", function () {
            return `你挖到了 ${player._102.level} 狐币,挖到 500 个以完成世界`
        }],
        "blank",
        ["display-text", function () {
            return `<div 
            class="tbox">
            当前检验 ${player._102.now}<br>
            <span class="nmpt">${s256(`${player._102.now}${player._102.salt}`)}</span><br>
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
        return s256(
            `${(
                Math.floor(getYFromOrderedPoints([
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
                    [114513, 10000],
                ], player._102.level) * player._102.rnd + 1)
            ).toString()}${player._102.salt}`)
    },
    nextHash(num) {
        for (let i = 0; i < num; i++) {
            player._102.now++
            if (this.checkHash(s256(`${player._102.now}${player._102.salt}`), this.getTarget())) {
                player._102.now = 0
                player._102.salt = Date.now()
                player._102.rnd = Math.random()
                player._102.level++
            }
        }
    },
    checkHash(a, b) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] == b[i]) player[this.layer].points = player[this.layer].points.add(1)
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
            done() { return player._102.level >= 10 },
            effect() { return _D(0.1) }
        },
        2: {
            requirementDescription() { return `30狐币` },
            effectDescription() { return `你有一些钱,增加批量计算力量50%` },
            done() { return player._102.level >= 30 },
            effect() { return _D(0.5) }
        },
        3: {
            requirementDescription() { return `100狐币` },
            effectDescription() { return `你有很多钱,增加批量计算力量100%` },
            done() { return player._102.level >= 100 },
            effect() { return _D1 }
        },
        4: {
            requirementDescription() { return `300狐币` },
            effectDescription() { return `你有最多钱,增加批量计算力量200%` },
            done() { return player._102.level >= 300 },
            effect() { return _D2 }
        },
        5: {
            requirementDescription() { return `500狐币` },
            effectDescription() { return `完成世界 获得一个梦力` },
            done() { return player._102.level >= 500 },
            onComplete() {
                completeWorld(this.layer)
            },
        }
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
            cost(x) { return _D(64).add(_D(32).mul(x.pow(1.1))) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return _D1.add(getBuyableAmount(this.layer, this.id))
                .mul(_D1
                    .add(getMilestoneEffect(this.layer,1,0))
                    .add(getMilestoneEffect(this.layer,2,0))
                    .add(getMilestoneEffect(this.layer,3,0))
                    .add(getMilestoneEffect(this.layer,4,0))
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
            display() { return `计算下一个数的Hash${this.canClick() ? "" : `<br>冷却 ${formatTime(player._102.cold)}`}` },
            canClick() {
                return player._102.cold.lte(0)
            },
            onClick() {
                player._102.cold = getEffect(this.layer, 12, getEffect(this.layer, 11, _D5))
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
                player._102.pause = !player._102.pause
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
    layerShown() { return getGridData('main', this.layer) },
    hotkeys: [
    ],
});