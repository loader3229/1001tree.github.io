addLayer("404", {
    symbol: "🌙",
    resource: "Dut",
    color: "hsl(250,100%,50%)",
    startData() {
        return {
            unlocked: true,
            points: _D0,
            speed: 10,
            offset: 0,
            judge: 0,
        }
    },
    type: "none",
    tabFormat: [
        [
            "row",
            [
                [
                    "column",
                    [
                        ["display-text", function () {
                            return `
                            ${d404.e ? "游戏结束喵<br>" : ""}<br>
                            70万分完成世界<br><br>
                            最高分数<br><h1 class="p8pt">${formatWhole(player[404].points)}</h1><br><br>
                            你的分数<br><h1 class="p8pt">${formatWhole(d404.p)}</h1><br>
                            准度 ${format(calApc())}<br>
                            绝赞 ${format(calMax())}<br>
                            连击 ${format(calCom())}<br>
                            <br>
                            ACC<br><h2 class="p8pt">${formatPersent(calAcc())}</h2><br><br>
                            最大连击<br><h2 class="p8pt">${formatWhole(d404.mc)}</h2><br><br>
                            平均偏移<br><h2 class="p8pt">${format(calDel(), 1)}ms</h2><br><br>`
                        }],
                        ["display-text", function () {
                            return `流速 ${player[this.layer].speed}`
                        }],
                        ["slider", ["speed", 3, 25]],
                        ["display-text", function () {
                            return `延迟 ${player[this.layer].offset}`
                        }],
                        ["slider", ["offset", -300, 300]],
                        "blank",
                        ["clickable", 11],
                        ["clickable", 12],
                    ]
                ],
                [
                    "raw-html",
                    '<canvas id="c404" width="720" height="810" style="background-color: #000;"></canvas>'
                ],
                [
                    "column",
                    [
                        ["display-text", function () {
                            return `
                            ${getText(0)}(${formatPersent(w404[0])})<br><h2 class="p8pt">${formatWhole(d404.j[0])}</h2><br><br>
                            ${getText(1)}(${formatPersent(w404[1])})<br><h2 class="p8pt">${formatWhole(d404.j[1])}</h2><br><br>
                            ${getText(2)}(${formatPersent(w404[2])})<br><h2 class="p8pt">${formatWhole(d404.j[2])}</h2><br><br>
                            ${getText(3)}(${formatPersent(w404[3])})<br><h2 class="p8pt">${formatWhole(d404.j[3])}</h2><br><br>
                            ${getText(4)}(${formatPersent(w404[4])})<br><h2 class="p8pt">${formatWhole(d404.j[4])}</h2><br><br>
                            ${getText(5)}(${formatPersent(w404[5])})<br><h2 class="p8pt">${formatWhole(d404.j[5])}</h2><br><br>
                            FAST<br><h2 class="p8pt">${formatWhole(d404.j[6])}</h2><br>
                            SLOW<br><h2 class="p8pt">${formatWhole(d404.j[7])}</h2>`
                        }],
                        "blank",
                        ["clickable", 21],
                        ["clickable", 22],
                        ["clickable", 23],
                    ]
                ],
            ]
        ]
    ],
    clickables: {
        11: {
            title: "开始游戏",
            display: "退出该页面会导致游戏中止<br>推荐暂停其他游戏以获得流畅体验",
            onClick() {
                stopsound("ts")
                d404.e = false
                d404.s = true
                d404.st = Date.now()
                startChart()
                to404 = setTimeout(() => { playsound("ts") }, 3000)
                document.getElementById("ts").addEventListener('ended', endGame, { once: true });
            },
            canClick() { return true },
            style() {
                return {
                    width: "200px",
                    minHeight: "75px",
                    height: "75px",
                    backgroundColor: "#DDD"
                }
            }
        },
        12: {
            title: "结束游戏",
            display: "如果游戏结束歌还在播放,请点我",
            onClick() {
                d404.u = false
                d404.s = false
                stopsound("ts")
                startChart()
                document.getElementById("ts").removeEventListener('ended', endGame, { once: true });
            },
            canClick() { return true },
            style() {
                return {
                    width: "200px",
                    minHeight: "75px",
                    height: "75px",
                    backgroundColor: "#DDD"
                }
            }
        },
        21: {
            title: "初始设置",
            display: "重置流速和延迟",
            onClick() {
                player[404].speed = 10
                player[404].offset = 0
            },
            canClick() { return true },
            style() {
                return {
                    width: "200px",
                    minHeight: "60px",
                    height: "60px",
                    backgroundColor: "#DDD"
                }
            }
        },
        22: {
            title: "判定",
            display() {
                if (player[this.layer].judge == 0) return "普判<br>常规判定"
                else if (player[this.layer].judge == 1) return "宽判<br>将无法获得FOX,且BAD判定范围更大"
                else if (player[this.layer].judge == 2) return "严判<br>去除FoX,但判定更严格"
                else if (player[this.layer].judge == 3) return "糊判<br>打到就是FOX"
                return "你把判定改炸了,朋友"
            },
            onClick() {
                if (player[this.layer].judge == 1) {
                    player[this.layer].judge = 2
                    return
                }
                else if (player[this.layer].judge == 2) {
                    player[this.layer].judge = 3
                    return
                }
                else if (player[this.layer].judge == 3) {
                    player[this.layer].judge = 0
                    return
                }
                player[this.layer].judge = 1
            },
            canClick() { return !d404.s },
            style() {
                return {
                    width: "200px",
                    minHeight: "60px",
                    height: "60px",
                    backgroundColor: "#DDD"
                }
            }
        },
        23: {
            title: "AUTO",
            display: "不计分,不可关闭<br>除非结束游戏",
            onClick() {
                d404.u = true
            },
            canClick() { return !d404.u },
            style() {
                return {
                    width: "200px",
                    minHeight: "60px",
                    height: "60px",
                    backgroundColor: "#DDD"
                }
            }
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    hotkeys: [
        {
            key: "z",
            onPress() { clickTrack(0) },
            unlocked() { return getGridData('main', this.layer) }
        },
        {
            key: "x",
            onPress() { clickTrack(1) },
            unlocked() { return getGridData('main', this.layer) }
        },
        {
            key: ".",
            onPress() { clickTrack(2) },
            unlocked() { return getGridData('main', this.layer) }
        },
        {
            key: "/",
            onPress() { clickTrack(3) },
            unlocked() { return getGridData('main', this.layer) }
        },
    ],
});

let to404
let i404 = null

let crt = {}

const d404 = {
    u: false,
    jt: 0,
    e: false,
    s: false,
    t: Date.now(),
    st: Date.now(),
    tt: 0,
    a: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
    },
    p: 0,
    mp: 0,
    j: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    d: [
        0, 0
    ],
    c: 0,
    mc: 0,
    m: {
        i: 0,
        t: 0
    }
}

const note = {
    0: [],
    1: [],
    2: [],
    3: []
}

const tn = 2877
const w404 = [
    1,
    0.99,
    0.6,
    0.2,
    -1,
    0,
]

const jt404 = [
    [
        70,
        135,
        200,
        250,
        300,
        -250,
        1
    ],
    [
        -1,
        200,
        300,
        400,
        600,
        -400,
        0.75
    ],
    [
        50,
        -1,
        100,
        150,
        200,
        -150,
        1.1
    ],
    [
        300,
        -1,
        -1,
        -1,
        -1,
        -300,
        0.1
    ]
]

function endGame() {
    d404.e = true
    d404.s = false
    if (!d404.u) {
        d404.mp = Math.max(d404.p, d404.mp)
        player[404].points = Math.max(d404.mp, player[404].points)
        if (d404.mp > 700000 && player.world[404]) completeWorld(404)
    }
    d404.u = false
}

function calAcc() {
    const j = d404.j
    let nc = 0
    let wc = 0
    for (let i = 0; i < 6; i++) {
        nc += j[i]
        wc += j[i] * w404[i];
    }
    if (nc == 0) {
        return 0
    }
    return wc / nc
}

function calDel() {
    if (d404.d[0] == 0) return 0
    return d404.d[1] / d404.d[0]
}

function calApc() {
    const j = d404.j
    let wc = 0
    for (let i = 0; i < 6; i++) {
        wc += j[i] * w404[i];
    }
    return wc / tn * 800000
}

function calMax() {
    return d404.j[0] / tn * 200000
}

function calCom() {
    return d404.mc / tn * 100000
}

function combo(add) {
    if (add) {
        d404.c++
        d404.mc = Math.max(d404.c, d404.mc)
    } else {
        d404.c = 0
    }
}

function addj(i) {
    d404.p = d404.u ? -1100000 : (calApc() + calMax() + calCom()) * jt404[player[404].judge][6]
    d404.j[i]++

    d404.m.i = i
    d404.m.t = 1
}

function getRGB(i, t) {
    let g = [
        "rgba(238,185,120,",
        "rgba(226,190,145,",
        "rgba(167,232,135,",
        "rgba(115,210,188,",
        "rgba(119,22,136,",
        "rgba(150,25,54,"
    ][i]

    return g + t + ")"
}

function getText(i) {
    if (i < 0) return ""
    return [
        "FOX",
        "FoX",
        "ACC",
        "OFF",
        "BAD",
        "ERR"
    ][i]
}

function startChart() {
    for (i in note) {
        note[i] = []
        d404.a[i] = 0
    }
    for (i in d404.j) {
        d404.j[i] = 0
    }
    d404.d[0] = 0
    d404.d[1] = 0
    d404.p = 0
    d404.m.i = -1
    crt = [...chart]
    d404.c = 0
    d404.mc = 0
}

function getTime() {
    var tsong = document.getElementById("ts")
    let t = tsong.currentTime * 1000
    if (t == 0) {
        return -3000 + d404.t - d404.st
    } else return t

}

function clickTrack(t) {
    d404.a[t] = 1
    let jt = jt404[player[404].judge]

    if (note[t].length == 0) return
    let dt = note[t][0].t - d404.tt
    let fs = dt > 0
    let dl = dt
    dt = Math.abs(dt)

    if (dt < jt[0]) {
        addj(0)
        note[t].shift()
        combo(true)
    }
    else if (dt < jt[1]) {
        addj(1)
        note[t].shift()
        combo(true)
    }
    else if (dt < jt[2]) {
        calfs(fs)
        addj(2)
        note[t].shift()
        combo(true)
    }
    else if (dt < jt[3]) {
        calfs(fs)
        addj(3)
        note[t].shift()
        combo(true)
    }
    else if (dt < jt[4]) {
        addj(4)
        note[t].shift()
        combo(false)
    }
    else return
    d404.d[0]++
    d404.d[1] += dl

    function calfs(a) {
        a ? d404.j[6]++ : d404.j[7]++
    }
}

function g404() {
    try {
        var c404 = document.getElementById('c404')
        var t404 = c404.getContext('2d')
    } catch { return }

    let t = Date.now() - d404.t
    d404.t = Date.now()

    if (t > 500 && d404.s) { d404.s = false; clickClickable(404, 12); alert("异常:刻间隔过长,已自动结束游戏"); }

    const g1 = t404.createLinearGradient(0, 0, 0, 780)
    g1.addColorStop(0, '#FFFFFF22')
    g1.addColorStop(0.7, '#FFFFFFBB')
    g1.addColorStop(1, '#FFF')

    const g2 = t404.createLinearGradient(0, 0, 0, 780)
    g2.addColorStop(0, '#FFFFFF00')
    g2.addColorStop(0.8, '#FFFFFF33')
    g2.addColorStop(1, '#FFFFFF66')

    const w = 720
    const h = 810

    t404.clearRect(0, 0, w, h)

    t404.font = "80px Angus"
    t404.fillStyle = '#FFFFFF33'
    t404.textAlign = "center";
    t404.fillText("Z", 120, 750)
    t404.fillText("X", 280, 750)
    t404.fillText(".", 440, 750)
    t404.fillText("/", 600, 750)

    t404.lineWidth = 6
    t404.strokeStyle = '#FFFFFF66'
    t404.lineCap = "butt"

    t404.beginPath()
    t404.moveTo(60, 780)
    t404.lineTo(180, 780)
    t404.moveTo(220, 780)
    t404.lineTo(340, 780)
    t404.moveTo(380, 780)
    t404.lineTo(500, 780)
    t404.moveTo(540, 780)
    t404.lineTo(660, 780)
    t404.stroke()

    t404.lineWidth = 8
    t404.strokeStyle = g1
    t404.lineCap = "square"

    t404.beginPath()
    t404.moveTo(60, 0)
    t404.lineTo(60, 780)
    t404.moveTo(180, 0)
    t404.lineTo(180, 780)
    t404.moveTo(220, 0)
    t404.lineTo(220, 780)
    t404.moveTo(340, 0)
    t404.lineTo(340, 780)
    t404.moveTo(380, 0)
    t404.lineTo(380, 780)
    t404.moveTo(500, 0)
    t404.lineTo(500, 780)
    t404.moveTo(540, 0)
    t404.lineTo(540, 780)
    t404.moveTo(660, 0)
    t404.lineTo(660, 780)
    t404.stroke()

    t404.strokeStyle = g2
    t404.lineCap = "butt"
    for (let i = 0; i < 4; i++) {
        d404.a[i] = Math.max(0, d404.a[i] - t / 333)

        let l = d404.a[i] ** 0.5 * 120
        if (l == 0) continue

        t404.lineWidth = l
        t404.beginPath()
        t404.moveTo(120 + i * 160, 0)
        t404.lineTo(120 + i * 160, 777)
        t404.stroke()
    }

    if (d404.s) {
        const speed = player[404].speed / 10
        const gap = Math.max(500, 780 / speed + 50)
        const offset = 309 + player[404].offset / 1

        d404.tt = getTime() + offset
        let time = d404.tt

        while (crt.length == 0 ? false : crt[0].t < time + gap) {
            note[crt[0].c].push(crt[0])
            crt.shift()
        }

        t404.fillStyle = '#D8D8D8'
        for (let i = 0; i < 4; i++) {
            if (note[i].length == 0) continue
            for (let j = 0; j < note[i].length; j++) {
                t404.fillRect(64 + i * 160, 745 - (note[i][j].t - time) * speed, 112, 35);
            }
        }

        for (let i = 0; i < 4; i++) {
            if (note[i].length == 0) continue
            if (d404.u) {
                if (note[i][0].t - time < 4) {
                    clickTrack(i)
                }
            }
            if (note[i][0].t - time < jt404[player[404].judge][5]) {
                note[i].shift()
                addj(5)
                combo(false)
            }
        }
    }

    t404.font = "64px Angus"
    t404.fillStyle = `hsl(${(Date.now()/100)%360},50%,70%)`
    t404.fillText(d404.u ? "AUTO" : d404.c, 360, 320)

    t404.font = "100px Angus"
    t404.fillStyle = getRGB(d404.m.i, d404.m.t)
    t404.textAlign = "center"
    t404.fillText(getText(d404.m.i), 360, 400)
    d404.m.t = Math.max(0, d404.m.t - t / 750)

}