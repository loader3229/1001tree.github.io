// ************ Big Feature related ************

function respecBuyables(layer) {
	if (!layers[layer].buyables) return
	if (!layers[layer].buyables.respec) return
	if (!player[layer].noRespecConfirm && !confirm(tmp[layer].buyables.respecMessage || "Are you sure you want to respec? This will force you to do a \"" + (tmp[layer].name ? tmp[layer].name : layer) + "\" reset as well!")) return
	run(layers[layer].buyables.respec, layers[layer].buyables)
	updateBuyableTemp(layer)
	document.activeElement.blur()
}

function canAffordUpgrade(layer, id) {
	let upg = tmp[layer].upgrades[id]
	if (tmp[layer].deactivated) return false
	if (tmp[layer].upgrades[id].canAfford === false) return false
	let cost = tmp[layer].upgrades[id].cost
	if (cost !== undefined)
		return canAffordPurchase(layer, upg, cost)

	return true
}

function canBuyBuyable(layer, id) {
	let b = temp[layer].buyables[id]
	return (b.unlocked && run(b.canAfford, b) && player[layer].buyables[id].lt(b.purchaseLimit) && !tmp[layer].deactivated)
}



function canAffordPurchase(layer, thing, cost) {
	if (thing.currencyInternalName) {
		let name = thing.currencyInternalName
		if (thing.currencyLocation) {
			return !(thing.currencyLocation[name].lt(cost))
		}
		else if (thing.currencyLayer) {
			let lr = thing.currencyLayer
			return !(player[lr][name].lt(cost))
		}
		else {
			return !(player[name].lt(cost))
		}
	}
	else {
		return !(player[layer].points.lt(cost))
	}
}

function buyUpgrade(layer, id) {
	buyUpg(layer, id)
}

function buyUpg(layer, id) {
	if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
	let upg = tmp[layer].upgrades[id]
	if (!player[layer].unlocked || player[layer].deactivated) return
	if (!tmp[layer].upgrades[id].unlocked) return
	if (player[layer].upgrades.includes(id)) return
	if (upg.canAfford === false) return
	let pay = layers[layer].upgrades[id].pay
	if (pay !== undefined)
		run(pay, layers[layer].upgrades[id])
	else {
		let cost = tmp[layer].upgrades[id].cost

		if (upg.currencyInternalName) {
			let name = upg.currencyInternalName
			if (upg.currencyLocation) {
				if (upg.currencyLocation[name].lt(cost)) return
				upg.currencyLocation[name] = upg.currencyLocation[name].sub(cost)
			}
			else if (upg.currencyLayer) {
				let lr = upg.currencyLayer
				if (player[lr][name].lt(cost)) return
				player[lr][name] = player[lr][name].sub(cost)
			}
			else {
				if (player[name].lt(cost)) return
				player[name] = player[name].sub(cost)
			}
		}
		else {
			if (player[layer].points.lt(cost)) return
			player[layer].points = player[layer].points.sub(cost)
		}
	}
	player[layer].upgrades.push(id);
	if (upg.onPurchase != undefined)
		run(upg.onPurchase, upg)
	needCanvasUpdate = true
}

function buyMaxBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return
	if (!layers[layer].buyables[id].buyMax) return

	run(layers[layer].buyables[id].buyMax, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function buyBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return

	run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function clickClickable(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!tmp[layer].clickables[id].unlocked) return
	if (!tmp[layer].clickables[id].canClick) return

	run(layers[layer].clickables[id].onClick, layers[layer].clickables[id])
	updateClickableTemp(layer)
}

function clickGrid(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!run(layers[layer].grid.getUnlocked, layers[layer].grid, id)) return
	if (!gridRun(layer, 'getCanClick', player[layer].grid[id], id)) return

	gridRun(layer, 'onClick', player[layer].grid[id], id)
}

// Function to determine if the player is in a challenge
function inChallenge(layer, id) {
	let challenge = player[layer].activeChallenge
	if (!challenge) return false
	id = toNumber(id)
	if (challenge == id) return true

	if (layers[layer].challenges[challenge].countsAs)
		return tmp[layer].challenges[challenge].countsAs.includes(id) || false
	return false
}

