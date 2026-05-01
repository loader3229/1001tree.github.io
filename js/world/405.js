addLayer("405", {
    symbol: "🍞",
    resource: "麦粒",
    color: "#aaa",
    update(diff) {
        if (!getGridData('main', this.layer) || player.pause[this.layer]) return

        let sum = _D0
        let dp = _D1

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                sum = sum.add(player[this.layer].wheel[i][j])
                setGridData(this.layer, xytoid(j, i), player[this.layer].wheel[i][j])

                if ((i == 0 && j == 0) || j + i * 8 >= player[this.layer].block) continue
                let ti = i, tj = j - 1
                if (j == 0) {
                    ti = i - 1
                    tj = 7
                }
                let n = j + i * 8 + 1
                let m = tj + ti * 8 + 2

                let mul = _D1

                if (player[this.layer].theory[0] && theory0.includes(n)) {
                    mul = mul.mul(n)
                }

                if (player[this.layer].theory[1] && theory1.includes(n)) {
                    dp = dp.mul(player[this.layer].wheel[i][j].add(2).log2().pow(_D(n).pow(0.5)))
                }

                if (player[this.layer].theory[2] && theory2.includes(n)) {
                    mul = mul.mul(player[this.layer].seed.add(1).log(2))
                }

                player[this.layer].wheel[i][j] = player[this.layer].wheel[i][j].add(
                    player[this.layer].wheel[ti][tj].add(1)
                        .pow(_D1.div(_D(m).pow(2)))
                        .sub(1)
                        .mul(mul)
                        .mul(diff)
                )
            }
        }

        player[this.layer].points = sum
        player[this.layer].seed = player[this.layer].seed.add(_D(1 / 10).mul(player[this.layer].theory[2] ? player[this.layer].wheel[0][2] : 1).mul(diff))

        if (player[this.layer].theory[1]) {
            player[this.layer].p = player[this.layer].p.add(dp.sub(1).mul(diff))
            player[this.layer].wheel[0][0] = player[this.layer].wheel[0][0].add(player[this.layer].p.add(1).log2().pow(1.5).mul(diff))
        }

    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            wheel: [
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
                [_D0, _D0, _D0, _D0, _D0, _D0, _D0, _D0],
            ],
            block: 8,
            theory: [false, false, false, false, false, false, false, false],
            p: _D0,
            seed: _D1,
        }
    },
    type: "none",
    microtabs: {
        main: {
            麦粒: {
                content: [
                    ["display-text",
                        () => {
                            return `<br><h2>你有 <h1 class="nmpt">${format(player[405].points)}</h1> 麦粒</h2><br>
                            <h3>你解锁了 <h2 class="nmpt">${formatWhole(player[405].block)}</h2> 个棋盘格子</h3><br>
                            <h3>你有 <h2 class="nmpt">${formatWhole(player[405].seed)}</h2> 颗种子 (+${format((_D(1 / 10).mul(player[405].theory[2] ? player[405].wheel[0][2] : 1)))}/s)</h3> ${player[405].theory[2] ? `=> ${format(player[405].seed.add(1).log2())}</h3>` : ""}`
                        }
                    ],
                    ["display-text",
                        () => {
                            if (player[405].theory[1]) return `<h3>P = <h2 class="nmpt">${format(player[405].p)}</h2> => ${format(player[405].p.add(1).log2().pow(1.5))}</h3>`
                            else return
                        }
                    ],
                    "blank",
                    ["clickables", [1]],
                    "blank",
                ]
            },
            intro: {
                content: [
                    ["display-text",
                        `据说在几千年前，有一个国王告诉国际象棋的发明者：<br>
                        你在国际象棋的64个格子中的第一个格子放下一颗麦粒<br>
                        第二个格子放下两颗，以后每一个格子都放下双倍的麦粒<br>
                        我就会给你所有最终放下的麦粒<br>
                        小拜谢想知道这个问题的答案<br>
                        请你帮帮小拜谢，数出这需要多少小麦！<br>
                        规则是这样的，你有一个8*8的棋盘，每个格子里面都可以放置麦粒<br>
                        你的目标就是填充这些格子，但是可恶的qhlg认为这样不够可爱<br>
                        所以qhlg为你准备了一些<s>挑战</s>！<br>
                        qhlg为你准备了纯粹的数值爽！<br>
                        你并不只是简单的填充这些格子，而是要进行一些神秘的有关数列的增量过程<br>
                        从而达到一定的麦粒数，最终填充整个棋盘！<br>
                        随着游戏推进，这里会出现一些数列，你可以观察它们
                    `
                    ]
                ]
            },
            "数列:正整数数列": {
                content: [
                    ["display-text",
                        `
                        生效范围: 全体正整数(但最初你只解锁了8个格子)<br>
                        公式：<br>
                        dB(x<sub>n</sub>)/dt=(1+B(x<sub>n-1</sub>))^(1/x<sub>n</sub><sup>2</sup>)-1 (n>1)
                        `
                    ]
                ]
            },
            "数列:质数数列": {
                content: [
                    ["display-text",
                        `
                        质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数<br>
                        生效范围: 质数<br>
                        2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61<br>
                        公式：<br>
                        dB(x<sub>n</sub>)/dt × x<sub>n</sub>
                        `
                    ]
                ],
                unlocked() {
                    return player[405].theory[0]
                }
            },
            "数列:帕多瓦数列": {
                content: [
                    ["display-text",
                        `
                        帕多瓦数列是一个递推数列，从第四项起每项等于前两项与前三项之和，类似斐波那契数列<br>
                        生效范围: 帕多瓦数列<br>
                        [1,1,1,2],2,3,4,5,7,9,12,16,21,28,37,49<br>
                        []是在此中的项不计，未在[]中的第一项计为首项<br>
                        公式：<br>
                        dP/dt = ∏((log<sub>2</sub>(2+B(x<sub>n</sub>)))<sup>x<sub>n</sub><sup>0.5</sup></sup>)-1<br>
                        dB(x<sub>1</sub>)/dt = log2(1+P)<sup>0.5</sup>
                        `
                    ],
                    "blank",
                    ["display-text",
                        () => {
                            return `<h3>P = <h2 class="nmpt">${format(player[405].p)}</h2> => ${format(player[405].p.add(1).log2().pow(1.5))}</h3>`
                        }
                    ],
                ],
                unlocked() {
                    return player[405].theory[1]
                }
            },
            "数列:三角数数列": {
                content: [
                    ["display-text",
                        `
                        三角数是由前n个正整数之和形成的数列<br>
                        生效范围: 三角数<br>
                        [1,]3,6,10,15,21,28,36,45,55<br>
                        公式：<br>
                        dB(x<sub>n</sub>)/dt × log2(1+Seed)<br>
                        dSeed/dt × B(x1)
                        `
                    ],
                    "blank",
                    ["display-text",
                        () => {
                            return `<h3>Seed = <h2 class="nmpt">${format(player[405].seed)}</h2> => ${format(player[405].seed.add(1).log2())}</h3>`
                        }
                    ],
                ],
                unlocked() {
                    return player[405].theory[2]
                }
            },
        }
    },
    tabFormat: [
        ["microtabs", "main"],
        "blank",
        ["clickables", [2]],
        "blank",
        "grid",
    ],
    milestones: {
    },
    clickables: {
        11: {
            title() {
                return "在棋盘中放置一颗种子"
            },
            canClick() {
                return player[this.layer].seed.gte(1)
            },
            onClick() {
                player[this.layer].seed = player[this.layer].seed.sub(1)
                player[this.layer].wheel[0][0] = player[this.layer].wheel[0][0].add(1)
                makeParticles({
                    time: 1.5,
                    fadeOutTime: 1,
                    fadeInTime: 0.5,
                    gravity: 1,
                    image: "",
                    text: `<spam style="color:#ff0">麦粒</spam>`,
                    speed() {
                        return (Math.random() + 1) * 8
                    },
                    angle() {
                        return (Math.random() - 0.5) * 180
                    },
                    dir() {
                        return (Math.random() - 0.5) * 90
                    },
                    spread: 0,
                    rotation() {
                        return (Math.random() - 0.5) * 45
                    },
                }, 1)
            }
        },
        12: {
            title() {
                return "解锁新格子"
            },
            display() {
                return `下一个在 ${format(this.price())} 麦粒`
            },
            canClick() {
                return player[this.layer].points.gt(this.price()) && player[this.layer].block < 64
            },
            price() {
                let block = _D(player[this.layer].block)
                return (_D1.add(block.div(8))).pow(block)
            },
            onClick() {
                player[this.layer].block += 1
                makeParticles({
                    time: 1.5,
                    fadeOutTime: 1,
                    fadeInTime: 0.5,
                    gravity: 1,
                    image: "",
                    text: `<spam style="color:#ff0">麦粒</spam>`,
                    speed() {
                        return (Math.random() + 1) * 8
                    },
                    angle() {
                        return (Math.random() - 0.5) * 180
                    },
                    dir() {
                        return (Math.random() - 0.5) * 90
                    },
                    spread: 0,
                    rotation() {
                        return (Math.random() - 0.5) * 45
                    },
                }, player[this.layer].block)
            }
        },
        21: {
            title() {
                return "质数"
            },
            display() {
                return `在 ${format(this.price())} 麦粒`
            },
            canClick() {
                return player[this.layer].points.gt(this.price())
            },
            unlocked() {
                return !player[this.layer].theory[0]
            },
            price() {
                return _D(20)
            },
            onClick() {
                player[this.layer].theory[0] = true
            }
        },
        22: {
            title() {
                return "帕多瓦数列"
            },
            display() {
                return `在 ${format(this.price())} 麦粒`
            },
            canClick() {
                return player[this.layer].points.gt(this.price())
            },
            unlocked() {
                return !player[this.layer].theory[1]
            },
            price() {
                return _D(100)
            },
            onClick() {
                player[this.layer].theory[1] = true
            }
        },
        23: {
            title() {
                return "三角数"
            },
            display() {
                return `在 ${format(this.price())} 麦粒`
            },
            canClick() {
                return player[this.layer].points.gt(this.price())
            },
            unlocked() {
                return !player[this.layer].theory[2]
            },
            price() {
                return _D(1500)
            },
            onClick() {
                player[this.layer].theory[2] = true
            }
        }
    },
    grid: {
        rows: 8,
        cols: 8,
        onClick(data, id) {
            let { x, y } = idtoxy(id)
            if (x + y * 8 < player[this.layer].block) {
                makeParticles({
                    time: 1.5,
                    fadeOutTime: 1,
                    fadeInTime: 0.5,
                    gravity: 1,
                    image: "",
                    text: `<spam style="color:#ff0">麦粒</spam>`,
                    speed() {
                        return (Math.random() + 1) * 8
                    },
                    angle() {
                        return (Math.random() - 0.5) * 180
                    },
                    dir() {
                        return (Math.random() - 0.5) * 90
                    },
                    spread: 0,
                    rotation() {
                        return (Math.random() - 0.5) * 45
                    },
                }, Math.floor((x + y * 8 +1)**0.5))
            }
        },
        getStartData(id) {
            return 0
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            return true
        },
        getDisplay(data, id) {
            let { x, y } = idtoxy(id)

            if (x + y * 8 >= player[this.layer].block) {
                return "locked"
            }

            return `${String.fromCharCode(65 + x)}${8 - y} | ${x + y * 8 + 1}<br><br>${format(data)}`
        },
        getStyle(data, id) {
            let { x, y } = idtoxy(id)
            let style = {}

            if ((x + y) % 2) {
                style.backgroundColor = "#444"
            } else {
                style.backgroundColor = "#aaa"
            }
            style.fontSize = "14px"
            style.width = "90px"
            style.height = "90px"
            style.padding = "0"
            style.margin = "-1px -1px"
            style.borderRadius = "0";
            style.border = "3px solid";
            style.color = "#ee0"
            style.borderColor = `rgba(255,255,255,0.5)`;

            return style
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});