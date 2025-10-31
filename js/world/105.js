addLayer("105", {
    symbol: "F",
    resource: "点数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        layers['105'].calcfunc()
        layers['105'].calcC()
        layers['105'].calcB()
        layers['105'].calcX()
        player['105'].points = player['105'].points.add(layers['105'].getPgen().times(diff))
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            cfunc: "",
            alpha: _D0,
            beta: _D0,
            ceta: _D0,
            xeta: _D0,
        }
    },
    type: "none",
    tabFormat: {
        "ax^2+bx+c": {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class = 'st5', style = 'font-family:Bahnschrift;text-shadow: 0 0 10px #2b00ffff'>${format(player['105'].points)}</h2> 点数,每秒获得:`
                }],
                "blank",
                ["display-text", function () {
                    return `<h2 class = 'st5', style = 'font-family:Bahnschrift;text-shadow: 0 0 20px #2b00ffff;font-size:40px'>${player['105'].cfunc}</h2>`
                }],
                ["display-text", function () {
                    return `<h2 class = 'st5', style = 'font-family:Bahnschrift;text-shadow: 0 0 12px #2b00ffff;font-size:25px'>a=${format(player['105'].alpha)},b=${format(player['105'].beta)},c=${format(player['105'].ceta)},x=${format(player['105'].xeta)}</h2>`
                }],
                "blank",
                "buyables",
            ]
        },
        "Upgrades": {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class = 'st5', style = 'font-family:Bahnschrift;text-shadow: 0 0 10px #2b00ffff'>${format(player['105'].points)}</h2> 点数,每秒获得:`
                }],
                "blank",
                "upgrades",
            ]
        }
    },
    calcfunc(){
        let f = ""
        f = `f(x)=ax^2+bx+c=${format(layers['105'].getPgen())}/s`
        player['105'].cfunc = f
    },
    getPgen(){
        let x = player['105'].xeta
        let a = player['105'].alpha
        let b = player['105'].beta
        let c = player['105'].ceta
        return a.times(x.pow(2)).plus(b.times(x)).plus(c)
    },
    calcC(){
        let c = _D0
        c = buyableEffect("105",11)
        c = c.times(buyableEffect("105",21))
        player['105'].ceta = c
    },
    calcB(){
        let b = _D0
        b = buyableEffect("105",12)
        player['105'].beta = b
    },
    calcX(){
        let x = _D0
        if(hasUpgrade("105",12)) x = _D1
        if(hasUpgrade("105",12)) x = x.add(buyableEffect("105",22))
        player['105'].xeta = x
    },
    upgrades: {
        11: {
            title: "C1+",
            description() { return `每个C1使效果基数自增0.02` },
            canAfford(){
                return player['105'].points.gte(100)
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost: _D(100),
        },
        21: {
            title: "C2U",
            description() { return `解锁C2,但B1U价格上涨` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                if(hasUpgrade("105",12)) return _D(4500)
                return _D(1000)},
        },
        12: {
            title: "B1U",
            description() { return `解锁B1和X1并将x设为1, 但C2U价格上涨` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                if(hasUpgrade("105",21)) return _D(4000)
                return _D(1000)
            },
        },

    },
    milestones: {
    },
    buyables: {
        11: {
            title() { return `C1` },
            display() {
                return `将c增加${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:+${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                if(x.eq(0)) return new Decimal(0)
                return Decimal.pow(1.5,x.pow(0.9))
            },
            effBase() {
                let b=_D(0.2)
                if(hasUpgrade("105",11)) b = b.add(getBuyableAmount(this.layer,this.id).times(0.02))
                return b
            },
            effect(x) { return x.times(this.effBase()) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return true },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.2),hsla(212, 100%, 50%, 0.2),hsla(241, 100%, 50%, 0.2))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff"}
                return {"margin":"-1px","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
        12: {
            title() { return `B1` },
            display() {
                return `将b增加${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:+${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                if(x.eq(0)) return new Decimal(500)
                return Decimal.pow(2.5,x.pow(0.9)).times(hasUpgrade("105",21) ? 2000 : 500)
            },
            effBase() {
                let b=_D(0.2)
                return b
            },
            effect(x) { return x.times(this.effBase()) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasUpgrade("105",12) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.2),hsla(212, 100%, 50%, 0.2),hsla(241, 100%, 50%, 0.2))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff"}
                return {"margin":"-1px","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
        21: {
            title() { return `C2` },
            display() {
                return `将c乘以${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:x${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                if(x.eq(0)) return new Decimal(500)
                return Decimal.pow(3,x).times(hasUpgrade("105",12) ? 1000 : 250)
            },
            effBase() {
                let b=_D(1.25)
                return b
            },
            effect(x) { return Decimal.pow(this.effBase(),x) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasUpgrade("105",21) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.2),hsla(212, 100%, 50%, 0.2),hsla(241, 100%, 50%, 0.2))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff"}
                return {"margin":"-1px","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
        22: {
            title() { return `X1` },
            display() {
                return `将x增加${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:x${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                if(x.eq(0)) return new Decimal(2500)
                return Decimal.pow(2,x.pow(1.3)).times(hasUpgrade("105",21) ? 6000 : 1000)
            },
            effBase() {
                let b=_D(0.1)
                return b
            },
            effect(x) { return x.times(this.effBase()) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasUpgrade("105",12) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.2),hsla(212, 100%, 50%, 0.2),hsla(241, 100%, 50%, 0.2))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff"}
                return {"margin":"-1px","height":"120px","width":"120px","color":"#002cddff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});