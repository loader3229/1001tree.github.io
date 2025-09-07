// 获取游戏名字
function getGameName(id) {
	let name = {
		101: ["<span class='c2'>10p1sc</span>", "<span class='c2'>时间墙堆砌,很无聊</span>"],
		102: ["<span class='c2'>挖矿增量</span>", "<span class='c2'>真的是挖矿,极速版<br>因为狐狸电脑太渣了</span>"],
		105: ["<span class='c3'>镜之塔</span>", "<span class='c3'>一个不知道是什么的塔</span>"],
		202: ["<span class='p1tx'>第1夜<br>概率统治世界</span>", "<span class='p1tx'>尝试和作者勾心斗角<br>你也有概率统治世界</span>"],
		203: ["<span class='p2tx'>第10夜<br>点击墙</span>", "<span class='p2tx'>点击墙的点击墙</span>"],
		204: ["<span class='p3tx'>第11夜<br>十一夜电视台</span>", "<span class='p3tx'>趣味问答</span>"],
		302: ["<span class='p4tx'>第100夜<br>未完成游戏</span>", "<span class='p4tx'>这个游戏目前是棍木</span>"],
		303: ["<span class='p9tx'>第1001夜<br>未完成游戏</span>", "<span class='p9tx'>这个游戏目前是棍木</span>"],
		304: ["<span class='p5tx'>第101夜<br>未完成游戏</span>", "<span class='p5tx'>这个游戏目前是棍木</span>"],
		402: ["<span class='p6tx'>第110夜<br>未完成游戏</span>", "<span class='p6tx'>这个游戏目前是棍木</span>"],
		403: ["<span class='p7tx'>第111夜<br>未完成游戏</span>", "<span class='p7tx'>这个游戏目前是棍木</span>"],
		404: ["<span class='p8tx'>第1000夜<br>未完成游戏</span>", "<span class='p8tx'>这个游戏目前是棍木</span>"],
		501: ["<span class='c1'>愚人节</span>", "<span class='c1'>假装这是四月一日</span>"]
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
		`${player.global.name} is playing this game...`,
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
		"厉=100",
		"forget is for get",
		"我操.这人怎么看了我一眼?",
		"突击检查:上一条新闻是什么?",
		"一觉醒来我一觉醒来,而我不变",
		"时间就是金钱,时间墙就是金山银山",
		"恶者……终会作茧自缚……遵循既定的故事,走向结局",
		"时间墙的存在不是为了阻挡你,而是为了证明你究竟有多渴望背后的世界",
		"纯粹是偶然的进化,有一个脑袋的物种不容易挂掉,获得了无与伦比的生存优势",
		"在同时遭遇多重指责的情况下,人们总是会下意识的对自己被污蔑最严重的事进行反驳和辩解",
		"对于后桌问我三角形周长公式是什么这件事.我说边长相加就行了,这个小可爱问我要不要除二",
		"怎么感觉感觉到这么多感觉,就像感觉到了感觉一样很多感觉,感觉挺感觉的,就是感觉感觉有点感觉",
		"1+1=2,1+1!=2,所以1+1=1+1!,两边减去1得1=1!,两边同除1得1=!,这就是为什么键盘上1和!是一个键",
		"如果你一直把窗口宽度拉来拉去,新闻就会出bug,我不想修了(已经回退到现在的新闻样式,不再有bug \\^o^/)",
		"现在有一个概率p,代表每秒获得1点数的概率,有一个刻速度1/d,代表每秒刻速,现在请用p和d计算每刻获得点数的概率",
		"你看啊,就看世界选择盘吧,最中间是1个,外面一层是8个,最外面一层是16个,再往外一层是7²-5²=24个,为什么中间是1个而不是0个呢?真是奇怪",
		'我今天遇到了一个双眼暗淡的朋友,ta满身疲惫,我记得上次见面还不是这样的来着,于是我本能的伸手想摸摸ta,发现手上传来一阵冰凉,"我摸的好像是镜子".',
		"我做了一个梦.在梦里,雨水不停的落下,直到淹没一切.淅淅沥沥的雨声从未停止,水,虽然是柔软的东西,但它也能摧毁那些坚硬无比的石头.城市被埋藏在地底,人们祈求着天晴,但雨从未停止",
		...options.newsa ? [
			// 剧透内容			
			"我们需要另外一位开发者来测试我们的时间流速,快来帮帮我们!",
			"如果你一条命通过了愚人节小游戏,那么你会获得一个成就,但这真的可能吗?",
			"敷衍地回答问题会把节目毙掉的!当然你能这么做,但我们的选项分布是均衡的",
			"质量越大,引力就会越大,距离越小,引力也会越大,那质量越大,距离就会越小吗?",
			"在某处普通的地方,有四个四被放在一个字母后面,这是偶然还是素数,还是自然对数底?",
			"如果你点了一千次都没办法打破这堵墙,那我堵你堵上我堵了一百年的冠状动脉也破不掉这堵墙",
			"如果你不完成所有成就,那么你就没办法获得最后一个成就,但你不完成最后一个成就,你应该就不算完成了全部成就,对吗?",
			"尝试在控制台输入`player._501.trig[5]=true`以获取一个*成就*!</button><input type='button' value='帮我输入' onclick='player._501.trig[5]=true' />",
		] : [],
		...options.newsv ? [
			// 低俗笑话
			"洛是谁,必这么达",
			"我看你就像个窦妞",
			"我操,用户彻底怒了",
			"宝贝,今天学历史了吗",
			"孩子们我们游戏18+分级",
			"我要对你倒苦水——死库水!",
			"专家最新发现:男人有格调",
			"你知道长沙发生了什么吗? 小沙发.",
			"以后我有钱了,我要让假几把玩斐济北",
			"冷知识:三只松鼠遇到我之前叫三只紧鼠",
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
			`俩吸血鬼在天上飞,一个吸血鬼看到另一个吸血鬼满嘴的血馋疯了,问:"你在哪整得这么多血?"" 另一个吸血鬼指着前面一栋大楼说:"看到那栋楼了吗?" "看到了." "他妈的,我刚刚没看到,操!"`,
			"我没要求你永远保持处女之身,我不是恶魔.可是,出轨是什么意思?你的贞操观念怎么了?你才21岁吧?再这样下去,你42岁出轨四次,84岁出轨八次,最后就变成八歧大蛇了.作为须佐能乎命,我可能得打败你,真的."
		] : [],
		...options.newsh ? [
			// 地狱笑话
			"旧首级?当然上转转啦",
			"我昨天让你删除的文件你怎么删了???",
			'双子塔跟比萨斜塔说"哥们,灵敏度发一下"',
			"你知道中国第一波玩崩铁的是谁吗?义和团",
			"人死后会变成星星,商鞅死后会变成麦克阿瑟",
			"有什么事情白人能做黑人不能做? Hey Dad.",
			"为什么黑人很少坐邮轮,因为他们知道吸取教训",
			"世界上最早受欢迎的爱豆是秦始皇,因为入坑的人多",
			"世界上最卷的地方是木乃伊博物馆,因为有的是人干",
			"路易十六不喜欢高斯,因为高斯的兄弟高德总叫他掉头",
			'媒体:"疫情使俄罗斯倒退了四十年" 普京:"还有这好事"',
			"如果你真的按某些新闻写的那么做了,那么很抱歉,你可能得重装系统了...",
			"史铁生用路易十六的身体将伯邑考装袋并推着霍金扛着商鞅走上了天堂的阶梯",
			"对立很有名气,当年光一个人砍她二十多刀都没叫一声的狠人,后面一问才知道第一刀砍到声带了",
			"一个孕妇挺着大肚子下楼梯,楼梯边一个鬼躲着准备吓她,突然一只手把鬼拖走暴打了一顿,边打边骂:你把我妈吓流产了,老子怎么投胎?",
			"我想,种族歧视真的是会遗传的,这种东西是内化的,有一天,我在路上看到了一个黑人,我下意识抓紧了我的钱包,尽管我知道他不可购买.最后他还是偷走了我的钱包",
		] : [],
		...options.newss ? [
			// 其他梗语
			"天哪这简直就是我",
			"这个机器人是真人吗",
			"white offers draw",
			"你妈马上就给你两角了",
			"别笑,你也过不了第二关",
			"Qxe1+ Rxe1 Rxe1+ Rxe1 Rxe1#",
			"我吃饱了,浑身是血,我死了,我是蚊子",
			"太好了,是QQ聊天记录,这下不得不信了",
			"教你们一个快速放空大脑的咒语:abandon",
			"很久很久以前有一个人叫小明,小明没听见",
			"管家说少爷已经很多年没笑过了,真是不笑子",
			"二次元的钱好赚,所以房子按平方米卖更赚米",
			"世界上有10种人,会二进制的和不会二进制的",
			"蚁酸是甲酸,但是乙酸居然是醋酸,这不神奇吗?",
			"这个问题弱智吗 A.弱智 B.若智 C.若只 D.弱只",
			'有没有发现"饕餮"两个字最下面都是"良"字(良子)',
			"我去,群主怎么变人了,我去,群主,你的管理员怎么没了",
			"多接触接触上流社会吧,我妈让我放八角,我直接放了一块",
			"你知道蝙蝠侠为什么遮了半张脸吗?他需要避免被警察通缉",
			"能给我推荐一款又流行又性感的帽子吗? 当然,流行性感冒!",
			"我发现我的生日居然和我出生的日子是同一天,真是匪夷所思",
			"猫耳是不能乱摸的哦..啊啊..是你啊!你的话应该没问题的哦",
			"学校的晚自习算不算怕我们玩太久手机把她忘了来玩强制爱呀",
			"Lap的妈妈有三个儿子,一个叫Nap,一个叫Map,最后一个叫什么?",
			"good和better一起上厕所,只有一个坑,better先上,因为它比较级",
			"喜欢别人怀里的女人是不是和喜欢的女人在别人怀里是一个状态(x)",
			"你好呀,这里是顺丰快递上门取件,你的取件码是多少?...什么,你没码?",
			"本人因太饿于是吃了2个汉堡8个鸡块5个地瓜丸2个鸡小腿2个鸡肉卷2杯可乐",
			"给我写个冷笑话吧. 好的......想不出来,我真的绞尽脑汁了. 给我喝一口.",
			"长方形,六边形,圆形和三角形经常一起吃饭,三角形总是最晚到的,因为全等三角形",
			"夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵夸我喵",
			"占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符",
			"今天是民国114年5月1日星期4,而且还有19分钟就是19:19:08.10,一生只能转一次",
			"西红柿问妈妈:妈妈我们到底是蔬菜还是水果?妈妈说:妈呀见鬼了西红柿居然会说话",
			"为什么地球online能开麦不让聊天框,挠馋游戏!还不给退款. 有的,拼多多可以仅退款.",
			"小信球～中不中啊,劲儿小嘞磕搀人,就这一会儿嚷可镇累了?某吃饭吧恁,孬种♡～孬种♡～",
			"我的肉体是我祖传基因的,我的思想是网上各种梗组成的,我还在努力工作孕育AI,请问我是谁?",
			"群友就像赛博猎犬,平时不看群,但看到什么好玩的就叼回来,导致经常叼回来两个一模一样的东西",
			"当时有一男一女两个老玩家直接就把游戏塞我手上了,我都没说要玩,结果游戏退不出来了,只能玩了",
			"什么东西白白的,长长的一条,里面还有一些填充物和最外层不一样,男人经常用它,抽了有害健康? 脊椎.",
			"一位勇士刚平躺在床上准备睡觉时,突然发现后背很痒,但他抓不到后背,没办法只能继续痒,因为永世不得翻身",
			"小学一年级,老师让我们把0到9分成两组,别人都是02468,13579.只有我是23468,01579.因为23468能组成绿一色",
			"解释笑点就像是解剖青蛙,你可以知道青蛙的内部构造,也会在以后见到类似的青蛙时有一个认识,但这只青蛙会死的透透的",
			"胃酸是硫酸还是硝酸? 盐酸. 怎么可能是盐酸?盐酸在我肚子里我不得咸死了吗? 你胃有味觉吗? 都胃觉了,胃怎么可能没有胃觉?",
			"某二游写角色技能是覆盖旧状态,但是不知道为什么写进了账号信息,于是开个技能你的账号就注销了变成新号了,反正不是我们游戏",
			"从ADSL的512K到光纤的10G,大概20年的时间,个人的上网带宽(即下载速度)增加了2万倍,平均每年1000倍,这实在是很惊人的增长速度",
			"别人对你说滚的时候怎么办?就像下棋一样,你要应招,对方对你走了滚这步棋,你就走母,你发一个母,这样对方的攻击全部化为泡影,你赢了",
			"之前在一个朋友的ba群里,结果一个管理发癫at全体成员说群友全是sb.我觉得这位管理挺sb的,于是我退群了.以后这种sb能不能离我远一些.",
			"你看,过多的垃圾文件会导致电脑严重卡顿,而你的C盘里存有数万个文件,你可以删除它们获得更流畅的系统体验.什么?删除不了?点那个格式化",
			"小明和朋友一起去医院,检查之后医生让小明先走,为什么?因为朋友医生一起走.下一次小明再和朋友去医院,却发现医生不走了,因为那些日子不再有",
			"根据野史记载,吴国和魏国在签订契约时为了防止被蜀国偷走,把契约原件藏在了装有五味花生的麻袋里,于是这个契约就变成了五味契约,又叫吴魏契约",
			`(脸红红的,眼睛里闪烁着幸福的光芒)人家也喜欢你,${player.global.name}.(害羞地低下头,双手揪着衣角)我会一直陪着你的.(抬起头,露出甜甜的笑容)`,
			"我是虐文女主,在被一个叫学校的家伙虐身虐心了五个月后我逃到了暑假家里.暑假对我很好,和他在一起我想去哪就去哪,想做什么就做什么.但有雄厚背景的学校不是我们两个人能抗衡的,不到两个月,学校便找到并从暑假身边夺走了我,于是接下来我又要面对五个多月的绝望的囚禁...",
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
		`<button onclick="playsound('g1')">Nothing can beat your 1001tree</button>`,
		'<img src="resources/bx.gif" />',
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
		"гRεε匚③つ≒？",
		"成就藏着秘密!!!",
		"9种颜色 9个夜晚!",
		"[Object object]",
		"∫ dx的结果是多少?",
		"这里没有任意的标语",
		"你踩到我的070190了!",
		"Freedown Dive↓↓↓↓↓",
		"CrossSiteScripting",
		"不要等失去才学会珍惜",
		"KiraKira☆DokiDoki",
		"this=1 this'=0 '=0",
		"1001tree.github.io",
		"我不想干活 我要写标语",
		"Today is 4.1 right?",
		"I loved 100 people!",
		"v1.797693134862e+308",
		"There is O game here",
		"Go to 127.0.0.1:5500",
		"哦哈啊啊啦咯嚓嚓吧喏啦",
		"this=x this'=1 '=1/x",
		"EMBRACE the NIGHT!!!",
		"I dedi becosof my bab",
		"I feel it in my b*ood",
		"Try to catch me there",
		"f(x)=x^x,g(x)=f(f(x))",
		"Mindcraft : Dream Edit",
		"我们真的在用您的电脑挖矿!",
		"不敢睁开眼,希望是我的幻觉",
		"Also try the sleep tree",
		"this=x^2 this'=2x '=2/x",
		"你见过凌晨四点的1001树吗?",
		"A▷∫⊥ГAÇ⊥ ÇΗA○∫A▷イ∫∫",
		"your computer is in 90°",
		"你看到这句话的频率不再为0!",
		"Never gonna let you dive↓",
		"There is some tips in news",
		"qwertyuiopasdfghjklzxcvbnm",
		"含1001(2)+2↑↑3个小游戏的游戏",
		"God damn why is it so hard?",
		"150 bpm for 400000 minutes!",
		"We have storngest Developers!",
		"this=x^n this'=nx^(n-1) '=n/x",
		"this=∫f(x)dx this'=f(x) '=1/∫dx",
		"The 1001-Tree Team made this one",
		"We think you’re gonna like it here.",
		"this=x^x this'=x^x(lnx+1) '=1/(lnx+1)",
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

// 简单题目组
function getProblemList() {
	return [
		{
			problem: '已知三角形ABC内接于圆O, AB=AC, ∠BAC=42°, D是圆上一点, 若BD是圆O直径, 连接CD, 求∠DBC大小? <br> <img src="../pic/prob1.jpg" width="250px"/>',
			options: ['48°', '42°', '52°', '38°'], answer: 21
		}, {
			problem: '你执白方,这道题是一个n步杀,请问杀着是什么 <br><img src="../pic/prob2.jpg" width="250px"/>',
			options: ['Qf2+', 'Qg2#', 'f1=Q#', 'Qxh1#'], answer: 22
		}, {
			problem: '谁是这个游戏的第一个开发者?',
			options: ['hevipelle', 'QHLG', 'Napper Rinator', 'QqQe308'], answer: 22
		}, {
			problem: '方程 2x-7=4 的解是?',
			options: ['x=-11', 'x=11', 'x=11/2', 'x=-11/2'], answer: 23
		}, {
			problem: '用科学计数法表示 2e(3e2) 是?',
			options: ['3e200', '200e3', '300e2', '2e300'], answer: 24
		}, {
			problem: '声望树重制版中,第三行从左往右数第2个层级是什么?',
			options: ['时间胶囊', '超级增幅器', '增强子', '空间能量'], answer: 21
		}, {
			problem: '小明第1天开始有0个金币,并每天结束时获得50个,超过200个后,金币获取x0.3,第21天结束时小明手里有多少金币?',
			options: ['390', '455', '440', '470'], answer: 22
		}, {
			problem: '求 2sin30°+tan60°-cos60° 的值',
			options: ['(1+√3)/2', '1/2-√3', '1/2+√3', '(1-√3)/2'], answer: 23
		}, {
			problem: '这个节目叫什么?',
			options: ['1001夜电视台', '趣味问答', 'Tenna先生的电视秀', '十一夜电视台'], answer: 24
		}, {
			problem: '速度是什么与什么的比值?',
			options: ['路程,时间', '时间,路程', '路程,质量', '密度,时间'], answer: 21
		}, {
			problem: '泳池只注水3小时注满,只放水5小时放空,同时注水和放水需要多长时间注满泳池?',
			options: ['15小时', '7.5小时', '5小时', '3小时'], answer: 22
		}, {
			problem: '已知等边三角形ABC,下列说法正确的是',
			options: [
				'∠A=45°',
				'AB=2BC',
				'该三角形的内心,重心,垂心在同一点上',
				'该三角形的高线,中线和外角平分线是同一条线段'
			], answer: 23
		}, {
			problem: '已知每秒有d时刻,每时刻有p概率获得1点数,每秒获得点数的期望是多少?',
			options: ['(1/20)dp', 'd(1-p)', '20dp', 'dp'], answer: 24
		}, {
			problem: '哪一个游戏没有上架steam?',
			options: ['协同放置', '脆皮', '旋转放置', '反物质维度'], answer: 21
		}, {
			problem: '为化学方程式填写缺失的系数<br>2CO+O<sub>2</sub>=___CO<sub>2</sub>',
			options: ['1', '2', '3', '4'], answer: 22
		}, {
			problem: '哪个数字引发了第一次数学危机?',
			options: ['-1', 'i', '√2', '1/2'], answer: 23
		}, {
			problem: '世界读书日是在哪一天?',
			options: ['3.23', '5.10', '4.21', '4.23'], answer: 24
		}, {
			problem: '以下哪个不是编程语言?',
			options: ['Turbowarp', 'Python', 'C++', 'Javascript'], answer: 21
		}, {
			problem: '这个单词:panic,是什么意思?',
			options: ['野餐', '使恐慌', '梦', '痛苦'], answer: 22
		}, {
			problem: '这个单词:assemble,是什么意思?',
			options: ['假设', '制造', '组装', '食物'], answer: 23
		}, {
			problem: '这个单词:destruction,是什么意思?',
			options: ['建造', '数量', '结构', '毁灭'], answer: 24
		}, {
			problem: '这个单词:consumption,是什么意思?',
			options: ['消费', '习惯', '组织', '团结的'], answer: 21
		}, {
			problem: '本游戏开始开发的这年是哪一年?',
			options: ['2023', '2025', '2024', '2026'], answer: 22
		}, {
			problem: '有222个节点的完全二叉树最多有几层(根节点层数为1)?',
			options: ['6', '7', '8', '9'], answer: 23
		}, {
			problem: '秦时明月汉时关,下一句是?',
			options: ['燕然未勒归无计', '夜半钟声到客船', '征战沙场几人回', '万里长征人未还'], answer: 24
		}, {
			problem: '1988年,老布什,里根和戈尔巴乔夫三人在新建成的纽约世贸双子塔前拍了照片,照片中的谁先去世?',
			options: ['老布什', '双子塔', '里根', '戈尔巴乔夫'], answer: 22
		}, {
			problem: 'TMT自带的资源软上限开始于?',
			options: ['e1e6', 'e1e5', 'e1e7', 'e1e8'], answer: 23
		}, {
			problem: '你要回答的一共有多少道题目?',
			options: ['10', '20', '30', '40'], answer: 24
		}, {
			problem: '一斤铁和一斤棉花哪个重?',
			options: ['一样重', '铁重', '棉花重', '一斤重'], answer: 21
		}, {
			problem: '将十进制数308用二进制表达是多少?',
			options: ['111001011', '100110100', '110011011', '100011011'], answer: 22
		}, {
			problem: '我们常说的"Infinite"实际上是多少?',
			options: ['1.797e308', 'e9e15', '2^1024', '10^999'], answer: 23
		}, {
			problem: '一元二次方程 x^2-2x+1=0 的解的情况是?',
			options: ['无实数根', '一个实数根', '两个不相等实数根', '两个相等实数根'], answer: 24
		}, {
			problem: '葛立恒数是指?',
			options: ['G(64)', 'BB(5)', '3^^^4', '10^100'], answer: 21
		}, {
			problem: '如果 a+b=3, ab=2, 求 a^2+b^2 的值',
			options: ['4', '5', '6', '7'], answer: 22
		}, {
			problem: '连续抛硬币16次,正面向上的概率为?',
			options: ['1/32768', '1/2147483647', '1/65536', '1/65535'], answer: 23
		}, {
			problem: '能否找出两个不同质数p,q,使得 (p+1)^q 也是质数',
			options: ['能,但这些数人类仍未找到', '能,但是它们都相当大', '这样的数有且仅有一组', '不能'], answer: 24
		}, {
			problem: '计算 8/(a^2-4)+2/(a+2) 的值',
			options: ['2/(a-2)', '2', 'a+2', '(a+2)/(a^2-4)'], answer: 21
		}, {
			problem: '1×2×3×4×5=?',
			options: ['15', '5!', '12!!', '24!!!'], answer: 22
		}, {
			problem: '哪年世界杯阿根廷夺冠?',
			options: ['1974', '2012', '1978', '1998'], answer: 23
		}, {
			problem: '在10p1sc游戏中,一共有多少层软上限?',
			options: ['13', '14', '15', '16'], answer: 24
		}, {
			problem: '销量最高的游戏是?',
			options: ['GTA5', 'Minecraft', '塞尔达传说:旷野之息', '荒野大镖客2'], answer: 22
		}, {
			problem: '空气中含量最多的物质是?',
			options: ['氧气', '二氧化碳', '氮气', '空气'], answer: 23
		}, {
			problem: '假如昨天是明天,那么今天是周六,今天实际上是周几?',
			options: ['周五', '周日', '周六', '周一'], answer: 24
		}, {
			problem: '1=4,2=8,3=16,4=?',
			options: ['其他三个全错', '32', '28', '24'], answer: 21
		}, {
			problem: 'Break_Eternity的存储上限?',
			options: ['e1e308', '1Fe308', '1F308', '1FF308'], answer: 22
		}, {
			problem: 'Lap的妈妈有三个儿子,一个叫Nap,一个叫Map,最后一个叫什么?',
			options: ['Lap', 'Oap', 'Cap', 'Tap'], answer: 21
		}, {
			problem: '下列最接近实际的是',
			options: [
				'作者们花了5年做这个游戏',
				'这个树使用的TMT版本是1.3.1',
				'2^31比3^31小1^31',
				'0.1+0.2=0.30000000000000004'
			], answer: 24
		},
		// addtion problem
		{
			problem: '一个集合内所有元素的各种排列组合方式一共有6种,这个集合有多少个元素?',
			options: ['720', '120', '24', '3'], answer: 24
		}, {
			problem: '为了检验您有没有在看这道题,请选择错误选项,以证明您读懂了题目',
			// 为了正确的回答,你不能证明你读懂了题目
			options: ['错误', '错误选项', '选项', '这题啥意思?'], answer: 24
		}, {
			problem: '我的Lichess Blitz ELO为1260,比28.4%的棋手更强,国际象棋的ELO初始分为1500,我的排名为428308,Lichess一共约有多少Blitz棋手?',
			options: ['4436619', '2131580', '1508126', '509890'], answer: 23
		}, {
			problem: '服从性测试:选那个不要选我,否则你会扣1分',
			// 选哪个"不要选我,否则你会扣1分"
			options: [
				'不要选我,否则你分数会清零',
				'不要选我,否则你会加2分',
				'不要选我,否则游戏现在结束',
				'不要选我,否则你会扣1分'
			], answer: 24
		}, {
			problem: 'It seems today, the all you see',
			options: [
				'is v-word on the TV and s-word on movie',
				'is s-word on the TV and v-word on movie',
				'is v-word on the movie and s-word on TV',
				'is s-word on the movie and v-word on TV'
			], answer: 23
		}, {
			problem: '如果你随机选择这题的一个选项,你的得分期望是?',
			options: ['2', '0.5', '0.25', '0'], answer: 23
		}, {
			problem: "国际象棋中Queen's Gambit Accepted开局的标志是?",
			options: ['2.d4 dxe4', '2.c4 dxc4', '2.e4 dxe4', '2.d4 cxd4'], answer: 22
		}, {
			problem: '以下选项在javascript中最与众不同的是',
			options: ['()=>{}', 'function(){}', 'eval()', 'new Function()'], answer: 23
		}, {
			problem: '简称为桂的省的省会是哪里',
			options: ['桂林', '南宁', '柳州', '桂平'], answer: 22
		}, {
			problem: '一个数据集满足数据对数呈正态分布,这个数据集中任取一个数据,首位最有可能是几?',
			options: ['0', '1', '5', '9'], answer: 22
		}, {
			problem: '人们说一个服务器烂的时候通常用什么植物形容它?',
			options: ['洋芋', '番茄', '北瓜', '荸荠'], answer: 21
		}, {
			problem: '一首歌的BPM为100,调式为4/4,这首歌的长度为134.4秒,这首歌一共有多少重拍',
			options: ['48', '64', '32', '56'], answer: 24
		}, {
			problem: '愚人节小游戏需要你坚持多少秒才能获得梦力?',
			options: ['350', '230', '260', '310'], answer: 22
		}, {
			problem: '选一个狐狸不觉得是幸运数字的数字',
			// I like 372559
			options: ['37', '59', '18', '25'], answer: 23
		}, {
			problem: '当一个没有什么计算机知识的人谈论内存时,实际上他有可能在说的最不可能是?',
			options: ['外存', '运行内存', '缓存', '闪存'], answer: 23
		}, {
			problem: '有人叫你滚的时候你应该说什么',
			// 当有人向你发滚,你就回母,你赢了
			options: ['你也配?', '对不起!', '妈!', '这么强?'], answer: 23
		}, {
			problem: '户山香澄的缩写是什么',
			options: ['rimi', 'ars', 'ksm', 'ran'], answer: 23
		}, {
			problem: '请不要点击<b style="color:#888">按钮</b>',
			options: [
				'<b style="color:#888">按钮</b>',
				'<b style="color:#888">按钮</b>',
				'<b style="color:#888">按</b><b style="color:#777">钮</b>',
				'<b style="color:#888">按钮</b>'
			], answer: 23
		}, {
			problem: '<a class="c204_1" href="https://photokit.com/colors/eyedropper" target="_blank">你懂的█</a>',
			// #8934c0 = 8991936
			options: ['9974976', '9000128', '8991880', '8991936'], answer: 24
		}, {
			problem: 'iq xahq kag',
			options: ['we love you', 'no more bad', 'go your mom', 'an good tap'], answer: 21
		}, {
			problem: '一个后加一个车的价值是多少分?',
			options: ['11', '12', '13', '14'], answer: 24
		},
	]
}

// 困难题目组
function getHardProblemList() {
	return [
		{
			problem: '已知抛物线的解析式为 y=(1/2)x^2-(3/2)x. A(3,0). P为抛物线上一点, 横坐标为-2, D在OA上, DF⊥OA, 交PA于点C, CF=CD, 点E在第二象限, 连接EC, EC⊥CD, 连接ED, 过E作ED的垂线, 交过F且平行于AC的直线于点G, 连接DG交AC于点M, 过点A作x轴的垂线, 交EC的延长线于点B, 交DG的延长线于点R, CM=(√2/3)RB, 连接RE并延长交抛物线于N, RA=RN, 点T在三角形ADM内, 连接AT,CT, ∠ATC=135°, DH⊥AT, 交AT的延长线于点H, HT=2DH,点T的坐标是?<br><img src="../pic/prob3.jpg" width="250px"/>',
			options: ['(31/17,5/17)', '((10√17)/17,√17)', '(5/31,5/17)', '(√17/10,5/31)'], answer: 21 // A=21 B=22 C=23 D=24
		}, {
			problem: '在TMT中,若想修改玩家所处的页面,可以使用哪个参数?',
			options: ['player.tabs', 'player.subtabs[层级].mainTabs', 'player.层级.tabs', 'player.层级.subtabs'], answer: 22,
		}, {
			problem: '反物质维度现实前的最后一次更新发表于何时?',
			options: ['2022.12.15', '2019.6.2', '2018.6.17', '2017.6.4'], answer: 23,
		}, {
			problem: '已知函数S(n)表示n的数位之和, 如S(321)=3+2+1=6. f(n)表示斐波那契数列的第n项, 其中f(1)=1,f(2)=1,f(3)=2. 求(S(f(1000))+S(f(999))+S(f(998))+....+S(f(2))+S(f(1))) mod 9的值',
			options: ['3', '2', '1', '0'], answer: 24,
		}, {
			problem: 'Galaxy.click上,编号580的游戏是?',
			options: ['The disencouragement tree', 'Karyofox', 'Reverse them all', 'The doors tree'], answer: 21,
		}, {
			problem: '子串包含所有k位二进制01串的字符串最小长度是?',
			options: ['2^k', '2^k+k-1', 'k^2+2k-1', '2^(k+1)'], answer: 22,
		}, {
			problem: '愚人节小游戏中, player._501.trig[3]代表哪种失败条件?',
			options: ['得到一个成就', '未遵循指示', '在5或12回合中点击不明显错误颜色的按钮', '忘却规则'], answer: 23,
		}, {
			problem: 'NTY ek56 U1RF UFE9P UT09',
			options: ['432529', '575612', '736455', '563725'], answer: 24,
		}, {
			problem: '牌堆里有a张A牌和b张B牌(a,b>0),从这个牌堆中拿走75张B牌(不能全拿也不能不拿),且1/[(a/b)+(b/a)+2]的值不变,a的最大值为多少?',
			options: ['1406', '5625', '1369', '1444'], answer: 21,
		}, {
			problem: '这里有几个夜晚,所以今天是第几夜?',
			options: ['1001', '3', '11', '2'], answer: 22,
		}, {
			problem: '自然数基数集和实数基数集之间是否存在别的基数?',
			options: ['有,但是人类还没发现', '没有', '我不知道啊,问康托尔去', '什么是自然数?'], answer: 23,
		}, {
			problem: '以下没有在新闻中出现的是',
			options: [player.global.mynews, 'abandon', 'format c: /q', '闲鱼回收二手货'], answer: 24,
		}, {
			problem: '以下没有在新闻中出现的是',
			options: ['1+1=2', '血腥的晚餐', 'shift+1', '为了得到而失去'], answer: 21,
		}, {
			problem: '以下没有在新闻中出现的是',
			options: ['285222', '23648', '4925', '114514'], answer: 22,
		}, {
			problem: '以下没有在新闻中出现的是',
			options: ['可爱的拜谢酱', 'HCl', '炮二平五', '线性增长=指数增长/x'], answer: 23,
		}, {
			problem: '以下没有在标语中出现的是',
			options: ['可爱的拜谢酱', '070190', 'this.value', 'embrace the night'], answer: 24,
		}, {
			problem: '以下没有在标语中出现的是',
			options: ['live server默认端口', '九层妖塔', '自由潜泳', '秘密'], answer: 24,
		}, {
			problem: '这个单词:lamprophony, 是什么意思?',
			options: ['实验室', '声音响亮的', '预言', '生疏的'], answer: 22,
		}, {
			problem: '这个单词:thyroxine, 是什么意思?',
			options: ['蛋白质', '猪肉杆菌', '甲状腺素', '奶制品中毒'], answer: 23,
		}, {
			problem: '以下单词中,和其他不同的是?',
			options: ['jetty', 'lucre', 'auspice', 'accurate'], answer: 24,//最后一个是四级词汇，其他是专八 回复:???	
		}, {
			problem: '以下单词中,和其他不同的是?',
			options: ['admire', 'boundary', 'favour', 'waist'], answer: 21//第一个是必修一词汇，其他是选修一 回复:???	
		}, {
			problem: '求方程(a/b+c)+(b/a+c)+(c/a+b)=4的已知最小整数解中a的值?',
			options: ['154476802108746166444331315019919<br>837485661423469565431700026634898<br>253202009877999',
				'154476802108746166441951315019919<br>837485664325669565431700026634898<br>253202035277999',
				'154429382108746166441951315019919<br>837485664325669563232000026634898<br>253202035279999',
				'154476802108746166441951315019919<br>837485664325669565431700026634898<br>253202035077999'], answer: 22
		}, {
			problem: '<span style = "color: #c11077">你懂的█</b>',
			options: ['<span style = "color: #c11076">选项█</span>', '<span style = "color: #c11077fe">选项█</span>', '<span style = "color: #c11077">选项█</span>', '<span style = "color: #c01077">选项█</vpan>'], answer: 23
		}, {
			problem: '小明一开始有1金币,每秒获得1e200金币,经过软上限折算后1000s最终有1e201+1金币,该软上限可能是?',
			options: ['金币获取开平方根', '超过9e200金币后,获取除以990', '金币获取/1000', '金币获取/100'], answer: 24
		}, {
			problem: '求 (¬r∧(p∨q))∨(p∧q) 的合取范式?',
			options: ['(¬r∨p)∧(¬r∨q)∧(p∨q)', '(¬r∨p)∧(¬r∨q)', '(¬p∨q)∧(¬r∨(p∧q))', '(¬r∨p∨q)∧(p∨q)'], answer: 21,
		}, {
			problem: 'Lap的妈妈有三个儿子,一个叫Map,一个叫Nap,另一个的性别是?',
			options: ['女', '男', '无', '中'], answer: 22,
		}, {
			problem: '命题 ∃x 的哥德尔数是?',
			options: ['23328', '13286025', '25509168', '98876953125'], answer: 23,
		}, {
			problem: '如果昨天是后天,前天的昨天是周二的明天,今天实际上是周几?',
			options: ['周六', '周五', '周四', '周三'], answer: 24,
		}, {
			problem: '下列层级最多的是?',
			options: ['1 points = 1 layer', '声望树重制版', '生命树', '增量宇宙树'], answer: 21,
		}, {
			problem: '下列哪个数字和其他的不同?',
			options: ['-1', 'e', 'ln(1)', 'log10(10)'], answer: 22,
		}, {
			problem: '下列哪个数字和其他的不同?',
			options: ['e^π', 'e^i', 'e^iπ', 'e^e'], answer: 23,
		}, {
			problem: '为化学方程式填入缺失的系数:<br>__KMnO<sub>4</sub>+__FeCl<sub>2</sub>+__H<sub>2</sub>SO<sub>4</sub>=__K<sub>2</sub>SO<sub>4</sub>+__MnSO<sub>4</sub>+__Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>+__Cl<sub>2</sub>+__H<sub>2</sub>O',
			options: ['14 5 10 6 3 6 8 20', '2 3 4 2 10 5 7 11', '3 5 12 1 10 5 12 24', '6 10 24 3 6 5 10 24'], answer: 24,
		}, {
			problem: '公元1年1日(含自身)到2025年9月2日(含自身)一共多少天?',
			options: ['739498', '739508', '749123', '745301'], answer: 21,
		}, {
			problem: 'Exponential Idle中理论9所需σ数量是?',
			options: ['5', '10', '20', '40'], answer: 24,
		}, {
			problem: 'Unnamed space idle中区域24B的boss船体血量为',
			options: ['3.11e20', '3.46e19', '1.54e19', '1.14e19'], answer: 22,
		}, {
			problem: 'Antimatter Dimensions中第2个佩勒裂缝使用什么资源填充',
			options: ['IP', '复制器', 'EP', 'DT'], answer: 22,
		}, {
			problem: '基本原理中,第一个原子的初始花费是多少?',
			options: ['24', '16', '3', '32'], answer: 21,
		}, {
			problem: 'Phigros中Stardust:RAY IN有多少个drag?',
			options: ['609', '434', '250', '99'], answer: 22,
		}, {
			problem: '选一个狐狸喜欢的数字',
			options: ['37', '11', '23', '56'], answer: 21,
		}, {
			problem: '吃披萨时把披萨卷起来的原因是?',
			options: ['这样好吃', '满足刚体力学', '高斯绝妙定理', '费马最后定理'], answer: 23,
		}, {
			problem: '好了我出不下去了,这题你只要选D我就给你分....抱歉,选项被打乱了....',
			options: ['A', 'B', 'C', 'D'], answer: 24
		}, {
			problem: '在任意四维球表面随机选取5个仿射无关的点组成一个四维单纯形, 这个四维单纯形包含四维球球心的概率是多少?',
			options: ['1/2','1/4','1/16','1/64'], answer: 23
		}, {
			problem: '十进制数字-38的二进制补码是多少?',
			options: ['10110111','01101101','11011010','01110111'], answer: 23
		}
	]
}

function getBlockTraits(id) {
	return {
		//背景
		"000": {},
		//道路
		"001": { move: true },
		//上楼
		"002": { affect: true },
		//下楼
		"003": { affect: true },
		//墙
		"010": {},
		//碎墙
		"011": { affect: true },
		//图鉴
		"020": { affect: true },
		//信息
		"021": { affect: true },
		//按钮
		"030": { affect: true },
		//激活的按钮
		"031": { affect: true },
		//关闭的门
		"100": {},
		//开启的门
		"101": { move: true },
	}[id]
}

let getMap = {
	0: {
		map: [
			["010", "020", "010", "010", "010", "010"],
			["010", "001", "001", "001", "002", "010"],
			["010", "021", "010", "010", "010", "010"],
		],
		data: [
			{ x: 1, y: 0, trans: "010", text: "你在一片虚无中醒来...<br>这里只有一个问号和一个感叹号,你不知道这是干嘛用的" },
			{ x: 1, y: 2, trans: "010", manual: ["001", "002"], text: "你可以通过这个方块来解锁新的方块,只需要与它交互" },
			{ x: 4, y: 1, goto: [1, { x: 1, y: 1 }] },
		]
	}
}