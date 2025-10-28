addLayer("503", {
    symbol: "🎤",
    resource: "分数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        if (player['503'].tck>=(40-(player['503'].difficulty/2))){
            layers['503'].catGen()
            if(player['503'].difficulty>=10) layers['503'].catGen()
            if(player['503'].difficulty>=25) layers['503'].catGen()
            layers['503'].spGen()
            if(player['503'].difficulty>=20) layers['503'].spGen()
            if(player['503'].difficulty>=30) layers['503'].spGen()
            player['503'].tck = 0
        }
        player['503'].tck+=1
        if(player['503'].wd) player['503'].wdtck-=1
        if(player['503'].wdtck==0){
            player['503'].wd=false
        }
        layers['503'].catMove()
        if(player['503'].started && (player['503'].wd == false))player['503'].fuel-=(0.025*(Math.max(1,player['503'].difficulty/3)))
        if(player['503'].fuel<=0){
            player['503'].started = false
        }
        player['503'].maxscr = player['503'].maxscr.max(player['503'].points)
        player['503'].difficulty = Math.min(40,player['503'].points.add(1).div(200).pow(0.5).min(100).add(1).toNumber()/1.5)
        if(player['503'].maxscr.gte(50000) && !player.world[this.layer]){
            completeWorld('503')
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            maxscr: _D0,
            fuel: 0,
            started: false,
            playerpos: 3,
            scr: [_D0,_D(50),_D(100),_D(250),_D(600),_D(2000),_D(1e4),_D(5e4),_D(2e5),_D(3e6)],
            tck: 0,
            difficulty: 0,
            wd: false,
            wdtck: 0,
        }
    },
    type: "none",
    tabFormat: [
            ["display-text", function () {
                return `你所获得的最高分数是 <h2 class = 'nmpt'>${formatWhole(player['503'].maxscr)}</h2>, 到达50000分完成世界!`
            }],
            ["display-text", function () {
                return `你本局的分数是 <h2 class = 'nmpt'>${formatWhole(player['503'].points)}</h2>, 加成得分倍率 <h2 class = 'nmpt'>${format(layers['503'].scrboost())}x</h2>, dif: ${format(player['503'].difficulty)}`
            }],
            ["display-text", function () {
                return `使用R和F进行上下移动, 躲避陨石并在燃料耗尽前捕捉尽可能多的猫猫!(推荐使用单页面)`
            }],
            ["display-text", function () {
                return (!player['503'].started) ? `你输了,请重新开始游戏!` : player['503'].wd?`<b style = "color: #e5ff00ff;rtext-shadow: 2px 2px 5px #f6ff00ff">当前处于无敌状态!</b>` : ``
            }],
            "balnk",
            ['bar',1],
            "grid",
            ['clickables',[1]],
    ],
    hotkeys: [
        { key: "r", description: "[503] R: ↑", onPress() { layers['503'].yourMovement(1) } },
        { key: "f", description: "[503] F: ↓", onPress() { layers['503'].yourMovement(2) } },
    ],
    upgrades: {
    },
    milestones: {
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
    scrboost(){
        return player['503'].points.pow(0.25).div(10).add(1)
    },
    bars:{
        1: {
            direction: RIGHT,
            display(){return `燃料:${format(player['503'].fuel)}%`},
            width: 600,
            height: 50,
            progress() { return player['503'].fuel/100 },
            textStyle:{"text-shadow":"0 0 10px #FE0000"},
            fillStyle:{"background":"linear-gradient( #00000015,rgba(0, 0, 0, 0.36)),linear-gradient(90deg, rgba(255, 0, 0, 0.95), rgba(240, 160, 0, 0.95), rgba(0, 240, 16, 0.95))"},
        },
    },
    yourMovement(fx){
        if(!player['503'].started) return 
        if(fx==1){
            if(player['503'].playerpos > 1) player['503'].playerpos--
        }
        if(fx==2){
            if(player['503'].playerpos < 5) player['503'].playerpos++
        }
    },
    catGen(){
        if(!player['503'].started) return
        let d = player['503'].difficulty
        let a = [[_D1,50],[_D2,30*Math.max(d/40,1)],[_D3,10*Math.max(d/25,1)],[_D4,7.5*Math.max(d/10,1)],[_D5,2*Math.max(d/5,1)],[_D6,0.4*Math.max(d/3,1)],[_D7,0.09*Math.max(d/2,1)],[_D8,0.0099*Math.max(d/1.5,1)],[_D9,0.0001*Math.max(d/1.25,1)]]
        let b = [115,215,315,415,515]
        let s = chooseWeightInArray(a)
        let p = chooseOneInArray(b)
        player['503'].grid[p] = s
    },
    spGen(){
        if(!player['503'].started) return
        let sp = [[_D(-1),60],[_D(-2),5],[_D(-3),5],[_D0,70]]
        let bp = [115,215,315,415,515]
        let spc = chooseWeightInArray(sp)
        let bpc = chooseOneInArray(bp)
        if(spc.neq(0)) player['503'].grid[bpc] = spc
    },
    catMove(){
        if(!player['503'].started) return
        let spd = [0,12,10,8,7,6,5,4,3,2,8,3,4]//small=fast
        for(i in player['503'].grid){
            if(player['503'].grid[i].gte(0)){
                if(Math.floor(player['503'].tck) % (Math.floor(spd[player['503'].grid[i].toNumber()]*(Math.min(1,10/player['503'].difficulty)))) != 0) continue
            }else{
                if(Math.floor(player['503'].tck) % (Math.floor(spd[9-player['503'].grid[i].toNumber()]*(Math.min(1,10/player['503'].difficulty)))) != 0) continue
            }
            let x = Math.floor(i / 100)
            let y = i % 100
            if(y==2 && player['503'].grid[i].neq(0)){
                if(x==player['503'].playerpos){
                    if(player['503'].grid[i].eq(-3)){
                        player['503'].fuel = Math.min(player['503'].fuel+40,100)
                        player['503'].points = player['503'].points.add(10*player['503'].fuel)
                    }else if(player['503'].grid[i].eq(-2)){
                        player['503'].points = player['503'].points.times(1.1)
                        player['503'].wd = true
                        player['503'].wdtck = 200
                    }else if(player['503'].grid[i].eq(-1)){
                        if(player['503'].wd == false){
                            player['503'].points = player['503'].points.div(1.25).minus(100).max(0)
                            player['503'].fuel = Math.max(player['503'].fuel - Math.floor(Math.random()*15+5), 0)
                        }
                    }else{
                        player['503'].points = player['503'].points.add(player['503'].scr[player['503'].grid[i].toNumber()].times(layers['503'].scrboost()))
                        player['503'].fuel = Math.min(player['503'].fuel + 0.5*(player['503'].grid[i].pow(2).toNumber()),100)
                    }
                }
                player['503'].grid[i]=_D0
            }else if(player['503'].grid[i].neq(0)){
                player['503'].grid[x*100+y-1]=player['503'].grid[i]
                player['503'].grid[i]=_D0
            }
        }
    },
    clickables:{
        11: {
            title() { return `开始游戏` },
            display() { return `` },
            onClick() {
                for(i in player['503'].grid){
                    player['503'].grid[i]=_D0
                }
                player['503'].points=_D0
                player['503'].fuel=60
                player['503'].started = true
                player['503'].difficulty = 0
                player['503'].playerpos = 3
            },
            unlocked() { return true },
            canClick() { return player['503'].fuel <= 0 },
            style:{"width":"100px","height":"100px","min-height":"100px"}
        }, 
    },
    grid: {
        rows: 5,
        cols: 15,
        getStartData(id) {
            return _D0
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) {
            return
        },
        getDisplay(data, id) {
            if(data.eq(-3)) return "油箱"
            if(data.eq(-2)) return "无敌猫猫"
            if(data.eq(-1)) return "陨石"
            if(data.eq(1)) return "小猫猫"
            if(data.eq(2)) return "中猫猫"
            if(data.eq(3)) return "大猫猫"
            if(data.eq(4)) return "金猫猫"
            if(data.eq(5)) return "钻石猫猫"
            if(data.eq(6)) return "星耀猫猫"
            if(data.eq(7)) return "至尊猫猫"
            if(data.eq(8)) return "最强猫猫"
            if(data.eq(9)) return "千夜猫猫"
            if(Math.floor(id / 100) == player['503'].playerpos && id % 100 == 1) return "You"
            return formatWhole(data)
        },
        getStyle(data, id) {
            let style            
            if (data.eq(-3)) style = { background: "linear-gradient(45deg, #db2f00ff, #a30b0bff)", border: "2px solid", borderColor: "#fbff00ff" }
            if (data.eq(-2)) style = { backgroundColor: "#c4ae02ff", border: "2px solid", borderColor: "#fbff00ff" }
            if (data.eq(-1)) style = { backgroundColor: "#a8a8a8ff", border: "2px solid", borderColor: "#ff0000ff" }
            if (data.eq(0)) style = { backgroundColor: "black", borderWidth: "2px 0px 2px 0px", borderColor: "#ffffff" }
            if (data.eq(1)) style = { backgroundColor: "#09ff00ff", border: "2px solid", borderColor: "#00bf13ff" }
            if (data.eq(2)) style = { backgroundColor: "#0055ffff", border: "2px solid", borderColor: "#0083bfff" }
            if (data.eq(3)) style = { backgroundColor: "#b300ffff", border: "2px solid", borderColor: "#7300bfff" }
            if (data.eq(4)) style = { backgroundColor: "#eaff00ff", border: "2px solid", borderColor: "#bfbc00ff" }
            if (data.eq(5)) style = { background : "linear-gradient(45deg, #2bafe7ff, #8ec8e5ff)", border: "2px solid", borderColor: "#009dffff" }
            if (data.eq(6)) style = { background : "linear-gradient(-45deg,rgba(231, 209, 43, 1), #9dda77ff)", border: "2px solid", borderColor: "#a2e200ff" }
            if (data.eq(7)) style = { background : "linear-gradient(-45deg,rgba(241, 23, 8, 1), #e39b20ff)", border: "2px solid", borderColor: "#cc4e00ff" }
            if (data.eq(8)) style = { background : "radial-gradient(rgba(146, 43, 231, 1) rgba(164, 0, 142, 1)", border: "2px solid", borderColor: "#5e00e2ff" }
            if (data.eq(9)) style = { color:"white", border: "2px solid", borderColor: "#33003aff", textShadow: "4px 0px 2px #8400e9ff" }
            if (Math.floor(id / 100) == player['503'].playerpos && id % 100 == 1) style = { backgroundColor: "#e50000ff", border: "2px solid", borderColor: "#ad0000ff"}


            style.fontSize = "20px"
            style.margin = "-1px"
            style.borderRadius = "0%"
            style.transitionDuration = "0s"

            return style
        },
    },
});