let modInfo = {
	name: "一千零一树",
	id: "1001tree",
	pointsName: "世界",
	modFiles: ["layers.js", "tree.js", "const.js", "world/101.js", "world/102.js", "world/202.js", "world/203.js", "world/204.js", "world/501.js"],

	discordName: "乾狐离光的官网",
	discordLink: "https://qhlg.flime.top/",
	initialStartPoints: new Decimal(0), // 用于硬重置和新玩家
	offlineLimit: 0,  // 离线时间限制（小时）
}

// 在num和name中设置版本号
let VERSION = {
	num: 0.2,
	name: ""
}

let changelog = `
	<h1>更新日志:</h1><br><br>
	<h3>v0.2 | 2025/8/31</h3><br>
	更新了5个游戏<br><br>
	<h3>游戏立项 | 2025/8/28</h3><br>
	1001tree team 成立!<br><br>`

let winText = `恭喜你!你已经*简单*通关了本游戏,接下来向着全成就收集前进吧!`

// 如果在Layer内添加了新函数,并且这些函数在被调用时会产生效果,请在此处添加它们
var doNotCallTheseFunctionsEveryTick = ['resetGame', 'getPrice', 'getEffect',
	'clickwallReset', 'checkHash', 'nextHash',
	"resetgrid", "getWrongPage", "getRandomcode",
	"getSomeText", "getRandomProblem", "randomProblem"
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
		_101: {
			asc1: _D0,
			asc2: _D0,
			asc3: _D0,
			asc4: _D0,
			asc5: _D0,
		},
		_102: {
			tickt: _D0,
			now: 0,
			rnd: Math.random(),
			level: 0,
			cold: _D0,
			salt: Date.now(),
			pause: false
		},
		_202: {
			t: _D0,
			tickt: _D0,
			keyseed: Date.now(),
			dB: _D1,
			mul: [_D1, _D1, _D1, _D1, _D1, _D1, _D1, _D1, _D1]
		},
		_203: {
			hp: _D10,
			maxhp: _D10,
			wallbreak: _D0,
			maxpoints: _D0,
			mode: 1,
			trig: false,
			trig2: false,
			divclick: _D0,
			subclick: _D0,
			timeplayed: _D0,
			click: _D0,
		},
		_204: {
			maxscore: _D0,
			started: false,
			problist: [],
			sol: 0,
			problem: { problem: '', options: ['', '', '', ''], answer: 0 },
			ans: 0,
			button: [21, 22, 23, 24],
			answer: {
				21: 0,
				22: 0,
				23: 0,
				24: 0
			}
		},
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
		world: {
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
			achseed: Date.now()
		}
	}
}

// 在页面顶部显示新闻
var displayNews = [
	function () {
		if (options.news) return `<div style="
		width: calc(100% - 50px);
		background-color: rgba(255,255,255,0.2);
		margin: 5px auto;
		border: solid 3px rgba(0,0,0,0.5);
		min-height:24px;
		"><span style="opacity: ${news.opacity};">${news.text}</span></div>
		`;
	}
];

// 在页面顶部显示额外内容
var displayThings = [
	"出bug请联系QQ1550187725<br>如果下面什么也没有,请先刷新页面",
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
var backgroundStyle = {
}

// 如果有内容可能被长时间tick破坏,可以修改这个值
function maxTickLength() {
	return 1
}

// 如果需要修复旧版本存档的数值膨胀问题,使用此函数.如果版本早于修复该问题的版本,
// 你可以用此函数限制他们当前的资源.
function fixOldSave(oldVersion) {
}
