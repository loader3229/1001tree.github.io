addLayer("main", {
    name: "梦界",
    symbol: "🌏️",
    resource: "梦力",
    color: "#9b43f4",
    update(diff) {
    },
    startData() {
        return {
            unlocked: true,
            points: _D2
        }
    },
    type: "none",
    tabFormat: [
        "main-display",
        "blank",
        ["display-text", "此条为宽度检测条,如果你无法看到这个条的两端<br>请在设置中将页面布局改为单页面(或减小浏览器缩放比例)以获得最佳显示"],
        ["bar", 1],
        "blank",
        ["display-text", `<div style="
                        width: 400px;
                        padding: 10px;
	                    border-radius: 5px;
	                    border: 2px solid white;
                        background: #111;
                    ">
                    游戏类型 | <span class='c1'>???</span> <span class='c2'>增量</span> <span class='c3'>非增量</span>
                    </div>`],
        "blank",
        "grid",
        "clickables",
    ],
    bars: {
        1: {
            direction: RIGHT,
            width: 725,
            height: 30,
            display() {
                return '<span style="color:#88888888">游戏完成进度</span>'
            },
            progress() {
                return player.points.div(25)
            }
        }
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return false
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            if (data) return true
            else return player[this.layer].points.gte(1) && !getGameName(id)[0].includes("未完成游戏")
        },
        onClick(data, id) {
            if (data) return
            player[this.layer].points = player[this.layer].points.sub(1)
            setGridData(this.layer, id, true)
        },
        getDisplay(data, id) {
            let mode = options.hcmode
            let style = getGameName(id)[2]

            if (mode) {
                return `<h1>${getGameName(id)[0]}</h1>
                <h3>${getGameName(id)[1]}</h3>
                <br>${player.world[id] ? "已完成" : (data ? "已解锁" : "未解锁")}`
            } else {
                return `<h2 class="${style}">${getGameName(id)[0]}</h2>
                <span class="${style}">${getGameName(id)[1]}</span>
                <br>${player.world[id] ? "已完成" : (data ? "已解锁" : "未解锁")}`
            }
        },
        getStyle(data, id) {
            let style = {
                width: "144px",
                height: "115px",
                backgroundClip: "padding-box",
            }

            let mode = options.hcmode

            if (mode) {
                if (player.world[id]) style.backgroundImage = "linear-gradient(to bottom, #AAF, #FAA)"
                else if (data) style.backgroundImage = "linear-gradient(to bottom, #EEE, #FAA)"
                else if (this.getCanClick(data, id)) style.backgroundImage = "linear-gradient(to bottom, #EEE, #999)"
                else style.backgroundImage = "linear-gradient(#666)"
            } else {
                if (player.world[id]) style.backgroundImage = "linear-gradient(to bottom, #FD0, #D00)"
                else if (data) style.backgroundImage = "linear-gradient(to bottom, #0F8, #6CC)"
                else if (this.getCanClick(data, id)) style.backgroundImage = "linear-gradient(to bottom, #DDD, #888)"
                else style.backgroundImage = "linear-gradient(to bottom, #666, #222)"
            }

            return style
        }
    },
    clickables: {
        11: {
            title() { return options.hcmode ? "易读模式" : "常规模式" },
            onClick() {
                toggleOpt('hcmode')
            },
            canClick() { return true },
            onHold() { },
            style() {
                return {
                    minHeight: "50px",
                    width: "720px",
                    transform: "unset",
                    backgroundColor: "#eee"
                }
            }
        }
    },
    layerShown() { return true },

});

