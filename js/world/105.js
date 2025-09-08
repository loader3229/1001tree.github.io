addLayer("105", {
    symbol: "T",
    resource: "层数",
    row: 1,
    position: 5,
    color: "#aaa",
    update(diff) {
        let l = layers[this.layer]
        let p = player[this.layer]
        let _p = player._105
        player._105.needupdate -= diff

        if (_p.needupdate <= 0) {
            let map = getMap[_p.local.l].map

            for (id in p.grid) {
                if (id == "rows" || id == "cols") continue
                let pos = l.grid.idtoxy(505, id, _p.local.p)

                if (pos.x < 0 || pos.y < 0) {
                    setGridData(this.layer, id, "000")
                    continue
                }
                else if (pos.y >= map.length || pos.x >= map[pos.y].length) {
                    setGridData(this.layer, id, "000")
                    continue
                }

                let item = map[pos.y][pos.x]
                item = _p.manual.includes(item) ? item : "000"
                setGridData(this.layer, id, item)

            }

            player._105.needupdate = 5
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: [
        "clickables",
        "blank",
        ["display-text", function () {
            return `你现在在<h2 class="c1"> ${player._105.local.l} </h2>层`
        }],
        ["display-text", function () {
            return `<div 
            class="tbox">
                ${player._105.display}
            </div>`
        }],
        "blank",
        "gridcompact",
    ],
    grid: {
        rows: 9,
        cols: 9,
        getStartData(id) {
            return "000"
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) {

        },
        getStyle(data, id) {
            let backgroundImage = `url(pic/105_${data}.png)`

            if (id == 505) backgroundImage = "url(pic/105_player.png)," + backgroundImage

            if (id == this.xytoid(505, this.face(player._105.local.f))) backgroundImage = "url(pic/105_select.png)," + backgroundImage

            let style = {
                width: "80px",
                height: "80px",
                borderRadius: "unset",
                border: "1px dashed white",
                backgroundImage,
                backgroundSize: "cover",
                transitionDuration: "0.15s",
            }

            return style
        },
        xytoid(id, target, local) {
            // id 为现在所在id
            // target 是目标的坐标
            // local 是现在所在坐标
            // 函数返回target的id
            // 如果不定义local,则为相对坐标,否则为绝对坐标
            let lx = local?.x
            let ly = local?.y
            let x = target.x
            let y = target.y

            if (lx && ly) {
                tx = x - lx
                ty = y - ly
            } else {
                tx = x
                ty = y
            }

            return id + tx + ty * 100
        },
        idtoxy(id, target, local) {
            // id 为现在所在id
            // target 是目标的id
            // local 是现在所在坐标
            // 函数返回target的坐标{x:,y:}
            // 如果不定义local,则为相对坐标,否则为绝对坐标
            let lx = local?.x
            let ly = local?.y
            let x = id % 100
            let y = ~~(id / 100)
            let tx = x - target % 100
            let ty = y - ~~(target / 100)

            if (lx && ly) {
                x = lx - tx
                y = ly - ty
            } else {
                x = ty
                y = ty
            }

            return { x, y }
        },
        face(dir) {
            if (dir == 0) return { x: 0, y: -1 }
            else if (dir == 1) return { x: 0, y: 1 }
            else if (dir == 2) return { x: -1, y: 0 }
            else if (dir == 3) return { x: 1, y: 0 }
        },
    },
    clickables: {
        11: {
            title: "可点击进度条",
            display() {
                return `进度为${formatPersent(this.progress(), 0)}`
            },
            canClick() {
                // 不可点击时和bar一样
                return true
            },
            onClick() {
            },
            progress() {
                // result是你的进度结果
                let result = 0.5
                return decimalBetween(result, 0, 1)
            },
            width: "300px",
            height: "60px",
            // 边框填充颜色,删掉这个使用默认设置
            borderColor: "var(--color)",
            // 进度条填充颜色,删掉这个使用默认设置
            fillColor: "#fff",
            // 背景颜色,删掉这个使用默认设置
            backColor: "#ffffff88",
            // 字体颜色,你可直接在display中修改字的样式,删掉这个使用默认设置
            fontColor: "#000",
            style() {
                let w = this.width
                let h = this.height
                let b; if (typeof this.borderColor == 'undefined') b = 'var(--color)'; else b = this.borderColor
                let f; if (typeof this.fillColor == 'undefined') f = 'var(--color)'; else f = this.fillColor
                let g; if (typeof this.backColor == 'undefined') g = 'transparent'; else g = this.backColor
                let t; if (typeof this.fontColor == 'undefined') t = 'unset'; else t = this.fontColor
                let p = formatPersent(this.progress())
                let i = `linear-gradient(to right, ${f} 0% ${p}, rgba(0,0,0,0) ${p} 100%),linear-gradient(${g})`
                return {
                    minWidth: h,
                    width: w,
                    minHeight: h,
                    height: h,
                    color: t,
                    background: "unset",
                    backgroundImage: i,
                    border: "3px solid",
                    borderRadius: "10px",
                    borderColor: b,
                    overflow: "hidden",
                }
            }
        },
    },
    layerShown() { return getGridData('main', this.layer) && (options.hideWorld || !player.world[this.layer]) },
    hotkeys: [
        {
            key: "w",
            onPress() { player._105.local.f = 0 },
            unlocked() { return getGridData('main', this.layer) }
        },
        {
            key: "s",
            onPress() { player._105.local.f = 1 },
            unlocked() { return getGridData('main', this.layer) }
        },
        {
            key: "a",
            onPress() { player._105.local.f = 2 },
            unlocked() { return getGridData('main', this.layer) }
        },
        {
            key: "d",
            onPress() { player._105.local.f = 3 },
            unlocked() { return getGridData('main', this.layer) }
        },
    ],
});