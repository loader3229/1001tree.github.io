addLayer("301", {
    symbol: "⏫",
    resource: "点数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        player[this.layer].points = player[this.layer].points.add(layers['301'].pgen_301().times(diff))
        if(getBuyableAmount("301",21).gt(0)){
            for(i=1;i<=25;i++){
                if(getBuyableAmount("301",21).gte(i)){
                    player['301'].pt[i] = player['301'].pt[i].add(layers['301'].getlyrPoints(i).times(0.2).times(diff))
                }
            }
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            level: 0,
            nm:['点数','A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','C1','C2','C3','C4','C5','D1','D2','D3','D4','D5','E1','E2','E3','E4','E5','Meta'],
            pt:[null,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0],
            metapoints:_D0,
            maxlev: 0,
        }
    },
    type: "none",
    tabFormat: {
        "Layers":{
            content:[
                 ["display-text", function () {
                    return `你有 <h2 class="nmpt">${format(player[this.layer].points)}</h2> 点数 (+${format(layers['301'].pgen_301())}/s)<br>下一层需要10000上一层点数解锁,每层的上级点数需求是上一层的^1.3`
                }],
                ["display-text", function () {
                    if(player['301'].level) return `你有 <h2 class="nmpt">${format(player[this.layer].pt[player['301'].level])}</h2> ${player['301'].nm[player['301'].level]}点数, 加成前面全部内容 ${format(layers['301'].calclyrBoost(player['301'].level))}x`
                    return `<br>`
                }],
                ["clickables",[1]],
                "blank",
                "grid",
            ]
        },
        "Meta":{
            content:[
                 ["display-text", function () {
                    return `你有 <h2 class="nmpt">${format(player[this.layer].points)}</h2> 点数 (+${format(layers['301'].pgen_301())}/s)`
                }],
                ["display-text", function () {
                    if(player['301'].level) return `你有 <h2 class="nmpt">${format(player['301'].metapoints)}</h2> 元点数.`
                    return `<br>`
                }],
                "blank",
                ["clickables",[2]],
                "blank",
                "blank",
                "buyables",
            ]
        }
    },
    pgen_301(){
        let p =_D1
        let l=25
        while(l>0){
            p=p.times(layers['301'].calclyrBoost(l))
            l--
        }
        if(getBuyableAmount("301",13).gt(0)) p = p.times(Decimal.pow(4,player['301'].metapoints.add(1).ln()).max(1))
        p = p.pow(buyableEffect("301",11))
        return p
    },
    getlyrPoints(x){
        if(x==0) return _D0
        let l=25
        if(x==1){
            let a = player['301'].points.div(10).pow(0.5)
            while(l>x){
                a=a.times(layers['301'].calclyrBoost(l))
                l--
            }
            if(getBuyableAmount("301",13).gt(1)) a = a.times(Decimal.pow(3,player['301'].metapoints.add(1).log10()).max(1))
            if(getBuyableAmount("301",12).neq(0)) a=a.times(player['301'].points.div(10).add(1).log10().pow(1.3).times(10))
            return a
        }
        let b= (_D(player['301'].pt[x-1]).div(10000).pow(_D(0.5).div(Decimal.pow(1.3,x))))
        if(getBuyableAmount("301",13).gt(x)) b = b.times(Decimal.pow(2.5,player['301'].metapoints.add(1).log10()).max(1))
        while(l>x){
            b=b.times(layers['301'].calclyrBoost(l))
            l--
        }
        if(getBuyableAmount("301",12).gte(x)) b=b.times(_D(player['301'].pt[x-1]).div(10000).add(1).ln().max(1))
        return b
    },
    dolyrReset(x,force){
        if(x==0) return
        if(x==26){
            player['301'].metapoints = player['301'].metapoints.add(layers['301'].getMetaPoints())
            layers['301'].dolyrReset(25,true)
            return
        }
        if(!force){
            let b=layers['301'].getlyrPoints(x).floor()
            player['301'].pt[x] = player['301'].pt[x].add(b)
        }else{
            player['301'].pt[x] = _D0
        }
        if(x==1){
            player['301'].points=_D0
            return
        }
        layers['301'].dolyrReset(x-1,true)
    },
    calclyrBoost(x){
        if(x==0) return _D1
        if(x==1 && _D(player['301'].pt[x]).gte(100)) player['301'].maxlev=Math.max(1,player['301'].maxlev)
        else if(x!=1 && _D(player['301'].pt[x-1]).gt(10000)) player['301'].maxlev=Math.max(x,player['301'].maxlev)
        return _D(player['301'].pt[x]).pow(buyableEffect("301",22).add(Math.pow(x,0.75)*2)).add(1).log10().add(1).pow(Math.pow(x,0.75)+1).max(1)
        return _D1
    },
    getMetaPoints(){
        let l = player['301'].maxlev
        return Decimal.pow(10,Math.pow(l,1.05)).minus(1).times(player['301'].points.add(1).log10().add(1).log10())
    },
    upgrades: {
    },
    milestones: {
    },
    buyables: {
        11: {
            title() { return `更好的点数获取` },
            display() {
                return `点数获取变为1.05次方(乘算)
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:^${format(this.effect())}
                        下一个需要:${format(this.cost())}元点数`
            },
            cost(x) { return Decimal.pow(4,x.pow(1.075)).div(10) },
            effect(x) { return Decimal.pow(1.05,x) },
            canAfford() { return player[this.layer].metapoints.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player[this.layer].metapoints = player[this.layer].metapoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){                
                let l=player['301'].level
                let style={"height":"150px","width":"150px"}
                let s1=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                if(this.canAfford()) style.backgroundColor=(`rgba(`+s+`,20%)`)
                else style.backgroundColor = "#000000"
                style.color=('rgb('+s+')')
                style.fontSize="10px"
                style.boxShadow="0 0 10px rgb("+s+")"
                return style
            }
        },
        12: {
            title() { return `更好的层级递进` },
            display() {
                return `上一级点数将加成${player['301'].nm[getBuyableAmount("301",12).add(1)]}获取.
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        最高生效层级:`+(getBuyableAmount("301",12).gt(0) ? player['301'].nm[getBuyableAmount("301",12)] : `无`)+`
                        下一个需要:${format(this.cost())}元点数`
            },
            cost(x) { return Decimal.pow(10,x.pow(1.25)).pow(1.1) },
            effect(x) { return x },
            canAfford() { return player[this.layer].metapoints.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player[this.layer].metapoints = player[this.layer].metapoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){                
                let l=player['301'].level
                let style={"height":"150px","width":"150px"}
                let s1=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                if(this.canAfford()) style.backgroundColor=(`rgba(`+s+`,20%)`)
                else style.backgroundColor = "#000000"
                style.color=('rgb('+s+')')
                style.fontSize="10px"
                style.boxShadow="0 0 10px rgb("+s+")"
                return style
            }
        },
        13: {
            title() { return `更好的元递进` },
            display() {
                return `元点数将加成${player['301'].nm[getBuyableAmount("301",13)]}获取.
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        最高生效层级:`+(getBuyableAmount("301",13).gt(0) ? player['301'].nm[getBuyableAmount("301",13).minus(1)] : `无`)+`
                        下一个需要:${format(this.cost())}元点数`
            },
            cost(x) { return Decimal.pow(11,x).times(100) },
            effect(x) { return x },
            canAfford() { return player[this.layer].metapoints.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player[this.layer].metapoints = player[this.layer].metapoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){                
                let l=player['301'].level
                let style={"height":"150px","width":"150px"}
                let s1=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                if(this.canAfford()) style.backgroundColor=(`rgba(`+s+`,20%)`)
                else style.backgroundColor = "#000000"
                style.color=('rgb('+s+')')
                style.fontSize="10px"
                style.boxShadow="0 0 10px rgb("+s+")"
                return style
            }
        },
        21: {
            title() { return `自动化时代` },
            display() {
                return `每秒自动生成20%重置可获得的${player['301'].nm[getBuyableAmount("301",21).add(1)]}点数.
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        最高生效层级:`+(getBuyableAmount("301",21).gt(0) ? player['301'].nm[getBuyableAmount("301",21)] : `无`)+`
                        下一个需要:${format(this.cost())}元点数`
            },
            cost(x) { return Decimal.pow(10,x.pow(1.1)).times(5e3) },
            effect(x) { return x },
            canAfford() { return player[this.layer].metapoints.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player[this.layer].metapoints = player[this.layer].metapoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){                
                let l=player['301'].level
                let style={"height":"150px","width":"150px"}
                let s1=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                if(this.canAfford()) style.backgroundColor=(`rgba(`+s+`,20%)`)
                else style.backgroundColor = "#000000"
                style.color=('rgb('+s+')')
                style.fontSize="10px"
                style.boxShadow="0 0 10px rgb("+s+")"
                return style
            }
        },
        22: {
            title() { return `基数递进` },
            display() {
                    return    `层级加成基数+0.5
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:+${format(this.effect())}
                        下一个需要:${format(this.cost())}元点数`
            },
            cost(x) { return Decimal.pow(12,x.pow(1.1)).times(2e5) },
            effect(x) { return x.times(0.5) },
            canAfford() { return player[this.layer].metapoints.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player[this.layer].metapoints = player[this.layer].metapoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){                
                let l=player['301'].level
                let style={"height":"150px","width":"150px"}
                let s1=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                if(this.canAfford()) style.backgroundColor=(`rgba(`+s+`,20%)`)
                else style.backgroundColor = "#000000"
                style.color=('rgb('+s+')')
                style.fontSize="10px"
                style.boxShadow="0 0 10px rgb("+s+")"
                return style
            }
        },
    },
    clickables:{
        11: {
            display() { return `重置以获得${format(layers['301'].getlyrPoints(player['301'].level).floor())}${player['301'].nm[player['301'].level]}点数` },
            onClick() {
                layers['301'].dolyrReset(player['301'].level,false)
            },
            unlocked() { return player['301'].level!=0 },
            canClick() { return layers['301'].getlyrPoints(player['301'].level).neq(0)},
            style(){
                let l=player['301'].level
                let style={"height":"100px","width":"300px"}
                let s=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                style.backgroundColor=(`rgba(`+s+`,20%)`)
                style.color=('rgb('+s+')')
                style.fontSize="15px"
                return style
            },
        },
        21: {
            display() { return `元重置以获得${format(layers['301'].getMetaPoints())}元点数` },
            onClick() {
                layers['301'].dolyrReset(26,false)
                player['301'].maxlev = 0
                player['301'].level = 1
            },
            unlocked() { return player['301'].level!=0 },
            canClick() { return layers['301'].maxlev!=0},
            style(){
                let l=player['301'].level
                let style={"height":"100px","width":"300px"}
                let s1=""
                s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
                style.borderColor=(`rgb(`+s+`)`)
                style.backgroundColor=(`rgba(`+s+`,20%)`)
                style.color=('rgb('+s+')')
                style.fontSize="15px"
                style.boxShadow="0 0 10px rgb("+s+")"
                return style
            },
        },
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return _D0;
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            if(id==101) return true
            let x=Math.floor(id/100)-1
            let y=id%10
            if((x*5+y) <= player['301'].maxlev) return true
            return false
        },
        onClick(data, id) {
            let x = Math.floor(id/100)-1
            let y = id%10
            if(player['301'].level != (x*5+y)) player['301'].level = (x*5+y)
            else player['301'].level = 0
        },
        getDisplay(data, id) {
            let x = Math.floor(id/100)-1
            let y = id%10
            return `${player['301'].nm[x*5+y]}`
        },
        getStyle(data, id) {
            let x = Math.floor(id/100)-1
            let y = id%10
            let l=(x*5+y)
            let style={}
            let s=""
            s=`${Math.min(255,l*10)},${Math.max(0,255-l*10)},0`
            style.borderColor=(`rgb(`+s+`)`)
            if(!this.getCanClick(data,id)) style.backgroundColor="#000000"
            else if(player['301'].level != (x*5+y)) style.backgroundColor=(`rgba(`+s+`,20%)`)
            else style.backgroundColor=(`rgb(`+s+`)`)
            if(player['301'].level != (x*5+y)) style.color=('rgb('+s+')')
            else style.color = "#000000"
            style.fontSize="15px"
            return style
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});