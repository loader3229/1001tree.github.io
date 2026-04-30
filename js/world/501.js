addLayer("501", {
    symbol: "😂",
    resource: "点数",
    color: "#aaa",
    startData() {
        return {
            unlocked: true,
            points: _D0,
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    tabFormat: {
        AprilFools: {
            content: [
                ["display-text", function () {
                    return `你好,这个世界只需要你坚持不到4分钟,就能完成世界然后获得1梦力`
                }],
                ["display-text", function () {
                    return `你需要遵循下面的指示点击正确按钮,提示每10s更换一次,错误的点击将导致...`
                }],
                ["display-text", function () {
                    return (player._501.started ? `倒计时:<h2 class='nmpt'> ${player._501.stage.eq(20) ? formatTime(player._501.timeleft) : formatTime((_D(20).minus(player._501.stage)).times(10).add(player._501.timeleft).add(30))} </h2>` : `准备好了就点下面的按钮开始`)
                }],
                "blank",
                ["clickables", [1]],
                ["display-text", function () {
                    return (player._501.started ? layers[this.layer].getText() : ``)
                }],
                "grid",
                ["display-text", function () {
                    return ((!player._501.started) ? layers[this.layer].getLoseText() : ``)
                }],
                ["clickables", [2]],
                "blank",
                ["clickables", [3]],
            ]
        },
        Main1: {
            content: [
                ["clickables", [4]],
            ],
            unlocked() { return player._501.stage.eq(16) && player._501.started }
        },
        Main2: {
            content: [
                ["clickables", [5]],
            ],
            unlocked() { return player._501.stage.eq(16) && player._501.started }
        },
    },
    getText() {
        s = player._501.stage
        if (s.eq(1)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:#0000FF">蓝色</b>的按钮`
        }
        if (s.eq(2)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:#00CC00">绿色</b>的按钮`
        }
        if (s.eq(3)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请不要点击<b style="color:#0000FF">蓝色</b>的按钮`
        }
        if (s.eq(4)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:#0000FF">绿色</b>的按钮`
        }
        if (s.eq(5)) {
            return `请点击所有<b style="color:#DDDD00">黄色</b>的按钮`
        }
        if (s.eq(6)) {
            return `请点击所有<b style="color:#FFFFFF">按钮</b>`
        }
        if (s.eq(7)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请不要点击<b style="color:#FFFFFF">任何东西</b>`
        }
        if (s.eq(8)) {
            return `刚才点累了?歇一会吧`
        }
        if (s.eq(9)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请不要点击<b style="color:#00DD00">蓝色</b>但是刚才的话取反2↑↑4次之后,不要这么做`
        }
        if (s.eq(10)) {
            if (player._501.trig[7] == false) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:#00000000">透明</b>的按钮`
        }
        if (s.eq(11)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:#0000FF">蓝色</b>的按钮<br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>`
        }
        if (s.eq(12)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:#0000FF">蓝色</b>的按钮`
        }
        if (s.eq(13)) {
            return `请不要点击`
        }
        if (s.eq(14)) {
            if (player._501.trig[10]) return `已完成!请等待下个回合开始`
            return `请点击至少17个按钮`
        }
        if (s.eq(15)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `聪明人不会陷入相同的固定思维中`
        }
        if (s.eq(16)) {
            if (player._501.cnt == 0) return `已完成!请等待下个回合开始`
            return `请点击所有<b style="color:cyan">青色</b>的按钮,一旦点击了假按钮(50%概率),你就输了!`
        }
        if (s.eq(17)) {
            if (player._501.trig[12] == false && player._501.trig[13] == true) return `已完成!请等待下个回合开始`
            return `请点击代表<b style="color:#aaa">虚假</b>的按钮`
        }
        if (s.eq(18)) {
            return `请点击所有<b style="color:#00DD00">绿色</b>的按钮<br>
                    还有,记住<b style="font-family:consolas">${player._501.rc}</b>!`
        }
        if (s.eq(19)) {
            return `请记住当前的盘面!这很重要!不要点击!`
        }
        if (s.eq(20)) {
            if (player._501.cnt == 0) return `已完成!恭喜你通关了(请等完剩下的时间)`
            return `你有40秒的时间完成:<br>位置从上到下,从左到右,左上角是第1个<br>
            点击 <b style="color:#aaa">在上个盘面中是蓝色且上上个提示的代码对应位置上是1</b> 的位置<br>
            和 <b style="color:#aaa">在上个盘面中是绿色且上上个提示的代码对应位置上是0</b> 的位置`
        }
    },
    getRandomcode() {
        s1 = ""
        for (i = 1; i <= 16; i++) {
            var x = Math.floor((i - 1) / 4)
            var y = Math.floor((i - 1) % 4)
            player._501.gnum[x][y] = Math.floor(Math.random() * 2)
            s1 += player._501.gnum[x][y]
        }
        return s1
    },
    getLoseText() {
        s = player._501.stage
        if (player._501.trig[1]) {
            player._501.started = false
            return `你输了,因为点击了其他的按钮`
        }
        if (player._501.trig[2]) {
            player._501.started = false
            return `你输了,因为未能在限定时间内点击按钮`
        }
        if (player._501.trig[3]) {
            player._501.started = false
            if (s.eq(5)) return `你输了,你点的是<b style="color:#EE8800">橙色</b>而不是<b style="color:#DDDD00">黄色</b>的按钮`
            if (s.eq(12)) return `你输了,你点的是<b style="color:#0000FD">#0000FD</b>而不是<b style="color:#0000FF">#0000FF</b>的按钮`
        }
        if (player._501.trig[4]) {
            player._501.started = false
            if (s.eq(6)) return `你输了,这里没有白色的<b style="color:#FFFFFF">按钮</b>,它们是黑色的`
            if (s.eq(8)) return `你输了,你的鼠标累死了,为什么不歇着呢`
            if (s.eq(10)) return `你输了,因为点的按钮不是<b style="color:#00000000">透明</b>的`
            if (s.eq(13)) return `你输了,因为我说了不要点击,而且我甚至说了请`
            if (s.eq(17)) return `你输了,因为点击了错误的按钮`
            if (s.eq(19)) return `你输了,因为又一次,我说了不要点击,而且我甚至加了感叹号!`
            if (s.eq(20)) return `你输了,因为点击了错误的按钮,加油,胜利只差一步!!!`
        }
        if (player._501.trig[5]) {
            player._501.started = false
            return `你输了,但你本不应该看到这句话,也许你开挂了吧,给你一个成就`
        }
        if (player._501.trig[6]) {
            player._501.started = false
            return `你输了,这里没有<b style="color:#FFFFFF">任何东西</b>,它们是按钮,而且你没有点完`
        }
        if (player._501.trig[8]) {
            player._501.started = false
            return `你输了,有些时候要细心观察,刚刚很明显就是有些时候,但你没有`
        }
        if (player._501.trig[9] && s.eq(13)) {
            player._501.started = false
            return `你输了,捷径会使人忘却规则,而规则写的很清楚`
        }
        if (!player._501.trig[10] && s.eq(15)) {
            player._501.started = false
            return `你输了,遵守不合理的规则就是要依靠捷径的力量`
        }
        if (player._501.trig[11]) {
            player._501.started = false
            player.subtabs[this.layer].mainTabs = "AprilFools"
            return `你输了,因为点击了假按钮!`
        }
        if (player._501.trig[12]) {
            player._501.started = false
            return `你输了,请遵循指示!`
        }
        if (player._501.trig[14]) {
            player._501.started = false
            return `你输了,如果你真的不会的话,就去找开发者退款吧!`
        }
    },
    resetgrid(force) {
        s = player._501.stage
        if (player._501.timeleft.mod(10).lte(0) || force) {
            if (s.neq(20)) player._501.cnt = 0
            for (i in player[this.layer].grid) {
                if (s.neq(20)) player[this.layer].grid[i] = Math.floor(Math.random() * ((s.eq(5) || s.eq(12) || s.eq(15)) ? 3 : 2)) + 1;
                else if (player[this.layer].grid[i] != 0) player[this.layer].grid[i] = Math.floor(Math.random() * ((s.eq(5) || s.eq(12) || s.eq(15)) ? 3 : 2)) + 1;
                if ((player[this.layer].grid[i] == 1) && (s.eq(1) || s.eq(9) || s.eq(11) || s.eq(12))) player._501.cnt++;
                if ((player[this.layer].grid[i] == 2) && (s.eq(2) || s.eq(3) || s.eq(4))) player._501.cnt++;
                if ((player[this.layer].grid[i] == 3) && (s.eq(15))) player._501.cnt++;
                if (s.eq(7) || s.eq(18)) player._501.cnt++;
                if (s.eq(16)) player._501.cnt = 1
                if (s.eq(18)) player._501.rc = layers[this.layer].getRandomcode();
                if (s.eq(19)) {
                    var x = Math.floor(i / 100 - 1)
                    var y = Math.floor(i % 10 - 1)
                    if (player[this.layer].grid[i] == 1) player._501.gnum[x][y] = (player._501.gnum[x][y]) & 1
                    else player._501.gnum[x][y] = (!player._501.gnum[x][y]) & 1
                }
                if (s.eq(19)) {
                    var x = Math.floor(i / 100 - 1)
                    var y = Math.floor(i % 10 - 1)
                    if (player._501.gnum[x][y] == 1) player._501.cnt++
                }
            }
        }
    },
    update(diff) {
        if (!getGridData('main', this.layer)||player.pause[this.layer]) return
        if (player._501.started) {
            player._501.timeleft = player._501.timeleft.sub(diff)
            if (player._501.timeleft.lt(0)) {
                if (player._501.stage.eq(20)) {
                    if (player._501.cnt == 0) {
                        player._501.trig[0] = true
                        player._501.started = false
                        if (!player._501.complete) {
                            player._501.complete = true
                            completeWorld(this.layer)
                        }
                    } else {
                        player._501.trig[14] = true
                        player._501.lose = true
                    }
                }
                if (player._501.cnt > 0 && player._501.stage.neq(19)) {
                    player._501.started = false
                    player.subtabs[this.layer].mainTabs = "AprilFools"
                    if (player._501.stage.eq(7)) player._501.trig[6] = true
                    else if (player._501.stage.eq(20)) player._501.trig[13] = true
                    else player._501.trig[2] = true
                    player._501.lose = true
                }
                if (player._501.stage.eq(15)) {
                    player._501.rp = layers[this.layer].getWrongPage()
                }
                if (player._501.stage.eq(10) && (player._501.trig[7])) player._501.trig[8] = true
                player._501.stage = player._501.stage.add(1)
                if (player._501.stage.eq(20)) player._501.timeleft = _D(40)
                else player._501.timeleft = _D10
                layers[this.layer].resetgrid(false)
            }
            if (player._501.timeleft.lte(5) && player._501.stage.eq(17) && player._501.trig[13] == false) {
                player._501.trig[13] = true
                player._501.trig[12] = confirm(`有一个值发生了错误: "timeleft". 请告诉这个模组树的作者. 你现在可以刷新这个页面,然后页面将会回溯至你的上一步操作.`)
            }
        } else {
            player._501.timeleft = _D10
        }
        if (player._501.started && player._501.stage.eq(20)) {
            layers[this.layer].resetgrid(true)
        }
    },
    getWrongPage() {
        return Math.floor(Math.random() * 2) + 1
    },
    clickables: {
        11: {
            title() { return `开始倒计时` },
            display: "",
            onClick() {
                player._501.stage = _D0
                for (i = 0; i < 15; i++) {
                    if (i == 7) player._501.trig[i] = true
                    else player._501.trig[i] = false
                }
                player._501.started = true
                player._501.stage = _D1
                layers[this.layer].resetgrid(true)
            },
            unlocked() { return !player._501.started },
            canClick() { return !player._501.started },
        },
        21: {
            title() { return `按钮` },
            display: "",
            onClick() {
                player._501.trig[7] = false
            },
            style: { "color": "#00000000", "background-color": "#00000000", "border-color": "#00000005" },
            unlocked() { return player._501.stage.eq(10) && player._501.started },
            canClick() { return player._501.stage.eq(10) && player._501.started },
        },
        31: {
            title() { return `开发者跳关用` },
            display: "",
            onClick() {
                if (player._501.stage.eq(13)) {
                    player._501.trig[9] = true
                    player._501.started = false
                }
                if (player._501.stage.eq(14)) player._501.trig[10] = true
            },
            style: { "height": "80px", "width": "80px", "min-height": "80px" },
            unlocked() { return (player._501.stage.eq(13) || player._501.stage.eq(14)) && player._501.started },
            canClick() { return (player._501.stage.eq(13) || player._501.stage.eq(14)) && player._501.started },
        },
        41: {
            title() { return `按钮A` },
            display: "",
            onClick() {
                if (player._501.rp == 2) {
                    player._501.cnt--
                    player.subtabs[this.layer].mainTabs = "AprilFools"
                }
                else {
                    player._501.trig[11] = true
                }
            },
            style: { "height": "80px", "width": "80px", "min-height": "80px", "border": "2px solid", "border-color": "#0460EB99", "background-color": "cyan" },
            unlocked() { return player._501.stage.eq(16) && player._501.started },
            canClick() { return player._501.stage.eq(16) && player._501.started && player._501.cnt },
        },
        51: {
            title() { return `按钮B` },
            display: "",
            onClick() {
                if (player._501.rp == 1) {
                    player._501.cnt--
                    player.subtabs[this.layer].mainTabs = "AprilFools"
                }
                else {
                    player._501.trig[11] = true
                }
            },
            style: { "height": "80px", "width": "80px", "min-height": "80px", "border": "2px solid", "border-color": "#0460EB99", "background-color": "cyan" },
            unlocked() { return player._501.stage.eq(16) && player._501.started },
            canClick() { return player._501.stage.eq(16) && player._501.started && player._501.cnt },
        }
    },
    grid: {
        rows: 4,
        cols: 4,
        getStartData(id) {
            return 0;
        },
        getUnlocked(id) { // Default
            return player._501.started
        },
        getCanClick(data, id) {
            return (player._501.started && data)
        },
        onClick(data, id) {
            s = player._501.stage
            if (data == 2 && (s.eq(1) || s.eq(9) || s.eq(11) || s.eq(15) || s.eq(16) || s.eq(5))) {
                player._501.trig[1] = true
                player._501.started = false
            }
            if (data == 1 && (s.eq(2) || s.eq(3) || s.eq(4) || s.eq(15) || s.eq(16) || s.eq(5))) {
                player._501.trig[1] = true
                player._501.started = false
            }
            if (data == 3 && (s.eq(5) || s.eq(12))) {
                player._501.trig[3] = true
                player._501.started = false
            }
            if (s.eq(6) || s.eq(8) || s.eq(10) || s.eq(13) || s.eq(17) || s.eq(19)) {
                player._501.trig[4] = true
                player._501.started = false
            }
            if (player._501.gnum[Math.floor(id / 100 - 1)][Math.floor(id % 10 - 1)] == 0 && s.eq(20)) {
                player._501.trig[4] = true
                player._501.started = false
            }
            player._501.cnt--
            player[this.layer].grid[id] = 0;
        },
        getDisplay(data, id) {
            return `按钮`
        },
        getStyle(data, id) {
            s = player._501.stage
            if (data == 0) return { "border": "3px solid", "border-color": "white", "background-color": "black" }
            else if (data == 1 && s.neq(18)) return { "border": "3px solid", "border-color": "#0460EB", "background-color": "#0000FF", "font-size": "17.5px" }
            else if (data == 2 || s.eq(18)) return { "border": "3px solid", "border-color": "#52ED0A", "background-color": "#00CC00", "font-size": "17.5px" }
            else if (data == 3 && (s.eq(5) || s.eq(15))) return { "border": "3px solid", "border-color": "#F05D0899", "background-color": "#EE8800", "font-size": "17.5px" }
            else if (data == 3 && s.eq(12)) return { "border": "3px solid", "border-color": "#00000000", "background-color": "#0000FD", "font-size": "17.5px" }
        }
    },
})