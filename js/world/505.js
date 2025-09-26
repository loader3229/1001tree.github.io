addLayer("505", {
    symbol: "·",
    resource: "",
    style() {
        let p = player[this.layer].page
        let bC = "#000"
        let C = "#888"

        if (p == -5) bC = "#FFF"
        if (p == -4) bC = "#DDD"
        if (p == -3) bC = "#AAA"
        if (p == -2) bC = "#666"
        if (p == -1) bC = "#222"
        if (p >= 23 && p <= 25) bC = "#FFF"
        if (p == 28) bC = "#B72D0E"

        if (p == 22) C = "#B72D0E"
        if (p == 28) C = "#000"

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
            ]
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
        "clickables",
    ],
    clickables: {
        11: {
            title: "前进",
            canClick() {
                return true
            },
            onClick() {
                let p = player[this.layer].page
                if (p == 21) player[this.layer].choose[0] = false

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
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});