// ************ Misc ************

var onTreeTab = true

function showTab(name, prev) {
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.tab !== name) clearParticles(function (p) { return p.layer === player.tab })
	if (tmp[name] && player.tab === name && isPlainObject(tmp[name].tabFormat)) {
		player.subtabs[name].mainTabs = Object.keys(layers[name].tabFormat)[0]
	}
	var toTreeTab = name == "none"
	player.tab = name
	if (tmp[name] && (tmp[name].row !== "side") && (tmp[name].row !== "otherside")) player.lastSafeTab = name
	updateTabFormats()
	needCanvasUpdate = true
	document.activeElement.blur()

}

function showNavTab(name, prev) {
	console.log(prev)
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.navTab !== name) clearParticles(function (p) { return p.layer === player.navTab })
	if (tmp[name] && tmp[name].previousTab !== undefined) prev = tmp[name].previousTab
	var toTreeTab = name == "tree-tab"
	console.log(name + prev)
	if (name !== "none" && prev && !tmp[prev]?.leftTab == !tmp[name]?.leftTab) player[name].prevTab = prev
	else if (player[name])
		player[name].prevTab = ""
	player.navTab = name
	updateTabFormats()
	needCanvasUpdate = true
}


function goBack(layer) {
	let nextTab = "none"

	if (player[layer].prevTab) nextTab = player[layer].prevTab
	if (player.navTab === "none" && (tmp[layer]?.row == "side" || tmp[layer].row == "otherside")) nextTab = player.lastSafeTab

	if (tmp[layer].leftTab) showNavTab(nextTab, layer)
	else showTab(nextTab, layer)

}

function layOver(obj1, obj2) {
	for (let x in obj2) {
		if (obj2[x] instanceof Decimal) obj1[x] = new Decimal(obj2[x])
		else if (obj2[x] instanceof Object) layOver(obj1[x], obj2[x]);
		else obj1[x] = obj2[x];
	}
}

function prestigeNotify(layer) {
	if (layers[layer].prestigeNotify) return layers[layer].prestigeNotify()

	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat) {
			if (subtabResetNotify(layer, 'mainTabs', subtab))
				return true
		}
	}
	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]) {
			if (subtabResetNotify(layer, family, subtab))
				return true
		}
	}
	if (tmp[layer].autoPrestige || tmp[layer].passiveGeneration) return false
	else if (tmp[layer].type == "static") return tmp[layer].canReset
	else if (tmp[layer].type == "normal") return (tmp[layer].canReset && (tmp[layer].resetGain.gte(player[layer].points.div(10))))
	else return false
}

function notifyLayer(name) {
	if (player.tab == name || !layerunlocked(name)) return
	player.notify[name] = 1
}

function subtabShouldNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (!subtab.unlocked) return false
	if (subtab.embedLayer) return tmp[subtab.embedLayer].notify
	else return subtab.shouldNotify
}

function subtabResetNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (subtab.embedLayer) return tmp[subtab.embedLayer].prestigeNotify
	else return subtab.prestigeNotify
}

function nodeShown(layer) {
	return layerShown(layer)
}

function layerunlocked(layer) {
	if (tmp[layer] && tmp[layer].type == "none") return (player[layer].unlocked)
	return LAYERS.includes(layer) && (player[layer].unlocked || (tmp[layer].canReset && tmp[layer].layerShown))
}

function keepGoing() {
	player.keepGoing = true;
	needCanvasUpdate = true;
}

function toNumber(x) {
	if (x.mag !== undefined) return x.toNumber()
	if (x + 0 !== x) return parseFloat(x)
	return x
}

function updateMilestones(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].milestones) {
		if (!(hasMilestone(layer, id)) && layers[layer].milestones[id].done()) {
			player[layer].milestones.push(id)
			if (layers[layer].milestones[id].onComplete) layers[layer].milestones[id].onComplete()
			if ((tmp[layer].milestonePopups || tmp[layer].milestonePopups === undefined) && !options.hideMilestonePopups) doPopup("milestone", tmp[layer].milestones[id].requirementDescription, "里程碑达成!", 3, tmp[layer].color);
			player[layer].lastMilestone = id
		}
	}
}

