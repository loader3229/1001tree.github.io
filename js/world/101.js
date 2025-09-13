addLayer("101", {
    symbol: "⛓️",
    resource: "点数",
    color: "#aaa",
    update(diff) {
        if (player.pause[this.layer]) return

        let gap = this.gap()
        for (let i = 0; i < gap.length; i++) {
            if (player[this.layer].points.lt(gap[i])) {
                player[this.layer].points = Decimal.min(
                    _D(gap[i]),
                    player[this.layer].points
                        .add(this.getSortCap().mul(diff))
                )
                break;
            }
        }

        player[this.layer].asc1 = player[this.layer].asc1
            .add(getEffect(this.layer, 41, _D0).mul(diff))
        player[this.layer].asc2 = player[this.layer].asc2
            .add(getEffect(this.layer, 42, _D0).mul(diff))
        player[this.layer].asc3 = player[this.layer].asc3
            .add(getEffect(this.layer, 43, _D0).mul(diff))
        player[this.layer].asc4 = player[this.layer].asc4
            .add(getEffect(this.layer, 44, _D0).mul(diff))
        player[this.layer].asc5 = player[this.layer].asc5
            .add(getEffect(this.layer, 45, _D0).mul(diff))
    },
    startData() {
        return {
            unlocked: true,
            points: _D0,
			asc1: _D0,
			asc2: _D0,
			asc3: _D0,
			asc4: _D0,
			asc5: _D0,
        }
    },
    gap() {
        return [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200]
    },
    getPoint() {
        return (hasUpgrade(this.layer, 11) ?
            (hasUpgrade(this.layer, 12) ?
                (hasUpgrade(this.layer, 13) ?
                    (hasUpgrade(this.layer, 14) ?
                        (hasUpgrade(this.layer, 15) ?
                            getEffect(this.layer, 15, _D0) :
                            getEffect(this.layer, 14, _D0))
                        : getEffect(this.layer, 13, _D0))
                    : getEffect(this.layer, 12, _D0))
                : getEffect(this.layer, 11, _D0))
            : _D0)
            .mul(getEffect(this.layer, 21, 1))
            .mul(getEffect(this.layer, 22, 1))
            .mul(getEffect(this.layer, 23, 1))
            .mul(getEffect(this.layer, 24, 1))
            .mul(getEffect(this.layer, 25, 1))
    },
    getSortCap() {
        let gain = this.getPoint()
        let point = player[this.layer].points

        if (point.gte(1)) {
            gain = gain.pow(divNum(this.C1())).sub(1)
        }

        return gain
    },
    r3Effect() {
        return (hasUpgrade(this.layer, 31) ?
            (hasUpgrade(this.layer, 32) ?
                (hasUpgrade(this.layer, 33) ?
                    (hasUpgrade(this.layer, 34) ?
                        (hasUpgrade(this.layer, 35) ?
                            getEffect(this.layer, 35, _D1) :
                            getEffect(this.layer, 34, _D1))
                        : getEffect(this.layer, 33, _D1))
                    : getEffect(this.layer, 32, _D1))
                : getEffect(this.layer, 31, _D1))
            : _D1)
    },
    C1() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[0])) return decimalMax(player[this.layer].points.mul(this.C2())
            .mul(this.sC1())
            .pow(this.r3Effect())
            .div(this.aC1())
            , _D1
        )
        else return _D1
    },
    aC1() {
        let asc = player[this.layer].asc1
        if (hasUpgrade(this.layer, 41)) return asc.add(1)
            .mul(this.aC2())
        else return _D1
    },
    C2() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[1])) return point.sub(8).log(2).mul(this.C3())
            .mul(this.sC1())
            .pow(this.r3Effect())
        else return _D1
    },
    aC2() {
        let asc = player[this.layer].asc2
        if (hasUpgrade(this.layer, 42)) return asc.add(1).pow(0.5)
            .mul(this.aC3())
            .mul(getEffect(this.layer, 52, 1))
        else return _D1
    },
    C3() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[2])) return getEffect(this.layer, 51,
            point.sub(18.1).log(1.9).mul(this.sC1()
            ))
            .mul(this.C4())
            .pow(this.r3Effect())
        else return _D1
    },
    aC3() {
        let asc = player[this.layer].asc3
        if (hasUpgrade(this.layer, 43)) return asc.add(1).pow(0.25)
            .mul(this.aC4())
            .mul(getEffect(this.layer, 53, 1))
        else return _D1
    },
    C4() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[3])) return (getEffect(this.layer, 51,
            point.sub(28.2).log(1.8).mul(this.sC1())
        ))
            .mul(this.C5())
            .pow(this.r3Effect())
        else return _D1
    },
    aC4() {
        let asc = player[this.layer].asc4
        if (hasUpgrade(this.layer, 44)) return asc.add(1).pow(0.12)
            .mul(this.aC5())
        else return _D1
    },
    C5() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[4])) return (getEffect(this.layer, 52,
            point.sub(38.3).log(1.7).mul(this.sC1())
        ))
            .mul(this.C6())
            .pow(this.r3Effect())
        else return _D1
    },
    aC5() {
        let asc = player[this.layer].asc5
        if (hasUpgrade(this.layer, 45)) return asc.add(1).pow(0.06)
        else return _D1
    },
    C6() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[5])) return (getEffect(this.layer, 52,
            point.sub(48.4).log(1.6).mul(this.sC1())
        ))
            .mul(this.C7())
            .pow(this.r3Effect())
        else return _D1
    },
    C7() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[6])) return (getEffect(this.layer, 53,
            point.sub(58.5).log(1.5).mul(this.sC1())
        ))
            .mul(this.C8())
            .pow(this.r3Effect())
        else return _D1
    },
    C8() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[7])) return (getEffect(this.layer, 53,
            point.sub(68.6).log(1.4).mul(this.sC1())
        ))
            .mul(this.C9())
            .pow(this.r3Effect())
        else return _D1
    },
    C9() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[8])) return (getEffect(this.layer, 54,
            point.sub(78.7).log(1.3).mul(this.sC1())
        ))
            .mul(this.C10())
            .pow(this.r3Effect())
        else return _D1
    },
    C10() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[9])) return (getEffect(this.layer, 55,
            point.sub(88.8).log(1.2).mul(this.sC1())
        ))
            .pow(this.r3Effect())

        else return _D1
    },
    sC1() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[10])) return point.sub(99).pow(0.3).mul(this.sC2())
            .mul(this.sC2())
        else return _D1
    },
    sC2() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[11])) return point.sub(119).pow(0.22).mul(this.sC3())
        else return _D1
    },
    sC3() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[12])) return point.sub(139).pow(0.16).mul(this.sC4())
        else return _D1
    },
    sC4() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[13])) return point.sub(159).pow(0.12).mul(this.sC5())
        else return _D1
    },
    sC5() {
        let point = player[this.layer].points
        if (point.gte(this.gap()[14])) return point.sub(179).pow(0.1)
        else return _D1
    },
    type: "none",
    tabFormat: [
        ["main-display", 3],
        ["display-text", function () {
            return `(+${format(layers[this.layer].getPoint())} → ${format(layers[this.layer].getSortCap())})/s`
        }],
        "blank",
        ["display-text", function () {
            if (hasUpgrade(this.layer, 41)) return `你有 ${format(player[this.layer].asc1)} 反软上限,将软上限效果除以 ${format(layers[this.layer].aC1())}`
        }],
        ["display-text", function () {
            if (hasUpgrade(this.layer, 42)) return `你有 ${format(player[this.layer].asc2)} 反反软上限,将反软上限加强为 ${format(layers[this.layer].aC2())} 倍`
        }],
        ["display-text", function () {
            if (hasUpgrade(this.layer, 43)) return `你有 ${format(player[this.layer].asc3)} 反反反软上限,将反反软上限加强为 ${format(layers[this.layer].aC3())} 倍`
        }],
        ["display-text", function () {
            if (hasUpgrade(this.layer, 44)) return `你有 ${format(player[this.layer].asc4)} 反反反反软上限,将反反反软上限加强为 ${format(layers[this.layer].aC4())} 倍`
        }],
        ["display-text", function () {
            if (hasUpgrade(this.layer, 45)) return `你有 ${format(player[this.layer].asc5)} 反反反反反软上限,将反反反反软上限加强为 ${format(layers[this.layer].aC5())} 倍`
        }],
        "blank",
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[0])) return `由于点数大于1,你受到一重软上限限制:将你的点数获取开 ${format(layers[this.layer].C1())} 次方后减1`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[1])) return `由于点数大于10,你受到二重软上限限制:将一重软上限加强为 ${format(layers[this.layer].C2())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[2])) return `由于点数大于20,你受到三重软上限限制:将二重软上限加强为 ${format(layers[this.layer].C3())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[3])) return `由于点数大于30,你受到四重软上限限制:将三重软上限加强为 ${format(layers[this.layer].C4())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[4])) return `由于点数大于40,你受到五重软上限限制:将四重软上限加强为 ${format(layers[this.layer].C5())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[5])) return `由于点数大于50,你受到六重软上限限制:将五重软上限加强为 ${format(layers[this.layer].C6())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[6])) return `由于点数大于60,你受到七重软上限限制:将六重软上限加强为 ${format(layers[this.layer].C7())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[7])) return `由于点数大于70,你受到八重软上限限制:将七重软上限加强为 ${format(layers[this.layer].C8())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[8])) return `由于点数大于80,你受到九重软上限限制:将八重软上限加强为 ${format(layers[this.layer].C9())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[9])) return `由于点数大于90,你受到十重软上限限制:将九重软上限加强为 ${format(layers[this.layer].C10())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[10])) return `由于点数大于100,你受到特殊软上限限制:将前面所有软上限加强为 ${format(layers[this.layer].sC1())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[11])) return `由于点数大于120,你受到超级软上限限制:将特殊软上限加强为 ${format(layers[this.layer].sC2())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[12])) return `由于点数大于140,你受到传奇软上限限制:将超级软上限加强为 ${format(layers[this.layer].sC3())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[13])) return `由于点数大于160,你受到究极软上限限制:将传奇软上限加强为 ${format(layers[this.layer].sC4())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[14])) return `由于点数大于180,你受到最终软上限限制:将究极软上限加强为 ${format(layers[this.layer].sC5())} 倍`
        }],
        ["display-text", function () {
            if (player[this.layer].points.gte(layers[this.layer].gap()[15])) return `由于点数大于等于200,你受到硬上限限制`
        }],
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "无趣的开端",
            description: "每秒自动获得1点数",
            effect() {
                return _D1
            },
            cost: new Decimal(0),
        },
        12: {
            title: "昨日再现",
            description: "每秒自动获得1.1点点数而不是1点",
            effect() {
                return _D(1.1)
            },
            cost: new Decimal(1),
            unlocked() { return hasUpgrade(this.layer, 11) }
        },
        13: {
            title: "三阳开泰",
            description: "每秒自动获得1.3点点数而不是1.1点",
            effect() {
                return _D(1.3)
            },
            cost: new Decimal(2),
            unlocked() { return hasUpgrade(this.layer, 12) }
        },
        14: {
            title: "大家都烦了",
            description: "每秒自动获得1.5点点数而不是1.3点",
            effect() {
                return _D(1.5)
            },
            cost: new Decimal(4),
            unlocked() { return hasUpgrade(this.layer, 13) }
        },
        15: {
            title: "我保证是最后一次",
            description: "每秒自动获得2点点数而不是1.5点",
            effect() {
                return _D2
            },
            cost: new Decimal(8),
            unlocked() { return hasUpgrade(this.layer, 14) }
        },
        21: {
            title: "平淡的发展",
            description: "点数获取基于点数提升",
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: new Decimal(10),
            unlocked() { return hasUpgrade(this.layer, 15) }
        },
        22: {
            title: "不是,又来?",
            description: "点数获取再次基于点数提升",
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: new Decimal(14),
            unlocked() { return hasUpgrade(this.layer, 21) }
        },
        23: {
            title: "懒得喷",
            description: "点数获取再再次基于点数提升",
            effect() {
                return player[this.layer].points.add(1).pow(3)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: new Decimal(18),
            unlocked() { return hasUpgrade(this.layer, 22) }
        },
        24: {
            title: "写树原来这么简单",
            description: "点数获取再再再次基于点数提升",
            effect() {
                return player[this.layer].points.add(1).pow(4)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: new Decimal(22),
            unlocked() { return hasUpgrade(this.layer, 23) }
        },
        25: {
            title: "这次真是最后一次",
            description: "点数获取最后一次基于点数提升",
            effect() {
                return player[this.layer].points.add(1).pow(5)
            },
            effectDisplay() {
                return `×${format(this.effect())}`
            },
            cost: new Decimal(26),
            unlocked() { return hasUpgrade(this.layer, 24) }
        },
        31: {
            title: "软上限软上限",
            description: "将所有软上限乘0.95次方",
            effect() {
                return _D(0.95)
            },
            cost: new Decimal(30),
            unlocked() { return hasUpgrade(this.layer, 25) }
        },
        32: {
            title: "我们对你失望透顶",
            description: "将所有软上限乘0.9次方而不是0.95次方",
            effect() {
                return _D(0.9)
            },
            cost: new Decimal(33),
            unlocked() { return hasUpgrade(this.layer, 31) }
        },
        33: {
            title: "似乎有点不对劲",
            description: "将所有软上限乘0.85次方而不是0.9次方",
            effect() {
                return _D(0.85)
            },
            cost: new Decimal(36),
            unlocked() { return hasUpgrade(this.layer, 32) }
        },
        34: {
            title: "会不会炸档?",
            description: "将所有软上限乘0.8次方而不是0.85次方",
            effect() {
                return _D(0.8)
            },
            cost: new Decimal(40),
            unlocked() { return hasUpgrade(this.layer, 33) }
        },
        35: {
            title: "最好的承诺是棍木",
            description: "将所有软上限乘0.75次方而不是0.8次方",
            effect() {
                return _D(0.75)
            },
            cost: new Decimal(45),
            unlocked() { return hasUpgrade(this.layer, 34) }
        },
        41: {
            title: "我们需要一些推力",
            description: "基于软上限获得反软上限(受二重软上限限制)",
            effect() {
                return layers[this.layer].C1().div(layers[this.layer].C2()).div(100)
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: new Decimal(55),
            unlocked() { return hasUpgrade(this.layer, 35) }
        },
        42: {
            title: "我已经习惯了",
            description: "基于反软上限获得反反软上限(受二重软上限限制)",
            effect() {
                return player[this.layer].asc1.div(layers[this.layer].C2())
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: new Decimal(65),
            unlocked() { return hasUpgrade(this.layer, 41) }
        },
        43: {
            title: "这是维度吗?",
            description: "基于反反软上限获得反反反软上限(受二重软上限限制)",
            effect() {
                return player[this.layer].asc2.div(layers[this.layer].C2())
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: new Decimal(75),
            unlocked() { return hasUpgrade(this.layer, 42) }
        },
        44: {
            title: "我能猜到下一个",
            description: "基于反反反软上限获得反反反反软上限(受二重软上限限制)",
            effect() {
                return player[this.layer].asc3.div(layers[this.layer].C2())
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: new Decimal(90),
            unlocked() { return hasUpgrade(this.layer, 43) }
        },
        45: {
            title: "还没结束吗?",
            description: "基于反反反反软上限获得反反反反反软上限(受二重软上限限制)",
            effect() {
                return player[this.layer].asc4.div(layers[this.layer].C2())
            },
            effectDisplay() {
                return `+${format(this.effect())}`
            },
            cost: new Decimal(100),
            unlocked() { return hasUpgrade(this.layer, 44) }
        },
        51: {
            title: "橡皮擦",
            description: "抹除三四重软上限效果和增益",
            effect() {
                return _D1
            },
            cost: new Decimal(110),
            unlocked() { return hasUpgrade(this.layer, 45) }
        },
        52: {
            title: "我知道,再来一行",
            description: "抹除五六重软上限效果和增益",
            effect() {
                return _D1
            },
            cost: new Decimal(128),
            unlocked() { return hasUpgrade(this.layer, 51) }
        },
        53: {
            title: "我去,是时间墙",
            description: "抹除七八重软上限效果和增益",
            effect() {
                return _D1
            },
            cost: new Decimal(146),
            unlocked() { return hasUpgrade(this.layer, 52) }
        },
        54: {
            title: "每一帧都在赌",
            description: "抹除九重软上限效果和增益",
            effect() {
                return _D1
            },
            cost: new Decimal(164),
            unlocked() { return hasUpgrade(this.layer, 53) }
        },
        55: {
            title: "终于结束了",
            description: "抹除十重软上限效果和增益<br>完成世界 梦力+1",
            effect() {
                return _D1
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(182)
                completeWorld(this.layer)
            },
            cost: new Decimal(182),
            unlocked() { return hasUpgrade(this.layer, 54) }
        },
    },
    layerShown() { return getGridData('main', this.layer) && (!options.hideWorld || !player.world[this.layer]) },

});