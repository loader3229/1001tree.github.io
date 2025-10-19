let MILESTONES401 = [
	{
		requirementDescription: "第1个里程碑",
		unlocked() { return player[this.layer].best.gte(0) },
		done() { return player[this.layer].points.gte(1) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "获得" + format(tmp[this.layer].milestone1Effect) + "点数每秒";
			return ret;
		},
	},
	{
		requirementDescription: "第2个里程碑",
		unlocked() { return player[this.layer].best.gte(1) },
		done() { return player[this.layer].points.gte(2) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "里程碑加成点数获取。当前：" + format(tmp[this.layer].milestone2Effect) + "x";
			return ret;
		},
	},
	{
		requirementDescription: "第3个里程碑",
		unlocked() { return player[this.layer].best.gte(2) },
		done() { return player[this.layer].points.gte(3) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "点数加成点数获取。当前：" + format(tmp[this.layer].milestone3Effect) + "x";
			return ret;
		},
	},
	{
		requirementDescription: "第4个里程碑",
		unlocked() { return player[this.layer].best.gte(3) },
		done() { return player[this.layer].points.gte(4) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第3个里程碑的效果基于里程碑变得更好。当前：第3个里程碑的效果基数x" + format(tmp[this.layer].milestone4Effect);
			return ret;
		},
	},
	{
		requirementDescription: "第5个里程碑",
		unlocked() { return player[this.layer].best.gte(4) },
		done() { return player[this.layer].points.gte(5) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新标签页。";
			if(player[this.layer].buyables[21].gte(5)) ret = "解锁转生，并且转生点数获取更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第6个里程碑",
		unlocked() { return player[this.layer].best.gte(5) },
		done() { return player[this.layer].points.gte(6) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "里程碑加成转生点数获取。当前：" + format(tmp[this.layer].milestone6Effect) + "x";
			return ret;
		},
	},
	{
		requirementDescription: "第7个里程碑",
		unlocked() { return player[this.layer].best.gte(6) },
		done() { return player[this.layer].points.gte(7) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第6个里程碑的效果变为原来的1.28次方";
			if(player[this.layer].buyables[21].gte(7))ret = "第6个里程碑的效果变为原来的1.6次方";
			return ret;
		},
	},
	{
		requirementDescription: "第8个里程碑",
		unlocked() { return player[this.layer].best.gte(7) },
		done() { return player[this.layer].points.gte(8) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第6个里程碑的效果变为原来的1.25次方";
			if(player[this.layer].buyables[21].gte(8))ret = "第6个里程碑的效果变为原来的1.6次方";
			return ret;
		},
	},
	{
		requirementDescription: "第9个里程碑",
		unlocked() { return player[this.layer].best.gte(8) },
		done() { return player[this.layer].points.gte(9) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第6个里程碑的效果变为原来的1.25次方";
			if(player[this.layer].buyables[21].gte(9))ret = "第6个里程碑的效果变为原来的1.5625次方";
			return ret;
		},
	},
	{
		requirementDescription: "第10个里程碑",
		unlocked() { return player[this.layer].best.gte(9) },
		done() { return player[this.layer].points.gte(10) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新的升级";
			if(player[this.layer].buyables[21].gte(10))ret += "，且这些升级更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第11个里程碑",
		unlocked() { return player[this.layer].best.gte(10) },
		done() { return player[this.layer].points.gte(11) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级P-1更好";
			return ret;
		},
	},
	{
		requirementDescription: "第12个里程碑",
		unlocked() { return player[this.layer].best.gte(11) },
		done() { return player[this.layer].points.gte(12) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级P-2更好";
			return ret;
		},
	},
	{
		requirementDescription: "第13个里程碑",
		unlocked() { return player[this.layer].best.gte(12) },
		done() { return player[this.layer].points.gte(13) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第2个里程碑的效果变为原来的1.28次方";
			if(player[this.layer].buyables[21].gte(13))ret = "第2个里程碑的效果变为原来的1.6次方";
			return ret;
		},
	},
	{
		requirementDescription: "第14个里程碑",
		unlocked() { return player[this.layer].best.gte(13) },
		done() { return player[this.layer].points.gte(14) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第2个里程碑的效果变为原来的1.25次方";
			if(player[this.layer].buyables[21].gte(14))ret = "第2个里程碑的效果变为原来的1.6次方";
			return ret;
		},
	},
	{
		requirementDescription: "第15个里程碑",
		unlocked() { return player[this.layer].best.gte(14) },
		done() { return player[this.layer].points.gte(15) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁转生力量和新的升级";
			if(player[this.layer].buyables[21].gte(15))ret += "，转生力量获取更好";
			return ret;
		},
	},
	{
		requirementDescription: "第16个里程碑",
		unlocked() { return player[this.layer].best.gte(15) },
		done() { return player[this.layer].points.gte(16) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第2个里程碑的效果变为原来的1.25次方";
			if(player[this.layer].buyables[21].gte(16))ret = "第2个里程碑的效果变为原来的1.5625次方";
			return ret;
		},
	},
	{
		requirementDescription: "第17个里程碑",
		unlocked() { return player[this.layer].best.gte(16) },
		done() { return player[this.layer].points.gte(17) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第6个里程碑的效果变为原来的1.28次方";
			if(player[this.layer].buyables[21].gte(17))ret = "第6个里程碑和转生力量的效果变为原来的1.28次方";
			return ret;
		},
	},
	{
		requirementDescription: "第18个里程碑",
		unlocked() { return player[this.layer].best.gte(17) },
		done() { return player[this.layer].points.gte(18) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "转生力量的效果变为原来的1.28次方";
			if(player[this.layer].buyables[21].gte(18))ret = "转生力量的效果变为原来的1.6次方";
			return ret;
		},
	},
	{
		requirementDescription: "第19个里程碑",
		unlocked() { return player[this.layer].best.gte(18) },
		done() { return player[this.layer].points.gte(19) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "转生力量的效果变为原来的1.25次方";
			if(player[this.layer].buyables[21].gte(19))ret = "转生力量的效果变为原来的1.5625次方";
			return ret;
		},
	},
	{
		requirementDescription: "第20个里程碑",
		unlocked() { return player[this.layer].best.gte(19) },
		done() { return player[this.layer].points.gte(20) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁超级转生和新的升级";
			if(player[this.layer].buyables[21].gte(20)) ret = "解锁超级转生和新的升级，并且超级转生点数获取更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第21个里程碑",
		unlocked() { return player[this.layer].best.gte(20) },
		done() { return player[this.layer].points.gte(21) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "里程碑加成超级转生点数获取。当前：" + format(tmp[this.layer].milestone21Effect) + "x";
			return ret;
		},
	},
	{
		requirementDescription: "第22个里程碑",
		unlocked() { return player[this.layer].best.gte(21) },
		done() { return player[this.layer].points.gte(22) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "每秒获得100%的转生点数获取。";
			if(player[this.layer].buyables[21].gte(22)) ret = "每秒获得10000%的转生点数获取。";
			return ret;
		},
	},
	{
		requirementDescription: "第23个里程碑",
		unlocked() { return player[this.layer].best.gte(22) },
		done() { return player[this.layer].points.gte(23) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级P-3更好";
			return ret;
		},
	},
	{
		requirementDescription: "第24个里程碑",
		unlocked() { return player[this.layer].best.gte(23) },
		done() { return player[this.layer].points.gte(24) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级P-4更好";
			return ret;
		},
	},
	{
		requirementDescription: "第25个里程碑",
		unlocked() { return player[this.layer].best.gte(24) },
		done() { return player[this.layer].points.gte(25) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新标签页。";
			if(player[this.layer].buyables[21].gte(25))ret = "解锁新标签页，转生加成更便宜。";
			return ret;
		},
	},
	{
		requirementDescription: "第26个里程碑",
		unlocked() { return player[this.layer].best.gte(25) },
		done() { return player[this.layer].points.gte(26) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第4个里程碑的效果更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第27个里程碑",
		unlocked() { return player[this.layer].best.gte(26) },
		done() { return player[this.layer].points.gte(27) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级SP-2更好";
			return ret;
		},
	},
	{
		requirementDescription: "第28个里程碑",
		unlocked() { return player[this.layer].best.gte(27) },
		done() { return player[this.layer].points.gte(28) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "转生点数和超级转生点数的获取变为原来的3倍";
			if(player[this.layer].buyables[21].gte(28))ret = "转生点数和超级转生点数的获取变为原来的10倍";
			return ret;
		},
	},
	{
		requirementDescription: "第29个里程碑",
		unlocked() { return player[this.layer].best.gte(28) },
		done() { return player[this.layer].points.gte(29) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "转生点数和超级转生点数的获取变为原来的3倍";
			if(player[this.layer].buyables[21].gte(29))ret = "转生点数和超级转生点数的获取变为原来的10倍";
			return ret;
		},
	},
	{
		requirementDescription: "第30个里程碑",
		unlocked() { return player[this.layer].best.gte(29) },
		done() { return player[this.layer].points.gte(30) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新购买项。";
			if(player[this.layer].buyables[21].gte(30))ret = "解锁新购买项，里程碑升级加成点数。"
			return ret;
		},
	},
	{
		requirementDescription: "第31个里程碑",
		unlocked() { return player[this.layer].best.gte(30) },
		done() { return player[this.layer].points.gte(31) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第4个里程碑的效果更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第32个里程碑",
		unlocked() { return player[this.layer].best.gte(31) },
		done() { return player[this.layer].points.gte(32) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第4个里程碑的效果更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第33个里程碑",
		unlocked() { return player[this.layer].best.gte(32) },
		done() { return player[this.layer].points.gte(33) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第21个里程碑的效果变为原来的1.28次方";
			return ret;
		},
	},
	{
		requirementDescription: "第34个里程碑",
		unlocked() { return player[this.layer].best.gte(33) },
		done() { return player[this.layer].points.gte(34) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第4个里程碑的效果更好。";
			return ret;
		},
	},
	{
		requirementDescription: "第35个里程碑",
		unlocked() { return player[this.layer].best.gte(34) },
		done() { return player[this.layer].points.gte(35) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新的升级";
			return ret;
		},
	},
	{
		requirementDescription: "第36个里程碑",
		unlocked() { return player[this.layer].best.gte(35) },
		done() { return player[this.layer].points.gte(36) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第21个里程碑的效果变为原来的1.25次方";
			return ret;
		},
	},
	{
		requirementDescription: "第37个里程碑",
		unlocked() { return player[this.layer].best.gte(36) },
		done() { return player[this.layer].points.gte(37) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "第21个里程碑的效果变为原来的1.25次方";
			return ret;
		},
	},
	{
		requirementDescription: "第38个里程碑",
		unlocked() { return player[this.layer].best.gte(37) },
		done() { return player[this.layer].points.gte(38) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级P-1更好";
			return ret;
		},
	},
	{
		requirementDescription: "第39个里程碑",
		unlocked() { return player[this.layer].best.gte(38) },
		done() { return player[this.layer].points.gte(39) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级P-2更好";
			return ret;
		},
	},
	{
		requirementDescription: "第40个里程碑",
		unlocked() { return player[this.layer].best.gte(39) },
		done() { return player[this.layer].points.gte(40) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新购买项。";
			return ret;
		},
	},
	{
		requirementDescription: "第41个里程碑",
		unlocked() { return player[this.layer].best.gte(40) },
		done() { return player[this.layer].points.gte(41) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级SP-1更好";
			return ret;
		},
	},
	{
		requirementDescription: "第42个里程碑",
		unlocked() { return player[this.layer].best.gte(41) },
		done() { return player[this.layer].points.gte(42) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级SP-2更好";
			return ret;
		},
	},
	{
		requirementDescription: "第43个里程碑",
		unlocked() { return player[this.layer].best.gte(42) },
		done() { return player[this.layer].points.gte(43) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "升级SP-3更好";
			return ret;
		},
	},
	{
		requirementDescription: "第44个里程碑",
		unlocked() { return player[this.layer].best.gte(43) },
		done() { return player[this.layer].points.gte(44) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "每秒获得100%的超级转生点数获取。";
			return ret;
		},
	},
	{
		requirementDescription: "第45个里程碑",
		unlocked() { return player[this.layer].best.gte(44) },
		done() { return player[this.layer].points.gte(45) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "解锁新的升级";
			return ret;
		},
	},
	{
		requirementDescription: "第46个里程碑",
		unlocked() { return player[this.layer].best.gte(45) },
		done() { return player[this.layer].points.gte(46) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "你获得了一个里程碑,但这里没有什么加成可以给你了";
			return ret;
		},
	},
	{
		requirementDescription: "第47个里程碑",
		unlocked() { return player[this.layer].best.gte(46) },
		done() { return player[this.layer].points.gte(47) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "你获得了一个里程碑,进展仍在继续,你需要更进一步";
			return ret;
		},
	},
	{
		requirementDescription: "第48个里程碑",
		unlocked() { return player[this.layer].best.gte(47) },
		done() { return player[this.layer].points.gte(48) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "你获得了一个里程碑,前面的路并不漫长";
			return ret;
		},
	},
	{
		requirementDescription: "第49个里程碑",
		unlocked() { return player[this.layer].best.gte(48) },
		done() { return player[this.layer].points.gte(49) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "你获得了一个里程碑,而你看到了终点";
			return ret;
		},
	},	{
		requirementDescription: "第50个里程碑",
		unlocked() { return player[this.layer].best.gte(49) },
		done() { return player[this.layer].points.gte(50) }, // Used to determine when to give the milestone
		effectDescription: function () {
			let ret = "完成世界，获得1梦力";
			return ret;
		},
	},































];

let st = function () {
	if (player[401].buyables[21].gt(this.id)) {
		return { backgroundColor: "#cccc00" };
	}
	return {};
}
for (let milestoneId in MILESTONES401) {
	MILESTONES401[milestoneId].style = st;
}


addLayer("401", {
	symbol: "M",
	resource: "里程碑",
	color: "#b66fc3",
	requires() {
		if (player[this.layer].points.gte(37)) return player[this.layer].points.pow(player[this.layer].points);
		if (player[this.layer].points.gte(30)) return player[this.layer].points.pow(player[this.layer].points.div(1.3));
		if (player[this.layer].points.gte(25)) return player[this.layer].points.pow(player[this.layer].points.div(1.6));
		if (player[this.layer].points.gte(12)) return player[this.layer].points.pow(player[this.layer].points.div(2));
		if (player[this.layer].points.gte(6)) return player[this.layer].points.pow(player[this.layer].points.div(3));
		return player[this.layer].points.mul(2).div(3);
	},
	baseResource: "点数", // Name of resource prestige is based on
	baseAmount() { return player[this.layer].points1 }, // Get the current amount of baseResource
	base() {
		if (player[this.layer].points.gte(50)) return _D(10);
		if (player[this.layer].points.gte(44)) return _D(1.6);
		if (player[this.layer].points.gte(41)) return _D(1.55);
		return _D(1.5);
	},
	exponent() {
		if (player[this.layer].points.gte(50)) return _D(10);
		if (player[this.layer].points.gte(48)) return _D(1.94);
		if (player[this.layer].points.gte(45)) return _D(1.93);
		if (player[this.layer].points.gte(42)) return _D(1.92);
		if (player[this.layer].points.gte(39)) return _D(1.91);
		if (player[this.layer].points.gte(34)) return _D(1.85);
		if (player[this.layer].points.gte(20)) return _D(1.8);
		if (player[this.layer].points.gte(16)) return _D(1.77);
		if (player[this.layer].points.gte(14)) return _D(Math.sqrt(3));
		return _D(1.7);
	},
	startData() {
		return {
			unlocked: true,
			points: _D0,
			points1: _D0,
			points2: _D0,
			points2power: _D0,
			points3: _D0,
		}
	},
	type: "static",
	tabFormat: {
		Milestones: {
			content: [
				"main-display", ["prestige-button", "点击"], "resource-display",
				["row", [["buyable", 21]]],
				"milestones"
			]
		},
		Prestige: {
			content: [
				"main-display", ["prestige-button", "点击"], "resource-display",
				["row", [["clickable", 11], ["clickable", 12]]],
				["display-text", function () { return "你有" + format(player[401].points2) + "转生点数" }],
				["display-text", function () {
					if (player[401].points.gte(15)) return "你有" + format(player[401].points2power) + "转生力量(+" + format(tmp[401].prestigePowerGain) + "/s"+(player[this.layer].buyables[21].gte(15)?"":"，1e10转生点数开始生成")+")，点数获取变为原来的" + format(tmp[401].prestigePowerEff) + "倍";
					return "";
				}],
				["display-text", function () {
					if (player[401].points.gte(20)) return "你有" + format(player[401].points3) + "超级转生点数";
					return "";
				}],
				["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
				["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
				["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]]
			],
			unlocked: function () {
				return player[401].points.gte(5)
			}
		},
		PrestigeBoosts: {
			content: [
				"main-display", ["prestige-button", "点击"], "resource-display",
				["row", [["clickable", 11], ["clickable", 12]]],
				["display-text", function () { return "你有" + format(player[401].points2) + "转生点数" }],
				["display-text", function () {
					if (player[401].points.gte(15)) return "你有" + format(player[401].points2power) + "转生力量(+" + format(tmp[401].prestigePowerGain) + "/s"+(player[this.layer].buyables[21].gte(15)?"":"，1e10转生点数开始生成")+")，点数获取变为原来的" + format(tmp[401].prestigePowerEff) + "倍";
					return "";
				}],
				["display-text", function () {
					if (player[401].points.gte(20)) return "你有" + format(player[401].points3) + "超级转生点数";
					return "";
				}],
				["row", [["buyable", 11], ["buyable", 12]]],
			],
			unlocked: function () {
				return player[401].points.gte(25)
			}
		}
	},
	upgrades: {
		11: {
			title: "P-1",
			cost: new Decimal(1),
			description: "转生点数加成点数",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 3;
				if (player[this.layer].points.gte(11)) base += 1;
				if (player[this.layer].buyables[21].gte(11)) base += 0.2025;
				if (player[this.layer].points.gte(38)) base += 0.3924729863572161;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
		},
		12: {
			title: "P-2",
			cost: new Decimal(200),
			description: "转生点数加成点数",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 1.6;
				if (player[this.layer].points.gte(12)) base += 0.4;
				if (player[this.layer].buyables[21].gte(12)) base += 0.05;
				if (player[this.layer].points.gte(39)) base += 0.09358881;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
		},
		13: {
			title: "P-3",
			cost: new Decimal(50000),
			description: "转生点数加成转生点数",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 1.3;
				if (player[this.layer].points.gte(23)) base += 0.14;
				if (player[this.layer].buyables[21].gte(10)) base += 0.0241;
				if (player[this.layer].buyables[21].gte(23)) base += 0.0243;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
			unlocked() { return player[this.layer].points.gte(10) }
		},
		14: {
			title: "P-4",
			cost: new Decimal(5e6),
			description: "转生点数加成转生点数",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 1.1;
				if (player[this.layer].points.gte(24)) base += 0.1;
				if (player[this.layer].buyables[21].gte(10)) base += 0.01;
				if (player[this.layer].buyables[21].gte(24)) base += 0.01;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points2.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
			unlocked() { return player[this.layer].points.gte(10) }
		},
		21: {
			title: "P-5",
			cost: new Decimal(8e12),
			description: "第6个里程碑的效果变为原来的1.25次方",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(15) }
		},
		22: {
			title: "P-6",
			cost: new Decimal(1e15),
			description: "第6个里程碑的效果变为原来的1.25次方",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(15) }
		},
		23: {
			title: "P-7",
			cost: new Decimal(1e21),
			description: "转生力量的效果变为原来的1.25次方",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(20) }
		},
		24: {
			title: "P-8",
			cost: new Decimal(1e65),
			description: "超级转生点数获取变为原来的3倍",
			currencyDisplayName: "转生点数",
			currencyInternalName: "points2",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(35) }
		},

		31: {
			title: "SP-1",
			cost: new Decimal(1),
			description: "超级转生点数加成点数",
			currencyDisplayName: "超级转生点数",
			currencyInternalName: "points3",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(20) },
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 100;
				if (player[this.layer].points.gte(41)) base += 80;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points3.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
		},
		32: {
			title: "SP-2",
			cost: new Decimal(1000),
			description: "超级转生点数加成转生点数",
			currencyDisplayName: "超级转生点数",
			currencyInternalName: "points3",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(25) },
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 3;
				if (player[this.layer].points.gte(27)) base += 3;
				if (player[this.layer].points.gte(42)) base += 3;
				if (player[this.layer].buyables[21].gte(27)) base += 3;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points3.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
		},
		33: {
			title: "SP-3",
			cost: new Decimal(1e9),
			description: "超级转生点数加成转生力量",
			currencyDisplayName: "超级转生点数",
			currencyInternalName: "points3",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(35) },
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 1.5;
				if (player[this.layer].points.gte(43)) base += 1;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points3.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
		},
		34: {
			title: "SP-4",
			cost: new Decimal(3e17),
			description: "超级转生点数加成超级转生点数",
			currencyDisplayName: "超级转生点数",
			currencyInternalName: "points3",
			currencyLayer: 401,
			unlocked() { return player[this.layer].points.gte(45) },
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base = 1.5;
				let ret = Decimal.pow(base, Decimal.log10(player[this.layer].points3.add(1)).pow(0.9).add(1))
				return ret;
			},
			effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
		},


	},
	buyables: {
		11: {
			title: "转生加成",
			display() {
				let data = tmp[this.layer].buyables[this.id];
				return "等级：" + formatWhole(player[this.layer].buyables[this.id]) + "<br>" +
					"转生点数获取^" + format(data.effect) + "<br>" +
					"升级需要" + format(data.cost) + "转生点数";
			},
			cost() {
				let a = player[this.layer].buyables[this.id];
				a = Decimal.pow(1.05, a);
				return new Decimal(player[this.layer].buyables[21].gte(24)?1e19:1e20).pow(a);
			},
			canAfford() {
				return player[this.layer].points2.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
				player[this.layer].points2 = player[this.layer].points2.sub(tmp[this.layer].buyables[this.id].cost)
			},
			effect() {
				let b = 0.01;
				let eff = new Decimal(1).add(player[this.layer].buyables[this.id].mul(b));
				return eff;
			},
			unlocked() {
				return player[this.layer].points.gte(25);
			}
		},
		12: {
			title: "超级加成",
			display() {
				let data = tmp[this.layer].buyables[this.id];
				return "等级：" + formatWhole(player[this.layer].buyables[this.id]) + "<br>" +
					"超级转生点数获取^" + format(data.effect) + "<br>" +
					"升级需要" + format(data.cost) + "超级转生点数";
			},
			cost() {
				let a = player[this.layer].buyables[this.id];
				a = Decimal.pow(1.05, a);
				return new Decimal(1e10).pow(a);
			},
			canAfford() {
				return player[this.layer].points3.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
				player[this.layer].points3 = player[this.layer].points3.sub(tmp[this.layer].buyables[this.id].cost)
			},
			effect() {
				let b = 0.01;
				let eff = new Decimal(1).add(player[this.layer].buyables[this.id].mul(b));
				return eff;
			},
			unlocked() {
				return player[this.layer].points.gte(40);
			}
		},
		21: {
			title: "里程碑升级",
			display() {
				let data = tmp[this.layer].buyables[this.id];
				return "当前已经升级了" + formatWhole(player[this.layer].buyables[this.id]) + "个里程碑<br>" +
					"下一个里程碑升级需要" + format(data.cost) + "点数";
			},
			cost() {
				let a = player[this.layer].buyables[this.id];
				a = Decimal.pow(a.gte(32)?10:1.05, a);
				return new Decimal(1e100).pow(a);
			},
			canAfford() {
				return player[this.layer].points1.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
				player[this.layer].points1 = player[this.layer].points1.sub(tmp[this.layer].buyables[this.id].cost)
			},
			unlocked() {
				return player[this.layer].points.gte(30);
			}
		}
	},
	clickables: {
		11: {
			title: "转生",
			display: function () {
				return "转生以获得" + format(tmp[this.layer].prestigeGain) + "转生点数";
			},
			canClick() { return tmp[this.layer].prestigeGain.gte(1) },
			onClick() {
				player[this.layer].points2 = player[this.layer].points2.add(layers[this.layer].prestigeGain());
				player[this.layer].points1 = new Decimal(0);
			},
			onHold() {
				this.onClick();
			},
			unlocked() {
				return player[this.layer].points.gte(5)
			}
		},
		12: {
			title: "超级转生",
			display: function () {
				return "超级转生以获得" + format(tmp[this.layer].prestigeGain2) + "超级转生点数";
			},
			canClick() { return tmp[this.layer].prestigeGain2.gte(1) },
			onClick() {
				player[this.layer].points3 = player[this.layer].points3.add(layers[this.layer].prestigeGain2());
				player[this.layer].points1 = new Decimal(0);
				player[this.layer].points2 = new Decimal(0);
				player[this.layer].points2power = new Decimal(0);
				updateTemp();
				updateTemp();
				updateTemp();
			},
			onHold() {
				this.onClick();
			},
			unlocked() {
				return player[this.layer].points.gte(20)
			}
		},
	},
	milestones: MILESTONES401,
	milestone1Effect() {
		let ret = _D(0.1);
		if (player[this.layer].buyables[21].gte(1)) ret = _D(1);
		if (player[this.layer].points.gte(2)) ret = ret.mul(tmp[this.layer].milestone2Effect);
		if (player[this.layer].points.gte(3)) ret = ret.mul(tmp[this.layer].milestone3Effect);
		if (player[this.layer].points.gte(15)) ret = ret.mul(tmp[this.layer].prestigePowerEff);
		if (hasUpgrade(this.layer, 11)) ret = ret.mul(upgradeEffect(this.layer, 11));
		if (hasUpgrade(this.layer, 12)) ret = ret.mul(upgradeEffect(this.layer, 12));
		if (hasUpgrade(this.layer, 31)) ret = ret.mul(upgradeEffect(this.layer, 31));
		if (player[this.layer].buyables[21].gte(30)) ret = ret.mul(player[this.layer].buyables[21]);

		return ret;
	},
	milestone2Effect() {
		let ret = player[this.layer].points.pow(2);
		if (player[this.layer].buyables[21].gte(2)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(13)) ret = ret.pow(1.28);
		if (player[this.layer].buyables[21].gte(13)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(14)) ret = ret.pow(1.25);
		if (player[this.layer].buyables[21].gte(14)) ret = ret.pow(1.28);
		if (player[this.layer].points.gte(16)) ret = ret.pow(1.25);
		if (player[this.layer].buyables[21].gte(16)) ret = ret.pow(1.25);
		return ret;
	},
	milestone3Effect() {
		var m = Decimal.log10(player[this.layer].points1.add(20)).pow(player[this.layer].buyables[21].gte(3)?0.901:0.9);
		var b = new Decimal(2);
		if (player[this.layer].points.gte(4)) b = b.mul(tmp[this.layer].milestone4Effect);
		return Decimal.pow(b, m);
	},
	milestone4Effect() {
		if (player[this.layer].points.gte(26)) {
			let c = 0.6;
			if(player[this.layer].points.gte(31)) c += 0.002;
			if(player[this.layer].points.gte(32)) c += 0.002;
			if(player[this.layer].points.gte(34)) c += 0.002;
			if(player[this.layer].buyables[21].gte(4)) c += 0.002;
			if(player[this.layer].buyables[21].gte(32)) c += 0.002;
			return player[this.layer].points.pow(c).div(player[this.layer].buyables[21].gte(31)?1.9:player[this.layer].buyables[21].gte(26)?1.92:2);
		}
		return player[this.layer].points.sub(2).pow(0.5).add(2).div(2);
	},
	milestone6Effect() {
		let ret = player[this.layer].points.pow(0.5);
		if (player[this.layer].buyables[21].gte(6)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(7)) ret = ret.pow(1.28);
		if (player[this.layer].buyables[21].gte(7)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(8)) ret = ret.pow(1.25);
		if (player[this.layer].buyables[21].gte(8)) ret = ret.pow(1.28);
		if (player[this.layer].points.gte(9)) ret = ret.pow(1.25);
		if (player[this.layer].buyables[21].gte(9)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(17)) ret = ret.pow(1.28);
		if (hasUpgrade(this.layer, 21)) ret = ret.pow(1.25);
		if (hasUpgrade(this.layer, 22)) ret = ret.pow(1.25);

		return ret;
	},
	milestone21Effect() {
		let ret = player[this.layer].points;
		if (player[this.layer].buyables[21].gte(21)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(33)) ret = ret.pow(1.28);
		if (player[this.layer].points.gte(36)) ret = ret.pow(1.25);
		if (player[this.layer].points.gte(37)) ret = ret.pow(1.25);
		return ret;
	},


	prestigeGain() {
		let ret = Decimal.pow(10, player[this.layer].points1.max(1).log10().pow(player[this.layer].buyables[21].gte(5)?0.66:0.65)).sub(1).div(100);
		if (player[this.layer].points.gte(28)) ret = ret.mul(player[this.layer].buyables[21].gte(28)?10:3);
		if (player[this.layer].points.gte(29)) ret = ret.mul(player[this.layer].buyables[21].gte(29)?10:3);
		if (player[this.layer].points.gte(6)) ret = ret.mul(tmp[this.layer].milestone6Effect);
		if (hasUpgrade(this.layer, 13)) ret = ret.mul(upgradeEffect(this.layer, 13));
		if (hasUpgrade(this.layer, 14)) ret = ret.mul(upgradeEffect(this.layer, 14));
		if (hasUpgrade(this.layer, 32) && player[this.layer].points.gte(40)) ret = ret.mul(upgradeEffect(this.layer, 32));
		if (player[this.layer].points.gte(25)) ret = ret.pow(buyableEffect(this.layer, 11));
		if (hasUpgrade(this.layer, 32) && player[this.layer].points.lt(40)) ret = ret.mul(upgradeEffect(this.layer, 32));
		return ret.floor();
	},
	prestigeGain2() {
		let ret = Decimal.pow(10, player[this.layer].points2.max(1).log10().pow(player[this.layer].buyables[21].gte(20)?0.51:0.5)).sub(1).div(10000);
		if (hasUpgrade(this.layer, 24)) ret = ret.mul(3);
		if (player[this.layer].points.gte(28)) ret = ret.mul(player[this.layer].buyables[21].gte(28)?10:3);
		if (player[this.layer].points.gte(29)) ret = ret.mul(player[this.layer].buyables[21].gte(29)?10:3);
		if (player[this.layer].points.gte(21)) ret = ret.mul(tmp[this.layer].milestone21Effect);
		if (hasUpgrade(this.layer, 34)) ret = ret.mul(upgradeEffect(this.layer, 34));
		if (player[this.layer].points.gte(40)) ret = ret.pow(buyableEffect(this.layer, 12));
		return ret.floor();
	},
	prestigePowerGain() {
		let ret = Decimal.pow(10, player[this.layer].points2.max(1e10).log10().div(2).sub(1).sqrt()).sub(100);
		if (player[this.layer].buyables[21].gte(15)) ret = Decimal.pow(10, player[this.layer].points2.add(1).log10().div(1.8).sqrt()).sub(1);
		if (hasUpgrade(this.layer, 33)) ret = ret.mul(upgradeEffect(this.layer, 33));
		return ret;
	},
	prestigePowerEff() {
		let ret = Decimal.pow(player[this.layer].points2power.add(1), 0.5);
		if (player[this.layer].points.gte(18)) ret = ret.pow(1.28);
		if (player[this.layer].points.gte(19)) ret = ret.pow(1.25);
		if (hasUpgrade(this.layer, 23)) ret = ret.pow(1.25);
		if (player[this.layer].buyables[21].gte(17)) ret = ret.pow(1.28);
		if (player[this.layer].buyables[21].gte(18)) ret = ret.pow(1.25);
		if (player[this.layer].buyables[21].gte(19)) ret = ret.pow(1.25);


		return ret;
	},


	resetsNothing() { return true },
	layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
	update(diff) {
		if (player.pause[this.layer]) return
		if (player[this.layer].points.gte(1)) player[this.layer].points1 = player[this.layer].points1.add(_D(diff).mul(tmp[this.layer].milestone1Effect));
		if (player[this.layer].points.gte(15)) player[this.layer].points2power = player[this.layer].points2power.add(_D(diff).mul(tmp[this.layer].prestigePowerGain));
		if (player[this.layer].points.gte(22)) player[this.layer].points2 = player[this.layer].points2.add(_D(diff).mul(tmp[this.layer].prestigeGain).mul(player[this.layer].buyables[21].gte(22)?100:1));
		if (player[this.layer].points.gte(44)) player[this.layer].points3 = player[this.layer].points3.add(_D(diff).mul(tmp[this.layer].prestigeGain2));



		if(player[this.layer].points.gte(50) && !player.world[this.layer])completeWorld(this.layer);
	},
});