function updateAchievements(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].achievements) {
		if (isPlainObject(layers[layer].achievements[id]) && !(hasAchievement(layer, id)) && layers[layer].achievements[id].done()) {
			player[layer].achievements.push(id)
			if (layers[layer].achievements[id].onComplete) layers[layer].achievements[id].onComplete()
			if (tmp[layer].achievementPopups || tmp[layer].achievementPopups === undefined) doPopup("achievement", tmp[layer].achievements[id].name, "成就达成!", 3, tmp[layer].color);
		}
	}
}

function addTime(diff, layer) {
	let data = player
	let time = data.timePlayed
	if (layer) {
		data = data[layer]
		time = data.time
	}

	//I am not that good to perfectly fix that leak. ~ DB Aarex
	if (time + 0 !== time) {
		console.log("Memory leak detected. Trying to fix...")
		time = toNumber(time)
		if (isNaN(time) || time == 0) {
			console.log("Couldn't fix! Resetting...")
			time = layer ? player.timePlayed : 0
			if (!layer) player.timePlayedReset = true
		}
	}
	time += toNumber(diff)

	if (layer) data.time = time
	else data.timePlayed = time
}

shiftDown = false
ctrlDown = false

document.onkeydown = function (e) {
	if (player === undefined) return;
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
	if (tmp.gameEnded && !player.keepGoing) return;
	let key = e.key
	if (ctrlDown) key = "ctrl+" + key
	if (onFocused) return
	if (ctrlDown && hotkeys[key]) e.preventDefault()
	if (hotkeys[key]) {
		let k = hotkeys[key]
		if (player[k.layer].unlocked && tmp[k.layer].hotkeys[k.id].unlocked)
			k.onPress()
	}
}

document.onkeyup = function (e) {
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
}

var onFocused = false
function focused(x) {
	onFocused = x
}


function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

function isPlainObject(obj) {
	return (!!obj) && (obj.constructor === Object)
}

document.title = modInfo.name

// Converts a string value to whatever it's supposed to be
function toValue(value, oldValue) {
	if (oldValue instanceof Decimal) {
		value = new Decimal(value)
		if (checkDecimalNaN(value)) return decimalZero
		return value
	}
	if (!isNaN(oldValue))
		return parseFloat(value) || 0
	return value
}

// Variables that must be defined to display popups
var activePopups = [];
var popupID = 0;

// Function to show popups
function doPopup(type = "none", text = "This is a test popup.", title = "", timer = 3, color = "") {
	switch (type) {
		case "achievement":
			popupTitle = "成就达成!";
			popupType = "achievement-popup"
			break;
		case "challenge":
			popupTitle = "挑战达成";
			popupType = "challenge-popup"
			break;
		default:
			popupTitle = "Something Happened?";
			popupType = "default-popup"
			break;
	}
	if (title != "") popupTitle = title;
	popupMessage = text;
	popupTimer = timer;

	activePopups.push({ "time": popupTimer, "type": popupType, "title": popupTitle, "message": (popupMessage + "\n"), "id": popupID, "color": color })
	popupID++;
}


//Function to reduce time on active popups
function adjustPopupTime(diff) {
	for (popup in activePopups) {
		activePopups[popup].time -= diff;
		if (activePopups[popup]["time"] < 0) {
			activePopups.splice(popup, 1); // Remove popup when time hits 0
		}
	}
}

function run(func, target, args = null) {
	if (isFunction(func)) {
		let bound = func.bind(target)
		return bound(args)
	}
	else
		return func;
}

function gridRun(layer, func, data, id) {
	if (isFunction(layers[layer].grid[func])) {
		let bound = layers[layer].grid[func].bind(layers[layer].grid)
		return bound(data, id)
	}
	else
		return layers[layer].grid[func];
}

