addLayer("304", {
    symbol: "🕛",
    resource: "点数",
    color: "hsl(170, 100%, 50%)",
    update(diff) {
        if (!getGridData('main', this.layer)||player.pause[this.layer]) return
        if(player['304'].started) player['304'].timeleft304 -= diff
        if(player['304'].started && player['304'].timeleft304 <= 0){//判断失败
            if(player['304'].fl1fuel<=0){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=2&&player['304'].fl2progress<100){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else if(player['304'].lv>=3&&player['304'].fl3trig){
                player['304'].started = false
                player['304'].losetrig304 = true
            }else{
                player['304'].lv++
                player['304'].started = false
            }
        }
        if(player['304'].started){
            player['304'].fl1fuel -= (3+player['304'].lv/2)*diff
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
            ]
        },
    },
    upgrades: {
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
            s = `你发现燃料消耗变快了吗?没关系!`
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
            s = (player['304'].fl3trig? `恭喜,回答正确!<br>`:`若问题回答错误,将重置2层进度!<br>`)+player['304'].fl3problem
        }
        return s
    },
    getfl3problem(){
        let a1=0
        let a2=0
        let a3=0
        let a4=0
        a1=Math.floor(Math.random()*1234567)
        a2=Math.floor(Math.random()*1765432)
        a3=Math.floor(Math.random()*2134567)
        a4=Math.floor(Math.random()*2365431)
        player['304'].fl3answer1 = (a1*a3)-(a2*a4)
        player['304'].fl3problem = `${formatWhole(a1)}x${formatWhole(a3)}-${formatWhole(a2)}x${formatWhole(a4)}=?`
    },
    clickables:{
        11: {
            title() { return `开始工作` },
            display: "",
            onClick() {
                player['304'].Fl = 1
                player['304'].timeleft304 = 20
                player['304'].started = true
                player['304'].fl1fuel = 50
                player['304'].fl2progress = 0
                layers['304'].getfl3problem()
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
                player['304'].fl1fuel += (player['304'].fl1fuel*0.05)+2
                player['304'].fl1fuel = Math.min(player['304'].fl1fuel,100) 
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
            title() { return `回答问题` },
            display: "JUST DO IT.",
            onClick() {
                player['304'].answer = prompt("输入问题的答案:")
                if(player['304'].answer == player['304'].answer1) player['304'].fl3trig = true
                else player['304'].fl2progress = 0
            },
            unlocked() { return player['304'].Fl==3 && player['304'].started },
            canClick() { return player['304'].Fl==3 },
            style:{}
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
});