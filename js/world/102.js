addLayer("102", {
    name: getGameName(this.layer),
    symbol: "🫵",
    resource: "点数",
    row: 1,
    position: 2,
    color: "#a0a0a0",
    startData(){
        return {
            unlocked: true,
            points: _D0,
        }
    },
    layerShown(){ return getGridData('main',this.layer) },
    tabFormat:{
        clickwall:{
            content:[
                ["display-text", function () {
                    return `你有<h2 style="color:#a0a0a0;text-shadow:0 0 15px #a0a0a0"> ${format(player[this.layer].points)}/${format(player._102.maxpoints)} </h2>点数`
                }],
                ["display-text", function () {
                    return `你已经击破了<h2 style="color:#a0a0a0;text-shadow:0 0 15px #a0a0a0"> ${formatWhole(player._102.wallbreak)} </h2>堵点击墙`
                }],
                "blank",
                "clickables",
                "blank",
                "buyables",
                "blank",
                ["display-text", function () {
                    return `里程碑2的效果为<h2 style="color:#a0a0a0;text-shadow:0 0 15px #a0a0a0"> ${format(layers[this.layer].m2effect())}</h2>x`
                }],
            ]
        },
        milestones:{
            content:[
                ["display-text", function () {
                    return `你有<h2 style="color:#a0a0a0;text-shadow:0 0 15px #a0a0a0"> ${format(player[this.layer].points)}/${format(player._102.maxpoints)} </h2>点数`
                }],
                ["display-text", function () {
                    return `你已经击破了<h2 style="color:#a0a0a0;text-shadow:0 0 15px #a0a0a0"> ${formatWhole(player._102.wallbreak)} </h2>堵点击墙`
                }],
                "blank",
                "milestones",
            ]
        }
    },
    subpower(){
        spow=new Decimal(1)
        if(layers[this.layer].buyables[11].unlocked()) spow=spow.mul(buyableEffect("102",11))
        if(hasMilestone("102",1)) spow=spow.mul(layers[this.layer].m2effect())
        return spow
    },
    m2effect(){
        eff=new Decimal(1)
        if(hasMilestone("102",1)) eff=eff.mul(Decimal.pow(player[this.layer].points.add(1).log10().div(100).add(1.285),player[this.layer].points.div(3).max(0)).pow(0.2))
        return eff
    },
    calcmaxhp(){
        if(player._102.wallbreak.lte(30)) return getYFromOrderedPoints([[0,10],[10,100],[20,1000],[30,100000]],player._102.wallbreak.add(1))
        return Decimal.pow(player._102.wallbreak.add(1).log10().div(10).add(2),player._102.wallbreak)
    },
    divpower(){
        eff=new Decimal(3)
        eff=eff.times(Decimal.pow(0.95,player._102.divclick))
        return eff.max(1)
    },
    clickables:{
        11:{
            title(){return `点击墙 #${formatWhole(player._102.wallbreak)}`},
            display(){return `HP: ${format(player._102.hp)}/${format(player._102.maxhp)}`},
            onClick(){
                if(player._102.mode==1) player._102.hp=player._102.hp.sub(layers[this.layer].subpower())
                else{
                    player._102.hp=player._102.hp.div(layers[this.layer].divpower())
                    player._102.divclick=player._102.divclick.add(1)
                }
                if(player._102.hp.lte(0)){
                    player._102.maxhp=getYFromOrderedPoints([[0,10],[10,100],[20,1000],[30,100000],[40,new Decimal(1e14)]],player._102.wallbreak.add(1))
                    player._102.wallbreak=player._102.wallbreak.add(1)
                    player._102.hp=player._102.maxhp
                    player[this.layer].points=player[this.layer].points.add(player._102.wallbreak)
                    player._102.maxpoints=player._102.maxpoints.add(player._102.wallbreak)
                }
            },
            canClick(){return true},
        },
        21:{
            title(){return `工具:减法器`},
            display(){return `伤害为-${format(layers[this.layer].subpower())}`},
            onClick(){
                player._102.mode=1
            },
            canClick(){return player._102.mode==2},
            style:{"width":"92.5px","height":"75px","margin-top":"15px","min-height":"0px","margin-right":"0px","background-color"(){return player._102.mode==1 ? "#12a31cff":"#a0a0a0"}},
        },
        22:{
            title(){return `工具:除法器`},
            display(){return `伤害为/${format(layers[this.layer].divpower())}`},
            onClick(){
                player._102.mode=2
            },
            canClick(){return player._102.mode==1},
            unlocked(){return hasMilestone("102",3)},
            style:{"width":"92.5px","height":"75px","margin-top":"15px","min-height":"0px","margin-right":"0px","background-color"(){return player._102.mode==2 ? "#12a31cff":"#a0a0a0"}},
        },
        31:{
            title(){return `洗点并重置点击墙`},
            onClick(){
                setBuyableAmount("102",11,_D0)
                setBuyableAmount("102",12,_D0)
                player[this.layer].points=player._102.maxpoints
                if(hasMilestone("102",3)){
                    player._102.divclick=_D0
                }
                player._102.hp=player._102.maxhp
            },
            canClick(){return true},
            style:{"width":"200px","height":"75px","margin-top":"0px","min-height":"0px"},
        }
    },
    buyables:{
        11:{
            title(){return `定值电阻`},
            display(){return `减法器效果x${format(buyableEffect("102",12).add(1.2))}<br>
                            数量:${format(getBuyableAmount(this.layer,this.id))}
                            效果:x${format(this.effect())}
                            下一个需要:${format(this.cost())}`},
            cost(x){return getYFromOrderedPoints([[0,1],[5,4],[10,12],[15,21],[20,37],[30,59],[50,80]],x)},
            effect(x){return Decimal.pow(buyableEffect("102",12).add(1.2),x)},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            unlocked(){return hasMilestone("102",0)},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12:{
            title(){return `电表`},
            display(){return `定值电阻基数+0.05<br>
                            数量:${format(getBuyableAmount(this.layer,this.id))}
                            效果:+${format(this.effect())}
                            下一个需要:${format(this.cost())}`},
            cost(x){return getYFromOrderedPoints([[0,10],[5,20],[10,40],[15,60],[20,100],[30,140],[50,250]],x)},
            effect(x){return x.times(0.05)},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            unlocked(){return hasMilestone("102",2)},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        }
    },
    milestones:{
        0:{
            requirementDescription(){return `6点数`},
            effectDescription(){return `解锁一些可购买，为什么不呢?`},
            done(){return player._102.maxpoints.gte(6)},
        },
        1:{
            requirementDescription(){return `120点数`},
            effectDescription(){return `减法器的效果随着当前点数变强，解锁洗点功能`},
            done(){return player._102.maxpoints.gte(120)},
        },
        2:{
            requirementDescription(){return `231点数`},
            effectDescription(){return `解锁另一个可购买.`},
            done(){return player._102.maxpoints.gte(231)},
        },
        3:{
            requirementDescription(){return `496点数`},
            effectDescription(){return `解锁除法器，除法器的效果会随着点击次数衰减!`},
            done(){return player._102.maxpoints.gte(496)}
        }
    }
})