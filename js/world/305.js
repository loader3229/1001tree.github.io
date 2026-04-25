addLayer("305", {
    symbol: "↑",resource: "Ascensions",row: 3,position: 5,color: "#66ffff",
    startData() {return {
        unlocked: true,
        points: _D0,
        simulation: 0,
        simulating: false,
        timeSimulated: 0,
        energy: _D0,
        bestAscensions: _D0,
        charge:[0,0,0,0,0,0,0,0,0],
        simulating2: false,
        timeSimulated2: 0,
        microEnergy: _D0,
    }},
    type: "none",
    tabFormat: {
        Ascension:{content:[["display-text",function(){return `You performed ${String(player[305].simulation)} simulation${player[305].simulation>1?"s":""}.`}],["display-text",function(){return `Your highest ascension level is ${format(player[305].bestAscensions,2)}, providing +${format(layers[305].getBestAscensionEffect(),3)} base energy gain`}],"blank",["clickables","1"],"blank",["display-text",function(){return `Energy:${format(player[305].energy)}`}],"buyables","blank",["bar","c1"]]},
        Charger: {content:[["display-text",function(){return `You have ${format(layers[305].getAvailableCharges(),0)}/${format(getBuyableAmount(305, 21),0)} unspent charge`}],["blank", "50px"],["clickables",[2]],["clickables",[3,4,5]]],unlocked(){return player[305].bestAscensions.gte(5)}},
        Recursion: {content:[
            ["display-text","Now you can create a simulation inside a simulation!<br>Note that time speed is much faster(×7) in a simulated simulation."],
            "blank",
            ["clickables","8"],
            "blank",
            ["display-text",function(){return `Micro Energy: ${format(player[305].microEnergy,2)}<br>Boosting Energy production by x${format(player[305].microEnergy.pow(0.5).pow(layers[305].clickables[52].effect()).add(1),2)}`}],
        ],unlocked(){return player[305].bestAscensions.gte(72)}},
        Statistics:{content:[["microtabs", "reward"]],}
    },
    startSimulation() {
        player[305].simulating=true
        player[305].simulation+=1
        if(player[305].bestAscensions.gte(50))setBuyableAmount(305, 11, _D6)
    },
    endSimulation() {
        if(player[305].simulating==false)return
        player[305].simulating2=false
        player[305].timeSimulated2=0
        player[305].microEnergy=_D0
        player[305].simulating=false
        player[305].timeSimulated=0
        player[305].bestAscensions=player[305].bestAscensions.max(getBuyableAmount(305, 11))
        setBuyableAmount(305, 11, _D0)
        player[305].energy=_D0
    },
    getEnergyGain(){
        let gain=layers[305].getEnergyBase()
        gain=gain.mul(buyableEffect(305, 11)).mul(layers[305].clickables[31].effect())
        gain=gain.mul(player[305].microEnergy.pow(0.5).pow(layers[305].clickables[52].effect()).add(1))
        return gain
    },
    getEnergyBase(){
        let base=_D1;base=base.add(layers[305].getBestAscensionEffect())
        return base
    },
    getBestAscensionEffect(){
        let mult=player[305].bestAscensions.add(1).log(1.424).pow(layers[305].clickables[42].effect())
        return mult
    },
    getAvailableCharges(){let c=getBuyableAmount(305, 21);return c.sub(player[305].charge.reduce((p,s)=>p+s,0))},
    update(diff) {
        if(player.pause[305])return
        diff*=layers[305].clickables[51].effect()
        if(player[305].simulating){
            player[305].timeSimulated+=diff
            player[305].energy=player[305].energy.add(layers[305].getEnergyGain().mul(diff))
            if(player[305].simulating2){
                player[305].timeSimulated2+=7*diff
                player[305].microEnergy=player[305].microEnergy.add(diff).mul(player[305].energy.add(10000).log(10000))
                if(player[305].microEnergy.gte("1e36")){player[305].microEnergy=player[305].microEnergy.pow(1.07)}
                player[305].microEnergy=player[305].microEnergy.mul(layers[305].clickables[53].effect())
                if(player[305].timeSimulated2>7){player[305].simulating2=false;player[305].timeSimulated2=0;player[305].microEnergy=_D0}
            }
            if(player[305].bestAscensions.gte(101))layers[305].buyables[11].buy()
        }
        if(player[305].timeSimulated>7){layers[305].endSimulation()}
    },
    clickables: {
        11: {
            title(){return player[305].simulating?"Conclude current simulation immediately.":"Start a new simulation."},
            display(){return player[305].simulating?`Current simulation ends in <h2 style="color:#3F0010">${format(7-player[305].timeSimulated)}</h2> seconds.`:"Timer inactive."},
            canClick: true,
            onClick(){if(player[305].simulating){layers[305].endSimulation()}else {layers[305].startSimulation()}},
            style(){return {"height":"100px","width":"400px","border-radius":"1%","border":"5px solid", "border-color":"#99cccc"}}
        },
        21: {
            title: "Respec Charge",
            canClick: true,
            onClick(){layers[305].endSimulation();player[305].charge=[0,0,0,0,0,0,0,0,0]},
            style(){return {"min-height":"60px","height":"60px","width":"390px","border-radius":"1%","border":"5px solid", "border-color":"#113333"}}
        },
        31: {
            title(){return `Charger:<br>Indication<br>Charge:${player[305].charge[1]}<br>`},
            display(){return `Increase Energy gain.<br>-[Factor #1:Charge]<br>-[Factor #2:Energy]<br>-Effect: x${format(this.effect(),2)}`},
            unlocked(){return player[305].bestAscensions.gte(5)},
            tooltip: "Formula: *log<sub>4</sub>(energy+1)<sup>charge</sup>",
            canClick(){return layers[305].getAvailableCharges().gt(0)},
            onClick(){player[305].charge[1]++},
            effect(){return player[305].energy.add(1).log(4).pow(player[305].charge[1]).max(1)},
            style(){return {"height":"200px","width":"180px","border-radius":"2%","border":"5px solid", "border-color":"#99cccc", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        41: {
            title(){return `Charger:<br>Navigation<br>Charge:${player[305].charge[2]}<br>`},
            display(){return `Reduce the price of charges.<br>-[Factor #1:Charge]<br>-Effect: ^${format(this.effect(),3)}`},
            unlocked(){return player[305].bestAscensions.gte(33)},
            tooltip: "Formula: ^(0.5<sup>charge</sup>)",
            canClick(){return layers[305].getAvailableCharges().gt(0)},
            onClick(){player[305].charge[2]++},
            effect(){return new Decimal(0.5).pow(player[305].charge[2])},
            style(){return {"height":"200px","width":"140px","border-radius":"2%","border":"5px solid", "border-color":"#aaccdd", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        42: {
            title(){return `Charger:<br>Amplification<br>Charge:${player[305].charge[3]}<br>`},
            display(){return `Improve the effect of best ascension level.<br>-[Factor #1:Charge]<br>[Factor #2:Best Ascension Level]<br>-Effect: ^${format(this.effect(),3)}`},
            unlocked(){return player[305].bestAscensions.gte(33)},
            tooltip: "Formula: ^(9*charge)<sup>0.6</sup>",
            canClick(){return layers[305].getAvailableCharges().gt(0)},
            onClick(){player[305].charge[3]++},
            effect(){return _D9.mul(player[305].charge[3]).pow(0.6).max(1)},
            style(){return {"height":"200px","width":"140px","border-radius":"2%","border":"5px solid", "border-color":"#aaddcc", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        51: {
            title(){return `Charger:<br>Extension<br>Charge:${player[305].charge[4]}<br>`},
            display(){return `Reduce the time speed slightly.<br>-[Factor #1:Charge]<br>-Effect: *${format(this.effect(),4)}`},
            unlocked(){return player[305].bestAscensions.gte(800)},
            tooltip: "Formula: *0.9<sup>charge</sup>",
            canClick(){return layers[305].getAvailableCharges().gt(0)},
            onClick(){player[305].charge[4]++},
            effect(){return Math.pow(0.9,player[305].charge[4])},
            style(){return {"height":"200px","width":"130px","border-radius":"2%","border":"5px solid", "border-color":"#bbffdd", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        52: {
            title(){return `Charger:<br>Compression<br>Charge:${player[305].charge[5]}<br>`},
            display(){return `Improve the effect of Micro Energy.<br>-[Factor #1:Charge]<br>-Effect: ^${format(this.effect(),1)}`},
            unlocked(){return player[305].bestAscensions.gte(101)},
            tooltip: "Formula: ^(1+charge)",
            canClick(){return layers[305].getAvailableCharges().gt(0)},
            onClick(){player[305].charge[5]++},
            effect(){return _D1.add(player[305].charge[5])},
            style(){return {"height":"200px","width":"130px","border-radius":"2%","border":"5px solid", "border-color":"#bbeeee", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        53: {
            title(){return `Charger:<br>Dilation<br>Charge:${player[305].charge[6]}<br>`},
            display(){return `Enable Self-Replication for Micro Energy.<br>Warning: Replicates every tick.<br>-[Factor #1:Charge]<br>-Effect: *${format(this.effect(),1)}/tick`},
            unlocked(){return player[305].bestAscensions.gte(800)},
            tooltip: "Formula: *2<sup>charge</sup>",
            canClick(){return layers[305].getAvailableCharges().gt(0)},
            onClick(){player[305].charge[6]++},
            effect(){return _D2.pow(player[305].charge[6])},
            style(){return {"height":"200px","width":"130px","border-radius":"2%","border":"5px solid", "border-color":"#bbddff", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        81: {
            title: "Start a new simulation inside current simulation.",
            display(){return player[305].simulating?`Remaining Lifespan: ${format(7-player[305].timeSimulated2)} micro-seconds.`:"You must be in a simulation to do this!"},
            unlocked(){return player[305].bestAscensions.gte(72)},
            canClick(){return player[305].simulating},
            onClick(){
                if(!player[305].simulating2){player[305].simulating2=true;player[305].timeSimulated2=0}
                else{player[305].simulating2=false;player[305].timeSimulated2=0;player[305].microEnergy=_D0}
            },
            style(){return {"height":"100px","width":"400px","border-radius":"1%","border":"5px solid", "border-color":"#99cccc"}}
        }
    },
    buyables: {
        11: {
            title: "Ascend",
            display(){return `Your current Ascension Level is <h2 style="color:#121F24">${format(getBuyableAmount(305,this.id),2)}</h2><br><br>Cost: ${format(this.cost())} Energy<br> Your ${format(getBuyableAmount(305, this.id),2)} Ascension Levels multiplies your energy production by x${format(this.effect())}<br>`},
            cost(x) {return new Decimal(3.9).pow(x).add(1.1)},
            canAfford() {return player[305].energy.gte(this.cost())},
            buy() {
                if(player[305].bestAscensions.lt(33)){
                    player[305].energy = player[305].energy.sub(this.cost())
                    setBuyableAmount(305, this.id, getBuyableAmount(305, this.id).add(1))
                }
                else {
                    setBuyableAmount(305, this.id, player[305].energy.sub(1.1).max(0.5).log(3.9).add(1).floor().max(6))
                }
            },
            effect(x) {return new Decimal(2.5).pow(x)},
        },
        21: {title: "Gain a charge",display(){return `<h2>Requirement: <br>${format(this.cost(),2)} Energy</h2>`},cost(x) {let y=x.add(1);return new Decimal(11).mul(x.pow(2).sub(23.8).max(1)).pow(y.pow(1.5).add(y).add(1)).pow(new Decimal(1.49).pow(y).sub(4).max(1)).pow(x.sub(6).max(1).pow(x.sub(6).pow(2))).pow(layers[305].clickables[41].effect())},canAfford() {return player[305].energy.gte(this.cost())},buy() {setBuyableAmount(305, this.id, getBuyableAmount(305, this.id).add(1))},unlocked() {return player[305].bestAscensions.gte(5)}}
    },
    upgrades: {
    },
    microtabs: {reward: {"Highest Ascension Rewards": {content: [["display-text",function(){let text="";for(i in a["Ascension"]){if(player[305].bestAscensions.gte(new Decimal(i))) {text+=`Ascension Level ${format(new Decimal(i),0)}: ${a["Ascension"][i]}<br>`}else{text+=`Next reward unlocks at Ascension Level ${format(new Decimal(i),0)}`;break}}return text}]]}}},layerShown() { return getGridData('main', 305) },hotkeys: [],
});