// 获取游戏名字
function getGameName(id) {
	let name = {
		101: ["<span class='c2'>10p1sc</span>", "<span class='c2'>时间墙堆砌,很无聊</span>"],
		102: ["<span class='c2'>挖矿增量</span>", "<span class='c2'>真的是挖矿,极速版</span>"],
		202: ["<span class='p1tx'>概率统治世界</span>", "<span class='p1tx'>尝试和作者勾心斗角</span>"],
		203: ["<span class='p2tx'>点击墙</span>", "<span class='p2tx'>点击墙的点击墙</span>"],
		204: ["<span class='p3tx'>未完成游戏</span>", "<span class='p3tx'>这个游戏目前是棍木</span>"],
		302: ["<span class='p4tx'>未完成游戏</span>", "<span class='p4tx'>这个游戏目前是棍木</span>"],
		303: ["<span class='p9tx'>未完成游戏</span>", "<span class='p9tx'>这个游戏目前是棍木</span>"],
		304: ["<span class='p5tx'>未完成游戏</span>", "<span class='p5tx'>这个游戏目前是棍木</span>"],
		402: ["<span class='p6tx'>未完成游戏</span>", "<span class='p6tx'>这个游戏目前是棍木</span>"],
		403: ["<span class='p7tx'>未完成游戏</span>", "<span class='p7tx'>这个游戏目前是棍木</span>"],
		404: ["<span class='p8tx'>未完成游戏</span>", "<span class='p8tx'>这个游戏目前是棍木</span>"],
		501: ["<span class='c1'>愚人节</span>", "<span class='c1'>假装这是四月</span>"]
	}[id]

	if (typeof name == 'undefined') name = ['未完成游戏', "这个游戏目前是棍木"]

	return name
}

