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
            dayleft:50,
            tot: 30,
            xt: 10,
            pe: 10,
            mode: 0,
            year: 2026,
            hlist: [0,0,0,0],
            hchoose: 0,
            optlist: ["","","","",""],
            optid: [0,0,0,0,0,0],
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
                ["clickables", [4]],
                "blank",
                "blank",
                [
                    "row", [
                        ["clickable", [21]],
                        "blank",
                        ["display-text", function () {
                                if(player['304'].mode==1) return `语文天赋:${player['304'].ch-10}`
                        }],
                        "blank",
                        ["clickable", [31]],
                    ]
                ], [
                    "row", [
                        ["clickable", [22]],
                        "blank",
                        ["display-text", function () {
                                if(player['304'].mode==1) return `数学天赋:${player['304'].mt-10}`
                        }],
                        "blank",
                        ["clickable", [32]],
                    ]
                ], [
                    "row", [
                        ["clickable", [23]],
                        "blank",
                        ["display-text", function () {
                                if(player['304'].mode==1) return `英语天赋:${player['304'].en-10}`
                        }],
                        "blank",
                        ["clickable", [33]],
                    ]
                ], [
                    "row", [
                        ["clickable", [24]],
                        "blank",
                        ["display-text", function () {
                                if(player['304'].mode==1) return `史政天赋:${player['304'].hp-10}`
                        }],
                        "blank",
                        ["clickable", [34]],
                    ]
                ], [
                    "row", [
                        ["clickable", [25]],
                        "blank",
                        ["display-text", function () {
                                if(player['304'].mode==1) return `物化天赋:${player['304'].pc-10}`
                        }],
                        "blank",
                        ["clickable", [35]],
                    ]
                ], [
                    "row", [
                        ["clickable", [26]],
                        "blank",
                        ["display-text", function () {
                                if(player['304'].mode==1) return `体育天赋:${player['304'].pe-10}`
                        }],
                        "blank",
                        ["clickable", [36]],
                    ]
                ], [
                    "row", [
                        ["clickable", [27]],
                        "blank",
                        ["display-text", function () {
                               if(player['304'].mode==1)  return `心态值:${player['304'].xt}`
                        }],
                        "blank",
                        ["clickable", [37]],
                    ]
                ], [

                ]
            ],
        }
    },
    getZKText(){
        if(player['304'].mode == 1){
            return `当前可用天赋点:${player['304'].tot}<br>注意心态小于等于0立刻死亡!`
        }
        if(player['304'].mode == 2){
            return `距离中考还有${player['304'].dayleft}天,注意学习将会损失一定心态值!
            <br>当前数值:<b style="color: #8c2702ff">${format(player['304'].ch-10,1)}</b>|<b style="color: #00aaffff">${format(player['304'].mt-10,1)}</b>|<b style="color: #d49f00df">${format(player['304'].en-10,1)}</b>|<b style="color: #d400a6df">${format(player['304'].hp-10,1)}</b>|<b style="color: #00b5e7df">${format(player['304'].pc-10,1)}</b>|<b style="color: #96ff5edf">${format(player['304'].pe-10,1)}</b>|<b style="color: #ff0000df">${format(player['304'].xt,1)}</b>`
        }
    },
    getZKopt(){
        let a = getZKOption()
        let r1
        for(i=1;i<=4;i++){
            r1=chooseOneInArray([1,2,3])
            player['304'].optlist[i]=chooseOneInArray(a[r1-1])
            player['304'].optid[i]=r1
        }
    },
    executeBoost(x){
        let id = player['304'].optid[x]
        if(id==1){
            player['304'].ch += chooseOneInArray([0.5,0.6,0.7,0.8,0.9,1])
        }
        if(id==2){
            player['304'].mt += chooseOneInArray([0.5,0.6,0.7,0.8,0.9,1])
        }
        if(id==3){
            player['304'].en += chooseOneInArray([0.5,0.6,0.7,0.8,0.9,1])
        }
        if(id==4){
            player['304'].hp += chooseOneInArray([0.5,0.6,0.7,0.8,0.9,1])
        }
        if(id==5){
            player['304'].pc += chooseOneInArray([0.5,0.6,0.7,0.8,0.9,1])
        }
        if(id==6){
            player['304'].pe += chooseOneInArray([0.5,0.6,0.7,0.8,0.9,1])
        }
        player['304'].dayleft--
        player['304'].xt-=chooseOneInArray([0.5,0.8,1.3,1.5,2])
        layers['304'].getZKopt()
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
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].ch++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        31: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].ch--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].ch > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        22: {
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].mt++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        32: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].mt--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].mt > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        23: {
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].en++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        33: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].en--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].en > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        24: {
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].hp++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        34: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].hp--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].hp > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        25: {
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].pc++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        35: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].pc--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].pc > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        26: {
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].pe++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        36: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].pe--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].xt > 1 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        27: {
            title() { return `+` },
            onClick() {
                player['304'].tot--
                player['304'].xt++
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1  && player['304'].tot > 0 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        37: {
            title() { return `-` },
            onClick() {
                player['304'].tot++
                player['304'].xt--
            },
            onHold() {
                this.onClick()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 && player['304'].xt > 1 },
            style:{"width":"50px","height":"50px","min-height":"50px"}
        },
        12: {
            display() { return `确认开始` },
            onClick() {
                player['304'].mode = 2
                layers['304'].getZKopt()
            },
            unlocked() { return player['304'].mode == 1 },
            canClick() { return player['304'].mode == 1 },
            style:{"width":"200px","height":"50px","min-height":"50px"}
        },
        41: {
            title() { return player['304'].optlist[1] },
            onClick() {
                layers['304'].executeBoost(1)
            },
            unlocked() { return player['304'].mode == 2 },
            canClick() { return player['304'].mode == 2 },
            style:{"width":"100px","height":"80px","min-height":"50px","background-color":"hsla(170,100%,50%,0.25)","color":"hsl(170,100%,50%)","border":"4px solid"}
        },
    }
});