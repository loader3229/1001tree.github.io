let modInfo = {
	name: "一千零一树",
	id: "1001tree",
	pointsName: "世界",
	modFiles: ["layers.js", "tree.js", "const.js",
		"world/101.js", "world/102.js", "world/103.js", "world/104.js", "world/105.js",
		"world/201.js", "world/202.js", "world/203.js", "world/204.js", "world/205.js",
		"world/301.js", "world/302.js", "world/303.js", "world/304.js", "world/305.js",
		"world/401.js", "world/402.js", "world/403.js", "world/404.js", "world/405.js",
		"world/501.js", "world/502.js", "world/503.js", "world/504.js", "world/505.js",
		"world/302/3021.js", "world/302/3022.js", "world/302/3023.js", "world/302/3024.js",
	],
	discordName: "1001树游戏群",
	discordLink: "https://qm.qq.com/q/ApvcgvPhN8",
	initialStartPoints: new Decimal(0), // 用于硬重置和新玩家
	offlineLimit: 0,  // 离线时间限制（小时）
}

// 在num和name中设置版本号
let VERSION = {
	num: 0.44,
	name: ""
}

let changelog = `
	<h1>更新日志:</h1><br><br>
	<h3>v0.44 | 2025/9/17</h3><br>
	更新了11个游戏<br><br>
	<h3>游戏立项 | 2025/8/28</h3><br>
	1001tree team 成立!<br><br>`

let winText = `恭喜你!你已经*简单*通关了本游戏,接下来向着全成就收集前进吧!`

// 如果在Layer内添加了新函数,请在此处添加它们
var doNotCallTheseFunctionsEveryTick = ['resetGame', 'getPrice', 'getEffect',
	'clickwallReset', 'checkHash', 'nextHash', "getBoard", "getValue", 'next',
	"resetgrid", "getWrongPage", "getRandomcode", "analyzeGrid", 'getTickTime',
	"getSomeText", "getRandomProblem", "randomProblem", "normalEndGame", 'mult','machineRoll',
	"xytoid", "idtoxy", "face", "getArrow", "click", 'calcbase', 'calcmul','doMovement','getBoost',
	'getTarget', 'checkHash', 'keyList', 'getPoint', 'getMulPoint', 'getMulMulti','pGen',
	'updateGrid', 'numGen', 'mergeGrid', 'canMerge', 'canMax', 'noReset', 'res', 'tar', 'pointsGain',
	'getMulPower', 'getMulGetPoint', 'getChallenge', 'subpower', 'm2effect', 'udClear','switchGrid', 
	'calcmaxhp', 'divpower', 'chalcomp', 'chaleff', 'randomButton', 'getText', 'genClear',
	'calcP1', 'enginegen', 'renginegen', 'engineeff', 'rengineeff', 'hengineeff',
	'getRandomcode', 'getLoseText', 'getWrongPage', 'find25', 'calculateInfoDensity',
	"ai0", "ai1", "ai2", "ai3", "ai4", "ai5", "ai6", "sC1", "sC2", "sC3", "sC4", "sC5",
	"aC1", "aC2", "aC3", "aC4", "aC5", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
	"startSimulation", "endSimulation",
]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// 决定是否醒着
function canGenPoints() {
	return false
}

// 计算点数/秒!
function getPointGen() {
	return _D0
}

// 你可以在此添加应该存入"player"并保存的非图层相关变量,以及默认值
// 有关常量定义请在const.js中进行!
function addedPlayerData() {
	return {
		_501: {
			stage: _D0,
			started: false,
			timeleft: new Decimal(10),
			cnt: 999,
			trig: [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
			rp: 0,
			gnum: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			rc: "",
			complete: false,
			lose: false,
			trigach: false
		},
		_502: {
			inGame: false,
			final: false,
			ai: 0,
			board: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
			aiopen: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
		},
		world: {
			"101": false, "102": false, "103": false, "104": false, "105": false,
			"201": false, "202": false, "203": false, "204": false, "205": false,
			"301": false, "302": false, "303": false, "304": false, "305": false,
			"401": false, "402": false, "403": false, "404": false, "405": false,
			"501": false, "502": false, "503": false, "504": false, "505": false,
		},
		pause: {
			"101": false, "102": false, "103": false, "104": false, "105": false,
			"201": false, "202": false, "203": false, "204": false, "205": false,
			"301": false, "302": false, "303": false, "304": false, "305": false,
			"401": false, "402": false, "403": false, "404": false, "405": false,
			"501": false, "502": false, "503": false, "504": false, "505": false,
		},
		global: {
			//此处存放全局变量
			name: "player", //玩家的名字
			import: false,
			mynews: "请输入文本",
			achseed: Date.now(),
			tickTime: []
		}
	}
}

// 在页面顶部显示新闻
var displayNews = [
	function () {
		if (options.newsshown) return `<div style="
		width: calc(100% - 50px);
		background-color: rgba(255,255,255,0.2);
		margin: 5px auto;
		border: solid 3px rgba(0,0,0,0.5);
		min-height:24px;
		"><span style="opacity: ${news.opacity};">${news.text}</span></div>
		`
		else return "<br>"
	}
];

// 在页面顶部显示额外内容
var displayThings = [
	function () {
		if (options.tipshown) return `
		如果游戏出现问题,请先尝试刷新页面,如果问题可复现<br>
		请截图错误界面,导出存档并提交给开发组<br>`
	},
	function () {
		if (options.tipshown) return `
		当前游戏运行速度 ${Cal_TPS()[0]}tps | ${Cal_TPS()[1]}ms`
	},
	function () {
		try {
			if (Object.values(player.pause).some(Boolean)) return "当前有游戏暂停运算,你可在设置查阅"
		}
		catch { return null }
	},
	function () {
		if (options.sloganshown) return `<span class="slogan">
			${slogan}
		</span>`
	}
]

// 决定游戏何时"结束"
function isEndgame() {
	return player.points.gte(25)
}

// 后面是次要内容!

// 背景样式,可以是函数
function backgroundStyle() {
	if (options.bgi) return {
		backgroundImage: `linear-gradient(rgba(from var(--background) r g b / 0.75)),
    	url(${options.bgi})`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
	}
}

// 如果有内容可能被长时间tick破坏,可以修改这个值
function maxTickLength() {
	return 1
}

// 如果需要修复旧版本存档的数值膨胀问题,使用此函数.如果版本早于修复该问题的版本,
// 你可以用此函数限制他们当前的资源.
function fixOldSave(oldVersion) {
}
