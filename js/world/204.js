addLayer("204", {
    symbol: "❓",
    resource: "点数",
    color: "hsl(70,100%,50%)",
    startData() {
        return {
            unlocked: true,
            points: _D0,
			maxscore: _D0,
			hardmax: _D0,
			started: false,
			hardmode: false,
			trig: true,
			problist: [],
			sol: 0,
			problem: { problem: '', options: ['', '', '', ''], answer: 0 },
			ans: 0,
			button: [21, 22, 23, 24],
			answer: {
				21: 0,
				22: 0,
				23: 0,
				24: 0
			}
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    tabFormat: {
        "快问~快答~": {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class="p3pt">${formatWhole(player[this.layer].points)}</h2> 分数`
                }],
                ["display-text", function () {
                    return `你曾获得过的最高分数是${player[this.layer].maxscore}` + (player[this.layer].hardmax.gte(1) ? `/${player[this.layer].hardmax}(困难模式)` : ``) + `,达到40分来完成世界!`
                }],
                "blank",
                ["display-text", function () {
                    if (player[this.layer].started) return `题目${player[this.layer].sol + 1} : ${player[this.layer].problem?.problem}`
                }],
                "blank",
                ["clickables", [1]],
                "blank",
                function () {
                    return [
                        "row", [
                            ["clickable", player[this.layer].button[0]],
                            ["clickable", player[this.layer].button[1]],
                        ]
                    ]
                },
                function () {
                    return [
                        "row", [
                            ["clickable", player[this.layer].button[2]],
                            ["clickable", player[this.layer].button[3]],
                        ]
                    ]
                },
                "blank",
                ["display-text", function () {
                    return `题目答对+2分,答错-1分,你已经答了${formatWhole(player[this.layer].sol)}/` + (player[this.layer].hardmode ? `30` : `40`) + `道题目`
                }],
            ]
        },
    },
    randomProblem() {
        // 告诉你题库现在有多少题目
        // console.log(getProblemList().length)
        let array
        if (!player[this.layer].hardmode) array = [...Array(getProblemList().length).keys()]
        else array = [...Array(getHardProblemList().length).keys()]
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        // 取41个元素避免报错
        return player[this.layer].hardmode ? shuffled.slice(0, 31) : shuffled.slice(0, 41);
    },
    randomButton() {
        return [21, 22, 23, 24].sort(() => Math.random() - 0.5)
    },
    update(diff) {
        if (player.pause[this.layer]) return
    },
    clickables: {
        11: {
            title() { return `开始答题!` },
            display() { return `获得至少40分以完成世界并获得1梦力,共40题!` },
            onClick() {
                player[this.layer].hardmode = false
                player[this.layer].answer = { 21: 0, 22: 0, 23: 0, 24: 0 }
                player[this.layer].points = _D0
                player[this.layer].sol = 0
                player[this.layer].ans = 0
                player[this.layer].problist = layers[this.layer].randomProblem()
                player[this.layer].button = layers[this.layer].randomButton()
                player[this.layer].started = true
                player[this.layer].problem = ((player[this.layer].hardmode) ? getHardProblemList()[player[this.layer].problist[0]] : getProblemList()[player[this.layer].problist[0]])
            },
            unlocked() { return !player[this.layer].started },
            canClick() { return !player[this.layer].started },
        },
        12: {
            title() { return (player[this.layer].sol == (player[this.layer].hardmode ? 29 : 39)) ? "结束回答并结算" : "确认你的答案" },
            display() { return `一旦确认后不可更改!` },
            onClick() {
                player[this.layer].answer[[21, 22, 23, 24][player[this.layer].button.indexOf(parseInt(player[this.layer].ans))]]++
                if (player[this.layer].problem.answer != player[this.layer].ans) player[this.layer].points = player[this.layer].points.sub(1)
                else {
                    player[this.layer].points = player[this.layer].points.add(2)
                    if (!player[this.layer].hardmode) player[this.layer].problem = player[this.layer].maxscore = decimalMax(player[this.layer].maxscore, player[this.layer].points)
                    else player[this.layer].problem = player[this.layer].hardmax = decimalMax(player[this.layer].hardmax, player[this.layer].points)
                }
                player[this.layer].sol++
                player[this.layer].problem = ((player[this.layer].hardmode) ? getHardProblemList()[player[this.layer].problist[player[this.layer].sol]] : getProblemList()[player[this.layer].problist[player[this.layer].sol]])
                player[this.layer].ans = 0
                player[this.layer].button = layers[this.layer].randomButton()

                if (player[this.layer].started && (player[this.layer].sol >= (player[this.layer].hardmode ? 30 : 40))) {
                    player[this.layer].started = false
                    if (player[this.layer].points.gte(40) && !player[this.layer].hardmode) {
                        completeWorld(this.layer)
                    }
                    else if (player[this.layer].points.gte(30) && player[this.layer].hardmode && player[this.layer].trig) {
                        player.main.points = player.main.points.add(1)
                        player[this.layer].trig = false
                    }
                    player[this.layer].points = player[this.layer].maxscore
                    player[this.layer].sol = 0
                    player[this.layer].ans = 0
                    player[this.layer].problist = []
                    player[this.layer].problem = { problem: '', options: ['', '', '', ''], answer: 0 }
                    player[this.layer].button = layers[this.layer].randomButton()
                }
            },
            unlocked() { return player[this.layer].started },
            canClick() { return player[this.layer].started && player[this.layer].ans != 0 },
            style: {
                "width": "200px",
                "minHeight": "90px"
            }
        },
        13: {
            title() { return `自动确认` },
            display() { return `当前状态<br>${getClickableState(this.layer, this.id) ? "开启" : "关闭"}` },
            onClick() {
                setClickableState(this.layer, this.id, !getClickableState(this.layer, this.id))
            },
            unlocked() { return player[this.layer].started },
            canClick() { return player[this.layer].started },
            style: {
                "width": "90px",
                "minHeight": "90px"
            }
        },
        14: {
            title() { return `寻求挑战!` },
            display() { return `更难的题目!获得至少30分额外获得1梦力,共30题!` },
            onClick() {
                player[this.layer].hardmode = true
                player[this.layer].answer = { 21: 0, 22: 0, 23: 0, 24: 0 }
                player[this.layer].points = _D0
                player[this.layer].sol = 0
                player[this.layer].ans = 0
                player[this.layer].problist = layers[this.layer].randomProblem()
                player[this.layer].button = layers[this.layer].randomButton()
                player[this.layer].started = true
                player[this.layer].problem = getHardProblemList()[player[this.layer].problist[0]]
            },
            unlocked() { return !player[this.layer].started && player[this.layer].maxscore.gte(40) },
            canClick() { return !player[this.layer].started && player[this.layer].maxscore.gte(40) },
        },
        21: {
            display() {
                return player[this.layer].problem?.options[0]
            },
            onClick() {
                player[this.layer].ans = this.id
                if (!(player[this.layer].sol == (player[this.layer].hardmode ? 29 : 39)) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player[this.layer].started },
            canClick() { return player[this.layer].started && player[this.layer].ans != this.id },
            style: {
                "background-color"() { return player[204].ans == 21 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
        22: {
            display() {
                return player[this.layer].problem?.options[1]
            },
            onClick() {
                player[this.layer].ans = this.id
                if (!(player[this.layer].sol == (player[this.layer].hardmode ? 29 : 39)) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player[this.layer].started },
            canClick() { return player[this.layer].started && player[this.layer].ans != this.id },
            style: {
                "background-color"() { return player[204].ans == 22 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
        23: {
            display() {
                return player[this.layer].problem?.options[2]
            },
            onClick() {
                player[this.layer].ans = this.id
                if (!(player[this.layer].sol == (player[this.layer].hardmode ? 29 : 39)) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player[this.layer].started },
            canClick() { return player[this.layer].started && player[this.layer].ans != this.id },
            style: {
                "background-color"() { return player[204].ans == 23 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
        24: {
            display() {
                return player[this.layer].problem?.options[3]
            },
            onClick() {
                player[this.layer].ans = this.id
                if (!(player[this.layer].sol == (player[this.layer].hardmode ? 29 : 39)) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player[this.layer].started },
            canClick() { return player[this.layer].started && player[this.layer].ans != this.id },
            style: {
                "background-color"() { return player[204].ans == 24 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
    }
})