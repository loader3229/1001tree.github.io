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
            pt:[null,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0,_D0],
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
                "clickables",
                "blank",
                "grid",
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
        return p
    },
    getlyrPoints(x){
        if(x==0) return _D0
        let l=25
        if(x==1){
            let a = player['301'].points.div(10).pow(0.5).floor()
            while(l>a){
                a=a.times(layers['301'].calclyrBoost(l))
                l--
            }
            return a
        }
        let b= player['301'].pt[x-1].div(1e24).pow(0.5-(x/100)).floor()
        while(l>b){
            b=b.times(layers['301'].getlyrPoints(l))
            l--
        }
        return b
    },
    dolyrReset(x,force){
        if(x==0) return
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
        if(x>=1 && x<=5){
            return player['301'].pt[x].pow(x*2).add(1).log10().pow(x+1).max(1)
        }
        return _D1
    },
    upgrades: {
    },
    milestones: {
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