// # 自定义
// 特殊数字简写
const _D10 = _D(10);
const _D9 = _D(9);
const _D8 = _D(8);
const _D7 = _D(7);
const _D6 = _D(6);
const _D5 = _D(5);
const _D4 = _D(4);
const _D3 = _D(3);
const _D2 = _D(2);
const _D1 = _D(1);
const _D0 = _D(0);
const _DInf = _D(1.7976931348623157).mul(pow10(308));

function _D(num) {
	return new Decimal(num)
}

function _DR() {
	return _D(Math.random())
}

// 工具函数
/**
 * 请用于以1为倒数的数的简便写法
 * @param {Decimal} dividend - 被除数
 * @param {Decimal} [divisor = 1] - 除数 *不推荐使用该参数,乖乖用.div()
 */
function divNum(dividend, divisor = _D(1)) {
	return divisor.div(dividend);
}
// 2的幂次
function pow2(pow) {
	return _D2.pow(_D(pow))
}
// 10的幂次
function pow10(pow) {
	return _D10.pow(_D(pow))
}

function getEffect(layer, id, def) {
	return hasUpgrade(layer, id) ? upgradeEffect(layer, id) : def
}

function getChallengeEffect(layer, id, def) {
	return hasChallenge(layer, id) ? challengeEffect(layer, id) : def
}

// 核心函数 - 自定义事件驱动
function myTicking(diff) {
	if (diff < 0) return;
}

function getYFromOrderedPoints(points, x) {
	// 将输入x转换为Decimal
	const xDec = new Decimal(x);

	// 检查点数列是否为空
	if (!points || points.length === 0) {
		return new Decimal(NaN);
	}

	// 检查x是否在定义域内
	const firstX = new Decimal(points[0][0]);
	const lastX = new Decimal(points[points.length - 1][0]);

	if (xDec.lt(firstX) || xDec.gt(lastX)) {
		return new Decimal(NaN);
	}

	// 二分查找优化（适用于大数组）
	let left = 0;
	let right = points.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const midX = new Decimal(points[mid][0]);

		if (xDec.eq(midX)) {
			// 精确匹配,直接返回对应的y值
			return new Decimal(points[mid][1]);
		} else if (xDec.lt(midX)) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	// 获取区间两端的点
	const x1 = new Decimal(points[left - 1][0]);
	const y1 = new Decimal(points[left - 1][1]);
	const x2 = new Decimal(points[left][0]);
	const y2 = new Decimal(points[left][1]);

	// 线性插值: y = y1 + (y2 - y1) * (x - x1) / (x2 - x1)
	return y1.plus(
		y2.minus(y1)
			.times(xDec.minus(x1))
			.dividedBy(x2.minus(x1))
	);
}

// 你知道的太多了
// 避免重复定义开销
const randomString_chars = `ABCDEFGHJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz1234567890?!;=+-/@#$%^&*~|"'()[]{},.`;
function randomString(length) {
	let result = '';

	for (let i = 0; i < length; i++) {
		result += randomString_chars[Math.floor(Math.random() * randomString_chars.length)];
	}

	return result;
}

/**
 * 带变量的if else语句表达式简写版本,例如 a ? "abc".length : "abc" 可表达为 ifElseViarable("a", "v.length", "v", "abc")
 * @param {boolean} exp - 用于判断的表达式,可以是文本
 * @param {text} a - 真分支表达式
 * @param {text} b - 假分支表达式
 * @param {text} vir - 变量值
 * @param {text} [virName="v"] - 变量名
 */
function ifElseVirable(exp, a, b, vir, virName = "v") {
	return eval(`((${virName}) => ${exp} ? ${a} : ${b} )(${vir})`);
}

function playersound(id) {
	let audio = document.getElementById(id)
	audio.currentTime = 0
	audio.play()
}

