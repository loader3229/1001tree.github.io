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
                            ${d404.e ? "游戏结束喵<br>" : ""}
                            70万分完成世界<br><br>
                            最高分数<br><h1 class="p8pt">${formatWhole(player[404].points)}</h1><br><br>
                            你的分数<br><h1 class="p8pt">${formatWhole(d404.p)}</h1><br><br>
                            ACC<br><h2 class="p8pt">${formatPersent(calAcc())}</h2><br><br>
                            最大连击<br><h2 class="p8pt">${formatWhole(d404.mc)}</h2><br><br>`
                        }],
                        "blank",
                        ["display-text", function () {
                            return `流速 ${player[this.layer].speed}`
                        }],
                        ["slider", ["speed", 5, 20]],
                        ["display-text", function () {
                            return `延迟 ${player[this.layer].offset}`
                        }],
                        ["slider", ["offset", -300, 300]],
                        "blank",
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
                            ${getText(0)}(${formatPersent(w[0])})<br><h2 class="p8pt">${formatWhole(d404.j[0])}</h2><br><br>
                            ${getText(1)}(${formatPersent(w[1])})<br><h2 class="p8pt">${formatWhole(d404.j[1])}</h2><br><br>
                            ${getText(2)}(${formatPersent(w[2])})<br><h2 class="p8pt">${formatWhole(d404.j[2])}</h2><br><br>
                            ${getText(3)}(${formatPersent(w[3])})<br><h2 class="p8pt">${formatWhole(d404.j[3])}</h2><br><br>
                            ${getText(4)}(${formatPersent(w[4])})<br><h2 class="p8pt">${formatWhole(d404.j[4])}</h2><br><br>
                            ${getText(5)}(${formatPersent(w[5])})<br><h2 class="p8pt">${formatWhole(d404.j[5])}</h2>`
                        }],
                        "blank",
                        ["clickable", 13],
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
                setTimeout(() => { playsound("ts") }, 3000)
                document.getElementById("ts").addEventListener('ended', endGame, { once: true });
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
        12: {
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
        13: {
            title: "结束游戏",
            display: "",
            onClick() {
                d404.s = false
                stopsound("ts")
                startChart()
                document.getElementById("ts").removeEventListener('ended', endGame, { once: true });
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

var i404 = null

let crt = {}

const d404 = {
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
const w = [
    1,
    0.99,
    0.6,
    0.2,
    -1,
    0,
]

const jt = [
    50,
    135,
    200,
    250,
    300,
    -250
]

function endGame() {
    d404.e = true
    d404.s = false
    d404.mp = Math.max(d404.p, d404.mp)
    player[404].points = Math.max(d404.mp, player[404].points)

    if (d404.mp > 700000 && player.world[404]) completeWorld(404)
}

function calAcc() {
    const j = d404.j
    let nc = 0
    let wc = 0
    for (let i = 0; i < 6; i++) {
        nc += j[i]
        wc += j[i] * w[i];
    }
    if (nc == 0) {
        return 0
    }
    return wc / nc
}

function calApc() {
    const j = d404.j
    let wc = 0
    for (let i = 0; i < 6; i++) {
        wc += j[i] * w[i];
    }
    return wc / tn
}

function calMax() {
    return d404.j[0] / tn
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
    d404.p = calApc() * 800000 + d404.mc / tn * 100000 + calMax() * 200000
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
    for (let i = 0; i < 4; i++) {
        note[i] = []
        d404.a[i] = 0
    }
    for (let i = 0; i < 6; i++) {
        d404.j[i] = 0
    }
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

    if (note[t].length == 0) return
    let dt = note[t][0].t - d404.tt
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
        addj(2)
        note[t].shift()
        combo(true)
    }
    else if (dt < jt[3]) {
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

}

function g404() {
    try {
        var c404 = document.getElementById('c404')
        var t404 = c404.getContext('2d')
    } catch { return }

    let t = Date.now() - d404.t
    d404.t = Date.now()

    if (t > 500 && d404.s) { alert("异常:刻间隔过长,已自动结束游戏"); clickClickable(404, 12); }

    const g1 = t404.createLinearGradient(0, 0, 0, 780)
    g1.addColorStop(0, '#FFFFFF00')
    g1.addColorStop(0.3, '#FFFFFFCC')
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
        t404.lineTo(120 + i * 160, 780)
        t404.stroke()
    }

    if (!d404.s) return

    const speed = player[404].speed / 10
    const gap = 780 / speed + 50
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
        if (note[i][0].t - time < jt[5]) {
            note[i].shift()
            addj(5)
            combo(false)
        }
    }

    t404.font = "80px Angus"
    t404.fillStyle = "#AFF"
    t404.fillText(d404.c, 360, 430)

    t404.font = "100px Angus"
    t404.fillStyle = getRGB(d404.m.i, d404.m.t)
    t404.textAlign = "center"
    t404.fillText(getText(d404.m.i), 360, 350)
    d404.m.t = Math.max(0, d404.m.t - t / 750)

}