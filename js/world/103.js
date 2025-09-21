addLayer("103", {
    symbol: "🎰",
    resource: "点数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return
        player['103'].cd -= diff
        if(!player['103'].bmode) player['103'].points = player['103'].points.add(layers['103'].pGen().times(diff))
        if(player['103'].points.gte(player['103'].req)){
            player['103'].bmode = true
            player['103'].req = player['103'].req.times(4)
            layers['103'].getBoost()
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
            req: _D(20),
            bmode: false,
            rtext: "",
            atext: "",
            aid: 0,
            aboost:[_D0,_D0,_D1,_D0,_D0],
            btext: "",
            bid: 0,
            bboost:[_D0,_D0,0,_D1],
            cid: 0,
            ctext: "",
            cboost: [1,_D0],
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
                ["bar",1],
                "blank",
                ["clickables", [2]],
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
            player['103'].rtext = `获得<b style="color: #05bd05ff">${format(player['103'].points.times(player['103'].aboost[0].add(0.1)).max(1))}</b>点数!`
            player['103'].points = player['103'].points.add(player['103'].points.times(player['103'].aboost[0].add(0.07)).max(1))
        }
        if(r==2){
            player['103'].rtext = `扣除<b style="color: #bd0505ff">${format(player['103'].points.times(0.11).max(0))}</b>点数!`
            player['103'].points = player['103'].points.times(0.89)
        }
        if(r==3){
            player['103'].rtext = `点数生产<b style="color: #05bd05ff">+${format(player['103'].basegen.times(player['103'].aboost[1].add(0.05)).max(1))}</b>/s!`
            player['103'].basegen = player['103'].basegen.add(player['103'].basegen.times(player['103'].aboost[1].add(0.03)).max(1))
        }
        if(r==4){
            player['103'].rtext = `点数生产<b style="color: #bd0505ff">-${format(player['103'].basegen.times(player['103'].aboost[3].add(0.05)).max(0))}</b>/s!`
            player['103'].basegen = player['103'].basegen.minus(player['103'].basegen.times(player['103'].aboost[3].add(0.05)))
        }
        if(r==5){
            player['103'].rtext = `下次抽奖冷却<b style="color: #05bd05ff">减半</b>!`
        }
        if(r==6){
            player['103'].rtext = `下次抽奖冷却变为<b style="color: #bd0505ff">10s</b>!`
        }
        if(r==7){
            player['103'].rtext = `点数生产<b style="color: #05bd05ff">x${formatWhole(player['103'].aboost[4].add(2))}</b>!`
            player['103'].basegen = player['103'].basegen.times(player['103'].aboost[4].add(2))
        }
        if(r==8){
            player['103'].rtext = `点数生产<b style="color: #bd0505ff">/2</b>!`
            player['103'].basegen = player['103'].basegen.times(0.5)
        }
    },
    getBoost(){
        let a = getBoostCard()[0]
        let b = getBoostCard()[1]
        let c = getBoostCard()[2]
        let r = chooseOneInArray([1,2,3,4,5])
        player['103'].atext = a[r - 1]
        player['103'].aid = r
        r = chooseOneInArray([1,2,3,4,5,6])
        player['103'].btext = b[r - 1]
        player['103'].bid = r
        r = chooseOneInArray([1,2,3,4])
        player['103'].ctext = c[r - 1]
        player['103'].cid = r
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
                let c = (3*player['103'].cboost[0])
                if(chooseWeightInArray([[0,Math.max(100-player['103'].bboost[2],0)],[1,player['103'].bboost[2]]])) player['103'].cd = 0
                else if(player['103'].r == 6) player['103'].cd = (c*2)
                else if(player['103'].r == 5) player['103'].cd = (c/2)
                else player['103'].cd = c
                layers['103'].machineRoll()
                player['103'].roll = player['103'].roll.add(1)
            },
            unlocked() { return true },
            canClick() { return player['103'].cd<=0 },
        },  
        21: {
            title() { return `[α]` },
            display() { return player['103'].atext },
            onClick() {
                if(player['103'].aid == 1){
                    player['103'].aboost[0] = player['103'].aboost[0].add(0.05)
                }
                if(player['103'].aid == 2){
                    player['103'].aboost[1] = player['103'].aboost[1].add(0.03)
                }
                if(player['103'].aid == 3){
                    player['103'].basegen = player['103'].basegen.times(4)
                }
                if(player['103'].aid == 4){
                    player['103'].points = player['103'].points.times(10)
                    player['103'].aboost[3] = player['103'].aboost[3].add(0.03)
                }
                if(player['103'].aid == 5){
                    player['103'].aboost[4] = player['103'].aboost[4].add(1)
                }
                player['103'].bmode = false
            },
            unlocked() { return player['103'].bmode },
            canClick() { return player['103'].bmode },
            style:{"color":"#6cca00ff","text-shadow":"2px 2px 5px #6cca00","border-color":"#6cca00","box-shadow":"0px 0px 10px #6cca00","border":"6px solid","background-color":"#6cca0025"}
        }, 
        22: {
            title() { return `[β]` },
            display() { return player['103'].btext },
            onClick() {
                if(player['103'].bid == 1){
                    player['103'].res[4][1] += 2.5
                }
                if(player['103'].bid == 2){
                    player['103'].res[6][1] += 2.5
                }
                if(player['103'].bid == 3){
                    player['103'].bboost[2] += 5
                }
                if(player['103'].bid == 4){
                    if(chooseWeightInArray[[0,50],[1,50]]) player['103'].basegen = player['103'].basegen.times(4)
                    else player['103'].basegen = player['103'].basegen.div(3)
                }
                if(player['103'].bid == 5){
                    player['103'].res[0][1] += 5
                }
                if(player['103'].bid == 6){
                    player['103'].res[2][1] += 5
                }
                player['103'].bmode = false
            },
            unlocked() { return player['103'].bmode },
            canClick() { return player['103'].bmode },
            style:{"color":"#00c3ffff","text-shadow":"2px 2px 5px #00c3ff","border-color":"#00c3ff","box-shadow":"0px 0px 10px #00c3ff","border":"6px solid","background-color":"#00c3ff25"}
        }, 
        23: {
            title() { return `[γ]` },
            display() { return player['103'].ctext },
            onClick() {
                if(player['103'].cid == 1){
                    player['103'].cboost[0] *= 0.9
                }
                if(player['103'].cid == 2){
                    player['103'].basegen = player['103'].basegen.times(2)
                    player['103'].req = player['103'].req.div(3)
                }
                if(player['103'].cid == 3){
                    player['103'].points = player['103'].points.times(10)
                    player['103'].cboost[0] *= 1.2
                }
                if(player['103'].bid == 4){
                    player['103'].cboost[1] = player['103'].cboost[1].add(1).min(5)
                }
                player['103'].bmode = false
            },
            unlocked() { return player['103'].bmode },
            canClick() { return player['103'].bmode },
            style:{"color":"#6100feff","text-shadow":"2px 2px 5px #6100fe","border-color":"#6100fe","box-shadow":"0px 0px 10px #6100fe","border":"6px solid","background-color":"#6100fe25"}
        }, 
    },
    bars: {
        1: {
            direction: RIGHT,
            display(){return `${format(player['103'].points)}/${format(player['103'].req)}`},
            width: 200,
            height: 50,
            progress() { return player['103'].points.div(player['103'].req).min(1) },
            textStyle:{"color":"#FE0000"}
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },
});
