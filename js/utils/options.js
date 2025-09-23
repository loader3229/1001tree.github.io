// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		saveclass: true,
		themeclass: true,
		tmtclass: true,
		newclass: true,
		pauseclass: false,

		autosave: true,

		theme: "default",
		font: "",
		bgi: null,
		notrans: false,

		tipshown: true,
		songshown: true,
		sloganshown: true,
		newsshown: true,

		count: false,
		forceOneTab: false,
		hcmode: false,
		hqTree: false,
		msDisplay: "always",
		hideChallenges: false,
		hideMilestonePopups: false,
		forceTooltips: false,

		hideWorld: false,
		autopause: false,
		achivement: false,

		newsa: false,
		newsv: false,
		newsh: false,
		newsp: true,
		newsn: true,
		newsspeed: 150,

		songid: 0,
		songautoplay: false,
		songvolume: 0.5,
		songmode: 0,

		//弃用
		offlineProd: false,
		oldStyle: false,
	}
}

function setTransitions() {
	let noTrans = options.notrans

	const styleId = 'no-transitions-style';
	let styleElement = document.getElementById(styleId);

	if (noTrans) {
		if (!styleElement) {
			styleElement = document.createElement('style');
			styleElement.id = styleId;
			styleElement.textContent = `
		  * {
			transition-duration: unset !important;
			-webkit-transition-duration: unset !important;
			-moz-transition-duration: unset !important;
			-o-transition-duration: unset !important;
		  }
		  
		  .v-enter-active,
		  .v-leave-active,
		  .v-enter-to,
		  .v-leave-to {
			transition: none !important;
		  }
		`;
			document.head.appendChild(styleElement);
		}
	} else {
		if (styleElement) {
			document.head.removeChild(styleElement);
		}
	}
}

function getOpt(name) {
	if (typeof options == 'undefined') return false
	return options[name]
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate = true
}

const MS_DISPLAYS = ["全部", "最新", "未完成", "无"];

const MS_SETTINGS = ["always", "last", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % MS_SETTINGS.length];
}

const FONT_DISPLAYS = ["默认", "Sligoil", "Angus", "Step mono", "Unica One", "Mathd", "狐狸", "Misans 中文字体大请耐心等待", "等距更纱黑体 中文字体大请耐心等待"];

const FONT_SETTINGS = ["", "Sligoil", "Angus", "Stepmono", "Unica", "Mathd", "fox", "Misans", "DJGSHT"];

function adjustFont() {
	options.font = FONT_SETTINGS[(FONT_SETTINGS.indexOf(options.font) + 1) % FONT_SETTINGS.length];
	document.body.style.setProperty("--Font", options.font);
}

const COUNT_DISPLAYS = ["默认", "2的幂", "10的幂", "SaveMySin", "狐狸", "丨目计数法", "wtf"];

const COUNT_SETTINGS = [0, 1, 2, 3, 4, 5, 6];

function adjustCount() {
	options.count = COUNT_SETTINGS[(COUNT_SETTINGS.indexOf(options.count) + 1) % COUNT_SETTINGS.length];
}

const NEWSSPEED_DISPLAYS = ["普通", "快", "很快", "瞬间", "很慢", "慢"];

const NEWSSPEED_SETTINGS = [150, 100, 50, 0, 500, 250];

function adjustSpeed() {
	options.newsspeed = NEWSSPEED_SETTINGS[(NEWSSPEED_SETTINGS.indexOf(options.newsspeed) + 1) % NEWSSPEED_SETTINGS.length];
}

function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return !complete || player[layer].lastMilestone === id;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}

function formatOption(opt) {
	return options[opt] ? '启用' : '关闭'
}

function formatBoolean(opt) {
	return opt ? '启用' : '关闭'
}