addLayer("304", {
    symbol: "💯",
    resource: "分",
    color: "hsl(170, 100%, 50%)",
    update(diff) {
        if (player.pause[this.layer]) return
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            ch: 10,
            mt: 10,
            en: 10,
            hp: 10,
            pc: 10,
            tot: 30,
            xt: 10,
            pe: 10,
            mode: 0,
            year: 2026,
            hlist: [0,0,0,0],
            hchoose: 0,
        }
    },
    type: "none",
    tabFormat: {
        "中考":{
            content: [
                ["display-text", function () {
                    return `你${player['304'].year-1}年考了 <h2 class="p5pt">${formatWhole(player[this.layer].points)}/800</h2> 分, 考到550分及以上完成世界!`
                }],
                "blank",
                ["display-text", function () {
                    return layers['304'].getZKText()
                }],
                "blank",
                ["clickables", [1]], 
                "blank",
                "blank",
                [
                    "row", [
                        ["clickable", [21]],
                        "blank",
                        ["display-text", function () {
                                return `语文天赋:${player['304'].ch-10}`
                        }],
                        "blank",
                        ["clickable", [31]],
                    ]
                ], [
                    "row", [
                        ["clickable", [22]],
                        "blank",
                        ["display-text", function () {
                                return `数学天赋:${player['304'].mt-10}`
                        }],
                        "blank",
                        ["clickable", [32]],
                    ]
                ], [
                    "row", [
                        ["clickable", [23]],
                        "blank",
                        ["display-text", function () {
                                return `英语天赋:${player['304'].en-10}`
                        }],
                        "blank",
                        ["clickable", [33]],
                    ]
                ], [
                    "row", [
                        ["clickable", [24]],
                        "blank",
                        ["display-text", function () {
                                return `史政天赋:${player['304'].hp-10}`
                        }],
                        "blank",
                        ["clickable", [34]],
                    ]
                ], [
                    "row", [
                        ["clickable", [25]],
                        "blank",
                        ["display-text", function () {
                                return `物化天赋:${player['304'].pc-10}`
                        }],
                        "blank",
                        ["clickable", [35]],
                    ]
                ], [
                    "row", [
                        ["clickable", [26]],
                        "blank",
                        ["display-text", function () {
                                return `体育天赋:${player['304'].pe-10}`
                        }],
                        "blank",
                        ["clickable", [36]],
                    ]
                ], [
                    "row", [
                        ["clickable", [27]],
                        "blank",
                        ["display-text", function () {
                                return `心态值:${player['304'].xt}`
                        }],
                        "blank",
                        ["clickable", [37]],
                    ]
                ]
            ],
        }
    },
    getZKText(){
        if(player['304'].mode == 1){
            return `当前可用天赋点:${player['304'].tot}<br>注意心态小于等于0立刻死亡!`
        }
    },
    upgrades: {
    },
    milestones: {
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    clickables:{
        11: {
            title() { return `报名参加${player['304'].year}年中考` },
            display() { return `你只有50天时间复习!` },
            onClick() {
                player['304'].mode = 1
            },
            unlocked() { return player['304'].mode == 0 },
            canClick() { return player['304'].mode == 0 },
            style:{"width":"200px"}
        },
        21: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].ch++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        31: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].ch--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].ch > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        22: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].mt++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        32: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].mt--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].mt > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        23: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].en++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        33: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].en--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].en > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        24: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].hp++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        34: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].hp--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].hp > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        25: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].pc++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        35: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].pc--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].pc > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        26: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].pe++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        36: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].pe--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].xt > 1 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        27: {
            display() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].xt++
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        37: {
            display() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].xt--
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].xt > 1 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        12: {
            display() { return `确认开始` },
            onClick() {
                player['304'].mode = 2
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 },
            style:{"width":"200px","height":"50px","min-height":"50px"}
        }
    }
});