// 新闻
function getNewsList() {
	return [
		"欢迎来到一千零一树,以下是本游戏的规则怪谈",
		' <img src="resources/bx.gif" width="40px"/>',
		' <img src="resources/ksm.gif" width="60px"/>',
		'有没有发现"饕餮"两个字最下面都是"良"字（良子）',
		'双子塔跟比萨斜塔说"哥们,灵敏度发一下"',
		"为什么黑人很少坐邮轮,因为他们知道吸取教训",
		"喜欢别人怀里的女人是不是和喜欢的女人在别人怀里是一个状态（x）",
		"二次元的钱好赚,所以房子按平方米卖更赚米",
		"在茶百道变成吸百根之前我不会说一句话",
		"恶者……终会作茧自缚……遵循既定的故事,走向结局",
		"在同时遭遇多重指责的情况下,人们总是会下意识的对自己被污蔑最严重的事进行反驳和辩解",
		"我操,用户彻底怒了",
		"一觉醒来我一觉醒来,而我不变",
		"群友就像赛博猎犬,平时不看群,但看到什么好玩的就叼回来,导致经常叼回来两个一模一样的东西",
		"我想变成香香软软可可爱爱的女孩子被大家操",
		"小信球～中不中啊,劲儿小嘞磕搀人,就这一会儿嚷可镇累了?某吃饭吧恁,孬种♡～孬种♡～",
		"对立很有名气,当年光一个人砍她二十多刀都没叫一声的狠人,后面一问才知道第一刀砍到声带了",
		"小学一年级,老师让我们把0到9分成两组,别人都是02468,13579.只有我是23468,01579.因为23468能组成绿一色",
		"天哪这简直就是我",
		"一个孕妇挺着大肚子下楼梯,楼梯边一个鬼躲着准备吓她,突然一只手把鬼拖走暴打了一顿,边打边骂：你把我妈吓流产了,老子怎么投胎?",
		"我要对你倒苦水——死库水!",
		"带假鸡巴去教室被老师赶出来了,委屈的想哭,明明那么多人带真鸡巴进教室也没人管",
		"Qxe1+ Rxe1 Rxe1+ Rxe1 Rxe1#",
		"你知道吗,蟹膏是螃蟹的精液! 是吗我一直很喜欢吃. 真的,对了你要来我家吃蟹膏吗? 你买螃蟹了吗? 我是巨蟹座.",
		"我操.这人怎么看了我一眼?",
		"突击检查：上一条新闻是什么?",
		"怎么感觉感觉到这么多感觉,就像感觉到了感觉一样很多感觉,感觉挺感觉的,就是感觉感觉有点感觉",
		"我曾有个和我母亲同名的女朋友,我们在爱爱的时候我不允许我叫她的名字,因为会让我想起我的女朋友",
		"今天是民国114年5月1日星期4,而且还有19分钟就是19:19:08.10,一生只能转一次",
		"别笑,你也过不了第二关",
		"路易十六不喜欢高斯,因为高斯的兄弟高德总叫他掉头",
		"太好了,是QQ聊天记录,这下不得不信了",
		"别人对你说滚的时候怎么办?就像下棋一样,你要应招,对方对你走了滚这步棋,你就走母,你发一个母,这样对方的攻击全部化为泡影.你赢了",
		"我们都知道,赛马,是马赢.那马术与赛马的区别是什么?答案：马术就是马加骑手赢",
		"胃酸是硫酸还是硝酸? 盐酸. 怎么可能是盐酸?盐酸在我肚子里我不得咸死了吗? 你胃有味觉吗? 都胃觉了,胃怎么可能没有胃觉?",
		"蚁酸是甲酸,但是乙酸居然是醋酸,这不神奇吗?",
		"我发现一件事,女孩子小时候喜欢玩娃娃,男孩子喜欢玩电动玩具,然而长大后女孩子喜欢用电动玩具,男孩子喜欢用娃娃,这大概就是成长吧",
		"宝贝,今天学历史了吗",
		"我昨天让你删除的文件你怎么删了???",
		"为什么地球online能开麦不让聊天框,挠馋游戏!还不给退款. 有的,拼多多可以仅退款.",
		"当时有一男一女两个老玩家直接就把游戏塞我手上了,我都没说要玩,结果游戏退不出来了,只能玩了",
		'媒体："疫情使俄罗斯倒退了四十年" 普京："还有这好事"',
		"孩子们,你们其实不用羡慕上海沪爷,因为在你出生之前你是京爷",
		"这个机器人是真人吗",
		"我的肉体是我祖传基因的,我的思想是网上各种梗组成的,我还在努力工作孕育AI,请问我是谁?",
		"洛是谁,必这么达",
		"有什么事情白人能做黑人不能做? Hey Dad.",
		"如果你一直把窗口宽度拉来拉去,新闻就会出bug,我不想修了",
		"时间就是金钱,时间墙就是金山银山",
		"现在有一个概率p,代表每秒获得1点数的概率,有一个刻速度1/d,代表每秒刻速,现在请用p和d计算每刻获得点数的概率",
		"今天像往常一样,把手机塞好等着来消息时振动带来的快感,等了半天以为没人给我发消息,原来是开免打扰了啊哈哈",
		"我吃饱了,浑身是血,我死了,我是蚊子",
		"以后我有钱了,我要让假几把玩斐济北",
		"群主,你卖给我的屁股一点也不爽,我要无效退款",
		"我想,种族歧视真的是会遗传的,这种东西是内化的,有一天,我在路上看到了一个黑人,我下意识抓紧了我的钱包,尽管我知道他不可购买.最后他还是偷走了我的钱包",
		'我今天遇到了一个双眼暗淡的朋友,ta满身疲惫,我记得上次见面还不是这样的来着,于是我本能的伸手想摸摸ta,发现手上传来一阵冰凉,"我摸的好像是镜子".',
		"建议洲孝子都去买个飞机杯,连飞机杯都可以把把出金,你三角洲能把把出金吗",
		"根据野史记载,吴国和魏国在签订契约时为了防止被蜀国偷走,把契约原件藏在了装有五味花生的麻袋里,于是这个契约就变成了五味契约,又叫吴魏契约",
		"我做了一个梦.在梦里,雨水不停的落下,直到淹没一切.淅淅沥沥的雨声从未停止,水,虽然是柔软的东西,但它也能摧毁那些坚硬无比的石头.城市被埋藏在地底,人们祈求着天晴,但雨从未停止",
		"解释笑点就像是解剖青蛙,你可以知道青蛙的内部构造,也会在以后见到类似的青蛙时有一个认识,但这只青蛙会死的透透的",
		"好笑吗?我只看到一位快饿死的魅魔撕不开食品包装",
		"Lap的妈妈有三个儿子,一个叫Nap,一个叫Map,最后一个叫什么?",
		"1+1!=2",
	]
}

