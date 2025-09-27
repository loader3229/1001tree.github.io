addLayer("505", {
    symbol: "·",
    resource: "",
    tooltip: "谁才是怪物?",
    style() {
        let p = player[this.layer].page
        let bC = "#000"
        let C = "#888"

        if (p == -5) bC = "#FFF"
        if (p == -4) bC = "#DDD"
        if (p == -3) bC = "#AAA"
        if (p == -2) bC = "#666"
        if (p == -1) bC = "#222"
        if (player[this.layer].choose[0]) {
            if (p >= 23 && p <= 25) bC = "#FFF"
        }
        if (p == 28) bC = "#B72D0E"
        if (player[this.layer].choose[1]) {
            if (p == 32) bC = "#250903"
            if (p == 33) bC = "#491206"
            if (p == 34) bC = "#6e1b08"
            if (p == 35) bC = "#92240b"
            if (p == 36) bC = "#b72d0e"
        }
        if (p == 37) bC = "#871073"
        if (p == 38) bC = "#0910e8"
        if (p == 39) bC = "#88ff00"

        if (p == 22) C = "#B72D0E"
        if (p == 28) C = "#000"
        if (p == 39) C = "#F00"

        return {
            backgroundColor: bC,
            color: C
        }
    },
    color() { return `rgba(128,128,128,${player[this.layer].page / 100})` },
    update(diff) {
        if (player.pause[this.layer]) return
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            page: 0,
            choose: [
                false,
                false
            ],
            warning: true
        }
    },
    type: "none",
    tabFormat: [
        [
            "display-text",
            function () {
                let text = memory[player[this.layer].page]
                if (Array.isArray(text)) {
                    return player[this.layer].choose[text[0]] ? text[1] : text[2]
                } else {
                    return text
                }
            }
        ],
        ["blank", "50px"],
        ["clickables", [1]],
        ["clickables", [10]],
        ["raw-html", function () {
            if (checkWarning(505)) return `
        	<div class="bs">
        	    <div class="tips" onclick="closeWarning(505)">
        	        <h1>重要健康与安全提示</h1><br>
                    在游玩本游戏前,请仔细阅读以下内容:<br><br>

                    <h2>光敏性癫痫警告</h2><br>
                    极少数人在接触特定视觉图像(包括闪烁灯光或图案)时可能会突发癫痫症状,即使没有癫痫病史的人也可能在游玩时出现该症状<br><br>

                    <h2>身体与精神紧张警告</h2><br>
                    游戏内容包含旨在制造紧张,恐惧和惊吓的元素.这些内容可能导致心率加快,血压升高,并对有心脏疾病,精神健康状况或其他潜在健康问题的玩家构成风险<br>
                    <br>
                    如果出现任何不适,如头晕,恶心,视力异常,肌肉抽搐或意识模糊,请立即停止游玩并咨询医生<br>
					<br>
        	        <button class="pb" onclick="closeWarning(505)">
        	            好的
        	        </button>
        	    </div>
        	</div>`
        }],
    ],
    clickables: {
        11: {
            title: "前进",
            canClick() {
                return true
            },
            unlocked() {
                return !(player[this.layer].page == 36 && player[this.layer].choose[1])
            },
            onClick() {
                let p = player[this.layer].page
                if (p == 21) player[this.layer].choose[0] = false
                if (p == 31) player[this.layer].choose[1] = false

                player[this.layer].page++
                if (player[this.layer].page > 100) {
                    player[this.layer].page = 100
                    completeWorld(this.layer)
                }
            },
            style() {
                return {
                    color: player[this.layer].page == 0 ? "#00000000" : "#FFF",
                    minHeight: "100px",
                    width: "100px",
                    border: "unset",
                }
            }
        },
        12: {
            title: "停止",
            canClick() {
                return true
            },
            onClick() {
                player[this.layer].page = -6
            },
            unlocked() {
                return player[this.layer].page == 11
            },
            style() {
                return {
                    color: "#FFF",
                    minHeight: "100px",
                    width: "100px",
                    border: "unset",
                }
            }
        },
        13: {
            title: "离开",
            canClick() {
                return true
            },
            onClick() {
                player[this.layer].page++
                player[this.layer].choose[0] = true
            },
            unlocked() {
                return player[this.layer].page == 21
            },
            style() {
                return {
                    color: "#FFF",
                    minHeight: "100px",
                    width: "100px",
                    border: "unset",
                }
            }
        },
        14: {
            title: "拒绝",
            canClick() {
                return true
            },
            onClick() {
                player[this.layer].page++
                player[this.layer].choose[1] = true
            },
            unlocked() {
                return player[this.layer].page == 31
            },
            style() {
                return {
                    color: "#FFF",
                    minHeight: "100px",
                    width: "100px",
                    border: "unset",
                }
            }
        },
        101: {
            canClick() {
                return true
            },
            onClick() {
                player[this.layer].page = 0
            },
            unlocked() {
                return player[this.layer].page == 36 && player[this.layer].choose[1]
            },
            style() {
                return {
                    color: "#FFF",
                    minHeight: "100px",
                    width: "100px",
                    border: "unset",
                }
            },
            shake: true
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});