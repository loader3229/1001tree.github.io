addLayer("402", {
    symbol: "㏒",
    resource: "",
    color: "#9451F8",
    update(diff) {
        if (player[402].value.sub(data402[player[402].level][2]).abs().lte(data402[player[402].level][4])) {
            player[402].level++
            player[402].maxLevel=Math.max(player[402].maxLevel,player[402].level)
            player[402].value=data402[player[402].level][1]
            makeParticles(WINWINWIN,50)
        }
    },
    startData() {
        return {
            unlocked: true,
            maxLevel: 1,
            level: 1,
            value: _D0,
            completed: false
        }
    },
    type: "none",
    tabFormat: [
        "blank",
        ["display-text",function(){return data402[player[402].level][0]}],
        ["clickables","1"],
        "blank",
        ["clickables","2"],
        "blank",
        ["clickables","3"],
        "blank",
        ["clickables","4"],
        "blank",
        ["clickables","5"],
        ["blank","27727px"],//2027.7.27
        ["display-text","MjY4Mzc2MDczMzo2YUV0VTA="],
        ["blank","100000000px"],
        "grid"
    ],
    milestones: {
        0: {
            requirementDescription: "完成402中的第10关",
            done() {return player[402].maxLevel>10},
            onComplete() {player.main.points=player.main.points.add(1)}
        },
        1: {
            requirementDescription: "完成402中的第20关",
            done() {return player[402].maxLevel>20},
            onComplete() {player.main.points=player.main.points.add(1)}
        },
        2: {
            requirementDescription: "完成402中中的第25关",
            done() {return player[402].maxLevel>25},
            onComplete() {completeWorld(this.layer)}
        },
    },
    clickables: {
        11: {
            title() {return `${player[402].maxLevel<=25?"你最高达到了第"+String(player[402].maxLevel)+"关":"恭喜通关本世界！"} | 当前是第${player[402].level}关<br><br>当前数值: ${format(player[402].value,3)}<br>你的目标是: ${data402[player[402].level][5]?`${data402[player[402].level][3]} ≈ ${format(data402[player[402].level][2],5)}`:data402[player[402].level][3]}`},
            style() {return {"height":"100px","width":"560px","border":"3px solid","border-radius":"2px","background-color":"#7FFFD4","border-color":"#EEEEFF"}},
            canClick: false
        },
        21: {
            title: "上一关",
            display() {return `前往第${player[402].level-1}关`},
            unlocked() {return player[402].level>1},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"4px solid","border-radius":"2px","background-color":"#F0CD9F","border-color":"#F03967"}},
            canClick() {return this.unlocked()},
            onClick() {player[402].level--;player[402].value=data402[player[402].level][1]}
        },
        22: {
            title: "重试本关",
            display() {return `点击以重置数值`},
            unlocked() {return true},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"4px solid","border-radius":"2px","background-color":"#E2FFC1","border-color":"#93977A"}},
            canClick() {return true},
            onClick() {player[402].value=data402[player[402].level][1]}
        },
        23: {
            title: "下一关",
            display() {return player[402].level!=25?`前往第${player[402].level+1}关`:"恭喜通关"},
            unlocked() {return player[402].maxLevel>player[402].level},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"4px solid","border-radius":"2px","background-color":"#CF98E6","border-color":"#37BAD1"}},
            canClick() {return this.unlocked()},
            onClick() {player[402].level++;player[402].value=data402[player[402].level][1]}
        },
        31: { //x+2
            title() {return player[402].maxLevel>21?"x+2":"?"},
            unlocked() {return player[402].level>=1},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![22,23].includes(player[402].level)},
            onClick() {player[402].value=player[402].value.add(2)}
        },
        32: { //x-1
            title() {return player[402].maxLevel>21?"x-1":"??"},
            unlocked() {return player[402].level>=2},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![23,25].includes(player[402].level)},
            onClick() {player[402].value=player[402].value.sub(1)}
        },
        33: { //x/2
            title() {return player[402].maxLevel>23?"/2":"???"},
            unlocked() {return player[402].level>=4},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![21,22,24,25].includes(player[402].level)},
            onClick() {player[402].value=player[402].value.div(2)}
        },
        41: { //sqrt(x)
            title() {return player[402].maxLevel>24?"sqrt(x)":"!"},
            unlocked() {return player[402].level>=7},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![21,22,23,24].includes(player[402].level)},
            onClick() {
                if (player[402].value.lt(0)) {
                    if (player[402].level==8) {
                        player[402].level++
                        player[402].maxLevel=Math.max(player[402].maxLevel,player[402].level)
                        player[402].value=data402[player[402].level][1]
                        makeParticles(WINWINWIN,50)
                    }
                    else {
                        alert("前面的区域，以后再来探索吧~(本次操作无效)")
                        return
                    }
                }
                player[402].value=player[402].value.sqrt()
            }
        },
        42: { //1/x
            title() {return player[402].maxLevel>22?"1/x":"!!"},
            unlocked() {return player[402].level>=11},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![21,25].includes(player[402].level)},
            onClick() {
                if (player[402].value.eq(0)) {
                    if (player[402].level==12) {
                        player[402].level++
                        player[402].maxLevel=Math.max(player[402].maxLevel,player[402].level)
                        player[402].value=data402[player[402].level][1]
                        makeParticles(WINWINWIN,50)
                    }
                    else {
                        alert("前面的区域，以后再来探索吧~(本次操作无效)")
                        return
                    }
                }
                player[402].value=_D1.div(player[402].value)
            }
        },
        43: { //2^x
            title() {return player[402].maxLevel>23?"2^x":"!!!"},
            unlocked() {return player[402].level>=15},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![21,22,24].includes(player[402].level)},
            onClick() {
                player[402].value=_D2.pow(player[402].value)
            }
        },
        51: { //x^2
            title() {return player[402].maxLevel>23?"x^2":"#"},
            unlocked() {return player[402].level>=17},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![21,22,24].includes(player[402].level)},
            onClick() {
                player[402].value=player[402].value.pow(2)
            }
        },
        52: { //3x
            title() {return player[402].maxLevel>21?"3x":"##"},
            unlocked() {return player[402].level>=18},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![22,23,24].includes(player[402].level)},
            onClick() {
                player[402].value=player[402].value.mul(3)
            }
        },
        53: { //log2(x)
            title() {return player[402].maxLevel>22?"log<sub>2</sub>x":"###"},
            unlocked() {return player[402].level>=19},
            style() {return {"min-height":"90px","height":"90px","width":"130px","border":"2px solid","border-radius":"6px","background-color":"#9CABDA","border-color":"#EEEEFF"}},
            canClick() {return ![21,22,24].includes(player[402].level)},
            onClick() {
                if (player[402].value.lte(0)) {
                    alert("前面的区域，以后再来探索吧~(本次操作无效)")
                    return
                }
                player[402].value=player[402].value.log(2)
            }
        },
    },
    grid: {//504借用grid
        rows: 5,
        cols: 5,
        getStartData(id){return false},
        getUnlocked(id){return true},
        getCanClick(data,id){return false},
        getStyle(data,id){
            let p=orthogonalRotation(tiles504[data504[player[504].level][3][player[504].current]][3],player[504].rotation)
            let l=tiles504[data504[player[504].level][3][player[504].current]][4].map(([x,y])=>{let t=orthogonalRotation([x,y],player[504].rotation);return 100*(p[0]+t[0])+p[1]+t[1]+303})
            return {"height":"50px","width":"50px","border":`${(p[0]*100+p[1]+303)==id?"5px solid #FF0000":"3px solid #283EB9"}`,"background-color":`${l.includes(id)?"#AACAFF":"#090F0F"}`,"border-radius":"1px","transition-duration":"0.2s","transform":"scale(1.01,1.01)"}
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});