function getSlogan() {
	let s = [
		"150 bpm for 400000 minutes!",
		"<span class='p1'>我</span><span class='p2'>要</span><span class='p3'>玩</span><span class='p4'>一</span><span class='p5'>千</span><span class='p6'>零</span><span class='p7'>一</span><span class='p8'>树</span><span class='p9'>就现在</span>",
		"EMBRACE the NIGHT!!!",
		"Also try the sleep tree",
		"KiraKira☆DokiDoki",
		"这里没有任意的标语",
		"f(x)=x^x,g(x)=f(f(x))",
		"Mindcraft : Dream Edit",
		"this=1 this'=0 '=0",
		"Freedown Dive↓↓↓↓↓",
		"undefined",
		"I feel it in my b*ood",
		"Try to catch me there",
		"哦哈啊啊啦咯嚓嚓吧喏啦",
		"qwertyuiopasdfghjklzxcvbnm",
		"There is O game here",
		"Go to 127.0.0.1:5500",
		"1<sup>2<sup>3<sup>4<sup>5<sup>6<sup>7<sup>8<sup>9</sup></sup></sup></sup></sup></sup></sup></sup>",
		"I fucked 100 people!",
		`<button onclick="playersound('s2')">1</button><button onclick="playersound('s2')">1</button><button onclick="playersound('s2')">4</button><button onclick="playersound('s2')">5</button><button onclick="playersound('s2')">1</button><button onclick="playersound('s2')">4</button>`,
		"v1.797693134862e+308",
		"[Object object]",
		_DR(),
		randomString(20),
		"1001tree.github.io",
		"гRεε匚③つ≒？",
		"不敢睁开眼,希望是我的幻觉",
		'<img src="resources/bx.gif" />',
		`<button onclick="playersound('g1')">Nothing can beat your 1001tree</button>`,
		()=>{ return ()=>false },
		"你看到这句话的频率不再为0!",
	]

	return s[Math.floor(Math.random() * s.length)]
}

