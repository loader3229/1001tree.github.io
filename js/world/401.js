addLayer("401", {
    symbol: "M",
    resource: "里程碑",
    color: "#793784",
    requires(){
		if(player[this.layer].points.gte(12))return player[this.layer].points.pow(player[this.layer].points.div(2));
		if(player[this.layer].points.gte(6))return player[this.layer].points.pow(player[this.layer].points.div(3));
		return player[this.layer].points.mul(2).div(3);
	},
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player[this.layer].points1}, // Get the current amount of baseResource
	base: _D(1.5),
	exponent: _D(1.7),
    startData() {
        return {
            unlocked: true,
            points: _D0,
            points1: _D0,
            points2: _D0
        }
    },
    type: "static",
    tabFormat: {
             Milestones: {content:[
                   "main-display","prestige-button","resource-display",
				"milestones"

            ] },
             Prestige: {content:[
                   "main-display","prestige-button","resource-display",
["clickable",11],
["display-text",function(){return "你有"+format(player[401].points2)+"转生点数"}],
["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14]]]
            ] ,unlocked:function(){return player[401].points.gte(5)}},

    },
    upgrades: {
	11: {
		title: "P-1",
		cost:new Decimal(1),
            description: "转生点数加成点数",
		currencyDisplayName: "转生点数",
		currencyInternalName: "points2",
		currencyLayer: 401,
effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=3;
				if(player[this.layer].points.gte(11))base+=1;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect

	},
	12: {
		title: "P-2",
		cost:new Decimal(200),
            description: "转生点数加成点数",
		currencyDisplayName: "转生点数",
		currencyInternalName: "points2",

		currencyLayer: 401,
effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.6;
				
				if(player[this.layer].points.gte(12))base+=0.4;

                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
	},
	13: {
		title: "P-3",
		cost:new Decimal(50000),
            description: "转生点数加成转生点数",
		currencyDisplayName: "转生点数",
		currencyInternalName: "points2",

		currencyLayer: 401,
effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
				
				//if(player[this.layer].points.gte(13))base+=0.14;


                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
unlocked(){return player[this.layer].points.gte(10)}
	},
	14: {
		title: "P-4",
		cost:new Decimal(5e6),
            description: "转生点数加成转生点数",
		currencyDisplayName: "转生点数",
		currencyInternalName: "points2",

		currencyLayer: 401,
effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.1;
				
				//if(player[this.layer].points.gte(14))base+=0.1;

                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
unlocked(){return player[this.layer].points.gte(10)}
	},



    },
	clickables: {
		11: {
			title: "转生",
			display:function(){
				return "转生以获得"+format(tmp[this.layer].prestigeGain)+"转生点数";
			},
			canClick(){return tmp[this.layer].prestigeGain.gte(1)},
			onClick(){
				player[this.layer].points2 = player[this.layer].points2.add(layers[this.layer].prestigeGain());
				player[this.layer].points1 = new Decimal(0);
			},
		},
	},
    milestones: [

		{
			requirementDescription: "第1个里程碑",
            unlocked() {return player[this.layer].best.gte(0)},
            done() {return player[this.layer].points.gte(1)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="获得"+format(tmp[this.layer].milestone1Effect)+"点数每秒";
				return ret;
			},
        },
		{
			requirementDescription: "第2个里程碑",
            unlocked() {return player[this.layer].best.gte(1)},
            done() {return player[this.layer].points.gte(2)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="里程碑加成点数获取。当前："+format(tmp[this.layer].milestone2Effect)+"x";
				return ret;
			},
        },
		{
			requirementDescription: "第3个里程碑",
            unlocked() {return player[this.layer].best.gte(2)},
            done() {return player[this.layer].points.gte(3)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="点数加成点数获取。当前："+format(tmp[this.layer].milestone3Effect)+"x";
				return ret;
			},
        },

		{
			requirementDescription: "第4个里程碑",
            unlocked() {return player[this.layer].best.gte(3)},
            done() {return player[this.layer].points.gte(4)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="第3个里程碑的效果基于里程碑变得更好。当前：第3个里程碑的效果基数+"+format(tmp[this.layer].milestone4Effect);
				return ret;
			},
        },

		{
			requirementDescription: "第5个里程碑",
            unlocked() {return player[this.layer].best.gte(4)},
            done() {return player[this.layer].points.gte(5)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="解锁新标签页。";
				return ret;
			},
        },
		{
			requirementDescription: "第6个里程碑",
            unlocked() {return player[this.layer].best.gte(5)},
            done() {return player[this.layer].points.gte(6)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="里程碑加成转生点数获取。当前："+format(tmp[this.layer].milestone6Effect)+"x";
				return ret;
			},
        },

		{
			requirementDescription: "第7个里程碑",
            unlocked() {return player[this.layer].best.gte(6)},
            done() {return player[this.layer].points.gte(7)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="第6个里程碑的效果变为原来的1.28次方";
				return ret;
			},

        },
		{
			requirementDescription: "第8个里程碑",
            unlocked() {return player[this.layer].best.gte(7)},
            done() {return player[this.layer].points.gte(8)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="第6个里程碑的效果变为原来的1.25次方";
				return ret;
			},

        },

		{
			requirementDescription: "第9个里程碑",
            unlocked() {return player[this.layer].best.gte(8)},
            done() {return player[this.layer].points.gte(9)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="第6个里程碑的效果变为原来的1.25次方";
				return ret;
			},

        },
		{
			requirementDescription: "第10个里程碑",
            unlocked() {return player[this.layer].best.gte(9)},
            done() {return player[this.layer].points.gte(10)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="解锁新的升级";
				return ret;
			},

        },
		{
			requirementDescription: "第11个里程碑",
            unlocked() {return player[this.layer].best.gte(10)},
            done() {return player[this.layer].points.gte(11)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="升级P-1更好";
				return ret;
			},

        },
		{
			requirementDescription: "第12个里程碑",
            unlocked() {return player[this.layer].best.gte(11)},
            done() {return player[this.layer].points.gte(12)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="升级P-2更好";
				return ret;
			},

        },
		{
			requirementDescription: "第13个里程碑",
            unlocked() {return player[this.layer].best.gte(12)},
            done() {return player[this.layer].points.gte(13)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="未完成";
				return ret;
			},

        },/*
		{
			requirementDescription: "第14个里程碑",
            unlocked() {return player[this.layer].best.gte(13)},
            done() {return player[this.layer].points.gte(14)}, // Used to determine when to give the milestone
            effectDescription: function(){
				let ret="升级P-4更好";
				return ret;
			},

        },*/









    ],
	milestone1Effect(){
		let ret=_D(0.1);
		if(player[this.layer].points.gte(2))ret=ret.mul(tmp[this.layer].milestone2Effect);
		if(player[this.layer].points.gte(3))ret=ret.mul(tmp[this.layer].milestone3Effect);
		if(hasUpgrade(this.layer,11))ret=ret.mul(upgradeEffect(this.layer,11));
		if(hasUpgrade(this.layer,12))ret=ret.mul(upgradeEffect(this.layer,12));
		return ret;
	},
	milestone2Effect(){
		let ret=player[this.layer].points.pow(2);
		return ret;
	},
	milestone3Effect(){
		var m=Decimal.log10(player[this.layer].points1.add(20)).pow(0.9);
		var b=new Decimal(2);
		if(player[this.layer].points.gte(4)){
			b=b.add(tmp[this.layer].milestone4Effect);
		}
		return Decimal.pow(b,m);
	},
	milestone4Effect(){
		return player[this.layer].points.sub(2).pow(0.5);
	},
	milestone6Effect(){
		let ret=player[this.layer].points.pow(0.5);
		if(player[this.layer].points.gte(7))ret = ret.pow(1.28);
		if(player[this.layer].points.gte(8))ret = ret.pow(1.25);
		if(player[this.layer].points.gte(9))ret = ret.pow(1.25);
		return ret;
	},

	prestigeGain(){
		let ret=Decimal.pow(10,player[this.layer].points1.max(1).log10().pow(0.65)).sub(1).div(100);
		if(player[this.layer].points.gte(6))ret=ret.mul(tmp[this.layer].milestone6Effect);
		if(hasUpgrade(this.layer,13))ret=ret.mul(upgradeEffect(this.layer,13));
		if(hasUpgrade(this.layer,14))ret=ret.mul(upgradeEffect(this.layer,14));
		return ret.floor();
	},
	resetsNothing(){return true},
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
	update(diff){
        if (player.pause[this.layer]) return
		if(player[this.layer].points.gte(1))player[this.layer].points1=player[this.layer].points1.add(_D(diff).mul(tmp[this.layer].milestone1Effect));
		//if(player[this.layer].points.gte(2) && !player.world[this.layer])completeWorld(this.layer);
	},
});