// 新闻
function getNewsList() {
	return [
		// 默认新闻
		"欢迎来到一千零一树,以下是本游戏的规则怪谈",
		// 特殊格式
		' <img src="resources/bx.gif" width="40px"/>',
		' <img src="resources/ksm.gif" width="60px"/>',
		`玩家自定义新闻,不代表开发者立场|${player.global.mynews}`,
		`我不想写新闻了,你自己写:<input
  			type="text"
 			maxlength="50"
 			size="50" 
			placeholder="请输入文本,至多50字符,5秒不输入切换新闻"
			oninput="
				news.completeTime = Date.now()
				player.global.mynews = this.value
			" />`,
		// 常规
		"1+1!=2",
		"我操.这人怎么看了我一眼?",
		"突击检查:上一条新闻是什么?",
		"一觉醒来我一觉醒来,而我不变",
		"时间就是金钱,时间墙就是金山银山",
		"恶者……终会作茧自缚……遵循既定的故事,走向结局",
		"时间墙的存在不是为了阻挡你,而是为了证明你究竟有多渴望背后的世界",
		"在同时遭遇多重指责的情况下,人们总是会下意识的对自己被污蔑最严重的事进行反驳和辩解",
		"怎么感觉感觉到这么多感觉,就像感觉到了感觉一样很多感觉,感觉挺感觉的,就是感觉感觉有点感觉",
		"如果你一直把窗口宽度拉来拉去,新闻就会出bug,我不想修了(已经回退到现在的新闻样式,不再有bug \\^o^/)",
		"现在有一个概率p,代表每秒获得1点数的概率,有一个刻速度1/d,代表每秒刻速,现在请用p和d计算每刻获得点数的概率",
		'我今天遇到了一个双眼暗淡的朋友,ta满身疲惫,我记得上次见面还不是这样的来着,于是我本能的伸手想摸摸ta,发现手上传来一阵冰凉,"我摸的好像是镜子".',
		"我做了一个梦.在梦里,雨水不停的落下,直到淹没一切.淅淅沥沥的雨声从未停止,水,虽然是柔软的东西,但它也能摧毁那些坚硬无比的石头.城市被埋藏在地底,人们祈求着天晴,但雨从未停止",
		...options.newsa ? [
			// 剧透内容
			"我们需要另外一位开发者来测试我们的时间流速,快来帮帮我们!",
			"如果你一条命通过了愚人节小游戏,那么你会获得一个成就,但这真的可能吗?",
			"质量越大,引力就会越大,距离越小,引力也会越大,那质量越大,距离就会越小吗?",
			"在某处普通的地方,有四个四被放在一个字母后面,这是偶然还是素数,还是自然对数底?",
			"如果你点了一千次都没办法打破这堵墙,那我堵你堵上我堵了一百年的冠状动脉也破不掉这堵墙",
			"如果你不完成所有成就,那么你就没办法获得最后一个成就,但你不完成最后一个成就,你应该就不算完成了全部成就,对吗?",
			"尝试在控制台输入`player._501.trig[5]=true`以获取一个*成就*!</button><input type='button' value='帮我输入' onclick='player._501.trig[5]=true' />",
		] : [],
		...options.newsv ? [
			// 低俗笑话
			"洛是谁,必这么达",
			"我操,用户彻底怒了",
			"宝贝,今天学历史了吗",
			"我要对你倒苦水——死库水!",
			"专家最新发现:男人有格调",
			"以后我有钱了,我要让假几把玩斐济北",
			"在茶百道变成吸百根之前我不会说一句话",
			"我想变成香香软软可可爱爱的女孩子被大家操",
			"群主,你卖给我的屁股一点也不爽,我要无效退款",
			"好笑吗?我只看到一位快饿死的魅魔撕不开食品包装",
			"孩子们,你们其实不用羡慕上海沪爷,因为在你出生之前你是京爷",
			"建议洲孝子都去买个飞机杯,连飞机杯都可以把把出金,你三角洲能把把出金吗",
			"我们都知道,赛马,是马赢.那马术与赛马的区别是什么?答案:马术就是马加骑手赢",
			"带假鸡巴去教室被老师赶出来了,委屈的想哭,明明那么多人带真鸡巴进教室也没人管",
			"我曾有个和我母亲同名的女朋友,我们在爱爱的时候我不允许我叫她的名字,因为会让我想起我的女朋友",
			"你知道吗,蟹膏是螃蟹的精液! 是吗我一直很喜欢吃. 真的,对了你要来我家吃蟹膏吗? 你买螃蟹了吗? 我是巨蟹座.",
			"今天像往常一样,把手机塞好等着来消息时振动带来的快感,等了半天以为没人给我发消息,原来是开免打扰了啊哈哈",
			"我发现一件事,女孩子小时候喜欢玩娃娃,男孩子喜欢玩电动玩具,然而长大后女孩子喜欢用电动玩具,男孩子喜欢用娃娃,这大概就是成长吧",
		] : [],
		...options.newsh ? [
			// 地狱笑话
			"我昨天让你删除的文件你怎么删了???",
			'双子塔跟比萨斜塔说"哥们,灵敏度发一下"',
			"有什么事情白人能做黑人不能做? Hey Dad.",
			"为什么黑人很少坐邮轮,因为他们知道吸取教训",
			"路易十六不喜欢高斯,因为高斯的兄弟高德总叫他掉头",
			'媒体:"疫情使俄罗斯倒退了四十年" 普京:"还有这好事"',
			"对立很有名气,当年光一个人砍她二十多刀都没叫一声的狠人,后面一问才知道第一刀砍到声带了",
			"一个孕妇挺着大肚子下楼梯,楼梯边一个鬼躲着准备吓她,突然一只手把鬼拖走暴打了一顿,边打边骂:你把我妈吓流产了,老子怎么投胎?",
			"我想,种族歧视真的是会遗传的,这种东西是内化的,有一天,我在路上看到了一个黑人,我下意识抓紧了我的钱包,尽管我知道他不可购买.最后他还是偷走了我的钱包",
		] : [],
		...options.newss ? [
			// 其他梗语
			"天哪这简直就是我",
			"这个机器人是真人吗",
			"别笑,你也过不了第二关",
			"Qxe1+ Rxe1 Rxe1+ Rxe1 Rxe1#",
			"我吃饱了,浑身是血,我死了,我是蚊子",
			"太好了,是QQ聊天记录,这下不得不信了",
			"二次元的钱好赚,所以房子按平方米卖更赚米",
			"蚁酸是甲酸,但是乙酸居然是醋酸,这不神奇吗?",
			'有没有发现"饕餮"两个字最下面都是"良"字（良子）',
			"猫耳是不能乱摸的哦..啊啊..是你啊!你的话应该没问题的哦",
			"Lap的妈妈有三个儿子,一个叫Nap,一个叫Map,最后一个叫什么?",
			"喜欢别人怀里的女人是不是和喜欢的女人在别人怀里是一个状态（x）",
			"夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵",
			"占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符",
			"今天是民国114年5月1日星期4,而且还有19分钟就是19:19:08.10,一生只能转一次",
			"为什么地球online能开麦不让聊天框,挠馋游戏!还不给退款. 有的,拼多多可以仅退款.",
			"小信球～中不中啊,劲儿小嘞磕搀人,就这一会儿嚷可镇累了?某吃饭吧恁,孬种♡～孬种♡～",
			"我的肉体是我祖传基因的,我的思想是网上各种梗组成的,我还在努力工作孕育AI,请问我是谁?",
			"群友就像赛博猎犬,平时不看群,但看到什么好玩的就叼回来,导致经常叼回来两个一模一样的东西",
			"当时有一男一女两个老玩家直接就把游戏塞我手上了,我都没说要玩,结果游戏退不出来了,只能玩了",
			"小学一年级,老师让我们把0到9分成两组,别人都是02468,13579.只有我是23468,01579.因为23468能组成绿一色",
			"解释笑点就像是解剖青蛙,你可以知道青蛙的内部构造,也会在以后见到类似的青蛙时有一个认识,但这只青蛙会死的透透的",
			"胃酸是硫酸还是硝酸? 盐酸. 怎么可能是盐酸?盐酸在我肚子里我不得咸死了吗? 你胃有味觉吗? 都胃觉了,胃怎么可能没有胃觉?",
			"某二游写角色技能是覆盖旧状态,但是不知道为什么写进了账号信息,于是开个技能你的账号就注销了变成新号了,反正不是我们游戏",
			"别人对你说滚的时候怎么办?就像下棋一样,你要应招,对方对你走了滚这步棋,你就走母,你发一个母,这样对方的攻击全部化为泡影,你赢了",
			"根据野史记载,吴国和魏国在签订契约时为了防止被蜀国偷走,把契约原件藏在了装有五味花生的麻袋里,于是这个契约就变成了五味契约,又叫吴魏契约",
			`(脸红红的,眼睛里闪烁着幸福的光芒)人家也喜欢你,${player.global.name}.(害羞地低下头,双手揪着衣角)我会一直陪着你的.(抬起头,露出甜甜的笑容)`,
		] : [],
	]
}

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

