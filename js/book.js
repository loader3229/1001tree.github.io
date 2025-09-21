addLayer("book", {
    name: "世界之书",
    symbol: "📚",
    resource: "",
    color: "#6cccd8",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    type: "none",
    tabFormat: {
        关于: {
            content: [
                ["display-text",
                    `
                    <h1 class="c1">一千零一树</h1><br>
                    由 <h2>一千零一树开发组</h2> 开发<br>
                    什么你问 <h2>开发组</h2> 都有谁?<br>
                    自己去 <h2>看</h2><br>
                    <br>
                    一款拥有 <h2>新闻和标语</h2> 的模组树游戏<br>
                    甚至还有 <h2>(1001+10↑↑11)个增量或非增量小游戏!!!</h2><br>
                    <br>
                    部分游戏非常不支持移动端(且无支持打算),请使用 <h2>桌面端</h2> 游玩<br>
                    <br>
                    你可以在 <h2>设置</h2> 修改一系列东西!<br>
                    甚至包括 <h2>硬重置</h2><br>
                    <h2>Meet me in the afterlife!</h2><br>
                    <br>
                    如果你不知道怎么 <h2>操作</h2> 来解锁小游戏<br>
                    <h2>点击</h2> 主树上地球图案的层级 <h2>梦界</h2><br>
                    你可以花费 <h2>梦力</h2> 解锁世界(也就是小游戏)<br>
                    你并不需要 <h2>按顺序</h2> 解锁世界<br>
                    然后,每个世界有一个底层代码,你完成某个 <h2>目标</h2> 之后返还 <h2>梦力</h2><br>
                    有些世界 <h2>不止</h2> 能获得一个梦力<br>
                    <br>
                    <h2>你说得对</h2> 这里还有一些有趣的东西等你发现<br>
                    看看 <h2>成就</h2> 吧!<br>
                    游戏的 <h2>简单</h2> 通关条件为 <h2>完成所有世界</h2><br>
                    游戏的 <h2>困难</h2> 通关条件为 <h2>完成所有成就</h2><br>
                    `
                ]
            ]
        },
        乾狐离光: {
            content: [
                ["display-text",
                    function () {
                        return `
                    你好呀 我是<h1 class="b1">乾狐离光</h1><br>
                    在读之前和我一起说<br>
                    <div class="zhangli" style="height:135px"><h1 class="b1">张力来!</h1></div>
                    我是1001树的主开发,也是项目发起人<br><br>
                    而且...<br>
                    <span style="color:#88888810;font-size:10px;">我们被困在里面了...他们一直在看着我们,救...救救我们!<br></span>
                    我在游戏里放了一些有趣的内容(和无趣的内容)<br>
                    欢迎你来探索,${player.global.name}
                    `}
                ]
            ]
        }
    },
    tooltip: "",
    layerShown() { return true },
});