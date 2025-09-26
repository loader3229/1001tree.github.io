粒子是自由漂浮的元素，可以移动并具有多种不同的行为。它们还可以与鼠标交互。

要创建粒子，请使用 makeParticles(particle, amount)。其中 particle 是一个用于定义粒子的对象，其属性如下所述。此外还有 makeShinies，它使用不同的默认值，并在随机位置创建静止的粒子。末尾还列出了一些其他有用的内容。

JS
const myParticle {
    image:"options_wheel.png",
    spread: 20,
    gravity: 2,
    time: 3,
    speed() { // 稍微随机化速度
        return (Math.random() + 1.2) * 8 
    },
    etc...
}
属性可以是函数或常量。这些属性会在每个粒子创建时被调用，并带有一个 id 参数，该参数根据当前生成的粒子在 amount 中的序号分配。所有这些属性都是可选的，并有默认值。

所有距离单位均为像素，角度单位为度，0度表示向上，顺时针方向增加。

time：粒子持续的时间（单位：秒）。默认值为3。

fadeOutTime：粒子在结束时淡出所需的时间（占总生命周期的部分）。默认值为1。

fadeInTime：粒子淡入所需的时间（占总生命周期的部分）。默认值为0。

image：粒子应显示的图像。"" 表示不显示图像。默认值为通用粒子图像。

text：在粒子上显示文本。可以使用基本的HTML。

style：允许您向粒子应用其他CSS样式。

width, height：粒子的尺寸。默认值为35和35。

color：将图像的颜色设置为该颜色。

angle：粒子应朝向的角度。默认值为0。

dir：粒子移动的初始角度（在考虑扩散之前）。默认值为 angle 的值。

spread：如果有多个粒子，它们将以 dir 为中心，扩散指定的度数。默认值为30。

rotation：粒子（视觉）角度变化的量。默认值为0。

speed：粒子的初始速度。默认值为15。

gravity：粒子向下加速的量。默认值为0。

x, y：粒子的起始坐标。默认值为鼠标位置。

offset：每个粒子应距离起始点多远出现。默认值为10。

xVel, yVel：初始值根据其他属性设置，随后用于更新运动。

layer：切换标签页时，如果离开 layer 标签页，该粒子将被清除。

您可以向粒子添加其他属性，但必须自行实现其效果。

函数属性：这些属性保持为函数形式，用于更高级的功能。它们是可选的。

update()：每帧调用一次。允许您通过更改其他属性来实现更高级的视觉和运动行为。
onClick(), onMouseOver(), onMouseLeave()：当粒子被交互时调用。
其他有用的内容（不属于粒子对象的属性）：

setDir(particle, dir), setSpeed(particle, speed)：设置粒子的速度/方向。
clearParticles(check)：用于删除粒子的函数。如果不提供 check 参数，则删除所有粒子。check 是一个函数，接受一个粒子作为参数，如果该粒子应被删除则返回 true。
您可以使用 Vue.delete(particles, this.id) 让粒子自行删除。
mouseX 和 mouseY 是跟踪鼠标位置的变量。
sin(x), cos(x), tan(x)：这些函数执行相应的运算，x 以度为单位（而非弧度）。
asin(x), acos(x), atan(x)：这些函数执行相应的运算，返回值以度为单位（而非弧度）。