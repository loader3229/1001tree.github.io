addLayer("204", {
    name: getGameName(this.layer),
    symbol: "❓",
    resource: "点数",
    row: 2,
    position: 4,
    color: "hsl(70,100%,50%)",
    startData() {
        return {
            unlocked: true,
            points: _D0,
        }
    },
    layerShown() { return getGridData('main', this.layer) },
    tabFormat: {
        problems: {
            content: [
                ["display-text", function () {
                    return `你有<h2 class="p2pt"> ${formatWhole(player[this.layer].points)} </h2>分数`
                }],
                ["display-text", function () {
                    return `你曾获得过的最高分数是:${player._204.maxscore}`
                }],
                "blank",
                ["display-text", function () {
                    return `题目${player._204.sol+1}:${player._204.problem}`
                }],
                "blank",
                "clickables",
                ["display-text", function () {
                    return `题目答对+2分,答错-1分,你已经答了${formatWhole(player._204.sol)}/40道题目`
                }],
            ]
        },
    },
    getRandomProblem(){
        let i=40;
        var j;
        var t;
        while(i>0){
            j=Math.floor(Math.random()*i)+1
            t=player._204.problist[i]
            player._204.problist[i]=player._204.problist[j];
            player._204.problist[j]=t;
            i--;
        }
    },
    update(diff){
        if(player._204.started == true && player._204.sol == 40){
            if(player[this.layer].points.gte(40)){
                player.points = player.points.add(1)
                player.main.points = player.main.points.add(1)
            }
            player._204.started = false
        }
    },
    clickables:{
        11:{
            title(){return `开始答题!`},
            display(){return `获得至少40分以完成世界并获得1梦力,共40题!`},
            onClick(){
                player._204.sol = 0
                player._204.ans = ""
                layers[this.layer].getRandomProblem();
                a = getProblemList()
                player._204.problem = a[player._204.problist[1]]
                player._204.started = true
            },
            unlocked(){return !player._204.started},
            canClick(){return !player._204.started},
        },
        12:{
            title(){return `确认你的答案`},
            display(){return `一旦确认后不可更改!`},
            onClick(){
                a = getChoiceList()
                if(player._204.ans==a[player._204.problist[player._204.sol+1]][4]){
                    player[this.layer].points=player[this.layer].points.add(2)
                    player._204.maxscore=player[this.layer].points.max(player._204.maxscore)
                }else{
                    player[this.layer].points=player[this.layer].points.sub(1)
                    player._204.maxscore=player[this.layer].points.max(player._204.maxscore)
                }
                b = getProblemList()
                player._204.problem = b[player._204.problist[player._204.sol+1]]
                player._204.sol++
                player._204.ans=""
            },
            unlocked(){return player._204.started&&player._204.ans!=""},
            canClick(){return player._204.started&&player._204.ans!=""},
        },
        21:{
            display(){
                a = getChoiceList()
                return `A.`+a[player._204.problist[player._204.sol+1]][0]
            },
            onClick(){
                player._204.ans="A"
            },
            unlocked(){return player._204.started},
            canClick(){return player._204.started&&player._204.ans!="A"},
            style:{
                "background-color"(){
                    if(player._204.ans == "A"){
                        return "hsl(70,100%,50%)"
                    }
                    return "#a0a0a0"
                },
            }
        },
        22:{
            display(){
                a = getChoiceList()
                return `B.`+a[player._204.problist[player._204.sol+1]][1]
            },
            onClick(){
                player._204.ans="B"
            },
            unlocked(){return player._204.started},
            canClick(){return player._204.started&&player._204.ans!="B"},
            style:{
                "background-color"(){
                    if(player._204.ans == "B"){
                        return "hsl(70,100%,50%)"
                    }
                    return "#a0a0a0"
                }
            }
        },
        23:{
            display(){
                a = getChoiceList()
                return `C.`+a[player._204.problist[player._204.sol+1]][2]
            },
            onClick(){
                player._204.ans="C"
            },
            unlocked(){return player._204.started},
            canClick(){return player._204.started&&player._204.ans!="C"},
            style:{
                "background-color"(){
                    if(player._204.ans == "C"){
                        return "hsl(70,100%,50%)"
                    }
                    return "#a0a0a0"
                }
            }
        },
        24:{
            display(){
                a = getChoiceList()
                return `D.`+a[player._204.problist[player._204.sol+1]][3]
            },
            onClick(){
                player._204.ans="D"
            },
            unlocked(){return player._204.started},
            canClick(){return player._204.started&&player._204.ans!="D"},
            style:{
                "background-color"(){
                    if(player._204.ans == "D"){
                        return "hsl(70,100%,50%)"
                    }
                    return "#a0a0a0"
                }
            }
        },
    }
})