addLayer("ach", {
    name: "成就",
    symbol: "🏆",
    resource: "成就",
    color: "#f2d87b",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: {
        成就: {
            content: [
                ["display-text", function () {
                    let tac = _D(Object.keys(layers[this.layer].achievements).length - 2)
                    let ach = player[this.layer].points
                    return `你有 ${formatWhole(ach)}/${formatWhole(tac)} 成就,加成成就获取+1<br>${layers[this.layer].getSomeText(ach.div(tac))}`
                }],
                "blank",
                "achievements",
                "clickables",
            ]
        },
        世界: {
            content: [
                ["row", [["milestone", 101], ["milestone", 102], ["milestone", 103], ["milestone", 104], ["milestone", 105],]],
                ["row", [["milestone", 201], ["milestone", 202], ["milestone", 203], ["milestone", 204], ["milestone", 205],]],
                ["row", [["milestone", 301], ["milestone", 302], ["milestone", 303], ["milestone", 304], ["milestone", 305],]],
                ["row", [["milestone", 401], ["milestone", 402], ["milestone", 403], ["milestone", 404], ["milestone", 405],]],
                ["row", [["milestone", 501], ["milestone", 502], ["milestone", 503], ["milestone", 504], ["milestone", 505],]],
            ]
        }
    },
    getSomeText(progress) {
        let p = progress.eq_tolerance(1) ? 6 : Decimal.ceil(progress.mul(5)).toNumber()
        let s = player.global.achseed
        let t = getHint()[p]

        return chooseOneInArray(t, s)
    },
    achievements: {
        11: {
            name: "小世界",
            done() { return player.points.gte(1) },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '<span class="p1pt">完成1世界</span>' : `完成${formatWhole(player.points)}/1世界` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/11.jpg)",
            },
        },
        12: {
            name: "世界计划",
            done() { return player.points.gte(5) },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '<span class="p2pt">完成5世界</span>' : `完成${formatWhole(player.points)}/5世界` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/12.jpg)",
            },
        },
        13: {
            name: "世界收割机",
            done() { return player.points.gte(10) },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '<span class="p4pt">完成10世界</span>' : `完成${formatWhole(player.points)}/10世界` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/13.jpg)",
            },
        },
        14: {
            name: "世界大富翁",
            done() { return player.points.gte(15) },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '<span class="p6pt">完成15世界</span>' : `完成${formatWhole(player.points)}/15世界` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/14.jpg)",
            },
        },
        15: {
            name: "世界征服者",
            done() { return player.points.gte(20) },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '<span class="p8pt">完成20世界</span>' : `完成${formatWhole(player.points)}/20世界` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/15.jpg)",
            },
        },
        16: {
            name: "所有世界的王<br>宇宙的新统领",
            done() { return player.points.gte(25) },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '<span class="p9pt">完成25世界</span>' : `完成${formatWhole(player.points)}/25世界` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/16.jpg)",
            },
        },
        17: {
            name: "但我继续前进",
            done() { return player.keepGoing },
            onComplete() { achievementComplete() },
            tooltip() { return this.done() ? '在结束(?)后选择继续游戏' : `现在谈这个为时尚早` },
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/17.jpg)",
            },
        },
        21: {
            name: "E4444",
            done() { return player[202].points.gte("1e4444") },
            onComplete() { achievementComplete() },
            tooltip: "在第1夜获得震撼人心的1e4444点数",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/21.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        22: {
            name: "我...已经麻木?",
            done() { return player[203].click.gte(1000) },
            onComplete() { achievementComplete() },
            tooltip: "在第10夜为了击破一堵墙而点击1000次",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/22.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        23: {
            name: "复读机",
            done() {
                return player[204].answer[21] == 40 ||
                    player[204].answer[22] == 40 ||
                    player[204].answer[23] == 40 ||
                    player[204].answer[24] == 40
            },
            onComplete() { achievementComplete() },
            tooltip: "敷衍的回答所有问题,通过按下Enter键,当然你还不能点太快否则就会误判",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/23.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        24: {
            name: "被愚弄的后果",
            done() { return player[302].fool },
            onComplete() { achievementComplete() },
            tooltip: "进行无收益飝卆",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/24.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        101: {
            name: "愚人节玩笑",
            done() { return !player._501.lose && player._501.complete },
            onComplete() { achievementComplete() },
            tooltip: "理论上最难完成的成就<br>但也最容易完成<br>一命通关愚人节小游戏",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/101.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        102: {
            name: "幸运玩家...还是倒霉玩家?",
            done() { return player[502].final },
            onComplete() { achievementComplete() },
            tooltip: "到最后一刻才点到25",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/102.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        103: {
            name: "绝对的幸运玩家",
            done() { return player[201].rg <0 },
            onComplete() { achievementComplete() },
            tooltip: "在暴涨子小游戏中随机超频效果达到0％以下",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/103.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        104: {
            name: "真正的游戏大师",
            done() { return (player[104].maxx.gte(2048)) && (player[104].ob3 && player[104].db && player[104].ob1 && player[104].bl) && (!(player[104].ud || player[104].t5 || player[104].t6))},
            onComplete() { achievementComplete() },
            tooltip: "在2048小游戏中, 开启DB, OB1, OB3, BL同时禁用UD和T+合成2048",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/104.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        201: {
            name: "更高的质量",
            done() { return options.hqTree },
            onComplete() { achievementComplete() },
            tooltip: "打开高质量的树.质量越高,引力越大,就能吸走更多成就!",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/201.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        202: {
            name: "不起作用?!",
            done() { return player.devSpeed },
            onComplete() { achievementComplete() },
            tooltip: "尝试修改游戏速率,但失败了",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/202.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        203: {
            name: "也许<br>你真的开挂了",
            done() { return player._501.trigach },
            onComplete() { achievementComplete() },
            tooltip: "访问未使用的愚人节失败方法",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/203.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        204: {
            name: "欢迎回来",
            done() { return player.global.import },
            onComplete() { achievementComplete() },
            tooltip: "导入存档",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/204.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        205: {
            name: "再次...欢迎回来",
            done() { return player.hardreset },
            onComplete() { achievementComplete() },
            tooltip: "点击硬重置按钮但不硬重置",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/205.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        206: {
            name: "冒名顶替者",
            done() { return player.global.name == "乾狐离光" 
                || player.global.name == "userincre" 
                || player.global.name == "banana3864"
                || player.global.name == "Chara404"
                || player.global.name == "loader3229" },
            onComplete() { achievementComplete() },
            tooltip: "将名字设置为开发者之一",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(resources/achpic/206.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        301: {
            name: "所有,除了这一个",
            done() {
                return player[this.layer].points.gte(_D(Object.keys(layers[this.layer].achievements).length - 3.5))
            },
            onComplete() { achievementComplete() },
            tooltip: "完成其他所有成就",
            style: {
                backgroundImage: "linear-gradient(in hsl longer hue to bottom, hsl(0,100%,30%), hsl(330,100%,60%))",
            }
        },
    },
    layerShown() { return !options.achivement },
    clickables: {
        11: {
            title: "完成所有成就",
            display: "测试用,可能会出bug",
            canClick() { return true },
            onClick() {
                for (key in layers[this.layer].achievements) {
                    if (key == "rows" || key == "cols") continue
                    else if (hasAchievement(this.layer, key)) continue
                    player[this.layer].achievements.push(key)
                    achievementComplete()
                }
            }
        }
    },
    milestones: {
        101: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        102: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        103: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        104: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        105: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        201: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        202: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        203: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        204: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        205: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        301: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        302: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        303: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        304: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        305: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        401: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        402: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        403: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        404: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        405: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        501: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        502: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        503: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        504: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
        505: {
            requirementDescription() { return `世界${this.id}完成!` },
            done() { return player.world[this.id] }
        },
    }
});

/*
addLayer("", {
    symbol: "",
    resource: "",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
    ],
    upgrades: {
    },
    milestones: {
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});
*/