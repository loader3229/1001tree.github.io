addLayer("204", {
    symbol: "❓",
    resource: "点数",
    row: 2,
    position: 4,
    color: "hsl(70,100%,50%)",
    startData() {
        return {
            unlocked: true,
            points: _D0,
        }
    },
    layerShown() { return getGridData('main', this.layer) },
    tabFormat: {
        problems: {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class="p3pt">${formatWhole(player[this.layer].points)} / ${player._204.hardmode ? 30 : 40}</h2> 分数`
                }],
                ["display-text", function () {
                    return `你曾获得过的最高分数是${player._204.maxscore}` + (player._204.hardmax.gte(1) ? `/${player._204.hardmax}(困难模式)` : ``) + `,达到40分来完成世界!`
                }],
                "blank",
                ["display-text", function () {
                    if (player._204.started) return `题目${player._204.sol + 1} : ${player._204.problem?.problem}`
                }],
                "blank",
                ["clickables", [1]],
                "blank",
                function () {
                    return [
                        "row", [
                            ["clickable", player._204.button[0]],
                            ["clickable", player._204.button[1]],
                        ]
                    ]
                },
                function () {
                    return [
                        "row", [
                            ["clickable", player._204.button[2]],
                            ["clickable", player._204.button[3]],
                        ]
                    ]
                },
                "blank",
                ["display-text", function () {
                    return `题目答对+2分,答错-1分,你已经答了${formatWhole(player._204.sol)}/` + (player._204.hardmode ? `30` : `40`) + `道题目`
                }],
            ]
        },
    },
    randomProblem() {
        // 告诉你题库现在有多少题目
        // console.log(getProblemList().length)
        let array
        if (!player._204.hardmode) array = [...Array(getProblemList().length).keys()]
        else array = [...Array(getHardProblemList().length).keys()]
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        // 取41个元素避免报错
        return player._204.hardmode ? shuffled.slice(0, 31) : shuffled.slice(0, 41);
    },
    randomButton() {
        return [21, 22, 23, 24].sort(() => Math.random() - 0.5)
    },
    update(diff) {
        if (player._204.started == true && player._204.sol == (player._204.hardmode ? 30 : 40)) {
            player._204.started = false
            if (player[this.layer].points.gte(40) && !player._204.hardmode) {
                // 请使用下面的函数完成世界,而不是
                // player.points = player.points.add(1)
                // player.main.points = player.main.points.add(1)
                completeWorld(this.layer)
            }
            else if (player[this.layer].points.gte(30) && player._204.hardmode && player._204.trig) {
                player.main.points = player.main.points.add(1)
                player._204.trig = false
            }
            player[this.layer].points = player._204.maxscore
            player._204.sol = 0
            player._204.ans = 0
            player._204.problist = []
            player._204.problem = { problem: '', options: ['', '', '', ''], answer: 0 }
            player._204.button = this.randomButton()
        }
    },
    clickables: {
        11: {
            title() { return `开始答题!` },
            display() { return `获得至少40分以完成世界并获得1梦力,共40题!` },
            onClick() {
                player._204.hardmode = false
                player._204.answer = { 21: 0, 22: 0, 23: 0, 24: 0 }
                player[this.layer].points = _D0
                player._204.sol = 0
                player._204.ans = 0
                player._204.problist = layers[this.layer].randomProblem()
                player._204.button = layers[this.layer].randomButton()
                player._204.started = true
                player._204.problem = ((player._204.hardmode) ? getHardProblemList()[player._204.problist[0]] : getProblemList()[player._204.problist[0]])
            },
            unlocked() { return !player._204.started },
            canClick() { return !player._204.started },
        },
        12: {
            title() { return (player._204.sol == (player._204.hardmode ? 29 : 39)) ? "结束回答并结算" : "确认你的答案" },
            display() { return `一旦确认后不可更改!` },
            onClick() {
                player._204.answer[[21, 22, 23, 24][player._204.button.indexOf(parseInt(player._204.ans))]]++
                if (player._204.problem.answer != player._204.ans) player[this.layer].points = player[this.layer].points.sub(1)
                else {
                    player[this.layer].points = player[this.layer].points.add(2)
                    if (!player._204.hardmode) player._204.problem = player._204.maxscore = decimalMax(player._204.maxscore, player[this.layer].points)
                    else player._204.problem = player._204.hardmax = decimalMax(player._204.hardmax, player[this.layer].points)
                }
                player._204.sol++
                player._204.problem = ((player._204.hardmode) ? getHardProblemList()[player._204.problist[player._204.sol]] : getProblemList()[player._204.problist[player._204.sol]])
                player._204.ans = 0
                player._204.button = layers[this.layer].randomButton()
            },
            unlocked() { return player._204.started && player._204.sol < ((player._204.hardmode) ? 30 : 40) },
            canClick() { return player._204.started && player._204.ans != 0 },
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
            unlocked() { return player._204.started && player._204.sol < ((player._204.hardmode) ? 30 : 40) },
            canClick() { return player._204.started },
            style: {
                "width": "90px",
                "minHeight": "90px"
            }
        },
        14: {
            title() { return `寻求挑战!` },
            display() { return `更难的题目!获得至少30分额外获得1梦力,共30题!` },
            onClick() {
                player._204.hardmode = true
                player._204.answer = { 21: 0, 22: 0, 23: 0, 24: 0 }
                player[this.layer].points = _D0
                player._204.sol = 0
                player._204.ans = 0
                player._204.problist = layers[this.layer].randomProblem()
                player._204.button = layers[this.layer].randomButton()
                player._204.started = true
                player._204.problem = getHardProblemList()[player._204.problist[0]]
            },
            unlocked() { return !player._204.started && player._204.maxscore.gte(40) },
            canClick() { return !player._204.started && player._204.maxscore.gte(40) },
        },
        21: {
            display() {
                return player._204.problem?.options[0]
            },
            onClick() {
                player._204.ans = this.id
                if (!(player._204.sol == 39) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player._204.started },
            canClick() { return player._204.started && player._204.ans != this.id },
            style: {
                "background-color"() { return player._204.ans == 21 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
        22: {
            display() {
                return player._204.problem?.options[1]
            },
            onClick() {
                player._204.ans = this.id
                if (!(player._204.sol == 39) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player._204.started },
            canClick() { return player._204.started && player._204.ans != this.id },
            style: {
                "background-color"() { return player._204.ans == 22 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
        23: {
            display() {
                return player._204.problem?.options[2]
            },
            onClick() {
                player._204.ans = this.id
                if (!(player._204.sol == 39) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player._204.started },
            canClick() { return player._204.started && player._204.ans != this.id },
            style: {
                "background-color"() { return player._204.ans == 23 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
        24: {
            display() {
                return player._204.problem?.options[3]
            },
            onClick() {
                player._204.ans = this.id
                if (!(player._204.sol == 39) && getClickableState(this.layer, 13)) layers[this.layer].clickables[12].onClick()
            },
            unlocked() { return player._204.started },
            canClick() { return player._204.started && player._204.ans != this.id },
            style: {
                "background-color"() { return player._204.ans == 24 ? "hsl(70,100%,50%)" : "hsl(70,50%,90%)" },
                "fontSize": "16px",
                "width": "350px",
                "minHeight": "90px",
                "wordBreak": "break-all",
            }
        },
    }
})