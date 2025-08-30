addLayer("main", {
    name: "时之狭间",
    symbol: "🌏️",
    resource: "梦力",
    row: 0,
    position: 0,
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
    tabFormat: {
        "Dream": {
            content: [
                "main-display",
                "blank",
                ["display-text", "此条为宽度检测条,如果你无法看到这个条的两端<br>请在设置中将页面布局改为单页面(或减小浏览器缩放比例)以获得最佳显示"],
                ["bar", 1],
                "blank",
                "grid"
            ]
        }
    },
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
            return player[this.layer].points.gte(1) && !data && getGameName(id)[0] != "未完成游戏"
        },
        onClick(data, id) {
            player[this.layer].points = player[this.layer].points.sub(1)
            setGridData(this.layer, id, true)
        },
        getDisplay(data, id) {
            return `<h2>${getGameName(id)[0]}</h2><br>${getGameName(id)[1]}<br>${data ? "已解锁" : "未解锁"}`
        },
        getStyle(data, id) {
            return {
                width: "110px",
                height: "110px"
            }
        }
    },
    milestones: {
    },
    layerShown() { return true },
    hotkeys: [
    ],
});

addLayer("ach", {
    name: "成就",
    symbol: "🏆",
    resource: "成就",
    row: 0,
    position: 2,
    color: "#f2d87b",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
        ["display-text", function () {
            let tac = _D(Object.keys(layers[this.layer].achievements).length - 2)
            let ach = player[this.layer].points
            return `你有 ${formatWhole(ach)}/${formatWhole(tac)} 成就,加成成就获取+1<br>${layers[this.layer].getSomeText(ach.div(tac))}`
        }],
        "blank",
        "achievements"
    ],
    getSomeText(progress) {
        let p = progress.eq_tolerance(1) ? 6 : Decimal.ceil(progress.mul(5)).toNumber()
        let s = player.global.achseed
        let t = {
            0: [
                "你还没有完成任意一个成就,你为什么要看这里?",
                "在你做出些什么之前,这里只会是空的,你知道的",
                "你在尝试找到些什么吗?但这里没什么东西啊...",
                "不要再看这里了,去做些什么,除非你喜欢我❤",
                "不要走...不要离开我...那些东西都是邪恶的...",
            ],
            1: [
                "你已经开始玩这个游戏了吗?!等等等等一下...",
                "这大概是游戏的开端,但我们的故事可不止于此",
                "什么,这里不是标语栏吗?我还想写点东西在这里",
                "只有在你获得成就以后,你才能看到成就,除非...",
                "这里仍有非常多成就等待着您探索,继续向前进吧!",
                "我觉得这个道理很清楚,如果你想要,就自己来拿!"
            ],
            2: [
                "你正走在正确的道路上,继续前进,发掘世界的秘密",
                "如果你继续完成成就,我就会给你看更多成就",
                "这是一句提示语,做更多成就以得到更多提示语",
                "成就感在逐渐消失,但你在膨胀树会重新夺回它",
                "一次又一次的获得成就会不会让你感到无趣?",
                "我向你发出挑战,你肯定不能再在这个阶段待很久",
            ],
            3: [
                "发现一半的成就也许很值得表扬,所以我要夸夸你!",
                "你有没有想到,也许在哪里,藏着剩下的成就的线索?",
                "这不是魔塔,我们也不想让您一步一步往上爬",
                "成就的获取基于成就获取量提升,底数是1,指数是0",
                "找到下个成就让你感觉有趣吗?还是说这只是顺便?",
                "这些世界有趣吗?向我们反馈以帮助我们的开发!",
            ],
            4: [
                "你已经拿到了大半成就,这些成就给你了一些加成",
                "如果你睡一觉醒来,也许这些成就会溜走的,也许?",
                "一旦完成更多的成就,你就很快可以看到更多的成就",
                "砰砰砰,嚓!请坐和放宽,您的成就之旅已行至中途",
                "你得到了这个提示语!我是不是应该给你一个成就?",
                "您是否愿意为1001树评分?点击这里转到App Store",
            ],
            5: [
                "还在找最后一个成就吗?也许这个成就要第一个做?",
                "如果你总是看到这句话,说明你快做完所有成就了",
                "成就不是任务,你不需要完成所有成就来结束游戏",
                "也许你可以看看主页面里经常变化的地方获得线索",
                "我更希望你在知道怎么完成剩下成就时看到这句话",
                "行百里者半九十,你已经快要到终点了,但仍需小心",
            ],
            6: [
                "这里已经没有更多东西等着你探索了,你是真正的王",
                "你得到了一切,也许这就是终局,但谁说的上呢?",
                "您完成了当前的所有成就,Orz~给您跪了喵!",
                "不管你怎么想,人家都已经拿不出来新成就了喵!",
                "恭喜你,你已经击败了成就,作为后光完成了游戏",
            ]
        }[p]

        return chooseOneInArray(t, s)
    },
    achievements: {
        11: {
            name: "小世界",
            done() { return player.points.gte(1) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '<span class="p1pt">完成1世界</span>',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/11.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        12: {
            name: "世界计划",
            done() { return player.points.gte(5) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '<span class="p2pt">完成5世界</span>',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/12.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        13: {
            name: "世界收割机",
            done() { return player.points.gte(10) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '<span class="p4pt">完成10世界</span>',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/13.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        14: {
            name: "世界大富翁",
            done() { return player.points.gte(15) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '<span class="p6pt">完成15世界</span>',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/14.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        15: {
            name: "世界征服者",
            done() { return player.points.gte(20) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '<span class="p8pt">完成20世界</span>',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/15.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        16: {
            name: "所有世界的王<br>宇宙的新统领",
            done() { return player.points.gte(25) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '<span class="p9pt">完成25世界</span>',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/16.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        17: {
            name: "但我继续前进",
            done() { return player.keepGoing },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: '选择继续游戏',
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/17.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        21: {
            name: "E4444",
            done() { return player[202].points.gte("1e4444") },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "在第1夜获得震撼人心的1e4444点数",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/21.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        22: {
            name: "我...已经麻木?",
            done() { return player._203.click.gte(1000) },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "在第10夜为了击破一堵墙而点击1000次",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/22.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        101: {
            name: "愚人节玩笑",
            done() { return !player._501.lose && player._501.complete },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "理论上最难完成的成就<br>但也最容易完成<br>一命通关愚人节小游戏",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/101.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        201: {
            name: "更高的质量",
            done() { return options.hqTree },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "打开高质量的树.质量越高,引力越大,就能吸走更多成就!",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/201.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        202: {
            name: "不起作用?!",
            done() { return player.devSpeed },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "尝试修改游戏速率,但失败了",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/202.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        203: {
            name: "也许你真的开挂了",
            done() { return player._501.trigach },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "访问未使用的愚人节失败方法",
            style: {
                backgroundImage: "linear-gradient(to bottom, #00000060, #00000000),url(achpic/203.jpg)",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
        1001: {
            name: "所有,除了这一个",
            done() {
                return player[this.layer].points.gte(_D(Object.keys(layers[this.layer].achievements).length - 3.5))
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
                player.global.achseed = Date.now()
            },
            tooltip: "完成其他所有成就",
            style: {
                backgroundImage: "linear-gradient(in hsl longer hue to bottom, hsl(0,100%,30%), hsl(330,100%,60%))",
            },
            unlocked() { return hasAchievement(this.layer, this.id) }
        },
    },
    layerShown() { return true },
});

/*
addLayer("", {
    name: getGameName(this.layer),
    symbol: "",
    resource: "",
    row: 1,
    position: 1,
    color: "#a0a0a0",
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
    ],
    upgrades: {
    },
    milestones: {
    },
    layerShown() { return getGridData('main', this.layer) },
    hotkeys: [
    ],
});
*/