function getSloganList() {
	return [
		// 特殊格式
		Math.random(),
		randomString(20),
		() => { return () => false },
		`This is a <span style="background: linear-gradient(in hsl longer hue 90deg,
            hsl(-30, 100%, 50%),
            hsl(330, 100%, 50%));
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            ">RAINBOW</span>`,
		`<button onclick="playsound('s2')">1</button><button
		onclick="playsound('s2')">1</button><button
		onclick="playsound('s2')">4</button><button
		onclick="playsound('s2')">5</button><button
		onclick="playsound('s2')">1</button><button 
		onclick="playsound('s2')">4</button>`,
		`<span class='p1'>我</span><span
		class='p2'>要</span><span
		class='p3'>玩</span><span
		class='p4'>一</span><span
		class='p5'>千</span><span
		class='p6'>零</span><span
		class='p7'>一</span><span
		class='p8'>树</span><span
		class='p9'>就现在</span>`,
		`1<sup>2<sup>3<sup>4<sup>5<sup>6<sup>7<sup>8<sup>9
		</sup></sup></sup></sup></sup></sup></sup></sup>`,
		// 常规
		"undefined",
		"[Object object]",
		"∫ dx的结果是多少?",
		"这里没有任意的标语",
		"Freedown Dive↓↓↓↓↓",
		"KiraKira☆DokiDoki",
		"this=1 this'=0 '=0",
		"I loved 100 people!",
		"v1.797693134862e+308",
		"There is O game here",
		"Go to 127.0.0.1:5500",
		"哦哈啊啊啦咯嚓嚓吧喏啦",
		"this=x this'=1 '=1/x",
		"EMBRACE the NIGHT!!!",
		"I feel it in my b*ood",
		"Try to catch me there",
		"f(x)=x^x,g(x)=f(f(x))",
		"Mindcraft : Dream Edit",
		"Also try the sleep tree",
		"this=x^2 this'=2x '=2/x",
		"qwertyuiopasdfghjklzxcvbnm",
		"150 bpm for 400000 minutes!",
		"this=x^n this'=nx^(n-1) '=n/x",
		"this=∫f(x)dx this'=f(x) '=1/∫dx",
		"this=x^x this'=x^x(lnx+1) '=1/(lnx+1)",
		"1001tree.github.io",
		"гRεε匚③つ≒？",
		"不敢睁开眼,希望是我的幻觉",
		'<img src="resources/bx.gif" />',
		`<button onclick="playsound('g1')">Nothing can beat your 1001tree</button>`,
		"你看到这句话的频率不再为0!",
		"不要等失去才学会珍惜",
		"We think you’re gonna like it here.",
		"我不想干活 我要写标语",
		"Today is 4.1 right?",
		"God damn why is it so hard?",
		"含1001(2)+2↑↑3个小游戏的游戏",
		"The 1001-Tree Team made this one",
		"A▷∫⊥ГAÇ⊥ ÇΗA○∫A▷イ∫∫",
		"成就藏着秘密!!!",
		"There is some tips in news",
		"你见过凌晨四点的1001树吗?",
		"We have storngest Developers!",
		"9种颜色 9个夜晚!",
		"我们真的在用您的电脑挖矿!",
		"Never gonna let you dive↓",
		"I dedi becosof my dad",
		"your computer is in 90°",
		"CrossSiteScripting"
	]
}

