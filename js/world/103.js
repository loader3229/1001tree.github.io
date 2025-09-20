addLayer("103", {
    symbol: "🎰",
    resource: "点数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        player['103'].cd -= diff
        player['103'].points = player['103'].points.add(layers['103'].pGen().times(diff))
        if(player['103'].points.gte(player['103'].req)){
            player['103'].bmode = true
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
            res: [[1,20],[2,20],[3,20],[4,20],[5,5],[6,5],[7,5],[8,5]],
            roll: _D0,
            r: 0,
            cd: 0,
            basegen: _D0,
            req: _D(100),
            bmode: false,
            rtext: "",
        }
    },
    type: "none",
    tabFormat: {
        "machine": {
            content: [
                ["display-text", function () {
                    return `你有 <h2 class="nmpt">${format(player[this.layer].points)}</h2> 点数 (+${format(layers['103'].pGen())}/s)`
                }],
                ["display-text", function () {
                    return `你已经拉了${formatWhole(player['103'].roll)}次拉杆`
                }],
                "blank",
                ["clickables", [1]],
                "blank",
                ["display-text", function () {
                    return `本次抽中`+((player['103'].r % 2 == 1) ? `<b style="color: #05bd05ff">(${formatWhole(player['103'].r)})</b>` : `<b style="color: #bd0505ff">(${formatWhole(player['103'].r)})</b>`)+`,` +player['103'].rtext
                }],
                "blank",
                ["bar",1]
            ]
        }
    },
    pGen(){
        g = player['103'].basegen
        return g.max(0)
    },
    machineRoll(){
        let r = chooseWeightInArray(player['103'].res)
        player['103'].r = r
        if(r==1){
            player['103'].rtext = `获得<b style="color: #05bd05ff">${format(player['103'].points.times(0.07).max(1))}</b>点数!`
            player['103'].points = player['103'].points.add(player['103'].points.times(0.07).max(1))
        }
        if(r==2){
            player['103'].rtext = `扣除<b style="color: #bd0505ff">${format(player['103'].points.times(0.11).max(0))}</b>点数!`
            player['103'].points = player['103'].points.times(0.89)
        }
        if(r==3){
            player['103'].rtext = `点数生产<b style="color: #05bd05ff">+${format(player['103'].basegen.times(0.03).max(1))}</b>/s!`
            player['103'].basegen = player['103'].basegen.add(player['103'].basegen.times(0.03).max(1))
        }
        if(r==4){
            player['103'].rtext = `点数生产<b style="color: #bd0505ff">-${format(player['103'].basegen.times(0.03).max(0))}</b>/s!`
            player['103'].basegen = player['103'].basegen.times(0.97)
        }
        if(r==5){
            player['103'].rtext = `下次抽奖冷却<b style="color: #05bd05ff">减半</b>!`
        }
        if(r==6){
            player['103'].rtext = `下次抽奖冷却变为<b style="color: #bd0505ff">10s</b>!`
        }
        if(r==7){
            player['103'].rtext = `点数生产<b style="color: #05bd05ff">x2</b>!`
            player['103'].basegen = player['103'].basegen.times(2)
        }
        if(r==8){
            player['103'].rtext = `点数生产<b style="color: #bd0505ff">/2</b>!`
            player['103'].basegen = player['103'].basegen.times(0.5)
        }
    },
    upgrades: {
    },
    milestones: {
    },
    clickables: {
        11: {
            title() { return `拉动拉杆` },
            display() { return player['103'].cd <= 0 ? `` : `还需冷却${format(player['103'].cd)}s` },
            onClick() {
                if(player['103'].r == 6) player['103'].cd = 10
                else if(player['103'].r == 5) player['103'].cd = 2.5
                else player['103'].cd = 5
                layers['103'].machineRoll()
                player['103'].roll = player['103'].roll.add(1)
            },
            unlocked() { return true },
            canClick() { return player['103'].cd<=0 },
        },  
    },
    bars: {
        1: {
            direction: RIGHT,
            display(){return `${format(player['103'].points)}/${format(player['103'].req)}`},
            width: 200,
            height: 50,
            progress() { return player['103'].points.div(player['103'].req).min(1) },
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
});