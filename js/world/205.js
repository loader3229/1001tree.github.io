addLayer("205", {
    symbol: "🔱",
    resource: "能量",
    resource: "能量",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            score: 0,
            getscore: 0,
            board: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            upgrade: [],
            basic: [
                0, 0, 0, 0, 0, 0
            ],
            bmult: [
                0, 0, 0, 0, 0, 0
            ],
            mult: [0, 0, 1],
            hand: 0,
            combo: 0,
            round: 0,
            end: true,
            points: _D0,
            getscore: 0,
            board: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            upgrade: [],
            basic: [
                0, 0, 0, 0, 0, 0
            ],
            bmult: [
                0, 0, 0, 0, 0, 0
            ],
            mult: [0, 0, 1],
            hand: 0,
            combo: 0,
            round: 0,
            end: true
        }
    },
    type: "none",
    tabFormat: [
        ["display-text", function () {
            if (player[this.layer].end) return "<h1>游戏结束！</h1><br>"
        }],
        ["display-text", function () {
            return `<h2>你现在有 </h2><h1>${formatWhole(player[this.layer].score)}</h1><h2> 分和 </h2><h1>${format(player[this.layer].points, 1)}</h1><h2> 点能量${hasUpgrade(205, 45) ? "，而且你是Gay" : ""}</h2> 回合:${formatWhole(player[this.layer].round)}<br>`
        }],
        ["display-text", function () {
            if (player[this.layer].getscore != 0) return `<h2>+${format(player[this.layer].getscore)}</h2><br>`
            else return "<h2>　</h2><br>"
        }],
        ["display-text", function () {
            if (player[this.layer].combo != 0) return `<h2>${player[this.layer].combo} COMBO</h2>`
            else return "<h2>　</h2>"
        }],
        ["clickable", 11],
        "br",
        "grid",
        "br",
        ["row",
            [
                ["display-text", "你的手上拿着　"],
                ["clickable", 21],
                ["display-text", "　"],
                ["column",
                    [
                        ["display-text", function () {
                            return `1点 ${formatPersent(getWeight_205(1))}`
                        }],
                        ["display-text", function () {
                            return `2点 ${formatPersent(getWeight_205(2))}`
                        }],
                        ["display-text", function () {
                            return `3点 ${formatPersent(getWeight_205(3))}`
                        }],
                    ]
                ],
                ["display-text", "　"],
                ["column",
                    [
                        ["display-text", function () {
                            return `4点 ${formatPersent(getWeight_205(4))}`
                        }],
                        ["display-text", function () {
                            return `5点 ${formatPersent(getWeight_205(5))}`
                        }],
                        ["display-text", function () {
                            return `6点 ${formatPersent(getWeight_205(6))}`
                        }],
                    ]
                ],
                ["display-text", "　"],
                ["column",
                    [
                        ["display-text", function () {
                            return `1点 ${format(player[this.layer].basic[0] * player[this.layer].bmult[0])} 分`
                        }],
                        ["display-text", function () {
                            return `2点 ${format(player[this.layer].basic[1] * player[this.layer].bmult[1])} 分`
                        }],
                        ["display-text", function () {
                            return `3点 ${format(player[this.layer].basic[2] * player[this.layer].bmult[2])} 分`
                        }],
                    ]
                ],
                ["display-text", "　"],
                ["column",
                    [
                        ["display-text", function () {
                            return `4点 ${format(player[this.layer].basic[3] * player[this.layer].bmult[3])} 分`
                        }],
                        ["display-text", function () {
                            return `5点 ${format(player[this.layer].basic[4] * player[this.layer].bmult[4])} 分`
                        }],
                        ["display-text", function () {
                            return `6点 ${format(player[this.layer].basic[5] * player[this.layer].bmult[5])} 分`
                        }],
                    ]
                ],
                ["display-text", "　"],
                ["column",
                    [
                        ["display-text", function () {
                            return `COMBO倍率 +${format(player[this.layer].mult[0])}`
                        }],
                        ["display-text", function () {
                            return `MUTI倍率 +${format(player[this.layer].mult[1])}`
                        }],
                        ["display-text", function () {
                            return `基础分倍率 ×${format(player[this.layer].mult[2])}`
                        }],
                    ]
                ],
                ["display-text", "　"],
                ["column",
                    [
                        ["display-text", function () {
                            return `难度系数 ${format(getDiff_205())}`
                        }],
                        ["display-text", function () {
                            if (getDiff_205() > 1) return `每回合随机在场上生成点数1~5`
                        }],
                        ["display-text", function () {
                            if (getDiff_205() > 2) return `概率跳过合成判定`
                        }],
                    ]
                ],
            ]
        ],
        "br",
        "upgrades"
    ],
    grid: {
        rows: 6,
        cols: 6,
        getStartData(id) {
            return 0;
        },
        getCanClick(data, id) {
            if (data == 0) return true
            else if (player[this.layer].hand == 7) return true
            else return false
        },
        onClick(data, id) {
            let { x, y } = this.idtoxy(id)
            const hand = player[this.layer].hand;

            if (hand == 7) {
                player[this.layer].board[y][x] = 0
            } else {
                player[this.layer].board[y][x] = hand
            }

            if (hasUpgrade(this.layer, 43)) player[this.layer].points = player[this.layer].points.add(0.1)

            player[this.layer].hand = getRandomNum_205()
            player[this.layer].round++

            if (player[this.layer].round % 10 == 0) switchUpgrade_205()

            this.checkboard(id)
        },
        getDisplay(data, id) {
            if (data < 0) {
                return "";
            } else if (data <= 6 && data >= 1) {
                return data
            }
        },
        getStyle(data, id) {
            let { backgroundColor, borderColor } = getColor_205(data)

            return {
                backgroundColor,
                border: "5px solid",
                borderColor,
                fontSize: "40px",
                color: "#EEE",
                "-webkit-text-stroke": "1px #000",
                borderRadius: "50%",
                minHeight: "72px",
                height: "72px",
                width: "72px"
            }
        },
        xytoid(x, y) {
            return 100 * y + x + 101
        },
        idtoxy(id) {
            return { x: id % 100 - 1, y: ~~(id / 100) - 1 }
        },
        checkboard(id, inround = false) {
            this.layer = 205
            let board = player[205].board
            const rows = board.length
            const cols = board[0].length
            const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]

            function bfs(sx, sy, visited) {
                if (visited[sy][sx] || !board[sy][sx]) return null

                let val = board[sy][sx]
                let block = [];
                let queue = [[sx, sy]]
                visited[sy][sx] = true

                while (queue.length > 0) {
                    let [cx, cy] = queue.shift();
                    block.push([cx, cy])

                    for (let [dx, dy] of dirs) {
                        let nx = cx + dx
                        let ny = cy + dy

                        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                            if (!visited[ny][nx] && board[ny][nx] == val) {
                                visited[ny][nx] = true
                                queue.push([nx, ny])
                            }
                        }
                    }
                }

                if (block.length >= 3) {
                    if (getDiff_205() > 2 && Math.random() < (hasUpgrade(this.layer, 53) ? 0.75 : 0.85)) {
                        return null
                    }

                    for (let [bx, by] of block) {
                        board[by][bx] = 0
                    }
                    if (val < 6) {
                        board[sy][sx] = val + 1
                    }
                    return {
                        val,
                        blc: block.length
                    }
                }
                return null
            }

            let combo = 0
            let score = 0
            let points = 0
            let hasCleared = true

            while (hasCleared) {
                hasCleared = false;
                let visited = Array.from({ length: rows }, () => Array(cols).fill(false))

                let { x, y } = this.idtoxy(id)
                let result = bfs(x, y, visited)
                if (result) {
                    hasCleared = true
                    craft(result)
                }

                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        let result = bfs(x, y, visited)
                        if (result) {
                            hasCleared = true
                            craft(result)
                        }
                    }
                }

                function craft(result) {
                    this.layer = 205
                    let { basic, bmult, mult } = player[205]
                    let { val, blc } = result

                    if ([1, 3, 5].includes(val) && hasUpgrade(this.layer, 11)) {
                        player[this.layer].basic[val - 1] += val / 10
                    }
                    if ([2, 4, 6].includes(val) && hasUpgrade(this.layer, 12)) {
                        player[this.layer].basic[val - 1] += val / 10
                    }
                    if ([4, 5, 6].includes(val) && hasUpgrade(this.layer, 13)) {
                        player[this.layer].mult[2] += 0.02
                    }
                    if ([1, 2, 3].includes(val) && hasUpgrade(this.layer, 14)) {
                        player[this.layer].points = player[205].points.add(
                            0.03 * mult[2] * basic[val - 1] * bmult[val - 1]
                        )
                    }
                    if (hasUpgrade(this.layer, 16)) {
                        player[this.layer].mult[1] += 0.005 * blc
                    }
                    if (hasUpgrade(this.layer, 46)) {
                        player[this.layer].basic[val - 1] += val / 6
                        player[this.layer].mult[0] += 0.075
                        player[this.layer].mult[1] += 0.075
                        player[this.layer].mult[2] += 0.015

                        let r = [Math.random(), Math.random(), Math.random()]
                        if (r[0] < 0.1) combo += 2
                        else if (r[0] < 0.3) combo += 1
                        if (r[1] < 0.1) val += 2
                        else if (r[1] < 0.3) val += 1
                        if (r[2] < 0.1) points += val / 5
                        else if (r[2] < 0.3) points += val / 10
                    }
                    if (hasUpgrade(this.layer, 54)) {
                        basic[5] += 1
                        bmult[5] += 0.01
                    }

                    combo += 1
                    points += val / 3
                    if ([1, 2, 3].includes(val) && hasUpgrade(this.layer, 41)) {
                        score -= (basic[val - 1] * bmult[val - 1])
                            *
                            (1 + (player[this.layer].combo + combo) * (mult[0] + (hasUpgrade(this.layer, 52) ? mult[1] / 2 : 0)) + (blc - 3) * (mult[1] + (hasUpgrade(this.layer, 52) ? mult[0] / 2 : 0)))
                            *
                            mult[2]
                    } else {
                        score += (basic[val - 1] * bmult[val - 1])
                            *
                            (1 + (player[this.layer].combo + combo) * (mult[0] + (hasUpgrade(this.layer, 52) ? mult[1] / 2 : 0)) + (blc - 3) * (mult[1] + (hasUpgrade(this.layer, 52) ? mult[0] / 2 : 0)))
                            *
                            mult[2]
                    }
                }
            }

            BoardToGrid_205()

            if (inround) return { c: combo, s: score, p: points }

            if (hasUpgrade(this.layer, 24)) {
                let { x, y } = this.idtoxy(id)
                for (let row = 5; row >= 0; row--) {
                    for (let col = 0; col < 6; col++) {
                        if (col == x && row == y) continue
                        if (player[this.layer].board[row][col] !== 0 && row < 5) {
                            if (player[this.layer].board[row + 1][col] == 0) {
                                player[this.layer].board[row + 1][col] = player[this.layer].board[row][col]
                                player[this.layer].board[row][col] = 0
                            }
                        }
                    }
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            if (hasUpgrade(this.layer, 26)) {
                let { x, y } = this.idtoxy(id);

                let positions = [];
                for (let row = 0; row < 6; row++) {
                    for (let col = 0; col < 6; col++) {
                        if (col == x && row == y) continue
                        let value = player[this.layer].board[row][col];
                        if (value >= 1 && value <= 5) {
                            positions.push({ col, row, value });
                        }
                    }
                }

                if (positions.length > 0) {
                    let pos = positions[Math.floor(Math.random() * positions.length)];

                    let upgradeProb = {
                        1: 1.0,
                        2: 0.9,
                        3: 0.8,
                        4: 0.7,
                        5: 0.5
                    };

                    let prob = upgradeProb[pos.value];
                    let shouldUpgrade = Math.random() < prob;

                    if (shouldUpgrade) {
                        player[this.layer].board[pos.row][pos.col]++;
                    }
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            if (hasUpgrade(this.layer, 34)) {
                if (Math.random() < 0.5) {
                    let { x, y } = this.idtoxy(id);

                    let positions = [];
                    for (let row = 0; row < 6; row++) {
                        for (let col = 0; col < 6; col++) {
                            if (col == x && row == y) continue
                            let value = player[this.layer].board[row][col];
                            if (value == 1 || value == 2) {
                                positions.push({ col, row });
                            }
                        }
                    }

                    if (positions.length > 0) {
                        let index = Math.floor(Math.random() * positions.length);
                        let pos = positions[index];
                        player[this.layer].board[pos.row][pos.col] = 0;
                    }
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            if (getDiff_205() > 1) {
                let positions = [];
                for (let y = 0; y < 6; y++) {
                    for (let x = 0; x < 6; x++) {
                        if (player[this.layer].board[y][x] == 0) {
                            positions.push({ x, y });
                        }
                    }
                }

                if (positions.length > 0 &&
                    (Math.random() < (hasUpgrade(this.layer, 53) ? getDiff_205() / 2 : getDiff_205()) - 1)) {
                    let index = Math.floor(Math.random() * positions.length);
                    let pos = positions[index];
                    player[this.layer].board[pos.y][pos.x] = Math.floor(Math.random() * 5) + 1;
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            if (getDiff_205() > 2 && !hasUpgrade(this.layer, 53)) {
                let positions = [];
                for (let y = 0; y < 6; y++) {
                    for (let x = 0; x < 6; x++) {
                        if (player[this.layer].board[y][x] == 0) {
                            positions.push({ x, y });
                        }
                    }
                }

                if (positions.length > 0) {
                    let index = Math.floor(Math.random() * positions.length);
                    let pos = positions[index];
                    player[this.layer].board[pos.y][pos.x] = Math.floor(Math.random() * 5) + 1;
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            if (getDiff_205() > 3) {
                let positions = [];
                for (let y = 0; y < 6; y++) {
                    for (let x = 0; x < 6; x++) {
                        if (player[this.layer].board[y][x] == 0) {
                            positions.push({ x, y });
                        }
                    }
                }

                if (positions.length > 0) {
                    let index = Math.floor(Math.random() * positions.length);
                    let pos = positions[index];
                    player[this.layer].board[pos.y][pos.x] = Math.floor(Math.random() * 5) + 1;
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            if (hasUpgrade(this.layer, 25)) {
                let eng = player[this.layer].points.mul(0.01).toNumber()
                player[this.layer].points = player[this.layer].points.mul(0.99)

                for (let i = 0; i < 6; i++) {
                    player[this.layer].bmult[i] += eng / (i + 1) / 6
                }

                let { c, s, p } = this.checkboard(101, true)
                combo += c; score += s; points += p
            }

            BoardToGrid_205()

            if (hasUpgrade(this.layer, 22)) score = score ** 0.5
            score *= getEffect(this.layer, 23, 1)
            if (hasUpgrade(this.layer, 54)) score = score /= 2

            if (hasUpgrade(this.layer, 36)) combo *= 1.5

            player[this.layer].combo = combo == 0 && !inround ? 0 : player[this.layer].combo + combo
            player[this.layer].getscore = score
            player[this.layer].score += score
            player[this.layer].points = player[this.layer].points.add(points)

            if (hasUpgrade(this.layer, 36)) player[this.layer].combo = Math.max(player[this.layer].combo, 0.5)

            if (player[this.layer].combo >= 2 && hasUpgrade(this.layer, 15)) {
                player[this.layer].mult[0] += 0.05
            }

            if (hasUpgrade(this.layer, 35)) for (let i = 0; i < 6; i++) {
                player[this.layer].basic[i] += player[this.layer].combo * 0.01
            }

            if (hasUpgrade(this.layer, 44)) {
                player[this.layer].mult[2] += getDiff_205() / 50
            }

            if (hasUpgrade(this.layer, 51)) {
                player[this.layer].score *= 1.01
            }

            let isBoardFull = true
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    if (board[y][x] == 0) {
                        isBoardFull = false
                        break
                    }
                }
                if (!isBoardFull) break
            }

            if (isBoardFull && !player[this.layer].end) {
                player[this.layer].end = true
            }
        }
    },
    clickables: {
        11: {
            title: "新的一局",
            canClick() {
                return true
            },
            onClick() {
                layers[this.layer].start()
            },
            style: {
                minHeight: "40px"
            }
        },
        21: {
            display() {
                let hand = player[this.layer].hand
                if (hand == 7) {
                    return "💣";
                }
                return hand
            },
            style() {
                return {
                    border: "9px solid",
                    ...getColor_205(player[this.layer].hand),
                    fontSize: "56px",
                    color: "#EEE",
                    "-webkit-text-stroke": "3px #000",
                    borderRadius: "15px",
                    minHeight: "90px",
                    height: "90px",
                    width: "90px"
                }
            },
        }
    },
    upgrades: {
        11: {
            title: "奇数专精",
            description: "每次合成奇数时，其基础分+0.1/0.3/0.5每块",
            cost: 5,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        12: {
            title: "偶数专精",
            description: "每次合成偶数时，其基础分+0.2/0.4/0.6每块",
            cost: 6,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        13: {
            title: "大数字",
            description: "每次合成4、5、6时，提升0.02的基础分倍率",
            cost: 9,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        14: {
            title: "小数字",
            description: "每次合成1、2、3时，获得0.03×基础分倍率×点数分能量",
            cost: 14,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        15: {
            title: "COMBO!!!",
            description: "保持在2combo以上的每回合提升0.05的combo倍率",
            cost: 10,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        16: {
            title: "MULT!!!",
            description: "合成时，每块提升0.005的mult倍率",
            cost: 11,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        21: {
            title: "胖宝宝可爱喵",
            description: "增加4、5、6点的生成概率",
            cost: 16,
            effect() {
                let diff = getDiff_205()
                return Math.pow(5 * diff + 1, 0.65) - 1
            },
            effectDisplay() { return `权重+${format(this.effect())}` },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        22: {
            title: "分数压缩",
            description: "你的分数获取被平方根，这有助于降低游戏难度系数并帮你完成一些东西，hehehe",
            cost: 0,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        23: {
            title: "厚积薄发",
            description: "你需要拥有分数压缩才能购买这个，你的分数获取基于log2(分数)²提升",
            cost() { return hasUpgrade(this.layer, 22) ? 37 : _DInf },
            effect() { return player[this.layer].points.add(2).log(2).pow(2) },
            effectDisplay() { return `×${format(this.effect())}` },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        24: {
            title: "为坠落的点数命名",
            description: "每回合点数会下落一格",
            cost: 24,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        25: {
            title: "能量献祭",
            description: "每回合消耗1%能量并转换为基础分倍率",
            cost: 7,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        26: {
            title: "超级电池",
            description: "每回合为一个点数升级，点数越小成功率越高",
            cost: 35,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        31: {
            title: "升级!升级!升级!",
            description: "增加升级的刷新数量由4至8",
            cost: 12,
            effect() { return 8 },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        32: {
            title: "炸弹",
            description: "固定8%概率生成炸弹，炸掉一个块",
            cost: 20,
            effect() { return 19 },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        33: {
            title: "弱化药剂",
            description: "降低25%难度",
            cost: 15,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        34: {
            title: "腐化",
            description: "每回合有50%概率清除一个1点或2点",
            cost: 32,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        35: {
            title: "Basic Farm",
            description: "每回合保持的combo数增加所有点数0.01基础分数",
            cost: 13,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        36: {
            title: "连击保持器",
            description: "连击叠加起点变为0.5combo，且连击+50%",
            cost: 27,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        41: {
            title: "反物质",
            description: "降低1、2的生成概率，但是1、2、3点的得分反转",
            cost: 31,
            effect() {
                let diff = getDiff_205()
                return Math.pow(5 * diff + 1, 1.15) - 1
            },
            effectDisplay() { return `权重-${format(this.effect())}` },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        42: {
            title: "幸运6点",
            description: "购买时6点基础分+66",
            cost: 8,
            onPurchase() {
                player[this.layer].basic[5] += 66
            },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        43: {
            title: "清洁能源",
            description: "每回合产生0.1能量",
            cost: 17,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        44: {
            title: "难度驱动",
            description: "基于当前难度每回合获得基础倍率",
            cost: 33,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        45: {
            title: "1001",
            description: "73;32;65;77;<br>32;71;65;89;",
            cost: 28,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        46: {
            title: "Elemental",
            description: "合成时，增加基础分、combo分、muti分和基础分倍率，概率获得额外combo、额外mult和额外能量",
            cost: 159,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        51: {
            title: "利息",
            description: "每回合分数×1.01",
            cost: 19,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        52: {
            title: "相濡以沫",
            description: "combo的一半加成mult，mult的一半加成combo",
            cost: 30,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        53: {
            title: "安全词",
            description: "削弱难度惩罚",
            cost: 32,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        54: {
            title: "集中精力",
            description: "合成获得的点数降低50%，但每次合成加成6点的1基础分和0.01基础分倍率",
            cost: 21,
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        55: {
            title: "资产清算",
            description: "将分数清零",
            cost: 4,
            onPurchase() {
                player[this.layer].score = 0
            },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
        56: {
            title: "完成世界",
            description: "完成世界并获得1梦力",
            cost: 30,
            onPurchase() {
                if (!player.world[this.layer]) {
                    completeWorld(this.layer)
                }
            },
            unlocked() {
                return hasUpgrade(this.layer, this.id) || player[this.layer].upgrade.includes(this.id)
            }
        },
    },
    start() {
        player[this.layer].board = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
        player[this.layer].score = 0
        player[this.layer].getscore = 0
        player[this.layer].combo = 0
        player[this.layer].basic = [1, 4, 9, 16, 25, 36]
        player[this.layer].bmult = [1, 1, 1, 1, 1, 1]
        player[this.layer].mult = [0, 0, 1]
        player[this.layer].hand = getRandomNum_205()
        player[this.layer].points = _D(0)
        player[this.layer].round = 0
        player[this.layer].end = false

        player[this.layer].upgrades = []

        switchUpgrade_205()
        BoardToGrid_205()
    },
    xytoid(x, y) {
        return 100 * y + x + 101
    },
    idtoxy(id) {
        return { x: id % 100 - 1, y: ~~(id / 100) - 1 }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) }
});

function switchUpgrade_205() {
    player[205].upgrade = chooseFromArray(
        Object.keys(layers[205].upgrades)
            .filter(key => !isNaN(key)),
        getEffect(205, 31, 4)
    )
}

function BoardToGrid_205() {
    player[205].board.forEach((row, i) => {
        row.forEach((value, j) => {
            setGridData(205, layers[205].xytoid(j, i), value)
        })
    })
}

function getRandomNum_205() {
    if (hasUpgrade(205, 32) && Math.random() < 0.08) return 7
    return chooseWeightInArray([
        [1, getWeight_205(1)],
        [2, getWeight_205(2)],
        [3, getWeight_205(3)],
        [4, getWeight_205(4)],
        [5, getWeight_205(5)],
        [6, getWeight_205(6)]
    ])
}

function getDiff_205() {
    let score = player[205].score
    let round = player[205].round
    let diff = 33 * (1 / (1 + 2 ** (-(score - 5000) / 1000)) - 1 / 33) / 32 + round ** 0.9 / 400 + (Math.log2(score + 1024) - 10) / 5

    if (hasUpgrade(205, 33)) diff *= 0.75

    return diff
}

function getWeight_205(points) {
    let diff = getDiff_205()
    let weight = [
        Math.pow(5 * diff + 1, 1.6) - 0.6 - getEffect(205, 41, 0),
        Math.pow(5 * diff + 1, 1.4) - 0.3 - getEffect(205, 41, 0),
        Math.pow(5 * diff + 1, 1.25),
        Math.pow(5 * diff + 1, 1) - 0.3 + getEffect(205, 21, 0),
        Math.pow(5 * diff + 1, 0.7) - 0.6 + getEffect(205, 21, 0),
        Math.pow(5 * diff + 1, 0.5) - 1 + getEffect(205, 21, 0)
    ]
    let total = weight.reduce((a, b) => a + b, 0)

    return weight[points - 1] / total
}

function getColor_205(data) {
    let backgroundColor = "#ffffff"
    switch (data) {
        case 1:
            backgroundColor = "#ffe65d"
            break;
        case 2:
            backgroundColor = "#4d52e3"
            break;
        case 3:
            backgroundColor = "#861fde"
            break;
        case 4:
            backgroundColor = "#1fdbde"
            break;
        case 5:
            backgroundColor = "#ff2b75"
            break;
        case 6:
            backgroundColor = "#2bffa3"
            break;
        case 7:
            backgroundColor = "#444444"
            break;
    }

    let borderColor = "#cfcfcf"
    switch (data) {
        case 1:
            borderColor = "#cfba4b"
            break;
        case 2:
            borderColor = "#3e42b8"
            break;
        case 3:
            borderColor = "#6d19b4"
            break;
        case 4:
            borderColor = "#19b1b4"
            break;
        case 5:
            borderColor = "#cf235f"
            break;
        case 6:
            borderColor = "#23cf84"
            break;
        case 7:
            borderColor = "#222222"
            break;
    }

    return {
        backgroundColor,
        borderColor
    }
}