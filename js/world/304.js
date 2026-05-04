addLayer("304", {
    symbol: "🕛",
    resource: "点数",
    color: "hsl(170, 100%, 50%)",
    update(diff) {
        if (!getGridData('main', this.layer)) return
        if(player['304'].started) player['304'].timeleft304 -= diff
        if(player['304'].lv>=11 && (!player.world[this.layer])) completeWorld(this.layer)
        if(player['304'].fl1fuel<=0||(player['304'].lv>=5 && player['304'].fl5timeleft<=0)||(player['304'].lv>=10 && player['304'].fl10timeleft<=0)){//判断立刻失败
            player['304'].started = false
            player['304'].losetrig304 = true
        }
        if(player['304'].started && player['304'].timeleft304 <= 0){//判断失败
            if(player['304'].lv>=2&&player['304'].fl2progress<100){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=3&&(player['304'].fl3trig==false)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=4&&(player['304'].fl4progress<100)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=4&&(player['304'].fl4progress<100)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=6&&(!hasUpgrade("304",14))){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=7&&(player['304'].fl7trig==false)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=8&&(player['304'].fl8cnt < ((player['304'].lv-8)*10+40))){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=9&&(player['304'].fl9progress < 100)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else{
                player['304'].lv++
                player['304'].lv = Math.min(player['304'].lv,11)
                player['304'].started = false
            }
        }
        if(player['304'].started){
            player['304'].fl1fuel -= (3+player['304'].lv/4)*diff
            if(player['304'].lv>=5) player['304'].fl5timeleft -= diff
            if(player['304'].lv>=6) player['304'].points = player['304'].points.add((layers['304'].getfl6mult()).times(diff))
            if(player['304'].lv>=9 && player['304'].fl9degree == player['304'].fl9target){
                player['304'].fl9target = chooseOneInArray([0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180])
                player['304'].fl9progress += 10
                player['304'].fl9progress = Math.min(player['304'].fl9progress,100)
            }
            if(player['304'].lv>=10) player['304'].fl10timeleft -= diff
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            timeleft304:20,
            started:false,
            Fl:1,
            lv:1,
            losetrig304: false,
            fl1fuel:0,
            fl2progress:0,
            fl3trig:false,
            fl3problem:``,
            fl3answer:0,
            fl3answer1:0,
            fl4progress:0,
            fl5timeleft:15,
            fl5timecap:15,
            fl7answer:0,
            fl7answer1:0,
            fl7trig:false,
            fl8cnt:0,
            fl9progress:0,
            fl9degree:90,
            fl9target:0,
            fl10timeleft:0,
        }
    },
    type: "none",
    tabFormat: {
        AFK: {
            content: [
                ["display-text", function () {
                    return layers[this.layer].getlvtext()
                }],
                ["display-text", function () {
                    return (player['304'].losetrig304 ? `你搞杂了,好吧也许下次...<p style = "color: #00000000">可人生还有几次重来的机会呢</p>` : ``)
                }],
                ["display-text", function () {
                    return (player['304'].started ? `倒计时:<h2 class='p5pt'> ${formatTime(player['304'].timeleft304)} </h2>` : `准备好了就点下面的按钮开始`)
                }],
                "blank",
                ["clickable", [11]],
                "blank",
                ["row",[["clickable", [12]],
                ["clickable", [13]],["clickable",[14]]]],
                "blank",
                ["display-text", function () {
                    return (player['304'].started ? layers[this.layer].getfltext() : ``)
                }],
                "blank",
                ["clickable",[15]],
                ["clickable",[16]],
                ["clickable",[17]],
                ["clickable",[18]],
                ["clickable",[19]],
                ["clickable",[41]],
                ["row",[["clickable", [42]],
                ["clickable", [43]]]],
                ["clickable", [44]],
                "blank",
                ["display-text", function () {
                    return (player['304'].started&&player['304'].Fl==3 ? `当前答案:${Math.floor(player['304'].fl3answer)}` : ``)
                }],
                ["display-text", function () {
                    return (player['304'].started&&player['304'].Fl==6 ? `你有<h2 class = 'p5pt'>${format(player['304'].points)}点数</h2>,使得每次增加的燃料x${format(player['304'].points.add(1).log10().div(2).add(1))}` : ``)
                }],
                ["display-text", function () {
                    return (player['304'].started&&player['304'].Fl==7 ? `当前答案:${Math.floor(player['304'].fl7answer)}` : ``)
                }],
                "blank",
                "upgrades",
                ["row",[["clickable", [21]],
                ["clickable", [22]],["clickable",[23]]]],
                ["row",[["clickable", [24]],
                ["clickable", [25]],["clickable",[26]]]],
                ["row",[["clickable", [27]],
                ["clickable", [28]],["clickable",[29]]]],
                ["row",[["clickable", [31]],
                ["clickable", [32]],["clickable",[33]]]],
            ]
        },
    },
    upgrades: {
        11: {
            title: "欢迎来到第六层",
            description: "点数获取翻倍",
            cost: _D(10),
            unlocked(){return player['304'].Fl==6 && player['304'].started}
        },
        12: {
            title: "你有没有发现",
            description: "点数获取x3",
            cost: _D(10),
            unlocked(){return player['304'].Fl==6 && player['304'].started}
        },
        13: {
            title: "时间越来越短",
            description: "点数获取x5",
            cost: _D(20),
            unlocked(){return player['304'].Fl==6 && player['304'].started}
        },
        14: {
            title: "?",
            description: "完成本层任务",
            cost: _D(300),
            unlocked(){return player['304'].Fl==6 && player['304'].started}
        },
    },
    milestones: {
    },
    getlvtext(){
        let s=""       
        let l=player['304'].lv
        if(l==1){
            s = `呃,嘿!我有一些工作要完成,你能在我回来之前盯着这些指示计吗?<br>只有20秒!这很简单的,不让这些数值降到0就行,感谢您的付出!`
        }
        if(l==2){
            s = `这是不是有点太简单了?没关系,我的工作不止这些<br>每一关你都可以到访新的一层,通过上下层的按钮(你已经看见了)<br>在非5的倍数层中(不包括1),你的任务都是需要达到某种目标而不是避免某种东西降为0.`
        }
        if(l==3){
            s = `你发现燃料消耗变快了吗?没关系!<br>本层不允许暂停哦!`
        }
        if(l==4){
            s = `或许我该给你加点时间....记得在完成其他层任务的同时别忘了给1层加燃料`
        }
        if(l==5){
            s = `倒计时的确增加了20s!<br>第5层有一个炸弹,它有15s的倒计时,你需要在它爆炸前点击它将它重置回到15s`
        }
        if(l==6){
            s = `为了防止你在倒计时增加之后没事干,我给你做了一个增量游戏!好耶`
        }
        if(l==7){
            s = `你已经完成一大半了,加油!<br>巧妙利用第6层点数的加成!`
        }
        if(l==8){
            s = `以防你不知道,燃料最多可以加到120%,你最好使用连点器来应对第8层<br>还有就是,倒计时又一次增加了10s!`
        }
        if(l==9){
            s = `咱们再来撬开一扇门吧,这次要比上次难一点....`
        }
        if(l==10){
            s = `挺过这关你就可以获得梦力了,倒计时再次增加了10s!<br>第10层的炸弹更具毁灭性,它的倒计时为20s,并且每次重置它的倒计时都会使得5层倒计时上限-2s并减半第8层点击数!`
        }
        if(l==11){
            s = `恭喜你完成了世界!暂时如此....`
        }
        return s
    },
    getfltext(){
        let s=``
        let l=player['304'].Fl
        if(l==1){
            s = `当前燃料:<p class="p5pt">${format(player['304'].fl1fuel)}%/100%</p>`
        }
        if(l==2){
            s = `撬锁进度:<p class="p5pt">${format(player['304'].fl2progress)}%/100%</p>`+(player['304'].fl2progress>=100 ? `<br>大门已打开,恭喜!`:``)
        }
        if(l==3){
            s = (player['304'].fl3trig? `恭喜,回答正确!<br>`:`若问题回答错误,将重置2层进度!<br>注意数字为负数时0~9将不再正常工作<br>`)+player['304'].fl3problem
        }
        if(l==5){
            s = `倒计时:<p class="p5pt">${format(player['304'].fl5timeleft)}s</p>`
        }
        if(l==7){
            s = (player['304'].fl7trig? `恭喜,回答正确!`:(window.btoa(unescape(encodeURIComponent(player['304'].fl7answer1)))+`<br>答错将重置4层进度!`))
        }
        if(l==9){
            s = `撬锁进度:<p class="p5pt">${format(player['304'].fl9progress)}%/100%</p><br>当前旋转度数:${formatWhole(player['304'].fl9degree)}°,转到${formatWhole(player['304'].fl9target)}°可使进度增加10%`+(player['304'].fl2progress>=100 ? `<br>大门已打开,恭喜!`:``)
        }
        if(l==10){
            s = `毁灭倒计时:<p class="p5pt">${format(player['304'].fl10timeleft)}s</p>`
        }
        return s
    },
    getfl3problem(){
        let a1=0
        let a2=0
        let a3=0
        let a4=0
        a1=Math.floor(Math.random()*2237)
        a2=Math.floor(Math.random()*2765)
        a3=Math.floor(Math.random()*2136)
        a4=Math.floor(Math.random()*2343)
        player['304'].fl3answer1 = (a1*a3)-(a2*a4)
        player['304'].fl3problem = `${formatWhole(a1)}x${formatWhole(a3)}-${formatWhole(a2)}x${formatWhole(a4)}=?`
    },
    getfl7problem(){
        let a = Math.floor(Math.random()*10000000)
        player['304'].fl7answer1 = a
    },
    getfl6mult(){
        let mt = _D0
        if(player['304'].lv>=6) mt = _D1
        if(hasUpgrade("304",11)) mt = mt.times(2)
        if(hasUpgrade("304",12)) mt = mt.times(3)
        if(hasUpgrade("304",13)) mt = mt.times(5)
        return mt
    },
    clickables:{
        11: {
            title() { return `开始工作` },
            display: "",
            onClick() {
                player['304'].Fl = 1
                player['304'].timeleft304 = (player['304'].lv>=10 ? 60 : player['304'].lv>=8 ? 50 : player['304'].lv>=5 ? 40:20)
                player['304'].started = true
                player['304'].fl1fuel = 50
                player['304'].fl2progress = 0
                layers['304'].getfl3problem()
                layers['304'].getfl7problem()
                player['304'].fl3answer = 0
                player['304'].fl3trig = false
                player['304'].fl4progress = 0
                player['304'].fl5timeleft = 15
                player['304'].fl5timecap = 15
                player['304'].upgrades = []
                player['304'].points = _D0
                player['304'].fl7trig = false
                player['304'].fl7answer = 0
                player['304'].fl8cnt = 0
                player['304'].fl9degree = 0
                player['304'].fl9target = 180
                player['304'].fl9progress = 0
                player['304'].fl10timeleft = 20
                player['304'].losetrig304 = false
            },
            unlocked() { return !player['304'].started },
            canClick() { return !player['304'].started },
        },
        12: {
            title() { return `上楼` },
            display: "",
            onClick() {
                player['304'].Fl ++
            },
            unlocked() { return player['304'].started },
            canClick() { return player['304'].Fl<player['304'].lv },
            style:{"height":"30px","min-height":"30px","width":"60px"}
        },
        13: {
            title() { return `FLOOR ${formatWhole(player['304'].Fl)}` },
            display: "",
            onClick() {
                return
            },
            unlocked() { return player['304'].started },
            canClick() { return false },
            style:{"border":"2px solid","border-color":"white","background-color":"#000000","color":"white","font-family":"Times New Roman","height":"30px","min-height":"30px"}
        },
        14: {
            title() { return `下楼` },
            display: "",
            onClick() {
                player['304'].Fl --
            },
            unlocked() { return player['304'].started },
            canClick() { return player['304'].Fl>1 },
            style:{"height":"30px","min-height":"30px","width":"60px"}
        },
        15: {
            title() { return `补充燃料` },
            display: "补充(5%*当前燃料百分比)+2%的燃料",
            onClick() {
                player['304'].fl1fuel += ((player['304'].fl1fuel*0.05)+2)*(player['304'].points.add(1).log10().div(2).add(1).toNumber())
                player['304'].fl1fuel = Math.min(player['304'].fl1fuel,120) 
            },
            unlocked() { return player['304'].Fl==1 && player['304'].started },
            canClick() { return player['304'].Fl==1 },
            style:{}
        },
        16: {
            title() { return `尝试撬锁` },
            display: "有50%概率将进度增加10%",
            onClick() {
                player['304'].fl2progress += (chooseOneInArray([10,0]))
                player['304'].fl2progress = Math.min(player['304'].fl2progress,100) 
            },
            unlocked() { return player['304'].Fl==2 && player['304'].started },
            canClick() { return player['304'].Fl==2 },
            style:{}
        },
        17: {
            title() { return `检查你的回答` },
            display: "JUST DO IT.",
            onClick() {
                if(player['304'].Fl==3){
                    if(player['304'].fl3answer == player['304'].fl3answer1) player['304'].fl3trig = true
                    else player['304'].fl2progress = 0
                }
                if(player['304'].Fl==7){
                    if(player['304'].fl7answer == player['304'].fl7answer1) player['304'].fl7trig = true
                    else player['304'].fl4progress = 0
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7},
            style:{}
        },
        18: {
            title() { return `请长按我!` },
            display() {return `进度:${format(player['304'].fl4progress)}%/100%`},
            onHold() {
                player['304'].fl4progress+=(1+(0.02*player['304'].fl4progress))
                player['304'].fl4progress = Math.min(player['304'].fl4progress,100)
            },
            unlocked() { return player['304'].Fl==4 && player['304'].started },
            canClick() { return player['304'].Fl==4 },
            style(){
                if(player['304'].fl4progress>=100) return {"background-color":"#32d600","border":"5px solid #007e0d"}
            }
        },
        19: {
            title() { return `重置炸弹倒计时` },
            display() {return ``},
            onClick() {
                player['304'].fl5timeleft = player['304'].fl5timecap
            },
            unlocked() { return player['304'].Fl==5 && player['304'].started },
            canClick() { return player['304'].Fl==5 },
            style(){}
        },
        21: {
            title() { return `0` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        22: {
            title() { return `1` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=1
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=1
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        23: {
            title() { return `2` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=2
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=2
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        24: {
            title() { return `3` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=3
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=3
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        25: {
            title() { return `4` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=4
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=4
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        26: {
            title() { return `5` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=5
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=5
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        27: {
            title() { return `6` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=6
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=6
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        28: {
            title() { return `7` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=7
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=7
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        29: {
            title() { return `8` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=8
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=8
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        31: {
            title() { return `9` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer*=10
                    player['304'].fl3answer+=9
                    player['304'].fl3answer = Math.min(Math.abs(player['304'].fl3answer),1e15)
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer*=10
                    player['304'].fl7answer+=9
                    player['304'].fl7answer = Math.min(Math.abs(player['304'].fl7answer),1e7)
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        32: {
            title() { return `N` },
            display: "",
            onClick() {
                player['304'].fl3answer = -(player['304'].fl3answer)
            },
            unlocked() { return player['304'].Fl==3 && player['304'].started },
            canClick() { return player['304'].Fl==3 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        33: {
            title() { return `C` },
            display: "",
            onClick() {
                if(player['304'].Fl==3){
                    player['304'].fl3answer=0
                }
                if(player['304'].Fl==7){
                    player['304'].fl7answer=0
                }
            },
            unlocked() { return (player['304'].Fl==3||player['304'].Fl==7) && player['304'].started },
            canClick() { return player['304'].Fl==3||player['304'].Fl==7 },
            style:{"height":"30px","min-height":"30px","width":"30px","margin":"0px"}
        },
        41: {
            title() { return `请点击我!` },
            display() {return `还需点击${formatWhole((player['304'].lv-8)*10+40-player['304'].fl8cnt)}次!`},
            onClick() {
                player['304'].fl8cnt++;
            },
            unlocked() { return player['304'].Fl==8 && player['304'].started },
            canClick() { return player['304'].fl8cnt<((player['304'].lv-8)*10+40) },
            style(){}
        },
        42: {
            title() { return `左拧撬棒` },
            display: "",
            onClick() {
                player['304'].fl9degree-=5
            },
            unlocked() { return player['304'].Fl==9 && player['304'].started},
            canClick() { return player['304'].fl9degree>0 },
            style:{"height":"60px","min-height":"60px","width":"60px"}
        },
        43: {
            title() { return `右拧撬棒` },
            display: "",
            onClick() {
                player['304'].fl9degree+=5
            },
            unlocked() { return player['304'].Fl==9 && player['304'].started},
            canClick() { return player['304'].fl9degree<180 },
            style:{"height":"60px","min-height":"60px","width":"60px"}
        },
        44: {
            title() { return `重置毁灭炸弹倒计时` },
            display() {return ``},
            onClick() {
                player['304'].fl10timeleft = 20
                player['304'].fl5timecap -= 2
            },
            unlocked() { return player['304'].Fl==10 && player['304'].started },
            canClick() { return player['304'].Fl==10 },
            style(){}
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
});