addLayer("403", {
    symbol: "🔓",
    resource: "题目",
    color: "hsl(250,100%,50%)",
    update(diff) {
        if (!getGridData('main', this.layer)||player.pause[this.layer]) return
        if (player.subtabs['403'].mainTabs=="新手练习"){
            player['403'].maxProblems = 5
            player['403'].realmID = 1
            player['403'].difficultyID = 1
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            coins: _D0,
            answer1:"",
            answerCorrect:"",
            problemID:1,
            realmID:0,
            maxProblems:0,
            difficultyID: 0,
            Problemcompleted:[[false,false,false,false,false,false],[]],
        }
    },
    type: "none",
    tabFormat: {
        "Main": {
            content: [
                ["display-text", function () {
                    return `你已经解决了 <h2 class = 'p7tx'>${format(player['403'].points)}</h2> 道题目.`
                }],
                ["display-text", function () {
                    return `你有 ${format(player['403'].coins)} 谜题币(通过解决的题目获得).`
                }],
                "blank",
                ["infobox",[1]],
                "blank",
                "upgrades",
            ]
        },
        "新手练习": {
            content: [
                ["display-text", function () {
                    return `你已经解决了 <h2 class = 'p7tx'>${format(player['403'].points)}</h2> 道题目.`
                }],
                ["display-text", function () {
                    return `你有 ${format(player['403'].coins)} 谜题币(通过解决的题目获得).`
                }],
                "blank",
                ["clickables",[1]],
                "blank",
                ["clickables",[3]],
                "blank",
                ["row", [
                    ["clickable", [21]],
                    "blank",
                    ["display-text", function () {
                            return player['403'].Problemcompleted[player['403'].realmID][player['403'].problemID] ? `<p style = "color:#00ff00">当前题目: #${formatWhole(player['403'].problemID)}(已完成)</p>` : `当前题目: #${formatWhole(player['403'].problemID)}` 
                    }],
                    "blank",
                    ["clickable", [22]],
                ]]
            ]
        },
    },
    upgrades: {
        11: {
            title: "新手练习",
            description() { return `测试你的基本能力, 共5道题目(不能购买提示)` },
            canAfford(){
                return player['403'].points.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(271, 100%, 50%),hsl(250, 100%, 50%),hsl(210, 100%, 50%),hsl(250, 100%, 50%),hsl(271, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 5s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(0)
            },
            currencyDisplayName:"谜题币"
        },
        21: {
            title: "增量游戏谜题",
            description() { return `小拜谢来到了第一道关卡!` },
            unlocked() {return hasUpgrade("403",11)},
            canAfford(){
                return player['403'].coins.gte(this.cost())
            },
            style(){
                if(this.canAfford() && (!hasUpgrade(this.layer,this.id))) return {background:"linear-gradient(in hsl 60deg,hsl(271, 100%, 50%),hsl(250, 100%, 50%),hsl(210, 100%, 50%),hsl(250, 100%, 50%),hsl(271, 100%, 50%))","background-size": "200% auto","background-clip":"broder-box","-webkit-background-clip": "border-box","animation": "rainbow 5s linear infinite","height":"120px","width":"120px","color":"#000000","border-color":"#002cddff"}
                return {"height":"120px","width":"120px"}
            },
            cost(){
                return _D(3)
            },
            currencyDisplayName:"谜题币"
        },
    },
    milestones: {
    },
    clickables: {
        11: {
            display() { return `输入并验证答案` },
            onClick() {
                player['403'].answer1 = prompt("请输入你的答案!","")
                if(player['403'].answer1 == getLegacy403ProblemAns()[player['403'].realmID][player['403'].problemID].answer){
                    if(player['403'].Problemcompleted[player['403'].realmID][player['403'].problemID] == false){
                        player['403'].coins = player['403'].coins.add(player['403'].difficultyID)
                        player['403'].points = player['403'].points.add(1)
                    }
                    player['403'].Problemcompleted[player['403'].realmID][player['403'].problemID] = true
                }
            },
            unlocked() { return true },
            canClick() { return true },
            style:{"width":"200px","font-size":"18px","color":"#ffffff","text-shadow":"0 0 5px #aa89ff","background-color":"#00000000","border":"4px soild","border-color":"#ffffff"}
        },
        21: {
            display() { return `<` },
            onClick() {
                player['403'].problemID--
            },
            unlocked() { return true },
            canClick() { return player['403'].problemID>1 },
            style:{"width":"50px","min-height":"50px","font-size":"18px","color":"#ffffff","text-shadow":"0 0 5px #aa89ff","background-color":"#00000000","border":"4px soild","border-color":"#ffffff"}
        },    
        22: {
            display() { return '>' },
            onClick() {
                player['403'].problemID++
            },
            unlocked() { return true },
            canClick() { return player['403'].problemID < player['403'].maxProblems },
            style:{"width":"50px","min-height":"50px","font-size":"18px","color":"#ffffff","text-shadow":"0 0 5px #aa89ff","background-color":"#00000000","border":"4px soild","border-color":"#ffffff"}
        },
        31: {
            display() { return getLegacy403ProblemAns()[player['403'].realmID-1][player['403'].problemID].problem },
            onClick() {
                player['403'].problemID++
            },
            unlocked() { return true },
            canClick() { return false },
            style:{"width":"900px","min-height":"0px","font-size":"18px","color":"#ffffff","text-shadow":"0 0 5px #aa89ff","background-color":"#00000000","border":"4px soild","border-color":"#ffffff00"}
        }, 
    },
    infoboxes:{
        1:{
            title: "I(请读我^-^)",
            body() { return `今年是2126年8月10日, 小拜谢一直在期待的猜猜不猜117终于要召开了!<br>
                            不幸的是, 本次比赛的出题者和参赛团队全部被邪恶的QHLG抓走去写2002树了<br>
                            可怜的小拜谢因为起得太晚成为了唯一没有被抓走的参赛者, 国王要求你--小拜谢一路闯关到QHLG的老巢<br>
                            这样你就可以解救他们并得到本届的冠军, 你肩负着重大责任!<br>
                            在路上你会遇到很多QHLG设下的题目, 祝好运!<br>
                            在完成题目后, 你会被奖励一定谜题币(基于题目难度), 用它可以购买提示或解锁新谜题` },
            style:{"width":"800px","box-shadow":"-5px 10px 10px #0000FF"},
        }
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});