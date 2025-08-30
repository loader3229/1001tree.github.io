addLayer("501", {
    name: getGameName(this.layer),
    symbol: "😂",
    resource: "点数",
    row: 5,
    position: 1,
    color: "#a0a0a0",
    startData() {
        return {
            unlocked: true,
            points: _D0,
        }
    },
    layerShown() { return getGridData('main', this.layer) },
    tabFormat: {
        AprilFools: {
            content: [
                ["display-text", function () {
                    return `你好, 这个游戏只需要你坚持5分钟,然后你就能完成世界然后获得1梦力`
                }],
                ["display-text", function () {
                    return `在这5分钟内, 你需要遵循下面的指示点击正确按钮,提示每10s更换一次(对应你点击的时间),错误的点击将导致倒计时重置！`
                }],
                ["display-text", function () {
                    return (player._501.started? `倒计时:<h2 class='nmpt'> ${formatTime(player._501.timeleft)} </h2>`:`准备好了就点下面的按钮开始`)
                }],
                "blank",
                "clickables",
                ["display-text", function () {
                    return (player._501.started? layers[this.layer].getText():``)
                }],
                "grid",
                ["display-text", function () {
                    return ((!player._501.started)? layers[this.layer].getLoseText():``)
                }],
            ]
        },
    },
    getText(){
        s = player._501.stage
        if(s.lte(20)){//基础段
            if(s.eq(1)){
                if(player._501.cnt==0) return `已完成!请等待下个回合开始`
                return `请点击所有<b style="color:#0000FF">蓝色</b>的按钮`
            }
            if(s.eq(2)){
                if(player._501.cnt==0) return `已完成!请等待下个回合开始`
                return `请点击所有<b style="color:#00CC00">绿色</b>的按钮`
            }
        }
    },
    getLoseText(){
        s = player._501.stage
        if(s.lte(15)){//基础段
            if(s.eq(1)){
                if(player._501.trig[1]){
                    player._501.started = false
                    return `你输了，因为点击了其他颜色的按钮`
                }       
            }
            // if(player._501.cnt>0&&player._501.timeleft.eq(290)){
            //     player._501.started = false
            //     return `你输了，因为未能在限定时间内点击按钮`
            // }                       
        }
    },
    resetgrid(){
        if(player._501.timeleft.mod(10).eq(0)){
            player._501.cnt=0
            for(i in player[this.layer].grid){
                player[this.layer].grid[i] = Math.floor(Math.random()*2)+1;
                if((player[this.layer].grid[i]==1)&&player._501.stage.eq(1)) player._501.cnt++;
                if((player[this.layer].grid[i]==2)&&player._501.stage.eq(2)) player._501.cnt++;
            }
        }
    },
    update(diff){
        if(player._501.started){
            player._501.timeleft = player._501.timeleft.sub(diff)
            player._501.stage = new Decimal(31).sub(player._501.timeleft.div(10).ceil())
        }else{
            player._501.timeleft = new Decimal(300)
        }
    },
    clickables:{
        11:{
            title(){return `开始倒计时`},
            display:"",
            onClick(){
                player._501.stage=_D0
                for(i = 0; i<10 ; i++){
                    player._501.trig[i] = false
                }
                player._501.started = true
            },
            unlocked(){return player._501.started == false},
            canClick(){return player._501.started == false},
        }
    },
    grid:{
        rows: 4,
        cols: 4,
        getStartData(id){
            return 0;
        },
        getUnlocked(id) { // Default
            return player._501.started
        },
        getCanClick(data, id) {
            return (player._501.started&&data)
        },
        onClick(data, id) {
            s = player._501.stage
            if(data==2&&s==1){
                player._501.trig[1]=true
            } 
            if(data=1&&s==2){
                player._501.trig[1]=true
            } 
            player._501.cnt--
            player[this.layer].grid[id]=0;
        },
        getDisplay(data, id) {       
            return `按钮`
        },
        getStyle(data, id) {
            s = player._501.stage
            if(data==0) return {"border":"2px solid","border-color":"white","background-color":"black"}
            else if(data==1) return {"border":"2px solid","border-color":"#0000FFDD","background-color":"#0000FF","font-size":"17.5px"}
            else if(data==2) return {"border":"2px solid","border-color":"#00CC00DD","background-color":"#00CC00","font-size":"17.5px"}
        }            
    },
})