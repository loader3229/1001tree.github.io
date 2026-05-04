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
            }else if(player['304'].lv>=8&&(player['304'].fl8cnt < (((player['304'].lv-8)*10+40)/(hasUpgrade("304",54)?1.25:1)))){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=9&&(player['304'].fl9progress < 100)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=11&&(player['304'].fl11cnt < 25)){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else{
                player['304'].lv++
                player['304'].shoppoints = player['304'].shoppoints.add(1)
                player['304'].lv = Math.min(player['304'].lv,11)
                player['304'].started = false
            }
        }
        if(player['304'].started){
            player['304'].fl1fuel -= ((hasUpgrade("304",44)?1.2:3)+player['304'].lv/(hasUpgrade("304",51)?100:4))*diff
            if(player['304'].lv>=5) player['304'].fl5timeleft -= diff
            if(player['304'].lv>=6) player['304'].points = player['304'].points.add((layers['304'].getfl6mult()).times(diff))
            if(player['304'].lv>=9 && player['304'].fl9degree == player['304'].fl9target){
                player['304'].fl9target = (hasUpgrade("304",53)? chooseOneInArray([60,70,80,90,100,110,120]):chooseOneInArray([0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180]))
                player['304'].fl9progress += 20
                player['304'].fl9progress = Math.min(player['304'].fl9progress,100)
            }
            if(player['304'].lv>=10) player['304'].fl10timeleft -= diff
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            shoppoints: _D0,
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
            fl11box:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            fl11cnt:0,
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
                    return (player['304'].started ? `倒计时:<h2 class='p5pt'> ${formatTime(player['304'].timeleft304)} </h2>` : `当前倒计时为<h2 class='p5pt'> ${formatTime(layers['304'].calc304left())} </h2><br>准备好了就点下面的按钮开始`)
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
                ["clickable",[15]],
                ["clickable",[16]],
                ["clickable",[17]],
                ["clickable",[18]],
                ["clickable",[19]],
                ["clickable",[41]],
                ["row",[["clickable", [42]],
                ["clickable", [43]]]],
                ["clickable", [44]],
                ["display-text", function () {
                    return (player['304'].started&&player['304'].Fl==3 ? `当前答案:${Math.floor(player['304'].fl3answer)}` : ``)
                }],
                ["display-text", function () {
                    return (player['304'].started&&player['304'].Fl==6 ? `你有<h2 class = 'p5pt'>${format(player['304'].points)}点数</h2>,使得每次增加的燃料x${format(player['304'].points.add(1).log10().div(2).add(1))}` : ``)
                }],
                ["display-text", function () {
                    return (player['304'].started&&player['304'].Fl==7 ? `当前答案:${Math.floor(player['304'].fl7answer)}` : ``)
                }],
                ["row",[["clickable", [22]],
                ["clickable", [23]],["clickable",[24]]]],
                ["row",[["clickable", [25]],
                ["clickable", [27]],["clickable",[26]]]],
                ["row",[["clickable", [28]],
                ["clickable", [29]],["clickable",[31]]]],
                ["row",[["clickable", [33]],
                ["clickable", [21]],["clickable",[32]]]],
                "blank",
                ["upgrades",[1]],
                ["row",[["clickable", [51]],
                ["clickable", [52]],["clickable",[53]]]],
                "grid"
            ]
        },
        Shop: {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class = 'p5pt'>${formatWhole(player['304'].shoppoints)}/${formatWhole(player['304'].lv-1)}</h2> 商店点数`
                }],
                ["clickable",[61]],
                "blank",
                ["upgrades",[2,3,4,5]]
            ],
            unlocked(){return player['304'].lv>=6 && player['304'].started==false}
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
        21: {
            title: "Time1",
            description: "倒计时增加10s",
            cost: _D(1),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        22: {
            title: "Time2",
            description: "倒计时增加10s",
            cost: _D(2),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        23: {
            title: "Time3",
            description: "倒计时增加10s",
            cost: _D(3),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        24: {
            title: "Time4",
            description: "倒计时增加20s",
            cost: _D(4),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        31: {
            title: "F5-1",
            description: "Floor5炸弹初始倒计时增加15s",
            cost: _D(1),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        32: {
            title: "F5-2",
            description: "Floor5炸弹重置后倒计时增加5s",
            cost: _D(2),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=10},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        33: {
            title: "F10-1",
            description: "Floor10炸弹初始倒计时增加20s",
            cost: _D(2),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=11},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        34: {
            title: "F10-2",
            description: "Floor10炸弹重置不再减少8层点击数",
            cost: _D(3),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=11},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },        
        41: {
            title: "B-1",
            description: "Floor2撬锁成功的概率增加",
            cost: _D(1),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        42: {
            title: "B-2",
            description: "大幅简化Floor3的运算",
            cost: _D(3),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=7},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        43: {
            title: "B-3",
            description: "Floor4的长按时间消耗更短",
            cost: _D(2),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=7},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        44: {
            title: "B-4",
            description: "Floor1燃料消耗速度降低",
            cost: _D(2),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=6},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        51: {
            title: "B-5",
            description: "Floor1燃料消耗速度降低(再次)",
            cost: _D(3),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=8},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        52: {
            title: "B-6",
            description: "游戏结束时保留Floor6的前三个升级",
            cost: _D(1),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=8},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        53: {
            title: "B-7",
            description: "Floor9的目标角度分布更加平均(60~120)",
            cost: _D(3),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=10},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
        54: {
            title: "B-8",
            description: "略微降低Floor8所需的点击次数",
            cost: _D(2),
            currencyInternalName:`shoppoints`,
            currencyLayer:"304",
            unlocked(){return player['304'].lv>=10},
            canAfford(){
                return player['304'].shoppoints.gte(this.cost)
            },
        },
    },
    milestones: {
    },
    getlvtext(){
        let s=""       
        let l=player['304'].lv
        if(l==1){
            s = `呃,嘿!我有一些工作要完成,你能在我回来之前盯着这些指示计吗?<br>只有20秒!这很简单的,不让这些数值降到0就行,感谢您的付出!<br>当下方指示灯变红,表示需要赶快添加燃料`
        }
        if(l==2){
            s = `这是不是有点太简单了?没关系,我的工作不止这些<br>每一关你都可以到访新的一层,通过上下层的按钮(你已经看见了)<br>在非5的倍数层中(不包括1),你的任务都是需要达到某种目标而不是避免某种东西降为0.`
        }
        if(l==3){
            s = `你发现燃料消耗变快了吗?没关系!第3层有点难,我给你加10s倒计时<br>本层不允许暂停哦!`
        }
        if(l==4){
            s = `或许我该再给你加点时间....记得在完成其他层任务的同时别忘了给1层加燃料`
        }
        if(l==5){
            s = `倒计时的确增加了20s!<br>第5层有一个炸弹,它有15s的倒计时,你需要在它爆炸前点击它将它重置回到15s<br>新的指示灯同样可以提示你何时重置倒计时`
        }
        if(l==6){
            s = `在完成第5关之后,你解锁了商店<br>每完成1关,就可以获得1点数,你可以用点数购买降低游戏难度的升级<br>为了防止你在倒计时增加之后没事干,我给你做了一个增量游戏!好耶`
        }
        if(l==7){
            s = `你已经完成一大半了,加油!<br>随着完成更多的关卡,商店的升级也会更多!`
        }
        if(l==8){
            s = `以防你不知道,燃料最多可以加到120%,你最好使用连点器来应对第8层`
        }
        if(l==9){
            s = `咱们再来撬开一扇门吧,这次要比上次难一点....`
        }
        if(l==10){
            s = `挺过这关你就可以获得梦力了,倒计时再次增加了10s!<br>第10层的炸弹更具毁灭性,它的倒计时为20s,并且每次重置它的倒计时都会使得5层倒计时上限-1s并减半第8层点击数!`
        }
        if(l==11){
            s = `恭喜你完成了世界!但如果你想寻求挑战获得额外梦力,我还有额外的一些工作!<br>接下来的东西可能很有难度,我首先给你加20s倒计时<br>来介绍一下11层,舒尔特方格是一种注意力训练游戏,由25个方格组成的方阵构成,训练时将数字1-25随机填入,被测者需按顺序指读并计时完成`
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
            s = `撬锁进度:<p class="p5pt">${format(player['304'].fl9progress)}%/100%</p><br>当前旋转度数:${formatWhole(player['304'].fl9degree)}°,转到${formatWhole(player['304'].fl9target)}°可使进度增加20%`+(player['304'].fl2progress>=100 ? `<br>大门已打开,恭喜!`:``)
        }
        if(l==10){
            s = `毁灭倒计时:<p class="p5pt">${format(player['304'].fl10timeleft)}s</p>`
        }
        return s
    },
    calc304left(){
        let b = 20
        let l = player['304'].lv
        if(l>=3) b=30
        if(l>=5) b=50
        if(l>=10) b=60
        if(l>=11) b=80
        if(hasUpgrade("304",21)) b+=10
        if(hasUpgrade("304",22)) b+=10
        if(hasUpgrade("304",23)) b+=10
        if(hasUpgrade("304",24)) b+=20
        return b
    },
    getfl3problem(){
        let a1=0
        let a2=0
        let a3=0
        let a4=0
        a1=Math.floor(Math.random()*1000)
        a2=Math.floor(Math.random()*1000)
        a3=Math.floor(Math.random()*1000)
        a4=Math.floor(Math.random()*1000)
        player['304'].fl3answer1 = (a1*a3)-(a2*a4)
        if(hasUpgrade("304",42)) player['304'].fl3answer1 = (a1+a2+a3+a4)
        if(hasUpgrade("304",42)) player['304'].fl3problem = `${formatWhole(a1+a2)}+${formatWhole(a3+a4)}=?`
        else player['304'].fl3problem = `${formatWhole(a1)}x${formatWhole(a3)}-${formatWhole(a2)}x${formatWhole(a4)}=?`
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
    initfl11grid(){
        let a = chooseFromArray(player['304'].fl11box,25)
        player['304'].fl11box = a
        for(i = 0 ;i<25;i++){
            let x = Math.floor(i/5)
            let y = Math.floor(i%5)
            let z = xytoid(x,y)
            player['304'].grid[z] = player['304'].fl11box[i]
        }
    },
    clickables:{
        11: {
            title() { return `开始工作` },
            display: "",
            onClick() {
                player['304'].Fl = 1
                player['304'].timeleft304 = layers['304'].calc304left()
                player['304'].started = true
                player['304'].fl1fuel = 50
                player['304'].fl2progress = 0
                layers['304'].getfl3problem()
                layers['304'].getfl7problem()
                player['304'].fl3answer = 0
                player['304'].fl3trig = false
                player['304'].fl4progress = 0
                player['304'].fl5timeleft = (hasUpgrade("304",31)?30:15)
                player['304'].fl5timecap = (hasUpgrade("304",32)?20:15)
                player['304'].upgrades = player['304'].upgrades.filter(n => (n>15||(hasUpgrade("304",52)&&(n<14))))
                player['304'].points = _D0
                player['304'].fl7trig = false
                player['304'].fl7answer = 0
                player['304'].fl8cnt = 0
                player['304'].fl9degree = 0
                player['304'].fl9target = 180
                player['304'].fl9progress = 0
                player['304'].fl10timeleft = (hasUpgrade("304",33)?40:20)
                layers['304'].initfl11grid()
                player['304'].fl11cnt = 0
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
            display(){return `有${hasUpgrade("304",41)?80:50}%概率将进度增加10%`},
            onClick() {
                player['304'].fl2progress += (chooseWeightInArray([[10,hasUpgrade("304",41)?200:50],[0,50]]))
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
                player['304'].fl4progress+=(0.5+((hasUpgrade("304",43)?0.1:0.02)*player['304'].fl4progress))
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
            display() {return `还需点击${formatWhole((((player['304'].lv-8)*10+40)/(hasUpgrade("304",54)?1.25:1))-player['304'].fl8cnt)}次!`},
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
                player['304'].fl9degree-=10
            },
            unlocked() { return player['304'].Fl==9 && player['304'].started},
            canClick() { return player['304'].fl9degree>0 },
            style:{"height":"60px","min-height":"60px","width":"60px"}
        },
        43: {
            title() { return `右拧撬棒` },
            display: "",
            onClick() {
                player['304'].fl9degree+=10
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
                player['304'].fl5timecap -= 1
                if(!hasUpgrade("304",34))player['304'].fl8cnt = Math.floor(player['304'].fl8cnt/2)
            },
            unlocked() { return player['304'].Fl==10 && player['304'].started },
            canClick() { return player['304'].Fl==10 },
            style(){}
        },
        51: {
            title() { return `1` },
            display() {return ``},
            onClick() {
                return
            },
            unlocked() { return player['304'].lv>=1 && player['304'].started },
            canClick() { return false },
            style:{"height":"40px","min-height":"40px","width":"40px","margin":"0px","border":"2px solid white","color":"#FFFFFF","background-color"(){
                if(player['304'].fl1fuel<=20) return '#FF0000'
                return "#00000000"
            }}
        },
        52: {
            title() { return `5` },
            display() {return ``},
            onClick() {
                return
            },
            unlocked() { return player['304'].lv>=5 && player['304'].started },
            canClick() { return false },
            style:{"height":"40px","min-height":"40px","width":"40px","margin":"0px","border":"2px solid white","color":"#FFFFFF","background-color"(){
                if(player['304'].fl5timeleft<=3) return '#FF0000'
                return "#00000000"
            }}
        },
        53: {
            title() { return `10` },
            display() {return ``},
            onClick() {
                return
            },
            unlocked() { return player['304'].lv>=10 && player['304'].started },
            canClick() { return player['304'].Fl==10 },
            style:{"height":"40px","min-height":"40px","width":"40px","margin":"0px","border":"2px solid white","color":"#FFFFFF","background-color"(){
                if(player['304'].fl10timeleft<=5) return '#FF0000'
                return "#00000000"
            }}
        },
        61: {
            title() { return `重置商店升级` },
            display() {return ``},
            onClick() {
                player['304'].upgrades = []
                player['304'].shoppoints = new Decimal(player['304'].lv-1)
            },
            unlocked() { return player['304'].lv>=6 && (!player['304'].started) },
            canClick() { return true },
            style:{"height":"40px","min-height":"40px","width":"150px","margin":"0px","border":"2px solid #00ffc8","color":"#00ffc8","background-color":"#00ffc875"}
        },
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return 0;
        },
        getUnlocked(id) { // Default
            return player['304'].started && player['304'].Fl==11
        },
        getCanClick(data, id) {
            return (player['304'].started && data)
        },
        onClick(data, id) {
            if((data-player['304'].fl11cnt)!=1){
                player['304'].losetrig304 = true
                player['304'].started = false
            }
            player[this.layer].grid[id] = 0;
            player['304'].fl11cnt++;
        },
        getDisplay(data, id) {
            return data
        },
        getStyle(data, id) {
            if (data == 0) return { "border": "3px solid", "border-color": "white", "background-color": "black" }
            return { "border": "3px solid", "border-color": "#00a2a5", "background-color": "#00ffff", "font-size": "17.5px","height":"80px","min-height":"80px","width":"80px"}
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
});