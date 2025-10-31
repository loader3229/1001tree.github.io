var systemComponents = {
	'tab-buttons': {
		props: ['layer', 'data', 'name'],
		template: `
			<div class="upgRow">
				<div v-for="tab in Object.keys(data)">
					<button v-if="data[tab].unlocked == undefined || data[tab].unlocked" v-bind:class="{tabButton: true, notify: subtabShouldNotify(layer, name, tab), resetNotify: subtabResetNotify(layer, name, tab)}"
					v-bind:style="[{'border-color': tmp[layer].color}, (subtabShouldNotify(layer, name, tab) ? {'box-shadow': 'var(--hqProperty2a), 0 0 20px '  + (data[tab].glowColor || defaultGlow)} : {}), tmp[layer].componentStyles['tab-button'], data[tab].buttonStyle]"
						v-on:click="function(){player.subtabs[layer][name] = tab; updateTabFormats(); needCanvasUpdate = true;}">{{tab}}</button>
				</div>
			</div>
		`
	},

	'tree-node': {
		props: ['layer', 'abb', 'size', 'prev'],
		template: `
		<button v-if="nodeShown(layer)"
			v-bind:id="layer"
			v-on:click="function() {
				if (shiftDown && options.forceTooltips) player[layer].forceTooltip = !player[layer].forceTooltip
				else if(tmp[layer].isLayer) {
					if (tmp[layer].leftTab) {
						showNavTab(layer, prev)
						showTab('none')
					}
					else
						showTab(layer, prev)
				}
				else {run(layers[layer].onClick, layers[layer])}
			}"


			v-bind:class="{
				treeNode: tmp[layer].isLayer,
				treeButton: !tmp[layer].isLayer,
				smallNode: size == 'small',
				[layer]: true,
				tooltipBox: true,
				forceTooltip: player[layer].forceTooltip,
				ghost: tmp[layer].layerShown == 'ghost',
				hidden: !tmp[layer].layerShown,
				locked: tmp[layer].isLayer ? !(player[layer].unlocked || tmp[layer].canReset) : !(tmp[layer].canClick),
				notify: tmp[layer].notify && player[layer].unlocked,
				resetNotify: tmp[layer].prestigeNotify,
				can: ((player[layer].unlocked || tmp[layer].canReset) && tmp[layer].isLayer) || (!tmp[layer].isLayer && tmp[layer].canClick),
				front: !tmp.scrolled,
			}"
			v-bind:style="constructNodeStyle(layer)">
			<span class="nodeLabel" v-html="(abb !== '' && tmp[layer].image === undefined) ? abb : '&nbsp;'"></span>
			<tooltip
      v-if="tmp[layer].tooltip != ''"
			:text="(tmp[layer].isLayer) ? (
				player[layer].unlocked ? (tmp[layer].tooltip ? tmp[layer].tooltip : formatWhole(player[layer].points) + ' ' + tmp[layer].resource)
				: (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : '达到 ' + formatWhole(tmp[layer].requires) + ' ' + tmp[layer].baseResource + ' 来解锁 (你有 ' + formatWhole(tmp[layer].baseAmount) + ' ' + tmp[layer].baseResource + ')')
			)
			: (
				tmp[layer].canClick ? (tmp[layer].tooltip ? tmp[layer].tooltip : 'I am a button!')
				: (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : 'I am a button!')
			)"></tooltip>
			<node-mark :layer='layer' :data='tmp[layer].marked'></node-mark></span>
		</button>
		`
	},


	'layer-tab': {
		props: ['layer', 'back', 'spacing', 'embedded'],
		template: `<div v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]" class="noBackground">
		<div v-if="back"><button v-bind:class="back == 'big' ? 'other-back' : 'back'" v-on:click="goBack(layer)">←</button></div>
		<div v-if="!tmp[layer].tabFormat">
			<div v-if="spacing" v-bind:style="{'height': spacing}" :key="this.$vnode.key + '-spacing'"></div>
			<infobox v-if="tmp[layer].infoboxes" :layer="layer" :data="Object.keys(tmp[layer].infoboxes)[0]":key="this.$vnode.key + '-info'"></infobox>
			<main-display v-bind:style="tmp[layer].componentStyles['main-display']" :layer="layer"></main-display>
			<div v-if="tmp[layer].type !== 'none'">
				<prestige-button v-bind:style="tmp[layer].componentStyles['prestige-button']" :layer="layer"></prestige-button>
			</div>
			<resource-display v-bind:style="tmp[layer].componentStyles['resource-display']" :layer="layer"></resource-display>
			<milestones v-bind:style="tmp[layer].componentStyles.milestones" :layer="layer"></milestones>
			<div v-if="Array.isArray(tmp[layer].midsection)">
				<column :layer="layer" :data="tmp[layer].midsection" :key="this.$vnode.key + '-mid'"></column>
			</div>
			<clickables v-bind:style="tmp[layer].componentStyles['clickables']" :layer="layer"></clickables>
			<buyables v-bind:style="tmp[layer].componentStyles.buyables" :layer="layer"></buyables>
			<upgrades v-bind:style="tmp[layer].componentStyles['upgrades']" :layer="layer"></upgrades>
			<challenges v-bind:style="tmp[layer].componentStyles['challenges']" :layer="layer"></challenges>
			<achievements v-bind:style="tmp[layer].componentStyles.achievements" :layer="layer"></achievements>
			<br><br>
		</div>
		<div v-if="tmp[layer].tabFormat">
			<div v-if="Array.isArray(tmp[layer].tabFormat)"><div v-if="spacing" v-bind:style="{'height': spacing}"></div>
				<column :layer="layer" :data="tmp[layer].tabFormat" :key="this.$vnode.key + '-col'"></column>
			</div>
			<div v-else>
				<div class="upgTable" v-bind:style="{'padding-top': (embedded ? '0' : '25px'), 'margin-top': (embedded ? '-10px' : '0'), 'margin-bottom': '24px'}">
					<tab-buttons v-bind:style="tmp[layer].componentStyles['tab-buttons']" :layer="layer" :data="tmp[layer].tabFormat" :name="'mainTabs'"></tab-buttons>
				</div>
				<layer-tab v-if="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :layer="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :embedded="true" :key="this.$vnode.key + '-' + layer"></layer-tab>
				<column v-else :layer="layer" :data="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].content" :key="this.$vnode.key + '-col'"></column>
			</div>
		</div></div>
			`
	},

	'overlay-head': {
		template: `
		<div class="overlayThing" style="padding-bottom:7px; width: 90%; z-index: 1000; position: relative">
			<div v-for="thing in tmp.displayNews" class="overlayThing"><span v-if="thing" v-html="thing"></span></div>
			<span class="overlayThing">已完成 </span>
				<h2 class="overlayThing" id="points">{{formatWhole(player.points)}}</h2>
				<span class="overlayThing"> {{modInfo.pointsName}}</span>
			<br>
			<div v-for="thing in tmp.displayThings" class="overlayThing"><span v-if="thing" v-html="thing"></span></div>
			
		</div>
	`
	},

	'info-tab': {
		template: `
        <div>
        <h2>{{modInfo.name}}</h2>
        <br>
        <h3>{{VERSION.withName}}</h3>
		<br>
        <span>
            <br>
            开发<br>
			乾狐离光<br>
			userincre<br>
			banana3864<br>
			Chara404<br>
			loader3229<br>
			Dr丶晨曦公主<br>
        </span>
        <span>
            <br>
            文案<br>
			夏鸣 乾狐<br>
        </span>
        <span>
            <br>
            测试<br>
			奇硅箱 寿司 ＾＿＾ 枫梦 风中一尘 NiGht_Zx2H<br>
        </span>
		<span>
			<br>
			吉祥物<br>
			超绝无敌螺旋升天美少女Super窝窝钉！<br>
		</span>
        <br>
        <ct>
            游玩 {{player.global.name}}
		</ct>
		<br><br>
		您希望我们称呼您为什么?
		<br>
		<input type="text"
 			maxlength="10"
 			size="15" 
			placeholder="请在此处输入名字"
			onchange="
				player.global.name = this.value
			"></input>
		<br>
        <br>
		本游戏基于模组树汉化制作<br>
        The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '14px', 'display': 'inline'}" >{{TMT_VERSION.tmtNum}}</a> by Acamaeda and FlamemasterNXF
        <br>
        The Prestige Tree made by Jacorb and Aarex
		<br><br>
		部分素材(包括背景音乐,音效,图片)来源于网络,如有侵权,请联系开发组删除
		<br><br>
		<div class="link" onclick="showTab('changelog-tab')">更新日志</div><br>
        <span v-if="modInfo.discordLink"><a class="link" v-bind:href="modInfo.discordLink" target="_blank">{{modInfo.discordName}}</a><br></span>
        <a class="link" href="https://discord.gg/F3xveHV" target="_blank" v-bind:style="modInfo.discordLink ? {'font-size': '16px'} : {}">模组树服务器</a><br>
        <a class="link" href="http://discord.gg/wwQfgPa" target="_blank" v-bind:style="{'font-size': '16px'}">主声望树服务器</a><br>
		<br><br>
        游玩时间: {{ formatTime(player.timePlayed) }}<br><br>
        <h3>热键</h3><br>
		<ct>25个游戏刚好对应25个键,但还有一个键我们不知道选谁,感觉去掉谁都不好,所以没选热键,你信吗<br>反正我不信,你信的话看一下下面,不信也看一下下面</ct>
        <span v-for="key in hotkeys" v-if="player[key.layer].unlocked && tmp[key.layer].hotkeys[key.id].unlocked"><br>{{key.description}}</span></div>
		
		`
	},

	'options-tab': {
		template: `
        <table>
			<tr>
				<td><button class="info" disabled>展开设置</button></td>
                <td><button class="opt" onclick="toggleOpt('saveclass');">存档相关<br>{{ formatOption('saveclass') }}</button></td>
                <td><button class="opt" onclick="toggleOpt('themeclass');">主题设置<br>{{ formatOption('themeclass') }}</button></td>
                <td><button class="opt" onclick="toggleOpt('tmtclass');">功能样式<br>{{ formatOption('tmtclass') }}</button></td>
                <td><button class="opt" onclick="toggleOpt('newclass');">新闻设置<br>{{ formatOption('newclass') }}</button></td>
                <td><button class="opt" onclick="toggleOpt('pauseclass');">游戏暂停<br>{{ formatOption('pauseclass') }}</button></td>
			</tr>
			<tr>
			<br>
			</tr>
            <tr v-if="options.saveclass">
				<td><button class="info" disabled>存档操作</button></td>
                <td><button class="opt" onclick="save()">保存</button></td>
                <td><button class="opt" onclick="toggleOpt('autosave')">自动保存<br>{{ formatOption('autosave') }}</button></td>
                <td><button class="opt" onclick="exportSave()">导出存档<br/>到剪贴板</button></td>
                <td><button class="opt" onclick="exportSave(true)">导出存档<br/>到文件</button></td>
                <td><button class="opt" onclick="importSave()">导入存档</button></td>
			</tr>
            <tr v-if="options.saveclass">
				<td><button class="info" disabled>除错</button></td>
                <td><button class="opt" onclick="save();window.location.reload();">保存并<br>刷新页面</button></td>
				<td></td>
				<td><button class="info" disabled>危险区</button></td>
                <td><button class="opt" onclick="hardReset()">硬重置</button></td>
				<td><button class="opt" onclick="player.你是不是觉得这个会炸档但是其实它不会而且你还不会获得一个成就因为这个伎俩我早就在睡觉树用过了众所周知一个聪明人不会两次用同样的伎俩哈哈哈 = NaN">一键崩溃</button></td>
            </tr>
			<tr v-if="options.saveclass">
			<br>
			</tr>

            <tr v-if="options.themeclass">
				<td><button class="info" disabled>个性化</button></td>
                <td><button class="opt" onclick="switchTheme()">主题<br>{{ getThemeName() }}</button></td>
                <td><button class="opt" onclick="adjustFont()">字体<br>{{ FONT_DISPLAYS[FONT_SETTINGS.indexOf(options.font)] }}</button></td>
                <td><button class="opt" onclick="
				    const input = document.createElement('input');
    				input.type = 'file';
    				input.accept = 'image/jpeg,image/png';
    				input.onchange = function(e) {
    				    const file = e.target.files[0];
    				    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    				        const reader = new FileReader();
    				        reader.onload = function(event) {
    				            options.bgi = event.target.result;
    				        };
    				        reader.readAsDataURL(file);
    				    }
    				};
    				input.click();
				">设置背景图<br>可能造成卡顿</button></td>
                <td><button class="opt" onclick="options.bgi=null">清除背景图</button></td>
                <td><button class="opt" onclick="toggleOpt('notrans');setTransitions()">防换主题卡顿<br>取消渐变动画<br>{{ formatOption('notrans') }}</button></td>
            </tr>
            <tr v-if="options.themeclass">
				<td><button class="info" disabled>组件</button></td>
				<td><button class="opt" onclick="toggleOpt('tipshown')">主页面提示<br>{{ formatOption('tipshown') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('songshown')">BGM显示<br>{{ formatOption('songshown') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('songautoplay')">BGM自动播放<br>{{ formatOption('songautoplay') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('sloganshown')">标语显示<br>{{ formatOption('sloganshown') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('newsshown');reinitializeNews();">新闻显示<br>{{ formatOption('newsshown') }}</button></td>
            </tr>
			<tr v-if="options.themeclass">
			<br>
			</tr>

            <tr v-if="options.tmtclass">
				<td><button class="info" disabled>显示</button></td>
                <td><button class="opt" onclick="adjustCount()">计数法<br>{{ COUNT_DISPLAYS[COUNT_SETTINGS.indexOf(options.count)] }}<br>文本描述不支<br>持特殊计数法</button></td>
                <td><button class="opt" onclick="toggleOpt('forceOneTab'); needsCanvasUpdate = true">页面布局<br>{{ options.forceOneTab ? "强制单页面" : "优先双页面 窄屏单页面" }}</button></td>
                <td><button class="opt" onclick="toggleOpt('hcmode')">世界选择器<br>{{ options.hcmode?"易读模式":"普通模式" }}</button></td>
                <td><button class="opt" onclick="toggleOpt('hqTree')">高质量的树<br>{{ formatOption('hqTree') }}</button></td>
                <td><button class="opt" onclick="adjustMSDisp()">显示里程碑<br>{{ MS_DISPLAYS[MS_SETTINGS.indexOf(options.msDisplay)] }}</button></td>
			</tr>
            <tr v-if="options.tmtclass">
				<td></td>
                <td><button class="opt" onclick="toggleOpt('hideChallenges')">已完成挑战<br>{{ options.hideChallenges?"隐藏":"显示" }}</button></td>
                <td><button class="opt" onclick="toggleOpt('hideMilestonePopups')">里程碑<br>完成提示<br>{{ options.hideMilestonePopups?"隐藏":"显示" }}</button></td>
				<td><button class="opt" onclick="toggleOpt('forceTooltips')">Shift+左键<br>锁定提示栏<br>{{ formatOption('forceTooltips') }}</button></td>
			</tr>
            <tr v-if="options.tmtclass">
				<td><button class="info" disabled>游戏</button></td>
                <td><button class="opt" onclick="toggleOpt('hideWorld')">已完成世界<br>{{ options.hideWorld?"隐藏":"显示" }}</button></td>
                <td><button class="opt" onclick="toggleOpt('autopause')">完成世界<br>自动暂停<br>{{ formatOption('autopause') }}</button></td>
                <td><button class="opt" onclick="toggleOpt('achivement')">成就<br>{{ options.achivement?"隐藏":"显示" }}</button></td>
			</tr>
			<tr v-if="options.tmtclass">
			<br>
			</tr>

            <tr v-if="options.newclass">
				<td><button class="info" disabled>新闻内容</button></td>
				<td><button class="opt" onclick="
					if (!options.newsa) {
						let p = confirm('您确定打开成就剧透吗?这可能影响到您的游戏体验!');
						if (!p) return
					}
					toggleOpt('newsa');reinitializeNews();
					">成就剧透<br>{{ formatOption('newsa') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('newsv');reinitializeNews();">低俗笑话<br>{{ formatOption('newsv') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('newsh');reinitializeNews();">地狱笑话<br>{{ formatOption('newsh') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('newsp');reinitializeNews();">特殊样式<br>{{ formatOption('newsp') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('newsn');reinitializeNews();">其他梗语<br>{{ formatOption('newsn') }}</button></td>
            </tr>
            <tr v-if="options.newclass">
				<td><button class="info" disabled>新闻操作</button></td>
				<td><button class="opt" onclick="news.fadeStartTime=new Date('2005-05-09')">切换新闻</button></td>
				<td><button class="opt" onclick="adjustSpeed()">新闻速度<br>{{ NEWSSPEED_DISPLAYS[NEWSSPEED_SETTINGS.indexOf(options.newsspeed)] }}</button></td>
				<td><button class="opt" onclick="alert('用户自定义新闻重置完毕');player.global.mynews='请输入文本';reinitializeNews();">重置我的新闻</button></td>
				<td><button class="opt" onclick="alert('当前已选中新闻列表已输出至控制台');console.log(getNewsList(),'部分内容来源网络,侵联删,谢谢!')">获取新闻列表</button></td>
				<td><button class="opt" onclick='alert(\`请前往"关于"中的1001树游戏群并联系管理员\`)'>贡献新闻</button></td>
            </tr>
			<tr v-if="options.newclass">
			<br>
			</tr>
			
            <tr v-if="options.pauseclass">
				<td><button class="info" disabled>暂停仍可交互<br>仅禁止刻更新</button></td>
				<td><button class="opt" onclick="player.pause[101]=!player.pause[101]">{{ getGameName(101)[0] }}<br>暂停:{{ formatBoolean(player.pause[101]) }}</button></td>
				<td><button class="opt" onclick="player.pause[102]=!player.pause[102]">{{ getGameName(102)[0] }}<br>暂停:{{ formatBoolean(player.pause[102]) }}</button></td>
				<td><button class="opt" onclick="player.pause[103]=!player.pause[103]">{{ getGameName(103)[0] }}<br>暂停:{{ formatBoolean(player.pause[103]) }}</button></td>
				<td><button class="opt" onclick="player.pause[104]=!player.pause[104]">{{ getGameName(104)[0] }}<br>暂停:{{ formatBoolean(player.pause[104]) }}</button></td>
				<td><button class="opt" onclick="player.pause[105]=!player.pause[105]">{{ getGameName(105)[0] }}<br>暂停:{{ formatBoolean(player.pause[105]) }}</button></td>
            </tr>
            <tr v-if="options.pauseclass">
				<td><button class="info" disabled>此处世界顺序<br>与解锁页面同</button></td>
				<td><button class="opt" onclick="player.pause[201]=!player.pause[201]">{{ getGameName(201)[0] }}<br>暂停:{{ formatBoolean(player.pause[201]) }}</button></td>
				<td><button class="opt" onclick="player.pause[202]=!player.pause[202]">{{ getGameName(202)[0] }}<br>暂停:{{ formatBoolean(player.pause[202]) }}</button></td>
				<td><button class="opt" onclick="player.pause[203]=!player.pause[203]">{{ getGameName(203)[0] }}<br>暂停:{{ formatBoolean(player.pause[203]) }}</button></td>
				<td><button class="opt" onclick="player.pause[204]=!player.pause[204]">{{ getGameName(204)[0] }}<br>暂停:{{ formatBoolean(player.pause[204]) }}</button></td>
				<td><button class="opt" onclick="player.pause[205]=!player.pause[205]">{{ getGameName(205)[0] }}<br>暂停:{{ formatBoolean(player.pause[205]) }}</button></td>
            </tr>
            <tr v-if="options.pauseclass">
				<td><button class="info" disabled>为了让这对齐<br>我加这五按钮</button></td>
				<td><button class="opt" onclick="player.pause[301]=!player.pause[301]">{{ getGameName(301)[0] }}<br>暂停:{{ formatBoolean(player.pause[301]) }}</button></td>
				<td><button class="opt" onclick="player.pause[302]=!player.pause[302]">{{ getGameName(302)[0] }}<br>暂停:{{ formatBoolean(player.pause[302]) }}</button></td>
				<td><button class="opt" onclick="player.pause[303]=!player.pause[303]">{{ getGameName(303)[0] }}<br>暂停:{{ formatBoolean(player.pause[303]) }}</button></td>
				<td><button class="opt" onclick="player.pause[304]=!player.pause[304]">{{ getGameName(304)[0] }}<br>暂停:{{ formatBoolean(player.pause[304]) }}</button></td>
				<td><button class="opt" onclick="player.pause[305]=!player.pause[305]">{{ getGameName(305)[0] }}<br>暂停:{{ formatBoolean(player.pause[305]) }}</button></td>
            </tr>
            <tr v-if="options.pauseclass">
				<td><button class="info" disabled>但我以不知晓<br>后续该写何文</button></td>
				<td><button class="opt" onclick="player.pause[401]=!player.pause[401]">{{ getGameName(401)[0] }}<br>暂停:{{ formatBoolean(player.pause[401]) }}</button></td>
				<td><button class="opt" onclick="player.pause[402]=!player.pause[402]">{{ getGameName(402)[0] }}<br>暂停:{{ formatBoolean(player.pause[402]) }}</button></td>
				<td><button class="opt" onclick="player.pause[403]=!player.pause[403]">{{ getGameName(403)[0] }}<br>暂停:{{ formatBoolean(player.pause[403]) }}</button></td>
				<td><button class="opt" onclick="player.pause[404]=!player.pause[404]">{{ getGameName(404)[0] }}<br>暂停:{{ formatBoolean(player.pause[404]) }}</button></td>
				<td><button class="opt" onclick="player.pause[405]=!player.pause[405]">{{ getGameName(405)[0] }}<br>暂停:{{ formatBoolean(player.pause[405]) }}</button></td>
            </tr>
            <tr v-if="options.pauseclass">
				<td><button class="info" disabled>正如你所见到<br>我已江郎才尽</button></td>
				<td><button class="opt" onclick="player.pause[501]=!player.pause[501]">{{ getGameName(501)[0] }}<br>暂停:{{ formatBoolean(player.pause[501]) }}</button></td>
				<td><button class="opt" onclick="player.pause[502]=!player.pause[502]">{{ getGameName(502)[0] }}<br>暂停:{{ formatBoolean(player.pause[502]) }}</button></td>
				<td><button class="opt" onclick="player.pause[503]=!player.pause[503]">{{ getGameName(503)[0] }}<br>暂停:{{ formatBoolean(player.pause[503]) }}</button></td>
				<td><button class="opt" onclick="player.pause[504]=!player.pause[504]">{{ getGameName(504)[0] }}<br>暂停:{{ formatBoolean(player.pause[504]) }}</button></td>
				<td><button class="opt" onclick="player.pause[505]=!player.pause[505]">{{ getGameName(505)[0] }}<br>暂停:{{ formatBoolean(player.pause[505]) }}</button></td>
            </tr>
        </table>
		`
	},

	'back-button': {
		template: `
        <button v-bind:class="back" onclick="goBack()">←</button>
        `
	},


	'tooltip': {
		props: ['text'],
		template: `<div class="tooltip" v-html="text"></div>
		`
	},

	'node-mark': {
		props: { 'layer': {}, data: {}, offset: { default: 0 }, scale: { default: 1 } },
		template: `<div v-if='data'>
			<div v-if='data === true' class='star' v-bind:style='{position: "absolute", left: (offset-10) + "px", top: (offset-10) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}'></div>
			<img v-else class='mark' v-bind:style='{position: "absolute", left: (offset-22) + "px", top: (offset-15) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}' v-bind:src="data"></div>
		</div>
		`
	},

	'particle': {
		props: ['data', 'index'],
		template: `<div><div class='particle instant' v-bind:style="[constructParticleStyle(data), data.style]" 
			v-on:click="run(data.onClick, data)"  v-on:mouseenter="run(data.onMouseEnter, data)" v-on:mouseleave="run(data.onMouseLeave, data)" ><span v-html="data.text"></span>
		</div>
		<svg version="2" v-if="data.color">
		<mask v-bind:id="'pmask' + data.id">
        <image id="img" v-bind:href="data.image" x="0" y="0" :height="data.width" :width="data.height" />
    	</mask>
    	</svg>
		</div>
		`
	},

	'bg': {
		props: ['layer'],
		template: `<div class ="bg" v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]"></div>
		`
	},

	'song': {
		props: ['songshown', 'tab'],
		template: `<div :style="{
        position: 'fixed',
        left: '20px',
        bottom: songshown ? '20px' : '-202px',
        'z-index': '100000'
    	}">
			<p v-if="songshown">你可以在设置主题样式-组件-BGM显示隐藏此栏</p>
			<br>

        <div class="pc" :style="{width: tab ? 'calc(100vw - 70px)' : 'calc(50vw - 70px)'}">
            <div class="song-info">
                正在播放: [{{currentIndex+1}}] {{ currentSong.name }}<br>
                播放进度: <span>{{ formatTime(currentTime) }}</span> / <span>{{ formatTime(duration) }}</span><br>
				{{ getBar(currentTime,duration) }}
            </div>
            
            <audio 
                ref="audioPlayer"
				class="ppl"
                :src="currentSong.src" 
                nocontrols
                @ended="endSong"
                @pause="isPlaying = false"
                @play="isPlaying = true"
                @timeupdate="updateProgress"
                @loadedmetadata="updateDuration">
            </audio>
			
            <div class="pcc">
            	<button class="pb" @click="setTime(-15)">-15s</button>
                <button class="pb" @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
            	<button class="pb" @click="setTime(15)">+15s</button>
            </div>
			
            <div class="pcc">
                <button class="pb" @click="changeSong(0,false)">上一首</button>
                <button class="pb" @click="changeSong(1,false)">下一首</button>
                <button class="pb" @click="toggleMode">切换模式 {{ ["顺序","随机","循环"][changeMode] }}</button>
            </div>
			
            <div class="pcd">
				音量
                <input
				type="range"
				min="0"
				max="1"
				step="0.01"
				v-model="volume"
				style="width:80%">
                <span>{{ Math.round(volume * 100) }}%</span>
            </div>
			
        	<div v-if="showPlayWarning" class="bs">
        	    <div class="tips" @click="dismissWarning">
        	        <h1>:)</h1><br>
					<h3>省流:点一下下面的按钮或者这个框就行了</h3><br><br>

					检测到您打开了自动播放BGM功能<br>
					通常来说,浏览器会要求用户先与页面交互才能自动播放音频<br>
					您正好碰到了这种情况!我们暂时无法为您播放音乐<br>
					这不是一个错误或bug,您可以点击下面的按钮继续游戏<br>
					在点击按钮后,音乐应该会开始播放<br><br>

					如果您想避免这样的情况,请不要使用浏览器刷新<br>
					而是使用设置页面的"保存并刷新"按钮<br>
					<br>
        	        <button class="pb" @click="dismissWarning">
        	            好的
        	        </button>
        	    </div>
        	</div>
        </div>
			<audio id="cc">
        		<source src="/resources/song/ChallengeComplete.ogg" type="audio/ogg">
    		</audio>
			<audio id="s1">
        		<source src="/resources/song/sound1.wav" type="audio/wav">
    		</audio>
			<audio id="s2">
        		<source src="/resources/song/sound2.wav" type="audio/wav">
    		</audio>
			<audio id="g1">
        		<source src="/resources/song/song1.mp3" type="audio/mpeg">
    		</audio>
    	</div>`,
		data() {
			return {
				currentIndex: 0,
				changeMode: 0,
				isPlaying: false,
				volume: 0.5,
				currentTime: 0,
				duration: 0,
				showPlayWarning: false,
				warning: true,
				songs: [
					{ name: 'Porter Robinson - dullscythe', src: '/resources/song/background1.mp3' },
					{ name: 'Adrian Talens - 10#30 P.M. (chill lo-fi mix)', src: '/resources/song/background2.mp3' },
					{ name: 'ZenithLights、Zane Lucian - Forget', src: '/resources/song/background3.mp3' },
					{ name: 'Asurah - Still Falling', src: '/resources/song/background4.mp3' },
					{ name: 'CYPARISS - HEARTS', src: '/resources/song/background5.mp3' },
					{ name: 'Emptiness - Mice On Venus (extra nostalgic)', src: '/resources/song/background6.mp3' },
					{ name: 'Firaga、Aika - Flowering Night (from #Touhou 9# Phantasmagoria of Flower View#)(Hi-Tech Full On Edit)', src: '/resources/song/background7.mp3' },
					{ name: 'かめりあ - Light it up', src: '/resources/song/background8.mp3' },
					{ name: "aethoro - Arielle's Wish", src: '/resources/song/background9.mp3' },
					{ name: 'Geoxor - Zenith', src: '/resources/song/background10.mp3' },
					{ name: 'Laur - Grace', src: '/resources/song/background11.mp3' },
					{ name: 'Azure Lag、萨斯Sarziar - Virus R', src: '/resources/song/background12.mp3' },
					{ name: 'Powerful_K - 濒日遗地', src: '/resources/song/background13.mp3' },
					{ name: 'shameless.、Viznode - windflower', src: '/resources/song/background14.mp3' },
					{ name: 'Various Artists、Elliot Hsu - Chamber of Shackles', src: '/resources/song/background15.mp3' },
					{ name: 'Raimukun、Cansol、Various Artists - 量子力学のためのピアノ協奏曲', src: '/resources/song/background16.mp3' },
					{ name: 'Puru - Trap Crow', src: '/resources/song/background17.mp3' },
					{ name: "Massive New Krew、YUC'e - UN1TE feat.YUC'e", src: '/resources/song/background18.mp3' },
					{ name: 'RiraN、Choi JinYong - Find You', src: '/resources/song/background19.mp3' },
					{ name: 'Cansol - Broken Conviction', src: '/resources/song/background20.mp3' },
					{ name: 'kuatari、William Spradlin - Little Seed, Arrival (Ederak)', src: '/resources/song/background21.mp3' },
					{ name: 'Plum - Rainbow Chaser (2021 Remake)', src: '/resources/song/background22.mp3' },
					{ name: 'Crywolf - DATURA (paroxysm)', src: '/resources/song/background23.mp3' },
				]
			};
		},
		watch: {
			volume(newVolume) {
				window.musicPlayer.setVolume(newVolume)
			}
		},
		computed: {
			currentSong() {
				return this.songs[this.currentIndex] || {};
			}
		},
		methods: {
			playSong(index, noplay) {
				this.currentIndex = index;
				this.$refs.audioPlayer.load();
				options.songid = this.currentIndex
				if (!noplay) {
					this.$nextTick(() => {
						if (this.warning) {
							this.warning = false;
							this.playCheck()
						}
						else this.$refs.audioPlayer.play()
					});
				}
			},
			playCheck() {
				this.$refs.audioPlayer.play()
					.then(() => {
						this.isPlaying = true;
						this.showPlayWarning = false;
					})
					.catch(error => {
						this.isPlaying = false;
						this.showPlayWarning = true;
					});
			},
			dismissWarning() {
				this.showPlayWarning = false;
				this.playCheck();
			},
			changeSong(index, noplay) {
				let mode = this.changeMode
				if (mode == 1 /* 随机 */) {
					this.playRandom(noplay)
				} else {
					if (index) {
						this.playNext(noplay)
					} else {
						this.playPrev(noplay)
					}
				}
			},
			endSong() {
				let mode = this.changeMode
				if (mode == 0) {
					this.playNext(false)
				} else if (mode == 1) {
					this.playRandom(false)
				} else if (mode == 2) {
					this.playRepeat(false)
				}

			},
			toggleMode() {
				this.changeMode = (this.changeMode + 1) % 3
				options.songmode = this.changeMode
			},
			setMode(mode) {
				this.changeMode = mode
				options.songmode = this.changeMode
			},
			playNext(noplay) {
				const nextIndex = (this.currentIndex + 1) % this.songs.length;
				this.playSong(nextIndex, noplay);
			},
			playPrev(noplay) {
				const prevIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
				this.playSong(prevIndex, noplay);
			},
			playRandom(noplay) {
				let newIndex;
				do {
					newIndex = Math.floor(Math.random() * this.songs.length);
				} while (newIndex === this.currentIndex && this.songs.length > 1);
				this.playSong(newIndex, noplay);
			},
			playRepeat(noplay) {
				this.playSong(this.currentIndex, noplay);
			},
			setVolume(volume) {
				if (this.$refs.audioPlayer) {
					this.volume = volume;
					this.$refs.audioPlayer.volume = volume;
					options.songvolume = volume;
				}
			},
			togglePlay() {
				if (this.$refs.audioPlayer) {
					if (this.isPlaying) {
						this.$refs.audioPlayer.pause();
					} else {
						this.$refs.audioPlayer.play();
					}
				}
			},
			setTime(time) {
				if (this.$refs.audioPlayer) {
					this.$refs.audioPlayer.currentTime = Math.max(this.$refs.audioPlayer.currentTime + time, 0);
					this.$refs.audioPlayer.play();
					this.isPlaying = true;
				}
			},
			getBar(current, total) {
				if (current > total) {
					current = total;
				}

				const progress = current / total;

				const filledLength = Math.round(progress * 50);

				const filled = '|'.repeat(filledLength);
				const empty = '_'.repeat(50 - filledLength);

				return `[${filled}${empty}]`;
			},
			updateProgress() {
				if (this.$refs.audioPlayer) {
					this.currentTime = this.$refs.audioPlayer.currentTime;
				}
			},
			updateDuration() {
				if (this.$refs.audioPlayer) {
					this.duration = this.$refs.audioPlayer.duration;
				}
			},
			formatTime(seconds) {
				if (isNaN(seconds)) return '0:00';

				const minutes = Math.floor(seconds / 60);
				const secs = Math.floor(seconds % 60);
				return `${minutes}:${secs.toString().padStart(2, '0')}`;
			},
		},
		mounted() {
			if (this.$refs.audioPlayer) {
				this.$refs.audioPlayer.volume = this.volume;
			}
			this.$refs.audioPlayer.load();
			window.musicPlayer = {
				playSong: this.playSong.bind(this),
				setVolume: this.setVolume.bind(this),
				setMode: this.setMode.bind(this),
			};
		},
		beforeDestroy() {
			window.musicPlayer = null;
		}
	},

	'tracksong': {
		template: `<div :style="{
        position: 'fixed',
        left: '-114514px',
        bottom: '-191981px'
    }">
        <audio 
            ref="trackPlayer"
            :src="currentSong.src" 
            nocontrols
            @pause="isPlaying = false"
            @play="isPlaying = true"
            @ended="onSongEnded"> <!-- 添加 ended 事件监听 -->
        </audio>
    </div>`,
		data() {
			return {
				currentIndex: 0,
				isPlaying: false,
				volume: 0.5,
				songs: {
					101: { src: '/resources/song/track101.ogg' },
					102: { src: '/resources/song/track102.ogg' },
					103: { src: '/resources/song/track103.ogg' },

					201: { src: '/resources/song/track201.ogg' },
					202: { src: '/resources/song/track202.ogg' },

					301: { src: '/resources/song/track301.ogg' },
					302: { src: '/resources/song/track302.ogg' },
					
					401: { src: '/resources/song/track401.ogg' },
				}
			};
		},
		computed: {
			currentSong() {
				return this.songs[this.currentIndex] || {};
			}
		},
		methods: {
			setSong(index, sop) {
				if (sop) {
					this.currentIndex = index;
					this.$refs.trackPlayer.load();
					options.songid = this.currentIndex
					this.$nextTick(() => {
						this.$refs.trackPlayer.currentTime = 0;
						this.$refs.trackPlayer.play()
					});
				} else {
					if (this.$refs.trackPlayer) {
						this.$refs.trackPlayer.currentTime = 0;
						this.$refs.trackPlayer.pause();
					}
				}
			},
			getProgress() {
				if (this.$refs.trackPlayer) {
					return this.$refs.trackPlayer.currentTime / this.$refs.trackPlayer.duration;
				}
				return 0
			},
			getTime() {
				if (this.$refs.trackPlayer) {
					return this.$refs.trackPlayer.currentTime;
				}
				return null
			},
			onSongEnded() {
				if (typeof endGame === 'function') {
					endGame();
				}
			}
		},
		mounted() {
			if (this.$refs.trackPlayer) {
				this.$refs.trackPlayer.volume = this.volume;
			}
			this.$refs.trackPlayer.load();
			window.trackPlayer = {
				setSong: this.setSong.bind(this),
				getProgress: this.getProgress.bind(this),
				getTime: this.getTime.bind(this),
			};
		},
		beforeDestroy() {
			window.trackPlayer = null;
		}
	},


	'ct': {
		template: `
			<span class="cover" title="你知道的太多了">
			  <slot></slot>
			</span>
		`
	}

}

