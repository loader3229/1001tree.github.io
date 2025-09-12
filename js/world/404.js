addLayer("404", {
    symbol: "🌙",
    resource: "Dut",
    color: "hsl(250,100%,50%)",
    update(diff) {
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
        ["clickables", 1],
        "blank",
        [
            "raw-html",
            '<canvas id="c404" width="720" height="720" style="background-color: #000;"></canvas>'
        ],
    ],
    clickables: {
        11: {
            title: "开始游戏",
            display: "退出该页面会导致游戏中止,点击结束游戏即可",
            onClick() {
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
            title: "结束游戏",
            display: "",
            onClick() {
                d404.s = false

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

const d404 = {
    s: false,
    t: Date.now(),
    0: 0,
    1: 0,
    2: 0,
    3: 0,
}

function clickTrack(t) {
    d404[t] = 1
}

function g404() {
    let t = Date.now() - d404.t
    d404.t = Date.now()

    try {
        var c404 = document.getElementById('c404')
        var t404 = c404.getContext('2d')

        if (t > 500 && d404.s) { alert("异常:刻间隔过长,已自动结束游戏"); throw (""); }
    }
    catch {
        if (d404.s) {
            clickClickable(404, 12)
        }
        return
    }

    const g1 = t404.createLinearGradient(0, 0, 0, 700)
    g1.addColorStop(0, '#FFFFFF00')
    g1.addColorStop(0.3, '#FFFFFFCC')
    g1.addColorStop(1, '#FFF')

    const g2 = t404.createLinearGradient(0, 0, 0, 700)
    g2.addColorStop(0, '#FFFFFF00')
    g2.addColorStop(0.8, '#FFFFFF33')
    g2.addColorStop(1, '#FFFFFF66')

    const w = 720
    const h = 720

    t404.clearRect(0, 0, w, h)

    t404.lineWidth = 6
    t404.strokeStyle = '#FFFFFF66'
    t404.lineCap = "butt"

    t404.beginPath()
    t404.moveTo(60, 700)
    t404.lineTo(180, 700)
    t404.moveTo(220, 700)
    t404.lineTo(340, 700)
    t404.moveTo(380, 700)
    t404.lineTo(500, 700)
    t404.moveTo(540, 700)
    t404.lineTo(660, 700)
    t404.stroke()

    t404.lineWidth = 8
    t404.strokeStyle = g1
    t404.lineCap = "square"

    t404.beginPath()
    t404.moveTo(60, 0)
    t404.lineTo(60, 700)
    t404.moveTo(180, 0)
    t404.lineTo(180, 700)
    t404.moveTo(220, 0)
    t404.lineTo(220, 700)
    t404.moveTo(340, 0)
    t404.lineTo(340, 700)
    t404.moveTo(380, 0)
    t404.lineTo(380, 700)
    t404.moveTo(500, 0)
    t404.lineTo(500, 700)
    t404.moveTo(540, 0)
    t404.lineTo(540, 700)
    t404.moveTo(660, 0)
    t404.lineTo(660, 700)
    t404.stroke()

    t404.strokeStyle = g2
    t404.lineCap = "butt"

    for (let i = 0; i < 4; i++) {
        d404[i] = Math.max(0, d404[i] - t / 333)

        let l = d404[i] ** 0.5 * 120
        if (l == 0) continue

        t404.lineWidth = l
        t404.beginPath()
        t404.moveTo(120 + i * 160, 0)
        t404.lineTo(120 + i * 160, 700)
        t404.stroke()
    }

}