var slogan = getSlogan()
function getSlogan() {
	return chooseOneInArray(getSloganList())
}

function getHint() {
	return {
		0: [
			"你还没有完成任意一个成就,你为什么要看这里?",
			"在你做出些什么之前,这里只会是空的,你知道的",
			"你在尝试找到些什么吗?但这里没什么东西啊...",
			"不要再看这里了,去做些什么,除非你喜欢我❤",
			"不要走...不要离开我...那些东西都是邪恶的...",
		],
		1: [
			"你已经开始玩这个游戏了吗?!等等等等一下...",
			"这大概是游戏的开端,但我们的故事可不止于此",
			"什么,这里不是标语栏吗?我还想写点东西在这里",
			"只有在你获得成就以后,你才能看到成就,除非...",
			"这里仍有非常多成就等待着您探索,继续向前进吧!",
			"我觉得这个道理很清楚,如果你想要,就自己来拿!"
		],
		2: [
			"你正走在正确的道路上,继续前进,发掘世界的秘密",
			"如果你继续完成成就,我就会给你看更多成就",
			"这是一句提示语,做更多成就以得到更多提示语",
			"成就感在逐渐消失,但你在膨胀树会重新夺回它",
			"一次又一次的获得成就会不会让你感到无趣?",
			"我向你发出挑战,你肯定不能再在这个阶段待很久",
		],
		3: [
			"发现一半的成就也许很值得表扬,所以我要夸夸你!",
			"你有没有想到,也许在哪里,藏着剩下的成就的线索?",
			"这不是魔塔,我们也不想让您一步一步往上爬",
			"成就的获取基于成就获取量提升,底数是1,指数是0",
			"找到下个成就让你感觉有趣吗?还是说这只是顺便?",
			"这些世界有趣吗?向我们反馈以帮助我们的开发!",
		],
		4: [
			"你已经拿到了大半成就,这些成就给你了一些加成",
			"如果你睡一觉醒来,也许这些成就会溜走的,也许?",
			"一旦完成更多的成就,你就很快可以看到更多的成就",
			"砰砰砰,嚓!请坐和放宽,您的成就之旅已行至中途",
			"你得到了这个提示语!我是不是应该给你一个成就?",
			"您是否愿意为1001树评分?点击这里转到App Store",
		],
		5: [
			"还在找最后一个成就吗?也许这个成就要第一个做?",
			"如果你总是看到这句话,说明你快做完所有成就了",
			"成就不是任务,你不需要完成所有成就来结束游戏",
			"也许你可以看看主页面里经常变化的地方获得线索",
			"我更希望你在知道怎么完成剩下成就时看到这句话",
			"行百里者半九十,你已经快要到终点了,但仍需小心",
		],
		6: [
			"这里已经没有更多东西等着你探索了,你是真正的王",
			"你得到了一切,也许这就是终局,但谁说的上呢?",
			"您完成了当前的所有成就,Orz~给您跪了喵!",
			"不管你怎么想,人家都已经拿不出来新成就了喵!",
			"恭喜你,你已经击败了成就,作为后光完成了游戏",
		]
	}
}