// 在player中保存新闻文字会导致新闻无法被保存
var news = {
	index: 0,
	text: "",
	charIndex: 0,
	lastUpdate: 0,
	isRotating: false,
	completeTime: 0,
	fadeStartTime: 0,
	opacity: 1
}

var slogan = getSlogan()

function updateNewsDisplay() {
	const newsList = getNewsList();
	const currentNews = newsList[news.index];

	// 初始化新新闻
	if (!news.isRotating) {
		news.text = getNextCharacter(currentNews, 0);
		news.charIndex = 1;
		news.isRotating = true;
		news.lastUpdate = Date.now();
		news.completeTime = 0;
		news.fadeStartTime = 0;
		news.opacity = 1;
		return;
	}

	const now = Date.now();

	if (news.fadeStartTime > 0) {
		const fadeDuration = 1000;
		const fadeProgress = Math.min((now - news.fadeStartTime) / fadeDuration, 1);

		news.opacity = 1 - Math.pow(fadeProgress, 2);

		if (fadeProgress >= 1) {
			const oldIndex = news.index;
			do {
				news.index = Math.floor(Math.random() * newsList.length);
			} while (oldIndex === news.index);

			news.isRotating = false;
			news.completeTime = 0;
			news.fadeStartTime = 0;
		}
		return;
	}

	const timeDiff = now - news.lastUpdate;
	if (timeDiff >= 150) {
		const charsToAdd = Math.floor(timeDiff / 150);
		let newCharIndex = news.charIndex;

		for (let i = 0; i < charsToAdd && newCharIndex < currentNews.length; i++) {
			newCharIndex = getNextCharIndex(currentNews, newCharIndex);
		}

		news.charIndex = Math.min(newCharIndex, currentNews.length);
		news.text = currentNews.substring(0, news.charIndex);
		news.lastUpdate = now;

		if (news.charIndex >= currentNews.length && news.completeTime === 0) {
			news.completeTime = now;
		}

		if (news.completeTime > 0 &&
			now - news.completeTime >= 5000 &&
			news.fadeStartTime === 0) {
			news.fadeStartTime = now;
		}
	}

	function getNextCharIndex(text, currentIndex) {
		if (currentIndex >= text.length) return currentIndex;

		if (text[currentIndex] === '<') {
			const endIndex = text.indexOf('>', currentIndex);
			return endIndex === -1 ? text.length : endIndex + 1;
		}

		return currentIndex + 1;
	}

	function getNextCharacter(text, startIndex) {
		const endIndex = getNextCharIndex(text, startIndex);
		return text.substring(startIndex, endIndex);
	}
}

function reinitializeNews() {
	news.index = 0;
	news.text = "";
	news.charIndex = 0;
	news.isRotating = false;
	news.lastUpdate = Date.now();
	news.completeTime = 0;
	news.fadeStartTime = 0;
	news.opacity = 1;
}

function decimalMax(...values) {
	if (values.length === 0) {
		return new Decimal(0);
	}

	let max = new Decimal(values[0]);

	for (let i = 1; i < values.length; i++) {
		const current = new Decimal(values[i]);
		if (current.gt(max)) {
			max = current;
		}
	}

	return max;
}

function getGameName(id) {
	let name = {
		101: ["10p1sc", "时间墙堆砌,很无聊"],
		102: ["点击墙", "点击墙的点击墙"],
		202: ["概率统治世界", "尝试和作者勾心斗角"]
	}[id]

	if (typeof name == 'undefined') name = ['未完成游戏', "这个游戏目前是棍木"]

	return name
}
