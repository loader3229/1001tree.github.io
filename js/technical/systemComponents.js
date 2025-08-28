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
        <span v-if="modInfo.author">
            <br>
            作者 {{modInfo.author}}
        </span>
        <span>
            <br>
            模组树汉化 乾狐离光
        </span>
        <br>
        <ct>
            游玩 你
		</ct>
		<br>
		<br>
		<img src="./resources/QHLG.jpg" width="128px"/>
		<br>
        <br>
        The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '14px', 'display': 'inline'}" >{{TMT_VERSION.tmtNum}}</a> by Acamaeda and FlamemasterNXF
        <br>
        The Prestige Tree made by Jacorb and Aarex
		<br>
		游戏的默认字体为<a v-bind:href="'https://hyperos.mi.com/font/zh/'" target="_blank" class="link" v-bind:style = "{'font-size': '14px', 'display': 'inline'}" >"Microsoft YaHei"</a>
		<br><br>
		<div class="link" onclick="showTab('changelog-tab')">更新日志</div><br>
        <span v-if="modInfo.discordLink"><a class="link" v-bind:href="modInfo.discordLink" target="_blank">{{modInfo.discordName}}</a><br></span>
        <a class="link" href="https://discord.gg/F3xveHV" target="_blank" v-bind:style="modInfo.discordLink ? {'font-size': '16px'} : {}">模组树服务器</a><br>
        <a class="link" href="http://discord.gg/wwQfgPa" target="_blank" v-bind:style="{'font-size': '16px'}">主声望树服务器</a><br>
		<br><br>
        游玩时间: {{ formatTime(player.timePlayed) }}<br><br>
        <h3>热键</h3><br>
        <span v-for="key in hotkeys" v-if="player[key.layer].unlocked && tmp[key.layer].hotkeys[key.id].unlocked"><br>{{key.description}}</span></div>
    `
	},

	'options-tab': {
		template: `
        <table>
            <tr>
                <td><button class="opt" onclick="save()">保存</button></td>
                <td><button class="opt" onclick="toggleOpt('autosave')">自动保存<br>{{ formatOption('autosave') }}</button></td>
                <td><button class="opt" onclick="hardReset()">硬重置</button></td>
                <td><button class="opt" onclick="exportSave()">导出存档<br/>到剪贴板</button></td>
                <td><button class="opt" onclick="importSave()">导入存档</button></td>
            </tr>
            <tr>
            </tr>
            <tr>
                <td><button class="opt" onclick="switchTheme()">主题<br>{{ getThemeName() }}</button></td>
                <td><button class="opt" onclick="adjustFont()">字体<br>{{ FONT_DISPLAYS[FONT_SETTINGS.indexOf(options.font)] }}</button></td>
                <td><button class="opt" onclick="adjustCount()">计数法<br>{{ COUNT_DISPLAYS[COUNT_SETTINGS.indexOf(options.count)] }}</button></td>
                <td><button class="opt" onclick="toggleOpt('forceOneTab'); needsCanvasUpdate = true">页面布局<br>{{ options.forceOneTab ? "单页面" : "优先双页面 窄屏单页面" }}</button></td>
                <td><button class="opt" onclick="toggleOpt('hqTree')">高质量的树<br>{{ formatOption('hqTree') }}</button></td>
            </tr>
            <tr>
                <td><button class="opt" onclick="adjustMSDisp()">显示里程碑<br>{{ MS_DISPLAYS[MS_SETTINGS.indexOf(options.msDisplay)] }}</button></td>
                <td><button class="opt" onclick="toggleOpt('hideChallenges')">已完成挑战<br>{{ options.hideChallenges?"隐藏":"显示" }}</button></td>
				<td><button class="opt" onclick="toggleOpt('songshown')">BGM显示<br>{{ formatOption('songshown') }}</button></td>
				<td><button class="opt" onclick="toggleOpt('sloganshown')">标语显示<br>{{ formatOption('sloganshown') }}</button></td>
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
        bottom: songshown ? '20px' : '-65px',
        'z-index': '100000'
    	}">
        	<p :style="{
    		    opacity: songshown ? 0 : 1
    		}"
			>你可在设置调整BGM显示</p>
			<br>
        	<audio controls :style="{
				width: tab ? 'calc(100vw - 50px)' : 'calc(50vw - 50px)'
			}"
        	controlsList="nodownload noplaybackrate"
        	loop>
        	    <source src="/song/background.mp3" type="audio/mpeg">
        	    您的浏览器不支持 audio 元素。
        	</audio>
			<audio id="s1">
        		<source src="/song/sound1.wav" type="audio/wav">
    		</audio>
			<audio id="s2">
        		<source src="/song/sound2.wav" type="audio/wav">
    		</audio>
			<audio id="g1">
        		<source src="/song/song1.mp3" type="audio/mpeg">
    		</audio>
    	</div>`
	},

	'ct': {
		template: `
			<span class="cover" title="你知道的太多了">
			  <slot></slot>
			</span>
		`
	}

}

