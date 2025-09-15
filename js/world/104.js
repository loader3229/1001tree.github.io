addLayer("104", {
    symbol: "⚜️",
    resource: "点数",
    color: "#aaa",
    startData() {
        return {
            unlocked: true,
            points: _D0,
            maxx: _D0,
            trig: false,
            losetrig: true,
            canmove: true,
            lastmove: 0,
            cnt: 0,
            ud: false,
            db: false,
            ra: false,
            ig: false,
            ob1: false,
            ob2: false,
            ob3: false,
            ob4: false,
            ob5: false,
            bl: false,
            ch: false,
            t5: false,
            t6: false,
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    tabFormat: {
        Normal: {
            content: [
                ["display-text", function () {
                    return `你所获得的最高点数是 <h2 class = 'nmpt'>${formatWhole(player['104'].ig ? Decimal.pow(2, player['104'].points.div(2)) : player['104'].points)}</h2>, 到达1024完成世界!`
                }],
                ["display-text", function () {
                    return `W,A,S,D移动方块, L放弃游戏`
                }],
                ["display-text", function () {
                    return (player['104'].trig) ? `蓝色的规则可随时启用或关闭, 红色的规则只能在游戏开始之前调整!` : `完成世界来解锁其他规则!`
                }],
                ["display-text", function () {
                    return (player['104'].losetrig) ? `你输了, 请重新开始一盘游戏!` : ``
                }],
                "blank",
                "blank",
                "grid",
                "blank",
                ["row", [
                    ["clickable", 11],
                ]
                ],
                ["row", [
                    ["clickable", 21],
                    ["clickable", 22],
                    ["clickable", 23],
                ]
                ],
                ["clickables", [3, 4, 5]]
            ]
        }
    },
    hotkeys: [
        { key: "w", description: "", onPress() { layers['104'].doMovement(1) } },
        { key: "a", description: "", onPress() { layers['104'].doMovement(3) } },
        { key: "s", description: "", onPress() { layers['104'].doMovement(2) } },
        { key: "d", description: "", onPress() { layers['104'].doMovement(4) } },
        { key: "l", description: "", onPress() { player['104'].losetrig = true } },
    ],
    update(diff) {
        if (player['104'].points.gte(1024) && (!player['104'].trig)) {
            completeWorld('104')
            player['104'].trig = true
        }
    },
    doMovement(fx) {
        if (player['104'].losetrig) return
        player['104'].canmove = false
        layers['104'].updateGrid(fx)
        layers['104'].mergeGrid(fx)
        layers['104'].updateGrid(fx)
        layers['104'].numGen()
        if (player['104'].db) {
            let r = Math.floor(Math.random() * 2) + 1
            for (i = 1; i <= r; i++) {
                layers['104'].numGen()
            }
        }
        if (player['104'].ch) {
            let r = chooseWeightInArray[[1, 400], [0, 96]]
            if (r) layers['104'].switchGrid()
        }
        player['104'].lastmove = fx
    },
    switchGrid() {
        if (!player['104'].ch) return
    },
    canMerge(fx) {
        for (i in player['104'].grid) {
            let x = Math.floor(i / 100)
            let y = Math.floor(i % 100)
            if (fx == 1) {
                x--
                if (player['104'].bl) x--
            }
            if (fx == 2) {
                x++
                if (player['104'].bl) x++
            }
            if (fx == 3) {
                y--
                if (player['104'].bl) y--
            }
            if (fx == 4) {
                y++
                if (player['104'].bl) y++
            }
            if (x <= 0 || y <= 0 || x >= (5 + player['104'].t5 + player['104'].t6) || y >= (5 + player['104'].t5 + player['104'].t6)) continue
            let z = x * 100 + y
            t1 = player['104'].grid[z]
            t2 = player['104'].grid[i]
            if (t1.neq(t2) && (t1.eq(-8) || t2.eq(-8))) {
                return true
            }
            if (t1.neq(t2) && (t1.eq(-6) || t2.eq(-6))) {
                return true
            }
            if (t1 !== undefined && t2 !== undefined && ((t1.eq(t2))) && t1.neq(0) && t2.neq(0)) {
                return true
            }
        }
        return false
    },
    numGen() {
        if (player['104'].cnt == (Math.pow(4 + player['104'].t5 + player['104'].t6, 2)) && (!layers['104'].canMerge(1)) && (!layers['104'].canMerge(2)) && (!layers['104'].canMerge(3)) && (!layers['104'].canMerge(4))) {
            if (!player['104'].ud) {
                player['104'].losetrig = true
                return
            } else {
                layers['104'].udClear()
            }
        } else if (player['104'].cnt == (Math.pow(4 + player['104'].t5, 2))) {
            return
        } else if (!player['104'].canmove) {
            return
        }
        let a = []
        for (i in player[this.layer].grid) {
            if (player[this.layer].grid[i].eq(0)) {
                if (((i % 100) < (5 + player['104'].t5 + player['104'].t6)) && (Math.floor(i / 100) < (5 + player['104'].t5 + player['104'].t6))) a.push(i)
            }
        }
        let r = chooseOneInArray(a)
        let s = [[_D2, 80], [_D4, 15], [_D8, 5]]
        p = player['104'].maxx
        let s1 = [[p.div(1024), 75], [p.div(512), 12.5], [p.div(256), 1 / 16], [p.div(128), 1 / 32], [p.div(64), 1 / 64], [p.div(32), 1 / 128], [p.div(16), 1 / 128]]
        let sp1 = chooseWeightInArray([[_D(-6), 4], [_D0, 96]])
        let sp2 = chooseWeightInArray([[_D(-7), 4], [_D0, 96]])
        let sp3 = chooseWeightInArray([[_D(-8), 4], [_D0, 96]])
        if (sp3.neq(0) && player['104'].ob4) {
            player[this.layer].grid[r] = sp3
        } else if (sp2.neq(0) && player['104'].ob2) {
            player[this.layer].grid[r] = sp2
        } else if (sp1.neq(0) && player['104'].ob1) {
            player[this.layer].grid[r] = sp1
        } else {
            if (player[this.layer].ra && player['104'].maxx.gte(2048)) player[this.layer].grid[r] = chooseWeightInArray(s1).max(2)
            else player[this.layer].grid[r] = chooseWeightInArray(s)
        }
        if (player['104'].maxx.gte(4096)) layers[this.layer].genClear()
        player['104'].cnt++
    },
    genClear() {
        p = player['104'].maxx.div(1024)
        if (p.lte(2)) return
        for (i in player[this.layer].grid) {
            if (player[this.layer].grid[i].lt(p) && player[this.layer].grid[i].gt(0)) {
                player[this.layer].grid[i] = _D0
            }
        }
    },
    updateGrid(fx) {
        if (player['104'].losetrig) return
        let a = []
        if (fx == 1) {
            a = [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304, 401, 402, 403, 404]
            if (player['104'].t5 || player['104'].t6) {
                a = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 301, 302, 303, 304, 305, 401, 402, 403, 404, 405, 501, 502, 503, 504, 505]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205, 206, 301, 302, 303, 304, 305, 306, 401, 402, 403, 404, 405, 406, 501, 502, 503, 504, 505, 506, 601, 602, 603, 604, 605, 606]
            }
        }
        if (fx == 2) {
            a = [401, 402, 403, 404, 301, 302, 303, 304, 201, 202, 203, 204, 101, 102, 103, 104]
            if (player['104'].t5 || player['104'].t6) {
                a = [505, 504, 503, 502, 501, 401, 402, 403, 404, 405, 301, 302, 303, 304, 305, 201, 202, 203, 204, 205, 101, 102, 103, 104, 105]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [601, 602, 603, 604, 605, 606, 501, 502, 503, 504, 505, 506, 401, 402, 403, 404, 405, 406, 301, 302, 303, 304, 305, 306, 201, 202, 203, 204, 205, 206, 101, 102, 103, 104, 105, 106]
            }
        }
        if (fx == 3) {
            a = [101, 201, 301, 401, 102, 202, 302, 402, 103, 203, 303, 403, 104, 204, 304, 404]
            if (player['104'].t5 || player['104'].t6) {
                a = [101, 201, 301, 401, 501, 102, 202, 302, 402, 502, 103, 203, 303, 403, 503, 104, 204, 304, 404, 504, 105, 205, 305, 405, 505]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [101, 201, 301, 401, 501, 601, 102, 202, 302, 402, 502, 602, 103, 203, 303, 403, 503, 603, 104, 204, 304, 404, 504, 604, 105, 205, 305, 405, 505, 605, 106, 206, 306, 406, 506, 606]
            }
        }
        if (fx == 4) {
            a = [104, 204, 304, 404, 103, 203, 303, 403, 102, 202, 302, 402, 101, 201, 301, 401]
            if (player['104'].t5 || player['104'].t6) {
                a = [105, 205, 305, 405, 505, 104, 204, 304, 404, 504, 103, 203, 303, 403, 503, 102, 202, 302, 402, 502, 101, 201, 301, 401, 501]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [106, 206, 306, 406, 506, 606, 105, 205, 305, 405, 505, 605, 104, 204, 304, 404, 504, 604, 103, 203, 303, 403, 503, 603, 102, 202, 302, 402, 502, 602, 101, 201, 301, 401, 501, 601]
            }
        }
        for (j = 0; j < (3 + player['104'].t5 + player['104'].t6); j++)
            for (k = 0; k < a.length; k++) {
                let i = a[k]
                let x = Math.floor(i / 100)
                let y = Math.floor(i % 100)
                if (fx == 1) {
                    x--
                    if (player['104'].bl) x--
                }
                if (fx == 2) {
                    x++
                    if (player['104'].bl) x++
                }
                if (fx == 3) {
                    y--
                    if (player['104'].bl) y--
                }
                if (fx == 4) {
                    y++
                    if (player['104'].bl) y++
                }
                if (x <= 0 || y <= 0 || x >= (5 + player['104'].t5 + player['104'].t6) || y >= (5 + player['104'].t5 + player['104'].t6)) continue
                let z = x * 100 + y
                t = player['104'].grid[z]
                t1 = player['104'].grid[i]
                if (t.eq(0) && t1.eq(0)) {
                    player['104'].canmove = true
                    continue
                }
                if (t.neq(0)) {
                    continue
                } else {
                    player['104'].canmove = true
                    player['104'].grid[z] = t1
                    player['104'].grid[i] = _D0
                }
            }
    },
    mergeGrid(fx) {
        if (player['104'].losetrig) return
        let a = []
        if (fx == 1) {
            a = [101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304, 401, 402, 403, 404]
            if (player['104'].t5 || player['104'].t6) {
                a = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 301, 302, 303, 304, 305, 401, 402, 403, 404, 405, 501, 502, 503, 504, 505]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205, 206, 301, 302, 303, 304, 305, 306, 401, 402, 403, 404, 405, 406, 501, 502, 503, 504, 505, 506, 601, 602, 603, 604, 605, 606]
            }
        }
        if (fx == 2) {
            a = [401, 402, 403, 404, 301, 302, 303, 304, 201, 202, 203, 204, 101, 102, 103, 104]
            if (player['104'].t5 || player['104'].t6) {
                a = [505, 504, 503, 502, 501, 401, 402, 403, 404, 405, 301, 302, 303, 304, 305, 201, 202, 203, 204, 205, 101, 102, 103, 104, 105]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [601, 602, 603, 604, 605, 606, 501, 502, 503, 504, 505, 506, 401, 402, 403, 404, 405, 406, 301, 302, 303, 304, 305, 306, 201, 202, 203, 204, 205, 206, 101, 102, 103, 104, 105, 106]
            }
        }
        if (fx == 3) {
            a = [101, 201, 301, 401, 102, 202, 302, 402, 103, 203, 303, 403, 104, 204, 304, 404]
            if (player['104'].t5 || player['104'].t6) {
                a = [101, 201, 301, 401, 501, 102, 202, 302, 402, 502, 103, 203, 303, 403, 503, 104, 204, 304, 404, 504, 105, 205, 305, 405, 505]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [101, 201, 301, 401, 501, 601, 102, 202, 302, 402, 502, 602, 103, 203, 303, 403, 503, 603, 104, 204, 304, 404, 504, 604, 105, 205, 305, 405, 505, 605, 106, 206, 306, 406, 506, 606]
            }
        }
        if (fx == 4) {
            a = [104, 204, 304, 404, 103, 203, 303, 403, 102, 202, 302, 402, 101, 201, 301, 401]
            if (player['104'].t5 || player['104'].t6) {
                a = [105, 205, 305, 405, 505, 104, 204, 304, 404, 504, 103, 203, 303, 403, 503, 102, 202, 302, 402, 502, 101, 201, 301, 401, 501]
            }
            if (player['104'].t5 && player['104'].t6) {
                a = [106, 206, 306, 406, 506, 606, 105, 205, 305, 405, 505, 605, 104, 204, 304, 404, 504, 604, 103, 203, 303, 403, 503, 603, 102, 202, 302, 402, 502, 602, 101, 201, 301, 401, 501, 601]
            }
        }
        for (k = 0; k < a.length; k++) {
            let i = a[k]
            let x = Math.floor(i / 100)
            let y = Math.floor(i % 100)
            if (fx == 1) {
                x--
                if (player['104'].bl) x--
            }
            if (fx == 2) {
                x++
                if (player['104'].bl) x++
            }
            if (fx == 3) {
                y--
                if (player['104'].bl) y--
            }
            if (fx == 4) {
                y++
                if (player['104'].bl) y++
            }
            if (x <= 0 || y <= 0 || x >= (5 + player['104'].t5 + player['104'].t6) || y >= (5 + player['104'].t5 + player['104'].t6)) continue
            let z = x * 100 + y
            t = player['104'].grid[z]
            t1 = player['104'].grid[i]
            if (t1.eq(-9) || t.eq(-9)) continue
            if (t.eq(-7) && t1.eq(-7)) {
                player['104'].canmove = true
                for (j = 1; j <= 4; j++) {
                    if (player['104'].grid[j * 100 + y].neq(0)) player['104'].cnt--
                    player['104'].grid[j * 100 + y] = _D0
                }
                for (j = 1; j <= 4; j++) {
                    if (player['104'].grid[x * 100 + j].neq(0)) player['104'].cnt--
                    player['104'].grid[x * 100 + j] = _D0
                }
            }
            else if ((t.eq(-8) || t1.eq(-8)) && player['104'].ob4 && t.neq(t1) && (t.neq(0) && t1.neq(0)) && (t.gt(0) || t1.gt(0))) {
                player['104'].canmove = true
                let r = chooseWeightInArray([[_D4, 10], [_D0, 90]])
                if (r.eq(0)) {
                    player['104'].grid[z] = _D0
                    player['104'].grid[i] = _D0
                    player['104'].cnt -= 2
                } else {
                    player['104'].grid[z] = player['104'].grid[z].times(r)
                    player['104'].grid[i] = _D0
                    if (t.neq(0)) player['104'].cnt--
                }
            }
            else if ((t.eq(-6) || t1.eq(-6)) && player['104'].ob1 && t.neq(t1) && (t.neq(0) && t1.neq(0)) && (t.gt(0) || t1.gt(0))) {
                player['104'].canmove = true
                player['104'].grid[z] = t.max(t1).div(2)
                player['104'].grid[i] = _D0
                if (t.neq(0)) player['104'].cnt--
            }
            else if (t.eq(t1) && (t.neq(0))) {
                player['104'].canmove = true
                player['104'].grid[z] = t.add(t1)
                player['104'].grid[i] = _D0
                if (t.neq(0)) player['104'].cnt--
                player['104'].maxx = player['104'].maxx.max(player['104'].grid[z])
                player['104'].points = player['104'].maxx
            }
            player['104'].cnt=4
        }
    },
    udClear() {
        if (!player['104'].ud) return
        minn = _D("1e310")
        for (i in player['104'].grid) {
            if ((Math.floor(i / 100) > (4 + player['104'].t5 + player['104'].t6)) || ((i % 100) > (4 + player['104'].t5 + player['104'].t6))) continue
            console.log(i)
            if (player['104'].grid[i].gt(0)) minn = minn.min(player['104'].grid[i]).max(0)
        }
        for (i in player['104'].grid) {
            console.log(i)
            if (player['104'].grid[i].eq(minn) || (player['104'].grid[i].lt(0) && player['104'].grid[i].neq(-9))) {
                player['104'].grid[i] = _D0
                player['104'].cnt--
            }
        }
    },
    clickables: {
        11: {
            title() { return `UP` },
            display: "向上",
            onClick() {
                layers['104'].doMovement(1)
            },
            unlocked() { return true },
            canClick() { return true },
            style: { height: "120px", width: "120px", minHeight: "120px" }
        },
        21: {
            title() { return `LEFT` },
            display: "向左",
            onClick() {
                layers['104'].doMovement(3)
            },
            unlocked() { return true },
            canClick() { return true },
            style: { height: "120px", width: "120px", minHeight: "120px" }
        },
        22: {
            title() { return `DOWN` },
            display: "向下",
            onClick() {
                layers['104'].doMovement(2)
            },
            unlocked() { return true },
            canClick() { return true },
            style: { height: "120px", width: "120px", minHeight: "120px" }
        },
        23: {
            title() { return `RIGHT` },
            display: "向右",
            onClick() {
                layers['104'].doMovement(4)
            },
            unlocked() { return true },
            canClick() { return true },
            style: { height: "120px", width: "120px", minHeight: "120px" }
        },
        31: {
            title() { return `START` },
            display: "开始一盘新游戏",
            onClick() {
                for (i in player['104'].grid) {
                    player['104'].grid[i] = _D0
                }
                player['104'].maxx = _D2
                player['104'].losetrig = false
                player['104'].canmove = true
                player['104'].cnt = 0
                layers['104'].numGen()
                layers['104'].numGen()
                if (player['104'].ob5) {
                    if (player['104'].grid[101].eq(0)) player['104'].cnt++
                    player['104'].grid[101] = _D(-9)
                }
            },
            unlocked() { return true },
            canClick() { return player['104'].losetrig },
            style: { height: "100px", width: "100px", minHeight: "100px", marginTop: "15px" }
        },
        32: {
            title() { return `UD` },
            display: "死局时自动消除所有最小方块和障碍块",
            onClick() {
                player['104'].ud = !player['104'].ud
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#00c2e0ff", "background-color"() {
                    if (player['104'].ud) return "#00c2e0"
                    return "#00c2e033"
                }, "color"() {
                    if (player['104'].ud) return "rgb(0,0,0)"
                    return "#00c2e0"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].trig },
        },
        33: {
            title() { return `DB` },
            display: "每次多生成1到2个块",
            onClick() {
                player['104'].db = !player['104'].db
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#00c2e0ff", "background-color"() {
                    if (player['104'].db) return "#00c2e0"
                    return "#00c2e033"
                }, "color"() {
                    if (player['104'].db) return "rgb(0,0,0)"
                    return "#00c2e0"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].trig },
        },
        34: {
            title() { return `RA` },
            display: "允许根据当前最大方块生成数字块, 自动消除无法被生成的最小块",
            onClick() {
                player['104'].ra = !player['104'].ra
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#00c2e0ff", "background-color"() {
                    if (player['104'].ra) return "#00c2e0"
                    return "#00c2e033"
                }, "color"() {
                    if (player['104'].ra) return "rgb(0,0,0)"
                    return "#00c2e0"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].trig },
        },
        41: {
            title() { return `IG` },
            display: "数字合并时相乘而不是相加",
            onClick() {
                player['104'].ig = !player['104'].ig
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].ig) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].ig) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
        42: {
            title() { return `OB1` },
            display: "4%概率生成/2块, 合并时将数值除以2",
            onClick() {
                player['104'].ob1 = !player['104'].ob1
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].ob1) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].ob1) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
        43: {
            title() { return `OB2` },
            display: "4%概率生成M块, 两个M合并时将删除本行本列上的方块",
            onClick() {
                player['104'].ob2 = !player['104'].ob2
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].ob2) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].ob2) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
        44: {
            title() { return `OB3` },
            display: "所有非0格子显示为白色问号",
            onClick() {
                player['104'].ob3 = !player['104'].ob3
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#00c2e0ff", "background-color"() {
                    if (player['104'].ob3) return "#00c2e0"
                    return "#00c2e033"
                }, "color"() {
                    if (player['104'].ob3) return "rgb(0,0,0)"
                    return "#00c2e0"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].trig },
        },
        45: {
            title() { return `OB4` },
            display: "4%概率生成D块, 合并时90%概率删除数字,10%概率将其乘以4",
            onClick() {
                player['104'].ob4 = !player['104'].ob4
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].ob4) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].ob4) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
        51: {
            title() { return `OB5` },
            display: "游戏开始时获得一个无法消除的NaN块",
            onClick() {
                player['104'].ob5 = !player['104'].ob5
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].ob5) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].ob5) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
        52: {
            title() { return `BL` },
            display: "合并和移动规则改为跨1格",
            onClick() {
                player['104'].bl = !player['104'].bl
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#00c2e0ff", "background-color"() {
                    if (player['104'].bl) return "#00c2e0"
                    return "#00c2e033"
                }, "color"() {
                    if (player['104'].bl) return "rgb(0,0,0)"
                    return "#00c2e0"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].trig },
        },
        53: {
            title() { return `CH` },
            display: "每次移动有4%概率打乱盘面",
            onClick() {
                player['104'].ch = !player['104'].ch
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#00c2e0ff", "background-color"() {
                    if (player['104'].ch) return "#00c2e0"
                    return "#00c2e033"
                }, "color"() {
                    if (player['104'].ch) return "rgb(0,0,0)"
                    return "#00c2e0"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].trig },
        },
        54: {
            title() { return `T+` },
            display: "棋盘规格+1",
            onClick() {
                player['104'].t6 = !player['104'].t6
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].t6) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].t6) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
        55: {
            title() { return `T+` },
            display: "棋盘规格+1",
            onClick() {
                player['104'].t5 = !player['104'].t5
            },
            style: {
                height: "100px", width: "100px", minHeight: "100px", marginTop: "15px", border: "4px solid", borderColor: "#e00000ff", "background-color"() {
                    if (player['104'].t5) return "#e00000ff"
                    return "#e0000033"
                }, "color"() {
                    if (player['104'].t5) return "rgb(0,0,0)"
                    return "#e00000ff"
                }
            },
            unlocked() { return player['104'].trig },
            canClick() { return player['104'].losetrig },
        },
    },
    grid: {
        rows: 6,
        cols: 6,
        getStartData(id) {
            return _D0
        },
        getUnlocked(id) {
            if ((Math.floor(id / 100) >= (5 + player['104'].t5 + player['104'].t6)) || ((id % 100) >= (5 + player['104'].t5 + player['104'].t6))) return false
            return true
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) {
            return
        },
        getDisplay(data, id) {
            if (player['104'].ob3) return "?"
            if (data.eq(-9)) return "NaN"
            if (data.eq(-8)) return "D"
            if (data.eq(-7)) return "M"
            if (data.eq(-6)) return "/2"
            if (player['104'].ig) return formatWhole(Decimal.pow(2, data.div(2)))
            return formatWhole(data)
        },
        getStyle(data, id) {
            let style
            if (player['104'].ob3 && data.neq(0)) style = { backgroundColor: "#ffffff" }
            else if (data.eq(0)) style = { backgroundColor: "black", border: "2px solid", borderColor: "#ffffff" }
            else if (data.eq(-9)) style = { backgroundColor: "#ee0000" }
            else if (data.eq(-8)) style = { backgroundColor: "#005e35" }
            else if (data.eq(-7)) style = { backgroundColor: "#ff7b00" }
            else if (data.eq(-6)) style = { backgroundColor: "#ffffff" }
            else if (data.gte(2048)) style = { borderImage: "linear-gradient(45deg, #ffa60075, #00a2ff75, #00da3675, #e400f075)", background: `linear-gradient(217deg, rgba(255, 0, 0, 0.9), rgba(255, 0, 0, 0) 40.71%),linear-gradient(127deg, rgba(0, 255, 0, 0.9), rgba(0, 255, 0, 0) 40.71%),linear-gradient(336deg, rgba(0, 0, 255, 0.9), rgba(0, 0, 255, 0) 40.71%)`, color: "gold", boxShadow: "4px 0px 9px #ca2e2cff" }
            else if (data.lte(2)) style = { backgroundColor: "#bababa" }
            else if (data.eq(4)) style = { backgroundColor: "#ffa3a3" }
            else if (data.eq(8)) style = { backgroundColor: "#ffaa78" }
            else if (data.eq(16)) style = { backgroundColor: "#00bbff" }
            else if (data.eq(32)) style = { backgroundColor: "#2acf7a" }
            else if (data.eq(64)) style = { backgroundColor: "#cacf2a" }
            else if (data.eq(128)) style = { background: "linear-gradient( #e66465, #9198e5)", boxShadow: "4px 0px 9px #b271d5" }
            else if (data.eq(256)) style = { background: "linear-gradient( #0092db, #13bd00)", boxShadow: "4px 0px 9px #006e18ff" }
            else if (data.eq(512)) style = { background: "linear-gradient( #002490ff, #4f0090ff )", boxShadow: "4px 0px 9px #4700c3", color: "white" }
            else if (data.eq(1024)) style = { background: "linear-gradient(45deg, #ffa600ff, #00a2ffff, #00da36ff, #e400f0ff )", boxShadow: "4px 0px 9px #db681bff", color: "white" }

            style.fontSize = "20px"
            if (data.lt(128)) style.boxShadow = "4px 0px 0px " + style.backgroundColor + "75"
            style.margin = "2px"
            style.transitionDuration = "0s"

            return style
        },
    },
})
