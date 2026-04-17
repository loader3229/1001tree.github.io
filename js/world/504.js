addLayer("504", {
    symbol: "🧩",
    resource: "",
    color: "#4EFF67",
    update(diff) {
        if (player.pause[this.layer]) return
        if (player[504].hoverID==-10000){player[504].hoveringPreview=[]}
        else player[504].hoveringPreview=tiles504[data504[player[504].level][3][player[504].current]][4].map(([x,y])=>{return orthogonalRotation([x,y],player[504].rotation)})
    },
    startData() {
        return {
            unlocked: true,
            level: 1,
            maxLevel: 1,
            tileList: [],
            current: 1, //当前选择的拼图块编号
            rotation: 1, //旋转方向(n次顺时针旋转90°)
            flip: false, //是否翻转
            hoverID: -10000, //鼠标悬浮位置(网格编号)
            hoveringPreview: [], //鼠标悬浮时显示虚影格编号
        }
    },
    type: "none",
    tabFormat: [
        "blank",
        ["display-text",function(){return data504[player[504].level][0]}],
        "blank",
        ["clickables","1"],
        "blank",
        ["clickables","2"],
        "blank",
        ["clickables","3"],
        ["blank","60px"],
        ["row",[
            ["column",[
                ["display-text","下方显示当前选择的拼图块<br>放置拼图的拼图板在右边"],
                "blank",
                ["clickables","4"],
                "blank",
                ["layer-proxy",["402",["grid"]]],
                "blank",
                ["clickables","5"]
            ]],
            ["blank",["50px","150px"]],
            "grid"    
        ]],
        ["blank","100px"]
    ],
    clickables: {
        11: {
            title() {return `${player[504].maxLevel<=25?"你最高达到了第"+String(player[504].maxLevel)+"关":"恭喜通关本世界！"} | 当前是第${player[504].level}关`},
            style() {return {"height":"100px","width":"560px","border":"3px solid","border-radius":"2px","background-color":"#DAFFCB","border-color":"#e27cf7"}},
            canClick: false
        },
        21: {
            title: "上一关",
            display() {return `前往第${player[504].level-1}关`},
            unlocked() {return player[504].level>1},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"4px solid","border-radius":"2px","background-color":"#F0CD9F","border-color":"#F03967"}},
            canClick() {return this.unlocked()},
            onClick() {player[504].level--;player[504].tileList=[]}
        },
        22: {
            title: "重试本关",
            display() {return `点击以重置拼图板`},
            unlocked() {return true},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"4px solid","border-radius":"2px","background-color":"#E2FFC1","border-color":"#93977A"}},
            canClick() {return true},
            onClick() {player[504].tileList=[]}
        },
        23: {
            title: "下一关",
            display() {return player[504].level!=25?`前往第${player[504].level+1}关`:"恭喜通关"},
            unlocked() {return player[504].maxLevel>player[504].level},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"4px solid","border-radius":"2px","background-color":"#CF98E6","border-color":"#37BAD1"}},
            canClick() {return this.unlocked()},
            onClick() {player[504].level++;player[504].tileList=[]}
        },
        31: {
            title: "撤销上一步",
            display() {return `撤回上一个放置的拼图块`},
            unlocked() {return true},
            style() {return {"width":"190px","border":"4px solid","border-radius":"2px","background-color":"#98CBFC","border-color":"#5439F0"}},
            canClick() {return this.unlocked()},
            onClick() {player[504].tileList.pop()}
        },
        32: {
            title: "检验",
            display() {return `检验是否已完成本关<br>若检验成功自动进入下一关<br>否则无事发生`},
            unlocked() {return true},
            style() {return {"width":"190px","border":"4px solid","border-radius":"2px","background-color":"#F1C375","border-color":"#D89C58"}},
            canClick() {return this.unlocked()},
            onClick() {
                if(player[504].level==26)return
                let c=[]
                let d=[]
                Object.entries(player[504].grid).forEach(([id,data])=>{
                    if(data504[player[504].level][4].includes(Number(id))||Math.floor(Number(id)/100)>data504[player[504].level][1]||Number(id)%100>data504[player[504].level][2])return
                    let w=data504[player[504].level][6].find(x=>{return x[0]==Number(id)})
                    if (w==undefined)w=[-1,1]
                    c.push([Number(id),w[1]])
                })
                let t=[]
                player[504].tileList.forEach(a=>{
                    t=t.concat(a)
                    d.push(a[0])
                })
                let v=true
                c.forEach(([id,x])=>{t.forEach(v=>{if(v==id)x--});if(x!=0)v=false})
                data504[player[504].level][5].forEach(id=>{if(!d.includes(id))v=false})
                if(v){player[504].maxLevel=Math.max(player[504].maxLevel,++player[504].level);player[504].tileList=[]}
            }
        },
        41: {
            title: "<h1>↻</h1>",
            display: "<h3>顺时针旋转</h3>",
            unlocked: true,
            canClick: true,
            style() {return {"min-height":"90px","height":"90px","width":"90px","border":"5px solid #737373","border-radius":"2px","background-color":"#888888"}},
            onClick() {
                if (player[504].rotation>=3) player[504].rotation-=3
                else player[504].rotation++
            }
        },
        42: {
            title: "<h1>↺</h1>",
            display: "<h3>逆时针旋转</h3>",
            unlocked: true,
            canClick: true,
            style() {return {"min-height":"90px","height":"90px","width":"90px","border":"5px solid #737373","border-radius":"2px","background-color":"#888888"}},
            onClick() {
                if (player[504].rotation<=0) player[504].rotation+=3
                else player[504].rotation--
            }
        },
        52: {
            title: "<h1>↹</h1>",
            display: "<h3>切换拼图块</h3>",
            unlocked: true,
            canClick: true,
            style() {return {"min-height":"90px","height":"90px","width":"240px","border":"5px solid #949498","border-radius":"2px","background-color":"#A1A2A3"}},
            onClick() {
                if (player[504].current>=data504[player[504].level][3][0]) player[504].current=1
                else player[504].current++
            }
        },
    },
    grid: {
        maxRows: 10,
        maxCols: 10,
        rows() {return data504[player[504].level][1]},
        cols() {return data504[player[504].level][2]},
        getStartData(id) {return 0},
        getUnlocked(id) {return true},
        getCanClick(data, id) {return !data504[player[504].level][4].includes(id)},
        getTitle(data, id) {
            let c=-1
            let s=player[504].tileList.reduce((x,y)=>x+y.includes(id),0)
            data504[player[504].level][6].forEach(l=>{if(l[0]==id)c=l[1]})
            if(c==-1&&s<=1)return ""
            return c==-1?s:`<h2>${s} / ${c}</h2>`
        },
        getStyle(data, id) {
            let color=data504[player[504].level][4].includes(id)?[20,22,24]:[150,144,156]
            let bType=data504[player[504].level][4].includes(id)?"5px solid":"4px outset"
            let bColor=data504[player[504].level][4].includes(id)?[18,32,32]:[225,240,255]
            let flag=false
            for (i in player[504].tileList){
                if(player[504].tileList[i].includes(id)){
                    color=HEXtoRGB(data504["color"][i%16])
                    if(player[504].tileList[i][0]==id)flag=true
                }
            }
            if (data504[player[504].level][5].includes(id)){bType="5px solid";bColor=flag?[63,240,31]:[255,31,31]}
            if (player[504].hoveringPreview.map(([x,y])=>100*x+y+player[504].hoverID).includes(id)) color=color.map(v=>Math.floor(Math.min(v*(1.35+0.4*Math.sin(player[504].resetTime*5)),255)))
            return {"height":"72px","width":"72px","border":`${bType} ${RGBtoHEX(bColor)}`,"background-color":`${RGBtoHEX(color)}`,"border-radius":"0px","transition-duration":"0.3s","transform":"scale(1,1)"}
        },
        onClick(data, id) {
            let valid=true
            let prep=tiles504[data504[player[504].level][3][player[504].current]][4].map(([x,y])=>{let n=orthogonalRotation([x,y],player[504].rotation);let p=n[0]*100+n[1]+id;if(data504[player[504].level][4].includes(p)){valid=false};return p})
            if(valid)player[504].tileList.push(prep)
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});