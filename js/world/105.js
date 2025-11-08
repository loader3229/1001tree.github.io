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
        layers['105'].calcA()
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
                    return `你有 <h2 class = 'st5', style = 'font-family:Bahnschrift;text-shadow: 0 0 10px #2b00ffff'>${format(player['105'].points)}</h2> 点数`
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
        let p = a.times(x.pow(2)).plus(b.times(x)).plus(c)
        if(hasUpgrade("105",31)) p = p.times(upgradeEffect("105",31))
        if(hasUpgrade("105",13)) p = p.times(upgradeEffect("105",13))
        if(hasUpgrade("105",42)) p = p.times(upgradeEffect("105",42))
        return p
    },
    calcC(){
        let c = _D0
        c = buyableEffect("105",11)
        c = c.times(buyableEffect("105",21))
        if(hasUpgrade("105",23)) c = c.times(upgradeEffect("105",23))
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
    calcA(){
        let a = _D0
        if(hasUpgrade("105",33)) a = a.add(buyableEffect("105",13))
        if(hasUpgrade("105",34)) a = a.times(2)
        player['105'].alpha = a
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
                if(hasUpgrade("105",12)) return _D(2500)
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
        22: {
            title: "CB",
            description() { return `每个C2使得B1基数+0.1` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(3500)
            },
        },
        31: {
            title: "P+",
            description() { return `点数增幅自身获取` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            effect(){return player['105'].points.add(1).log10().pow(3).div(25).max(1)},
            effectDisplay(){return `x${format(this.effect())}`},
            cost(){
                return _D(3500)
            },
        },
        13: {
            title: "BP",
            description() { return `每个B1使点数获取乘以1.1, 在50个达到硬上限` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            effect(){return Decimal.pow(1.1,getBuyableAmount("105",12).min(50)).max(1)},
            effectDisplay(){return `x${format(this.effect())}`},
            cost(){
                return _D(3500)
            },
        },
        23: {
            title: "BC",
            description() { return `c的数值乘以(ln(b)^2)/10` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            effect(){return player['105'].beta.add(1).ln().pow(2).div(10).add(1)},
            effectDisplay(){return `x${format(this.effect())}`},
            cost(){
                return _D(1.5e6)
            },
        },
        32: {
            title: "B1+",
            description() { return `每个B1将效果基数自增0.03` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(5e6)
            },
        },
        33: {
            title: "A1U",
            description() { return `解锁A1` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(2.5e7)
            },
        },
        14: {
            title: "X2U",
            description() { return `解锁X2` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(2.5e7)
            },
        },
        24: {
            title: "B1++",
            description() { return `B1基数翻倍` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(1.5e9)
            },
        },
        41: {
            title: "C2+",
            description() { return `每个C2使自己便宜10%` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(1e10)
            },
        },
        42: {
            title: "RT1",
            description() { return `点数获取乘以((2a/log(b))^3)<br> a>=6时软上限` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(1e10)
            },
            effect(){
                if(player['105'].alpha.lte(6)) return player['105'].alpha.times(2).div(player['105'].beta.add(1).log10()).pow(3)
                return player['105'].alpha.pow(0.4).add(6).times(2).div(player['105'].beta.add(1).log10()).pow(3)
            },
            effectDisplay(){return `x${format(this.effect())}`},
        },
        34: {
            title: "A+",
            description() { return `a的值乘以2` },
            canAfford(){
                return player['105'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(241, 100%, 50%),hsl(212, 100%, 50%),hsl(241, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(1e11)
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
                return Decimal.pow(1.6,x.pow(getYFromOrderedPoints([[1,0.9],[40,0.9],[60,1.1],[120,1.5],[200,2],[Infinity,2]])))
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
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.3),hsla(212, 100%, 50%, 0.3),hsla(241, 100%, 50%, 0.3))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff"}
                return {"background":"linear-gradient(in hsl 60deg,hsla(0, 100%, 50%, 0.3),hsla(32, 100%, 50%, 0.3),hsla(0, 100%, 50%, 0.3))","margin":"-1px","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff","background-color":"#002cdd00"}
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
                return Decimal.pow(1.8,x.pow(0.9)).times(hasUpgrade("105",21) ? 1000 : 500)
            },
            effBase() {
                let b=_D(0.4)
                if(hasUpgrade("105",22)) b = b.add(getBuyableAmount("105",21).times(0.1))
                if(hasUpgrade("105",32)) b = b.add(getBuyableAmount("105",12).times(0.03))
                if(hasUpgrade("105",24)) b = b.times(2)
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
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.3),hsla(212, 100%, 50%, 0.3),hsla(241, 100%, 50%, 0.3))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff"}
                return {"background":"linear-gradient(in hsl 60deg,hsla(0, 100%, 50%, 0.3),hsla(32, 100%, 50%, 0.3),hsla(0, 100%, 50%, 0.3))","margin":"-1px","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff","background-color":"#002cdd00"}
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
                return Decimal.pow(2.5,x).times(hasUpgrade("105",12) ? 1000 : 250).times(Decimal.pow(hasUpgrade("105",41) ? 0.9 : 1,getBuyableAmount("105",21)))
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
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.3),hsla(212, 100%, 50%, 0.3),hsla(241, 100%, 50%, 0.3))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff"}
                return {"background":"linear-gradient(in hsl 60deg,hsla(0, 100%, 50%, 0.3),hsla(32, 100%, 50%, 0.3),hsla(0, 100%, 50%, 0.3))","margin":"-1px","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
        22: {
            title() { return `X1` },
            display() {
                return `将x增加${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:+${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                if(x.eq(0)) return new Decimal(2500)
                return Decimal.pow(2.3,x).times(hasUpgrade("105",21) ? 4000 : 1000)
            },
            effBase() {
                let b=_D(1)
                b = b.add(buyableEffect("105",32))
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
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.3),hsla(212, 100%, 50%, 0.3),hsla(241, 100%, 50%, 0.3))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff"}
                return {"background":"linear-gradient(in hsl 60deg,hsla(0, 100%, 50%, 0.3),hsla(32, 100%, 50%, 0.3),hsla(0, 100%, 50%, 0.3))","margin":"-1px","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
        32: {
            title() { return `X2` },
            display() {
                return `将X1基数增加${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:+${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                return Decimal.pow(2,x.pow(1.25)).times(1e7)
            },
            effBase() {
                let b=_D(1)
                return b
            },
            effect(x) { return x.times(this.effBase()) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasUpgrade("105",14) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.3),hsla(212, 100%, 50%, 0.3),hsla(241, 100%, 50%, 0.3))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff"}
                return {"background":"linear-gradient(in hsl 60deg,hsla(0, 100%, 50%, 0.3),hsla(32, 100%, 50%, 0.3),hsla(0, 100%, 50%, 0.3))","margin":"-1px","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
        13: {
            title() { return `A1` },
            display() {
                return `将a增加${format(this.effBase())}<br>
                        数量:${format(getBuyableAmount(this.layer, this.id))}
                        效果:+${format(this.effect())}
                        下一个需要:${format(this.cost())}`
            },
            cost(x) { 
                if(x.eq(0)) return new Decimal(1e7)
                return Decimal.pow(getYFromOrderedPoints([[1,1.5],[15,2],[25,3],[35,4],[45,5],[60,7],[80,9],[90,10],[100,20],[Infinity,3000]]),x).times(1e7)
            },
            effBase() {
                let b=_D(0.1)
                return b
            },
            effect(x) { return x.times(this.effBase()) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            unlocked() { return hasUpgrade("105",33) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style(){
                if(this.canAfford()) return {"margin":"-1px","background":"linear-gradient(in hsl 60deg,hsla(241, 100%, 50%, 0.3),hsla(212, 100%, 50%, 0.3),hsla(241, 100%, 50%, 0.3))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 3s linear infinite","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff"}
                return {"background":"linear-gradient(in hsl 60deg,hsla(0, 100%, 50%, 0.3),hsla(32, 100%, 50%, 0.3),hsla(0, 100%, 50%, 0.3))","margin":"-1px","height":"120px","width":"120px","color":"#fff","border-color":"#002cddff","background-color":"#002cdd00"}
            }
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});