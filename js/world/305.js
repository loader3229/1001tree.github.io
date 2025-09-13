addLayer("305", {
    symbol: "↑",resource: "Ascensions",row: 3,position: 5,color: "#66ffff",startData() {return {unlocked: true,points: _D0,simulation: 0,simulating: false,timeSimulated: 0,energy: _D0,bestAscensions: _D0,charge:[0,0,0,0,0,0,0,0,0]}},type: "none",
    tabFormat: {
        Ascension:{content:[["display-text",function(){return `You performed ${String(player[this.layer].simulation)} simulation${player[this.layer].simulation>1?"s":""}.`}],["display-text",function(){return `Your highest ascension level is ${format(player[this.layer].bestAscensions,2)}, providing +${format(layers[this.layer].getBestAscensionEffect(),3)} base energy gain`}],"blank",["clickables","1"],"blank",["display-text",function(){return `Energy:${format(player[this.layer].energy)}`}],"buyables","blank",["bar","c1"]]},
        Charger: {content:[["display-text",function(){return `You have ${format(layers[this.layer].getAvailableCharges(),0)}/${format(getBuyableAmount(this.layer, 21),0)} unspent charge`}],["blank", "50px"],["clickables",[2]],["clickables",[3]],["clickables",[4]],],unlocked(){return player[305].bestAscensions.gte(5)}},
        Recursion: {content:[["display-text","Recursive simulation is being reworked(5 hours), not yet published"]],unlocked(){return player[305].bestAscensions.gte(72)}},
        Statistics:{content:[["microtabs", "reward"]],}
    },
    startSimulation() {player[this.layer].simulating=true;player[this.layer].simulation+=1;if(player[this.layer].bestAscensions.gte(50))setBuyableAmount(this.layer, 11, _D6)},
    endSimulation() {if(player[this.layer].simulating==false)return;player[this.layer].simulating=false;player[this.layer].timeSimulated=0;player[this.layer].bestAscensions=player[this.layer].bestAscensions.max(getBuyableAmount(this.layer, 11));setBuyableAmount(this.layer, 11, _D0);player[this.layer].energy=_D0;},
    getEnergyGain(){let gain=layers[this.layer].getEnergyBase();gain=gain.mul(buyableEffect(this.layer, 11)).mul(layers[this.layer].clickables[31].effect());return gain},
    getEnergyBase(){let base=_D1;base=base.add(layers[this.layer].getBestAscensionEffect());return base},
    getBestAscensionEffect(){let mult=player[this.layer].bestAscensions.add(1).log(1.43).pow(layers[this.layer].clickables[43].effect());return mult},
    getAvailableCharges(){let c=getBuyableAmount(this.layer, 21);return c.sub(player[305].charge.reduce((prev, curr)=>prev+curr,0))},
    update(diff) {if(player.pause[this.layer])return;if(player[this.layer].simulating){player[this.layer].timeSimulated+=diff;player[this.layer].energy=player[this.layer].energy.add(layers[this.layer].getEnergyGain().mul(diff))}if(player[this.layer].timeSimulated>7) {layers[this.layer].endSimulation()}},
    clickables: {
        11: {title(){return player[this.layer].simulating?"Conclude current simulation immediately.":"Start a new simulation."},display(){return player[this.layer].simulating?`Current simulation ends in ${format(7-player[this.layer].timeSimulated)} seconds`:"Timer unactivated"},canClick: true,onClick() {if(player[this.layer].simulating){layers[this.layer].endSimulation()}else {layers[this.layer].startSimulation()}},style(){return {"height":"100px","width":"400px","border-radius":"1%","border":"5px solid", "border-color":"#99cccc"}}},
        21: {title: "Respec Charge",canClick: true,onClick() {layers[this.layer].endSimulation();player[this.layer].charge=[0,0,0,0,0,0,0,0,0]},style(){return {"min-height":"60px","height":"60px","width":"390px","border-radius":"1%","border":"5px solid", "border-color":"#113333"}}},
        31: {
            title() {return `Charger:<br>Indication<br>Charge:${player[this.layer].charge[1]}<br>`},
            display(){return `Increase Energy gain.<br>-[Factor #1:Charge]<br>-[Factor #2:Energy]<br>-Effect: x${format(this.effect(),2)}`},
            unlocked() {return player[this.layer].bestAscensions.gte(5)},
            tooltip: "Formula: *log4(energy+1)^charge",
            canClick(){return layers[this.layer].getAvailableCharges().gt(0)},
            onClick() {
                player[305].charge[1]+=1
            },
            effect(){return player[this.layer].energy.add(1).log(4).pow(player[305].charge[1]).max(1)},
            style(){return {"height":"200px","width":"180px","border-radius":"2%","border":"5px solid", "border-color":"#99cccc", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        41: {
            title() {return `Charger:<br>Navigation<br>Charge:${player[this.layer].charge[2]}<br>`},
            display(){return `Reduce the price of charges.<br>-[Factor #1:Charge]<br>-Effect: ^${format(this.effect(),3)}`},
            unlocked() {return player[this.layer].bestAscensions.gte(33)},
            tooltip: "Formula: ^(0.5^charge)",
            canClick(){return layers[this.layer].getAvailableCharges().gt(0)},
            onClick() {
                player[305].charge[2]+=1
            },
            effect(){return new Decimal(0.5).pow(player[305].charge[2])},
            style(){return {"height":"200px","width":"130px","border-radius":"2%","border":"5px solid", "border-color":"#aaccdd", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        },
        43: {
            title() {return `Charger:<br>Amplification<br>Charge:${player[this.layer].charge[4]}<br>`},
            display(){return `Improve the effect of best ascension level.<br>-[Factor #1:Charge]<br>[Factor #2:Best Ascension Level]<br>-Effect: ^${format(this.effect(),3)}`},
            unlocked() {return player[this.layer].bestAscensions.gte(33)},
            tooltip: "Formula: ^(9*charge)^0.6",
            canClick(){return layers[this.layer].getAvailableCharges().gt(0)},
            onClick() {
                player[305].charge[4]+=1
            },
            effect(){return _D9.mul(player[305].charge[4]).pow(0.6).max(1)},
            style(){return {"height":"200px","width":"130px","border-radius":"2%","border":"5px solid", "border-color":"#aaddcc", "background-color":(this.canClick()?"#88bbbb":"#336666")}},
        }
    },
    buyables: {
        11: {
            title: "Ascend",
            display(){return `Your current Ascension Level is ${format(getBuyableAmount(this.layer,this.id),2)}<br>Cost: ${format(this.cost())} Energy<br> Your ${format(getBuyableAmount(this.layer, this.id),2)} Ascension Levels multiplies your energy production by x${format(this.effect())}<br><br>`},
            cost(x) {return new Decimal(3.9).pow(x).add(1.1)},
            canAfford() {return player[this.layer].energy.gte(this.cost())},
            buy() {
                if(player[this.layer].bestAscensions.lt(33)){
                    player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
                else {
                    setBuyableAmount(this.layer, this.id, player[this.layer].energy.sub(1.1).max(0.5).log(3.9).add(1).floor())
                }
            },
            effect(x) {return new Decimal(2.5).pow(x)},
        },
        21: {title: "Gain a charge",display(){return `Requirement: ${format(this.cost(),2)} Energy`},cost(x) {let y=x.add(1);return new Decimal(11).mul(x.pow(2).sub(23.8).max(1)).pow(y.pow(1.5).add(y).add(1)).pow(new Decimal(1.49).pow(y).sub(4).max(1)).pow(layers[this.layer].clickables[41].effect())},canAfford() {return player[this.layer].energy.gte(this.cost())},buy() {setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},unlocked() {return player[this.layer].bestAscensions.gte(5)}}
    },
    upgrades: {
    },
    microtabs: {reward: {"Highest Ascension Rewards": {content: [["display-text",function(){let text="";for(i in a["Ascension"]){if(player[this.layer].bestAscensions.gte(new Decimal(i))) {text+=`Ascension Level ${format(new Decimal(i),0)}: ${a["Ascension"][i]}<br>`}else break}return text}]]}}},layerShown() { return getGridData('main', this.layer) },hotkeys: [],
});