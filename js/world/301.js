addLayer("301", {
    symbol: "⏫",
    resource: "点数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        player[this.layer].points = player[this.layer].points.add(layers['301'].pgen_301().times(diff))
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            level: 0,
            nm:[null,'A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','C1','C2','C3','C4','C5','D1','D2','D3','D4','D5','E1','E2','E3','E4','E5'],
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
                    return `你有 <h2 class="nmpt">${format(player[this.layer].points)}</h2> 点数 (+${format(layers['301'].pgen_301())}/s)`
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
        p = p.pow(buyableEffect("301",11))
        return p
    },
    getlyrPoints(x){
        if(x==0) return _D0
        let l=25
        if(x==1){
            let a = player['301'].points.div(10).pow(0.5).floor()
            while(l>x){
                a=a.times(layers['301'].calclyrBoost(l))
                l--
            }
            return a
        }
        let b= player['301'].pt[x-1].div(1e24).pow(0.5-(x/100)).floor()
        while(l>x){
            b=b.times(layers['301'].getlyrPoints(l))
            l--
        }
        return b
    },
    dolyrReset(x,force){
        if(x==0) return
        if(x==26){
            player['301'].metapoints = player['301'].metapoints.add(layers['301'].getMetaPoints())
            layers['301'].dolyrReset(25,false)
            return
        }
        if(!force){
            let b=layers['301'].getlyrPoints(x)
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
        if(x==1 && _D(player['301'].pt[x]).gte(100)) player['301'].maxlev=1
        else if(_D(player['301'].pt[x]).gt(0)) player['301'].maxlev=Math.max(x,player['301'].maxlev)
        if(x>=1 && x<=5){
            return player['301'].pt[x].pow(x*2).add(1).log10().pow(x+1).max(1)
        }
        return _D1
    },
    getMetaPoints(){
        let l = player['301'].maxlev
        return Decimal.pow(2,l).minus(1).times(player['301'].points.add(1).slog())
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
            cost(x) { return Decimal.pow(2,x.pow(1.05)).div(2) },
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
    },
    clickables:{
        11: {
            display() { return `重置以获得${format(layers['301'].getlyrPoints(player['301'].level))}${player['301'].nm[player['301'].level]}点数` },
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
            },
            unlocked() { return player['301'].level!=0 },
            canClick() { return layers['301'].getlyrPoints(player['301'].level).neq(0)},
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
            return data.neq(0) || id==101
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
            if(player['301'].level != (x*5+y)) style.backgroundColor=(`rgba(`+s+`,20%)`)
            else style.backgroundColor=(`rgb(`+s+`)`)
            if(player['301'].level != (x*5+y)) style.color=('rgb('+s+')')
            else style.color = "#000000"
            style.fontSize="15px"
            return style
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});