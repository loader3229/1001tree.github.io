addLayer("502", {
    symbol: "💣",
    resource: "分数",
    color: "#aaa",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
        ["main-display", 1],
        ["display-text", "获得200分数后点新的一局/结束游戏以完成世界"],
        ["infobox", 0],
        "blank",
        ["blank", "10px"],
        ["row",
            [
                ["clickable", 11],
                ["clickable", 12]
            ]
        ],
        "gridcompact",
        ["clickable", 13],
        "blank",
    ],
    normalEndGame() {
        let _p = player._502
        _p.board = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
        _p.aiopen = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
        _p.inGame = false
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return -1
        },
        xytoid(x, y) {
            return 100 * y + x + 101
        },
        idtoxy(id) {
            return { x: id % 100 - 1, y: ~~(id / 100) - 1 }
        },
        getCanClick(data, id) {
            return data < 0 && player._502.inGame
        },
        onClick(data, id) {
            if (data >= 0) return

            let xy = this.idtoxy(id)
            let d = this.getValue(xy, player._502.board)
            let a = this.getArrow(d)

            setGridData(this.layer, id, d)

            let aim = player._502.ai == 9 ? 10 : player._502.ai

            if (d == 16) {
                player[this.layer].points = player[this.layer].points.add(_D(30).add(_D2.mul(aim)))
                layers[this.layer].normalEndGame()
                return
            }

            if (a == 0) {
                player[this.layer].points = player[this.layer].points.add(_D(3).add(_D(0.2).mul(aim)))
            } else {
                player[this.layer].points = decimalMax(player[this.layer].points.sub(_D(1.5).sub(_D(0.1).mul(aim)).mul(a)), 0)
            }

            layers[this.layer].ai[`ai${player._502.ai}`]()
        },
        getStyle(data, id) {
            let backgroundImage, border

            let { x, y } = this.idtoxy(id)

            if (player._502.aiopen[y][x] && player._502.ai == 9) {
                backgroundImage = `url(resources/pic/502_ai.png)`
            } else if (data >= 0) {
                backgroundImage = `url(resources/pic/502_${data}.png)`
            }
            else {
                backgroundImage = "unset"
            }

            if (data < 0) {
                border = "10px outset #2c4"
            } else if (data == 0) {
                border = "10px inset #f44"
            } else {
                border = "10px inset #888"
            }

            if (!player._502.inGame) border = "10px solid #aaa"

            return {
                width: "120px",
                height: "120px",
                borderRadius: "unset",
                backgroundImage,
                border,
                backgroundColor: "#EEE",
                backgroundSize: "cover",
            }
        },
        getArrow(n) {
            let c = 0;
            while (n) {
                c++;
                n &= n - 1;
            }
            return c;
        },
        getValue(xy, array) {
            const { x, y } = xy;
            const n = 5;
            const c = array[y][x];
            let d = [0, 0, 0, 0];

            if (c == 25) return 16

            for (let j = x - 1; j >= 0; j--) { if (array[y][j] > c) { d[0] = 1; break; } }
            for (let i = y + 1; i < n; i++) { if (array[i][x] > c) { d[1] = 1; break; } }
            for (let j = x + 1; j < n; j++) { if (array[y][j] > c) { d[2] = 1; break; } }
            for (let i = y - 1; i >= 0; i--) { if (array[i][x] > c) { d[3] = 1; break; } }

            const v = d[0] * 8 + d[1] * 4 + d[2] * 2 + d[3] * 1;
            return v;
        },
    },
    clickables: {
        11: {
            title: "新的一局",
            display() {
                return "开始一局新的游戏"
            },
            canClick() {
                return true
            },
            onClick() {
                let _p = player._502
                let p = player[502]
                _p.board = this.getBoard()
                _p.aiopen = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
                _p.inGame = true
                for (b in p.grid) {
                    p.grid[b] = -1
                }

                if (!player.world[this.layer] && player[this.layer].points.gte(200)) completeWorld(this.layer)
            },
            width: "300px",
            height: "50px",
            style() {
                let w = this.width
                let h = this.height
                return {
                    minWidth: h,
                    width: w,
                    minHeight: h,
                    height: h,
                    borderRadius: "unset",
                    borderTopLeftRadius: "20px",
                    border: "3px solid #aaa",
                    borderRightWidth: "2px",
                    backgroundColor: "#ded",
                    overflow: "hidden",
                    transform: "unset",
                }
            },
            getBoard() {
                let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
                for (let i = numbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
                }
                let result = [];
                for (let i = 0; i < 5; i++) {
                    result.push(numbers.slice(i * 5, i * 5 + 5));
                }
                return result;
            }
        },
        12: {
            title: "结束游戏",
            display() {
                return "如果在中途重开,你将无法收回你的点数"
            },
            canClick() {
                return true
            },
            onClick() {
                let _p = player._502
                let p = player[502]
                _p.board = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
                _p.aiopen = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
                _p.inGame = false
                for (b in p.grid) {
                    p.grid[b] = -1
                }

                if (!player.world[this.layer] && player[this.layer].points.gte(200)) completeWorld(this.layer)
            },
            width: "300px",
            height: "50px",
            style() {
                let w = this.width
                let h = this.height
                return {
                    minWidth: h,
                    width: w,
                    minHeight: h,
                    height: h,
                    borderRadius: "unset",
                    borderTopRightRadius: "20px",
                    border: "3px solid #aaa",
                    borderLeftWidth: "2px",
                    backgroundColor: "#fdd",
                    overflow: "hidden",
                    transform: "unset",
                }
            },
            getBoard() {
                let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
                for (let i = numbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
                }
                let result = [];
                for (let i = 0; i < 5; i++) {
                    result.push(numbers.slice(i * 5, i * 5 + 5));
                }
                return result;
            }
        },
        13: {
            title() { return `AI强度 ${player._502.ai}` },
            canClick() {
                return !player._502.inGame
            },
            onClick() {
                player._502.ai = (player._502.ai + 1) % 10
            },
            progress() {
                let result = player._502.ai / 9
                return decimalBetween(result, 0, 1)
            },
            width: "600px",
            height: "40px",
            borderColor: "#aaa",
            fillColor: "#8ff",
            backColor: "#444",
            fontColor: "#f55",
            style() {
                let w = this.width
                let h = this.height
                let b; if (typeof this.borderColor == 'undefined') b = 'var(--color)'; else b = this.borderColor
                let f; if (typeof this.fillColor == 'undefined') f = 'var(--color)'; else f = this.fillColor
                let g; if (typeof this.backColor == 'undefined') g = 'transparent'; else g = this.backColor
                let t; if (typeof this.fontColor == 'undefined') t = 'unset'; else t = this.fontColor
                let p = formatPersent(this.progress())
                let i = `linear-gradient(to right, ${f} 0% ${p}, rgba(0,0,0,0) ${p} 100%),linear-gradient(${g})`
                return {
                    minWidth: h,
                    width: w,
                    minHeight: h,
                    height: h,
                    color: t,
                    background: "unset",
                    backgroundImage: i,
                    border: "3px solid",
                    borderRadius: "unset",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    borderColor: b,
                    overflow: "hidden",
                    transform: "unset",
                }
            }
        },
    },
    ai: {
        layer: 502,
        ai0() {
            let { sb, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (sb.length != 0) {
                this.click(chooseOneInArray(sb))
                return
            }
            this.click(chooseOneInArray(tb))
        },
        ai1() {
            let { tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            this.click(chooseOneInArray(tb))
        },
        ai2() {
            let { sb, db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (sb.length == 0) {
                this.click(chooseOneInArray(db))
            } else if (db.length == 0) {
                this.click(chooseOneInArray(sb))
            } else {
                let rs = chooseWeightInArray([[sb, 1], [db, 1]])
                this.click(chooseOneInArray(rs))
            }
        },
        ai3() {
            let { sb, db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (sb.length == 0) {
                this.click(chooseOneInArray(db))
            } else if (db.length == 0) {
                this.click(chooseOneInArray(sb))
            } else {
                let rs = chooseWeightInArray([[sb, 1], [db, 2]])
                this.click(chooseOneInArray(rs))
            }
        },
        ai4() {
            let { sb, db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (sb.length == 0) {
                this.click(chooseOneInArray(db))
            } else if (db.length == 0) {
                this.click(chooseOneInArray(sb))
            } else {
                let rs = chooseWeightInArray([[sb, 1], [db, 3]])
                this.click(chooseOneInArray(rs))
            }
        },
        ai5() {
            let { db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (db.length == 0) {
                this.click(chooseOneInArray.tb)
                return
            }
            this.click(chooseOneInArray(db))
        },
        ai6() {
            let { db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (db.length == 0) {
                this.click(chooseOneInArray.tb)
                return
            }

            let maxInfo = -1
            let bestCell = null

            for (const id of db) {
                const xy = this.idtoxy(id)
                const infoDensity = this.calculateInfoDensity(xy, 2, 1)

                if (infoDensity > maxInfo) {
                    maxInfo = infoDensity
                    bestCell = id
                }
            }

            this.click(bestCell)
        },
        ai7() {
            let { db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (Math.random() < 0.05) {
                this.click(this.find25())
                return
            }

            if (db.length == 0) {
                this.click(chooseOneInArray.tb)
                return
            }

            let maxInfo = -1
            let bestCell = null

            for (const id of db) {
                const xy = this.idtoxy(id)
                const infoDensity = this.calculateInfoDensity(xy, 3, 1)

                if (infoDensity > maxInfo) {
                    maxInfo = infoDensity
                    bestCell = id
                }
            }

            this.click(bestCell)
        },
        ai8() {
            let { db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (Math.random() < 0.1) {
                this.click(this.find25())
                return
            }

            if (db.length == 0) {
                this.click(chooseOneInArray.tb)
                return
            }

            let maxInfo = -1
            let bestCell = null

            for (const id of db) {
                const xy = this.idtoxy(id)
                const infoDensity = this.calculateInfoDensity(xy, 5, 1)

                if (infoDensity > maxInfo) {
                    maxInfo = infoDensity
                    bestCell = id
                }
            }

            this.click(bestCell)
        },
        ai9() {
            let { db, tb } = this.analyzeGrid()
            if (tb.length == 0) {
                player._502.final = true
                layers[this.layer].normalEndGame()
                return
            }

            if (Math.random() < 0.15) {
                this.click(this.find25())
                return
            }

            if (db.length == 0) {
                this.click(chooseOneInArray.tb)
                return
            }

            let maxInfo = -1
            let bestCell = null

            for (const id of db) {
                const xy = this.idtoxy(id)
                const infoDensity = this.calculateInfoDensity(xy, 1, 0)

                if (infoDensity > maxInfo) {
                    maxInfo = infoDensity
                    bestCell = id
                }
            }

            this.click(bestCell)
        },
        click(id) {
            let xy = this.idtoxy(id)
            let d = this.getValue(xy, player._502.board)

            player._502.aiopen[xy.y][xy.x] = 1

            setGridData(this.layer, id, d)

            if (d == 16) layers[this.layer].normalEndGame()
        },
        xytoid(x, y) {
            return 100 * y + x + 101
        },
        idtoxy(id) {
            return { x: id % 100 - 1, y: ~~(id / 100) - 1 }
        },
        find25() {
            let b = player._502.board
            for (y = 0; y < b.length; y++) {
                let a = b[y]
                for (x = 0; x < a.length; x++) {
                    if (a[x] == 25) return this.xytoid(x, y)
                }
            }
        },
        getValue(xy, array) {
            const { x, y } = xy
            const n = 5
            const c = array[y][x]
            let d = [0, 0, 0, 0]

            if (c == 25) return 16

            for (let j = x - 1; j >= 0; j--) { if (array[y][j] > c) { d[0] = 1; break } }
            for (let i = y + 1; i < n; i++) { if (array[i][x] > c) { d[1] = 1; break } }
            for (let j = x + 1; j < n; j++) { if (array[y][j] > c) { d[2] = 1; break } }
            for (let i = y - 1; i >= 0; i--) { if (array[i][x] > c) { d[3] = 1; break } }

            const v = d[0] * 8 + d[1] * 4 + d[2] * 2 + d[3] * 1
            return v;
        },
        calculateInfoDensity(xy, w1 = 2, w2 = 1) {
            const { x, y } = xy

            let directionCount = 4
            if (x == 0 || x == 4) directionCount--
            if (y == 0 || y == 4) directionCount--

            let reachableCells = 0
            for (let j = x - 1; j >= 0; j--) {
                const id = this.xytoid(j, y)
                if (player[this.layer].grid[id] < 0) reachableCells++
            }
            for (let i = y + 1; i < 5; i++) {
                const id = this.xytoid(x, i)
                if (player[this.layer].grid[id] < 0) reachableCells++
            }
            for (let j = x + 1; j < 5; j++) {
                const id = this.xytoid(j, y)
                if (player[this.layer].grid[id] < 0) reachableCells++
            }
            for (let i = y - 1; i >= 0; i--) {
                const id = this.xytoid(x, i)
                if (player[this.layer].grid[id] < 0) reachableCells++
            }

            return directionCount * w1 + reachableCells * w2
        },
        analyzeGrid() {
            const g = player[this.layer].grid

            const grid2D = []
            for (let y = 0; y < 5; y++) {
                grid2D[y] = []
                for (let x = 0; x < 5; x++) {
                    const id = this.xytoid(x, y)
                    grid2D[y][x] = g[id]
                }
            }

            const tb = []
            for (const i in g) {
                if (g[i] < 0) tb.push(i)
            }

            const sb = []
            const db = []

            for (const id of tb) {
                const { x, y } = this.idtoxy(id)

                let allLeftPoint = true
                let allRightPoint = true
                let allDownPoint = true
                let allUpPoint = true


                for (let k = y + 1; k < 5; k++) {
                    if (grid2D[k][x] >= 0) {
                        if ((grid2D[k][x] & 1) == 0) {
                            allDownPoint = false
                        }
                    }
                }
                for (let j = x - 1; j >= 0; j--) {
                    if (grid2D[y][j] >= 0) {
                        if ((grid2D[y][j] & 2) == 0) {
                            allLeftPoint = false
                        }
                    }
                }
                for (let k = y - 1; k >= 0; k--) {
                    if (grid2D[k][x] >= 0) {
                        if ((grid2D[k][x] & 4) == 0) {
                            allUpPoint = false
                        }
                    }
                }
                for (let j = x + 1; j < 5; j++) {
                    if (grid2D[y][j] >= 0) {
                        if ((grid2D[y][j] & 8) == 0) {
                            allRightPoint = false
                        }
                    }
                }

                let allPoint = allUpPoint && allRightPoint && allDownPoint && allLeftPoint
                let isSafe = true
                if (allPoint) isSafe = false
                isSafe ? sb.push(id) : db.push(id)
            }

            return { sb, db, tb };
        }
    },
    infoboxes: {
        0: {
            title: "玩法",
            body() {
                return `
                <h3>基本玩法</h3><br>
                游戏盘面是一个5×5的正方形网格,其中每一个格子都对应1~25的随机数字<br>
                你和AI轮流开格子,开格之后,如果开到25则胜利<br>
                否则,格子上会显示四个方向(是一整行一整列而不是相邻的)的数中<br>
                是否存在比该格更大的数字,×的意思是没有,你需要通过这些信息找到25<br>
                也就是说,你的目标是踩到炸弹(同志们,我踩着地雷了!)<br><br>

                <h3>得分规则</h3><br>
                当你开格时,开到25或×的时候会加分,否则你会基于格子上的箭头数扣分<br>
                根据AI难度存在一个评分系数,难度越高,得分越高,扣分越少<br><br>

                <h3>AI描述</h3><br>
                <table style="border: 2px solid #fff; border-collapse: collapse; width: 90%;">
                <tr style="border: 1px solid #fff;">
                <th style="border: 1px solid #fff;">AI</th>
                <th style="border: 1px solid #fff;">ELO*</th>
                <th>描述</th>
                </tr><tr style="border: 1px solid #fff;">
                <td>0</td>
                <td style="border: 1px solid #fff;">545</td>
                <td>送人头,随机选择一个不可能是25的格子,除非没得选</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>1</td>
                <td style="border: 1px solid #fff;">1102</td>
                <td>基础AI,它非常蠢,只会随机选择一个格子</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>2</td>
                <td style="border: 1px solid #fff;">1205</td>
                <td>先从安全格和危险格中选择一种,再随机选择格子</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>3</td>
                <td style="border: 1px solid #fff;">1346</td>
                <td>和2级AI一样,但危险格的权重是2</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>4</td>
                <td style="border: 1px solid #fff;">1410</td>
                <td>和2级AI一样,但危险格的权重是3</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>5</td>
                <td style="border: 1px solid #fff;">1560</td>
                <td>从危险格中随机选择一个格子</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>6</td>
                <td style="border: 1px solid #fff;">1619</td>
                <td>和5级AI一样,但对格子加权计算,潜在信息越多权越大</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>7</td>
                <td style="border: 1px solid #fff;">1860</td>
                <td>基于6级AI优化权重,且5%作弊直接点击25</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>8</td>
                <td style="border: 1px solid #fff;">2057</td>
                <td>基于7级AI进一步优化权重,且10%作弊直接点击25</td>
                </tr>
                
                <tr style="border: 1px solid #fff;">
                <td>9</td>
                <td style="border: 1px solid #fff;">2369</td>
                <td>基于8级AI优化权重至最优,且15%作弊直接点击25,且你无法得知它开的格的状态(除非它是×)</td>
                </tr></table>
                *ELO通过40000000场AI比赛模拟得出,ELO相当于AI的强度,越高越强<br><br>

                <h3>得分表</h3><br>
                <table style="border: 2px solid #fff; border-collapse: collapse; width: 90%;">
                    <tr style="border: 1px solid #fff;"><th style="border: 1px solid #fff;">AI强度</th><th>开到×加分</th><th>每箭头扣分</th><th>开到25加分</th></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">0</td><td>3.0</td><td>1.5</td><td>30</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">1</td><td>3.2</td><td>1.4</td><td>32</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">2</td><td>3.4</td><td>1.3</td><td>34</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">3</td><td>3.6</td><td>1.2</td><td>36</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">4</td><td>3.8</td><td>1.1</td><td>38</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">5</td><td>4.0</td><td>1.0</td><td>40</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">6</td><td>4.2</td><td>0.9</td><td>42</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">7</td><td>4.4</td><td>0.8</td><td>44</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">8</td><td>4.6</td><td>0.7</td><td>46</td></tr>
                    <tr style="border: 1px solid #fff;"><td style="border: 1px solid #fff;">9</td><td>5.0</td><td>0.5</td><td>50</td></tr>
                </table>` },
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
});