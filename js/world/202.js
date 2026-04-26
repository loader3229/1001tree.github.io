addLayer("202", {
    symbol: "⏳️",
    resource: "点数",
    color: "hsl(0,50%,50%)",
    update(diff) {
        if (player.pause[this.layer]) return
        let ltl = layers[this.layer];

        let ic = this.getChallenge()

        player[this.layer].dB = player[this.layer].dB.mul(_D(0.35).pow(diff))
        if (player[this.layer].dB.lte(0.5)) player[this.layer].dB = _D0

        if (player[this.layer].tickt.gte(this.getTickTime())) {
            player[this.layer].tickt = player[this.layer].tickt.sub(this.getTickTime())

            let p = this.getPoint()
            let c = _D0
            let d = _D1

            if (p.lt(0)) {
                p = p.neg()
                d = d.neg()
            }

            if (p.gte(1)) {
                c = Decimal.floor(p)
                p = p.sub(c)
            }

            if (ic == 121 && _DR().lte(
                challengeEffect(this.layer, 121)
            )
            ) {
                player[this.layer].points = player[this.layer].points.sub(c.mul(d))
                if (_DR().lte(p)) {
                    player[this.layer].points = player[this.layer].points.sub(_D1.mul(d))
                }
            } else {
                player[this.layer].points = player[this.layer].points.add(c.mul(d))
                if (_DR().lte(p)) {
                    player[this.layer].points = player[this.layer].points.add(_D1.mul(d))
                }
            }

            if (ic == 31) {
                let meffect = []
                for (let i = 1; i < 4; i++) {
                    for (let j = 1; j < 4; j++) {
                        let id = i * 100 + j
                        meffect[ltl.grid.getLayer(id)] = ltl.grid.getEffect(getGridData(this.layer, id), id)
                    }
                }

                for (let i = 0; i < meffect.length; i++) {
                    player[this.layer].mul[i] = player[this.layer].mul[i].add(meffect[i])
                }

                if (hasUpgrade(this.layer, 3113)) {
                    for (let i = 3; i > 0; i--) {
                        for (let j = 3; j > 0; j--) {
                            let id = i * 100 + j
                            let d = getGridData(this.layer, id)
                            while (player[this.layer].points.gte(layers[this.layer].grid.getPrice(d, id))) {
                                if (!hasUpgrade(this.layer, 3114)) player[this.layer].points = player[this.layer].points.sub(layers[this.layer].grid.getPrice(d, id))
                                setGridData(this.layer, id, d.add(1))
                                d = d.add(1)
                            }
                        }
                    }
                }
            }

        }

        if (ic) {
            player[this.layer].tickt = player[this.layer].tickt.add(diff)
            player[this.layer].t = player[this.layer].t.add(diff)
        }
    },
    getTickTime() {
        let s = _D1
        let ic = this.getChallenge()

        if (ic == 31) s = divNum(decimalMax(
            getEffect(this.layer, 3131, _D1),
            getEffect(this.layer, 3132, _D1),
            getEffect(this.layer, 3133, _D1),
            getEffect(this.layer, 3134, _D1),
            getEffect(this.layer, 3135, _D1),
            getEffect(this.layer, 3136, _D1),
        ))

        if (ic == 122) s = _D3
        if (ic == 121 && hasUpgrade(this.layer, 12112)) s = divNum(2)

        return s
    },
    keyList() {
        let seed = player[this.layer].keyseed

        const a = 1664525;
        const c = 1013904223;
        const m = Math.pow(2, 32);

        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let currentSeed = seed;

        for (let i = arr.length - 1; i > 0; i--) {
            currentSeed = (a * currentSeed + c) % m;
            const j = Math.floor((currentSeed / m) * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
			t: _D0,
			tickt: _D0,
			keyseed: Date.now(),
			dB: _D1,
			mul: [_D1, _D1, _D1, _D1, _D1, _D1, _D1, _D1, _D1]
        }
    },
    type: "none",
    tabFormat: {
        升级: {
            content: [
                ["display-text", function () {
                    return `你来啦!我为你准备了一些工作,快来看看吧!`
                }],
                "blank",
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["clickable", 11],
                "blank",
                ["upgrades", [1]]
            ]
        },
        工作: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["challenges", [1, 2, 3]]
            ]
        },
        挑战: {
            content: [
                ["display-text", function () {
                    return `这里是一些更艰难的挑战,如果你想的话<br>你可以在完成它们之后获得一个额外的梦力(而不仅仅是回收你支付的梦力)!`
                }],
                "blank",
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["challenges", [11, 12, 13]]
            ]
        },
        工作3: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["challenge", 21],
                "blank",
                ["upgrades", [211]]
            ],
            unlocked() {
                return inChallenge(202, 21) && hasUpgrade(202, 12)
            }
        },
        工作4: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["challenge", 22],
                "blank",
                ["upgrades", [221, 222, 223]]
            ],
            unlocked() {
                return inChallenge(202, 22) && hasUpgrade(202, 12)
            }
        },
        工作5: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["display-text", function () {
                    if (inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12)) return `<div 
                    class="tbox">
                    <span class="p1">${format(player[this.layer].mul[0])} </span>×
                    <span class="p2">${format(player[this.layer].mul[1])} </span>×
                    <span class="p3">${format(player[this.layer].mul[2])} </span>×<br>
                    <span class="p4">${format(player[this.layer].mul[3])} </span>×
                    <span class="p5">${format(player[this.layer].mul[4])} </span>×
                    <span class="p6">${format(player[this.layer].mul[5])} </span>×<br>
                    <span class="p7">${format(player[this.layer].mul[6])} </span>×
                    <span class="p8">${format(player[this.layer].mul[7])} </span>×
                    <span class="p9">${format(player[this.layer].mul[8])} </span>=
                    <br>
                    <span class="pn">ΔP ← <span class="p1">${format(layers[this.layer].getMulPoint())}<sup>${format(layers[this.layer].getMulPower())}</sup></span> × <span class="p1">${format(layers[this.layer].getMulMulti())}</span> (<span class="p1">${formatWhole(divNum(layers[this.layer].getTickTime()))}</span>tps)
                    <br>
                    ΔP = <span class="p1">${format(layers[this.layer].getMulGetPoint())}</span>&ensp;&ensp;
                    P = <span class="p1pt">${format(player[this.layer].points)}</span>
                    </span>
                    </div>`
                }],
                "blank",
                ["clickable", 13],
                "grid",
                ["upgrades", [312, 313, 314, 315, 311]],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                "blank",
                ["challenge", 31],
            ],
            unlocked() {
                return inChallenge(202, 31) && hasUpgrade(202, 12)
            }
        },
        挑战3: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p1pt"> ${format(player[this.layer].points)} </h2>点数`
                }],
                ["display-text", function () {
                    return `+${formatSmall(layers[this.layer].getPoint())}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["challenge", 121],
                "blank",
                ["bar", "dB"],
                "blank",
                ["clickable", 12],
                ["upgrades", [1211, 1212]]
            ],
            unlocked() {
                return inChallenge(202, 121) && hasUpgrade(202, 12)
            }
        },
        挑战4: {
            content: [
                ["display-text", function () {
                    return `密码是 <h1 class="p1pt">${player[this.layer].points.toString()}</h1> 吗?`
                }],
                ["display-text", function () {
                    return `+${layers[this.layer].getPoint().toString()}/刻`
                }],
                ["display-text", function () {
                    return `挑战已经持续了 ${format(player[this.layer].t)} 秒`
                }],
                ["display-text", function () {
                    if (layers[this.layer].getTickTime().gte(1)) return `距离下一刻 ${formatTime(layers[this.layer].getTickTime().sub(player[this.layer].tickt))}`
                }],
                "blank",
                ["challenge", 122],
                "blank",
                ["upgrades", [1221, 1222, 1223]]
            ],
            unlocked() {
                return inChallenge(202, 122) && hasUpgrade(202, 12)
            }
        }
    },
    getPoint() {
        let p = _D0
        let ic = this.getChallenge()

        if (ic == 11) p = _D(pow10(-2))
        else if (ic == 12) p = _D(pow2(-9))
        else if (ic == 21) p = _D(divNum(getEffect(this.layer, 2111, _D(10000)).mul(_D(2).pow(player[this.layer].t))))
        else if (ic == 22) p = _D(pow10(-2).neg())
        else if (ic == 31) p = this.getMulGetPoint()

        else if (ic == 111) p = _D(pow10(-2))
        else if (ic == 112) p = _D(pow10(-1))
        else if (ic == 121) p = _D1
        else if (ic == 122) p = _D0
            .add(getEffect(this.layer, 12211, 0))
            .add(getEffect(this.layer, 12212, 0))
            .add(getEffect(this.layer, 12213, 0))
            .add(getEffect(this.layer, 12221, 0))
            .add(getEffect(this.layer, 12222, 0))
            .add(getEffect(this.layer, 12223, 0))
            .add(getEffect(this.layer, 12231, 0))
            .add(getEffect(this.layer, 12232, 0))
            .add(getEffect(this.layer, 12233, 0))
            .mul(player[this.layer].points == layers[this.layer].challenges[122].target ? 0 : 1)

        //31挑战的升级效果不在此计算
        if (ic == 121 || ic == 31) return p

        p = p
            .mul(getEffect(this.layer, 11, 1))

        if (ic == 111 || ic == 112) return p

        p = p
            .mul(getEffect(this.layer, 13, 1))

        if (ic == 22) {
            p = p
                //基础加区
                .add(getEffect(this.layer, 2211, 0))
                //普通乘区
                .mul(getEffect(this.layer, 2213, 1))
                //普通加区
                .add(getEffect(this.layer, 2212, 0))
                .add(getEffect(this.layer, 2223, 0))
                //最终乘区
                .mul(getEffect(this.layer, 2231, 1))

            if (
                hasUpgrade(this.layer, 2232) &&
                p.abs().lte(pow10(-16)) &&
                p.neq(0)
            ) {
                p = _D1
            }
        }

        return p
    },
    getMulPoint() {
        let p = _D1
        for (let i = 0; i < 9; i++) {
            p = p.mul(player[this.layer].mul[i])
        }
        return p
    },
    getMulMulti() {
        return decimalMax(
            getEffect(this.layer, 3151, 1),
            getEffect(this.layer, 3152, 1),
            getEffect(this.layer, 3153, 1),
            getEffect(this.layer, 3154, 1),
            getEffect(this.layer, 3155, 1),
            getEffect(this.layer, 3156, 1),
        )
            .mul(getEffect(this.layer, 11, 1))
            .mul(getEffect(this.layer, 13, 1))
    },
    getMulPower() {
        return decimalMax(
            getEffect(this.layer, 3121, 1),
            getEffect(this.layer, 3122, 1),
            getEffect(this.layer, 3123, 1),
            getEffect(this.layer, 3124, 1),
            getEffect(this.layer, 3125, 1),
            getEffect(this.layer, 3126, 1),
        ).pow(getEffect(this.layer, 3116, 1))
    },
    getMulGetPoint() {
        return this.getMulPoint().pow(this.getMulPower()).mul(this.getMulMulti())
    },
    getChallenge() {
        for (i in layers[this.layer].challenges) {
            if (inChallenge(this.layer, i)) return i
        }

        return false
    },
    grid: {
        rows: 3,
        cols: 3,
        getLayer(id) {
            let r = ~~(id / 100)
            let c = id % 100
            return r * 3 + c - 4
        },
        getLastId(id) {
            if (id == 101) return false

            let c = id % 100
            if (c == 1) {
                return id - 98
            } else {
                return id - 1
            }
        },
        getStartData(id) {
            return _D0
        },
        getUnlocked(id) {
            if (!(inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12))) return false

            if (!this.getLastId(id)) return true

            if (getGridData(this.layer, this.getLastId(id)).neq(_D0)) return true
            else return false
        },
        getCanClick(data, id) {
            return player[this.layer].points.gte(this.getPrice(data, id))
        },
        getPrice(data, id) {
            let l = _D(this.getLayer(id))

            let p = l.add(1).div(20).add(1.1)
            let d = pow10(pow2(l))

            return d.mul(p.pow(data.pow(1.03)))
        },
        getEffect(data, id) {
            let l = _D(this.getLayer(id))

            let d = _D4.pow(l).div(200)

            return d.mul(data).pow(
                decimalMax(
                    getEffect(this.layer, 3141, 1),
                    getEffect(this.layer, 3142, 1),
                    getEffect(this.layer, 3143, 1),
                    getEffect(this.layer, 3144, 1),
                    getEffect(this.layer, 3145, 1),
                    getEffect(this.layer, 3146, 1),
                )
            )
        },
        onClick(data, id) {
            if (hasUpgrade(this.layer, 3111)) {
                let d = data
                while (player[this.layer].points.gte(this.getPrice(d, id))) {
                    if (!hasUpgrade(this.layer, 3114)) player[this.layer].points = player[this.layer].points.sub(this.getPrice(d, id))
                    setGridData(this.layer, id, d.add(1))
                    d = d.add(1)
                }
            } else {
                if (!hasUpgrade(this.layer, 3114)) player[this.layer].points = player[this.layer].points.sub(this.getPrice(data, id))
                setGridData(this.layer, id, data.add(1))
            }
        },
        getTitle(data, id) {
            let b
            if (id == 101) b = "hsl(0,80%,30%)"
            else if (id == 102) b = "hsl(40,80%,30%)"
            else if (id == 103) b = "hsl(70,80%,30%)"
            else if (id == 201) b = "hsl(140,80%,30%)"
            else if (id == 202) b = "hsl(170,80%,30%)"
            else if (id == 203) b = "hsl(200,80%,30%)"
            else if (id == 301) b = "hsl(250,80%,30%)"
            else if (id == 302) b = "hsl(280,80%,30%)"
            else if (id == 303) b = "hsl(0,0%,30%)"

            return `<span style="font-size:1.35em;color:${b}">
            你有 ${formatWhole(data)} 方块${this.getLayer(id) + 1}
            </span>`
        },
        getDisplay(data, id) {
            return `<span style="font-size:1.25em;">
            效果: ${format(this.getEffect(data, id))} 乘数${this.getLayer(id) + 1}/刻
            花费: ${format(this.getPrice(data, id))} 点数
            </span>`
        },
        getStyle(id) {
            return {
                width: "240px",
                height: "80px"
            }
        }
    },
    bars: {
        dB: {
            direction: RIGHT,
            width() {
                return 40 + player[this.layer].dB.div(25).pow(0.25).mul(25).mul(25).toNumber()
            },
            height: 40,
            display() {
                return player[this.layer].dB.gte(0.5) ? `<span style="color:var(--points)">${formatWhole(player[this.layer].dB)}斤鸭梨</span>` : "🤔"
            },
            progress() {
                return player[this.layer].dB.mul(7).pow(1.25).div(7).div(20)
            },
            unlocked() { return inChallenge(this.layer, 121) && hasUpgrade(this.layer, 12) }
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `
				<span><h3>${"与时俱进"}</h3></span><br>
				<span>${"挑战中时间加成点数获取"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>`
            },
            effect() {
                if (layers[this.layer].getChallenge() == 111) e = player[this.layer].t.add(1).pow(-0.5)
                else e = player[this.layer].t.add(1).pow(0.5)

                return e.pow(getChallengeEffect(this.layer, 111, 1))
            },
            unlocked() { return hasChallenge(this.layer, 11) }
        },
        12: {
            fullDisplay() {
                return `
				<span><h3>${"有偿购物"}</h3></span><br>
				<span>${"从工作3开始,将会出现工作内升级"}</span>`
            },
            unlocked() { return hasChallenge(this.layer, 12) }
        },
        13: {
            fullDisplay() {
                return `
				<span><h3>${"已经重复无数次的无趣开头怎么又出现了而且这也不是开头啊我真的服了"}</h3></span><br>
				<span>${"点数增幅点数获取"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>`
            },
            effect() {
                return decimalMax(player[this.layer].points,0).add(1).log10().add(1)
            },
            unlocked() { return hasChallenge(this.layer, 22) }
        },
        2111: {
            fullDisplay() {
                return `
				<span><h3>${"不削能玩?"}</h3></span><br>
				<span>${"将工作3概率常数项改为10"}</span><br>
                <span>
                效果: /${format(this.effect())}
			    </span><br>
                需要: 10秒挑战内时间`
            },
            canAfford() {
                return player[this.layer].t.gte(10)
            },
            effect() {
                return _D(10)
            },
            unlocked() { return inChallenge(this.layer, 21) && hasUpgrade(this.layer, 12) }
        },
        2211: {
            fullDisplay() {
                return `
				<span><h3>${"稳扎稳打"}</h3></span><br>
				<span>${"基础点数获取增加1/1000"}</span><br>
                <span>
                效果: +${format(this.effect())}
			    </span><br>
                花费: 1点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(1)
            },
            effect() {
                return _D(divNum(1000))
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2212: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2212) ? "电信诈骗" : "投机主义"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2212) ? "你获得了每秒-5点数的黑利!" : "花费大价钱购买一个投资产品"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2212) ? `-${format(this.effect())}` : "?"}
			    </span><br>
                花费: 1,000,000点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(1000000)
            },
            effect() {
                return _D(-5)
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2213: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2213) ? "废物老板" : "打工一族"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2213) ? "你的工作阅历让你以后找工作更容易,你很快就跳槽了,这让你的点数获取×1.1" : "你决定去打工,但没想到对面要求你先支付10,000点数保证金"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2213) ? `×${format(this.effect())}` : "?"}
			    </span><br>
                花费: 10,000点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(10000)
            },
            effect() {
                return _D(1.1)
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2221: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2221) ? "似说如说" : "求知若渴"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2221) ? "其实你可以通过退出挑战来把你扣除的所有点数清零,也许你知道" : "你求知若渴,所以你决定向我支付100,000点数以获得一个秘密"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2221) ? this.effect() : "?"}
			    </span><br>
                花费: 100,000点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100000)
            },
            effect() {
                return "这个升级的内部id为2221"
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2222: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2222) ? "秘钥之名" : "大智若愚"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2222) ? "这样,我在上一个升级开了一个讲座,你去听听就知道了" : "暂时失去10点数,你将很快拿回它们,请相信我"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2222) ? `${this.effect()}` : "?"}
			    </span><br>
                花费: 10点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(10)
            },
            effect() {
                return "价格是二进制!"
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2223: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2223) ? "老生常谈" : "老弱病残"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2223) ? "原来这个老爷爷是想被踩踩背了,你踩了他的背,爆出来一个生成器,每秒给你0.0099点数" : "你在路上捡到了100块钱,但是旁边有一个老人说这是他的,并且让你赔他100点数,你会赔吗?"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2223) ? `+${format(this.effect())}` : "?"}
			    </span><br>
                花费: 100点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100)
            },
            effect() {
                return _D(0.0099)
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2231: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2231) ? "你选对了" : "以贵为美"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2231) ? "但是你选错了,将点数获取最终×0,唉,败家啊" : "甭管什么好坏,贵的就是对的,我只相信一分钱一分货,不管这玩意要多少钱"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2231) ? `×${format(this.effect())}` : "?"}
			    </span><br>
                花费: 10,000,000点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(10000000)
            },
            effect() {
                return _D0
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2232: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2232) ? "话说重了" : "程序正义"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2232) ? "当最终点数获取绝对值小于1e-16且不等于0时,将其改为1" : "你是一个非常厌恶浮点数的程序员,浮点数误差让你恶心,杀死它们是你的责任"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 2232) ? `=${format(this.effect())}` : "?"}
			    </span><br>
                花费: 100,000,000点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100000000)
            },
            effect() {
                return _D1
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        2233: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 2233) ? "已读不回" : "最高指示"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 2233) ? "我们离婚吧" : "为了证明你的富有,请你支付我1000点数,这不是请求,这是命令!"}</span><br><br>
                花费: 1,000点数`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(1000)
            },
            unlocked() { return inChallenge(this.layer, 22) && hasUpgrade(this.layer, 12) }
        },
        3111: {
            title: "QoL 1",
            description: "购买方块时购买最大方块数",
            cost: pow10(5),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3112: {
            title: "QoL 2",
            description: "解锁批量最大购买按钮(优先购买高级方块)",
            cost: pow10(15),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3113: {
            title: "QoL 3",
            description: "自动购买方块",
            cost: pow10(50),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3114: {
            title: "QoL 4",
            description: "购买方块免费",
            cost: pow10(150),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3115: {
            title: "FlY 1",
            description: "[核反应堆]效果受指数影响",
            cost: pow10(1600),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3116: {
            title: "BooM",
            description: "指数^1.11",
            effect() {
                return _D(1.11)
            },
            cost: pow10(3000),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3121: {
            title: "微小的进度",
            description: "指数微小地提升",
            effect() {
                return layers[this.layer].getMulPoint().pow(0.05).log(10000).add(1)
            },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            cost: pow10(10),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3122: {
            title: "渺小的进度",
            description: "指数渺小地提升",
            effect() {
                return layers[this.layer].getMulPoint().pow(0.07).log(8000).add(1)
            },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            cost: pow10(20),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3123: {
            title: "弱小的进度",
            description: "指数弱小地提升",
            effect() {
                return layers[this.layer].getMulPoint().pow(0.1).log(6000).add(1)
            },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            cost: pow10(40),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3124: {
            title: "小的进度",
            description: "指数小地提升",
            effect() {
                return layers[this.layer].getMulPoint().pow(0.13).log(4000).add(1)
            },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            cost: pow10(80),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3125: {
            title: "普通的进度",
            description: "指数普通地提升",
            effect() {
                return layers[this.layer].getMulPoint().pow(0.16).log(2000).add(1)
            },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            cost: pow10(160),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3126: {
            title: "大的进度",
            description: "指数大地提升",
            effect() {
                return layers[this.layer].getMulPoint().pow(0.25).log(1000).add(1)
            },
            effectDisplay() {
                return `${format(this.effect())}`
            },
            cost: pow10(320),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3131: {
            title: "缓慢的速度",
            description: "刻速度变为2刻/秒",
            effect() {
                return _D2
            },
            cost: pow10(6),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3132: {
            title: "较慢的速度",
            description: "刻速度变为3刻/秒",
            effect() {
                return _D3
            },
            cost: pow10(16),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3133: {
            title: "慢的速度",
            description: "刻速度变为5刻/秒",
            effect() {
                return _D5
            },
            cost: pow10(36),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3134: {
            title: "普通的速度",
            description: "刻速度变为10刻/秒",
            effect() {
                return _D10
            },
            cost: pow10(56),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3135: {
            title: "可观的速度",
            description: "刻速度变为15刻/秒",
            effect() {
                return _D(15)
            },
            cost: pow10(136),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3136: {
            title: "最快的速度",
            description: "刻速度变为20刻/秒",
            effect() {
                return _D(20)
            },
            cost: pow10(216),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3141: {
            title: "一个人的进步",
            description: "乘数获取被人提升",
            effect() {
                return _D(1.1)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            },
            cost: pow10(14),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3142: {
            title: "一个团队的进步",
            description: "乘数获取被团队提升",
            effect() {
                return _D(1.3)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            },
            cost: pow10(24),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3143: {
            title: "一个国家的进步",
            description: "乘数获取被国家提升",
            effect() {
                return _D(1.5)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            },
            cost: pow10(44),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3144: {
            title: "一个联盟的进步",
            description: "乘数获取被联盟提升",
            effect() {
                return _D(1.7)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            },
            cost: pow10(84),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3145: {
            title: "一个时代的进步",
            description: "乘数获取被时代提升",
            effect() {
                return _D(1.9)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            },
            cost: pow10(144),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3146: {
            title: "一个宇宙的进步",
            description: "乘数获取被宇宙提升",
            effect() {
                return decimalMax(
                    getEffect(this.layer, 3121, _D1),
                    getEffect(this.layer, 3122, _D1),
                    getEffect(this.layer, 3123, _D1),
                    getEffect(this.layer, 3124, _D1),
                    getEffect(this.layer, 3125, _D1),
                    getEffect(this.layer, 3126, _D1),
                ).pow(0.425)
            },
            effectDisplay() {
                return `^${format(this.effect())}`
            },
            cost: pow10(184),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3151: {
            title: "电子",
            description: "点数获取提升",
            effect() {
                return _D(2)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: pow10(8),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3152: {
            title: "电流",
            description: "点数获取提升蛮多",
            effect() {
                return _D5
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: pow10(18),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3153: {
            title: "电池",
            description: "点数获取提升更多",
            effect() {
                return _D(20)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: pow10(38),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3154: {
            title: "电池组",
            description: "点数获取提升再多",
            effect() {
                return _D(500)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: pow10(58),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3155: {
            title: "发电机",
            description: "点数获取提升真多",
            effect() {
                return _D(40000)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: pow10(98),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        3156: {
            title: "核反应堆",
            description: "点数获取基于点数提升",
            effect() {
                let p = decimalMax(
                    getEffect(this.layer, 3121, _D1),
                    getEffect(this.layer, 3122, _D1),
                    getEffect(this.layer, 3123, _D1),
                    getEffect(this.layer, 3124, _D1),
                    getEffect(this.layer, 3125, _D1),
                    getEffect(this.layer, 3126, _D1),
                )

                let m = layers[this.layer].getMulGetPoint().add(1).log(
                    _D1.add(_D10.div(p))
                ).add(1).pow(p)

                if (hasUpgrade(this.layer, 3115)) m = m.pow(layers[this.layer].getMulPower())

                return m
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: pow10(168),
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) },
            style: { minHeight: "90px" }
        },
        12111: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 12111) ? "更公平的概率公式" : "更好的概率公式"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 12111) ? "让概率变得更公平1%" : "让概率变得更好1%"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 12111) ? `P→${format(this.effect())}` : "?"}
			    </span>`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100)
            },
            effect() {
                return divNum(2)
            },
            unlocked() { return inChallenge(this.layer, 121) && hasUpgrade(this.layer, 12) }
        },
        12112: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 12112) ? "时间要加速了" : "你的下刻何必是刻"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 12112) ? "运行速度改为每秒2刻" : "丢弃现在的废物刻速度,但是你不会吃亏的"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 12112) ? `更快的速度` : "?"}
			    </span>`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100)
            },
            unlocked() { return inChallenge(this.layer, 121) && hasUpgrade(this.layer, 12) }
        },
        12121: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 12121) ? "分贝检测仪" : "神秘妙妙工具"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 12121) ? "我去,居然是声音越大,理越大,我们有救了" : "我们有一个神秘的妙妙工具,不知道你需不需要"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 12121) ? `根据你的声音大小获得概率加成-${format(this.effect())}%` : "?"}
			    </span>`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100)
            },
            effect() {
                return player[this.layer].dB
            },
            unlocked() { return inChallenge(this.layer, 121) && hasUpgrade(this.layer, 12) }
        },
        12122: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade(this.layer, 12122) ? "鲧墓" : "妈妈"}</h3></span><br>
				<span>${hasUpgrade(this.layer, 12122) ? "滚木" : "你是一个瓦学弟,你要喊出你人生中的第一个妈妈了"}</span><br>
                <span>
                效果: ${hasUpgrade(this.layer, 12122) ? `棍母` : "?"}
			    </span>`
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(100)
            },
            unlocked() { return inChallenge(this.layer, 121) && hasUpgrade(this.layer, 12) }
        },
        12211: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[0]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[0])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12212: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[1]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[1])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12213: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[2]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[2])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12221: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[3]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[3])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12222: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[4]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[4])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12223: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[5]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[5])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12231: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[6]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[6])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12232: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[7]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[7])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
        12233: {
            fullDisplay() {
                return `
				<span style="font-size:48px">${layers[this.layer].keyList()[8]}</span>`
            },
            effect() {
                return pow10(layers[this.layer].keyList()[8])
            },
            unlocked() { return inChallenge(this.layer, 122) && hasUpgrade(this.layer, 12) }
        },
    },
    challenges: {
        11: {
            name: "抽今日人品并发现它是100",
            challengeDescription: "每秒有1/100概率获得1点数",
            goalDescription: "1 点数",
            canComplete() {
                return player[this.layer].points.gte(1)
            },
            rewardDescription: "一个升级",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            onComplete() {
                playsound("cc")
            }
        },
        12: {
            name: "参加2^(3^2)比赛",
            challengeDescription: "每秒有1/512概率获得1点数",
            goalDescription: "2 点数",
            canComplete() {
                return player[this.layer].points.gte(2)
            },
            rewardDescription: "一个升级",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            unlocked() {
                return hasChallenge(this.layer, 11)
            },
            onComplete() {
                playsound("cc")
            }
        },
        21: {
            name: "活跃度测试",
            challengeDescription() {
                return `每秒有(${formatWhole(getEffect(this.layer, 2111, 10000))}×2<sup>t</sup>)<sup>-1</sup>概率获得1点数`
            },
            goalDescription: "1 点数",
            canComplete() {
                return player[this.layer].points.gte(1)
            },
            rewardDescription: "一个反升级",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            unlocked() {
                return hasChallenge(this.layer, 12)
            },
            onComplete() {
                playsound("cc")
            }
        },
        22: {
            name: "逆向思维",
            challengeDescription: "每秒有1/100概率获得-1点数",
            goalDescription: "1 点数",
            canComplete() {
                return player[this.layer].points.gte(1)
            },
            rewardDescription: "一个升级",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            unlocked() {
                return hasChallenge(this.layer, 21)
            },
            onComplete() {
                playsound("cc")
            }
        },
        31: {
            name: "一般的增量游戏体验",
            challengeDescription: "每秒有1概率获得1点数",
            goalDescription() { return `${format(_DInf)} 点数` },
            canComplete() {
                return player[this.layer].points.gte(_DInf)
            },
            rewardDescription: "完成世界 梦力+1",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            unlocked() {
                return hasChallenge(this.layer, 22)
            },
            onComplete() {
                completeWorld(this.layer)
                playsound("cc")
            },
        },
        111: {
            name: "万事开头易,而中途难矣",
            challengeDescription: "每秒有1/100概率获得1点数,但是[与时俱进]效果反转,且其他升级无效",
            goalDescription: "1 点数",
            canComplete() {
                return player[this.layer].points.gte(1)
            },
            rewardDescription() {
                if (hasChallenge(this.layer, 112)) k = 1.01
                else k = 0.8

                return `[与时俱进]更强^${format(k)}`
            },
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            rewardEffect() {
                if (hasChallenge(this.layer, 112)) return _D(1.01)
                else return _D(0.8)
            },
            onComplete() {
                playsound("cc")
            }
        },
        112: {
            name: "万事开头难,亿事结尾难",
            challengeDescription: "每秒有1/10概率获得1点数,但是目标点数随[与时俱进]效果增加,且其他升级无效",
            goalDescription() { return `${formatWhole(_D(10).mul(getEffect(this.layer, 11, _D1).pow(0.5)))} 点数` },
            canComplete() {
                return player[this.layer].points.gte(_D(10).mul(getEffect(this.layer, 11, _D1).pow(0.5)))
            },
            rewardDescription: "挑战1效果变为^1.01",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            unlocked() {
                return hasChallenge(this.layer, 111)
            },
            onComplete() {
                playsound("cc")
            }
        },
        121: {
            name: "万事脸黑难,而脸白易也",
            challengeDescription() {
                return `每秒有1概率获得1点数,但是${format(this.rewardEffect().mul(100))}%概率生成点数被反转,[有偿购物]额外解锁一个可点击,且其他升级无效`
            },
            goalDescription: "100 点数",
            canComplete() {
                return player[this.layer].points.gte(100)
            },
            rewardDescription() {
                return `你变得更幸运,当你认为自己被概率玩弄`
            },
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            rewardEffect() {
                return getEffect(this.layer, 12111, _D(0.49))
                    .sub(getEffect(this.layer, 12121, _D0).div(100))
            },
            unlocked() {
                return hasChallenge(this.layer, 112)
            },
            onComplete() {
                playsound("cc")
            }
        },
        122: {
            name: "万事需密码,百事可乐冰",
            challengeDescription: `你在工作中获得了一个密码<br>输入"HEXDECOCT"对应的值来完成这个挑战<br>本挑战中每刻为3秒`,
            goalDescription() { return `HEXDECOCT 点数` },
            canComplete() {
                return player[this.layer].points.eq(this.target)
            },
            rewardDescription: "工作6更简单,梦力+1",
            onEnter() {
                layers[this.layer].resetGame()
            },
            onExit() {
                layers[this.layer].resetGame()
            },
            onComplete() {
                player.main.points = player.main.points.add(1)
                playsound("cc")
            },
            unlocked() {
                return hasChallenge(this.layer, 121)
            },
            target: 115277425,
        },
    },
    clickables: {
        11: {
            title() { return "重置升级" },
            display() { return "只有不在任何任务或挑战中时才能重置<br>请注意,你将失去所有升级,包括挑战内升级" },
            canClick() { return !layers[this.layer].getChallenge() },
            onClick() { player[this.layer].upgrades = [] },
            unlocked() { return hasChallenge(this.layer, 21) }
        },
        12: {
            title() { return "異議あり!" },
            display() { return "对当前的概率进行质疑,可能会改变现在的概率" },
            canClick() { return true },
            onClick() {
                playsound("s1")

                player[this.layer].dB = player[this.layer].dB.add(1)
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return inChallenge(this.layer, 121) && hasUpgrade(this.layer, 12) }
        },
        13: {
            title() { return "购买最大方块" },
            canClick() { return true },
            onClick() {
                for (let i = 3; i > 0; i--) {
                    for (let j = 3; j > 0; j--) {
                        let id = i * 100 + j
                        let d = getGridData(this.layer, id)
                        while (player[this.layer].points.gte(layers[this.layer].grid.getPrice(d, id))) {
                            if (!hasUpgrade(this.layer, 3114)) player[this.layer].points = player[this.layer].points.sub(layers[this.layer].grid.getPrice(d, id))
                            setGridData(this.layer, id, d.add(1))
                            d = d.add(1)
                        }
                    }
                }
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return inChallenge(this.layer, 31) && hasUpgrade(this.layer, 12) && hasUpgrade(this.layer, 3112) },
            style: {
                minHeight: "40px"
            }
        },
    },
    resetGame() {
        player[this.layer].points = _D0
        player[this.layer].t = _D0
        player[this.layer].tickt = _D0
        player[this.layer].keyseed = Date.now()
        player[this.layer].mul = [_D1, _D1, _D1, _D1, _D1, _D1, _D1, _D1, _D1]
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                setGridData(this.layer, i * 100 + j, _D0)
            }
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});