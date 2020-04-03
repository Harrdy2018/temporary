## day1-notebook
* document     "[object HTMLDocument]"
* 对象指的是你写的html中所有的东西，包括文档申明
```html
 <!doctype html>
 <html>
 <head>...</head>
 <body>...</body>
 </html>
 ```
* document.documentElement    "[object HTMLHtmlElement]"
* 对象指的是html元素包裹的东西，不包括文档申明
```html
<html>
 <head>...</head>
 <body>...</body>
 </html>
```
* document.head        "[object HTMLHeadElement]"
* 对象指的是head元素包裹的东西
```<head>...</head>```
* document.body        "[object HTMLBodyElement]"
* 对象指的是body元素包裹的东西
```<body>...</body>```
### 如何获取屏幕的高度以及宽度
```js
记住 document.documentElement===document.getElementsByTagName("html")[0]
高度 document.documentElement.clientHeight
     document.body.clientHeight（由于body margin影响会导致偏小）
宽度 document.documentElement.clientWidth
     document.body.clientWidth（由于body margin影响会导致偏小）
```
### 如何获取客户端类型
```js
window.navigator.userAgent
"Mozilla/5.0 ... Chrome/80.0.3987.132 Safari/537.36"
```
### display & visibility & opacity
```
相同点：不会影响DOM结构
块级元素：总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示
display 元素如何的显示,(占空间：block、inline、block-inline;不占空间:none)
  none 不占空间
  inline 块级元素--->内联元素
  block  内联元素--->块级元素
visibility 元素是显示还是隐藏
  hidden 只是隐藏了，占空间
opacity 元素透明度设置
  0  表面上看不见而已，占空间
```
### 消除无序列表和有序列表的样式
```html
    <style>
      ol,li{
        list-style: none;
      }
      ol{
        padding: 0px;
        margin: 0px;
      }
    </style>
```
### position 定位
```
static 静态定位：元素的默认值，即没有定位，遵循正常的文档流对象
fixed 固定定位：元素相对于浏览器窗口是静止的，无论你怎么滑动滚动条，
               元素一刻也没有改动过；
               元素的位置与文档流无关，因此不占据空间(脱离文档流)，
               与其他元素有重叠的现象；
relative 相对定位：相对其正常的位置的定位。
                  没有脱离文档流，占据空间
absolute 绝对定位：相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>
                   脱离文档流，不占据空间，可以与其他元素重叠
sticky 粘性定位： 基于用户滚动位置来定位，由relative--->fixed定位过渡
                 必须要设置定位top属性的值，否则只是relative定位的效果
** 元素重叠的时候，可以指定 z-index 值改变重叠顺序
```
### flex 弹性布局
```
块级元素开启flex布局：display: flex;
flex-direction: 盒子里面元素的排列方向(主轴的方向)
              row  水平从左到右（默认）
              row-reverse 水平从右到左
              column  竖直从上到下
              column-reverse 竖直从下到上
flex-wrap: 如果一条轴线排不下，如何换行。
          nowrap （默认）不换行
          wrap 换行。第一行在上方
          wrap-reverse 换行。第一行在下方
justify-content: 项目在主轴上的对齐方式
              flex-start （默认值）左对齐
              flex-end 右对齐
              center 居中
              space-between 两端对齐，项目之间的间隔都相等
              space-around 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
align-items: 项目在交叉轴上如何对齐。
              flex-start：交叉轴的起点对齐。
              flex-end：交叉轴的终点对齐。
              center：交叉轴的中点对齐。
              baseline: 以每个项目的第一行文字的基线对齐。
              stretch：拉伸（默认值）
**盒子是设置的固定高度，如果里面的项目没设置高度或设为auto,那么项目在交叉轴上将拉伸，占满整个
  盒子的高度
**设置各个属性，是对盒子设置，而不是对里面的项目设置
```
### 垂直居中布局
#### 图片水平居中
```
对容器本身进行如下属性设置：
text-align: center;
```
#### 块级元素的水平居中
```
对元素本身进行设置：
margin-left: auto;
margin-right: auto;
```
#### 容器里面的文字垂直居中
```
对容器本身进行如下属性设置：
text-align: center;
line-height: 容器的高度;
```
#### 容器里面的div垂直居中布局
##### parent=相对定位(不影响布局) child=绝对定位(相对于父元素更加的直观)
```
第一步：将child移到parent的正中间
      child top:50% left:50%
第二步：使用负边距垂直居中
        child margin-left: -width(child)/2
        child margin-top: -height(child)/2
        **边距千万不能使用百分比，它参照的是父元素的宽度

第二步：使用translate函数，它的参照的child本身
      transform: translate(-50%,-50%);

直接一步到位，对child
      margin: auto;(一定要设置为auto,主要靠margin自适应)
      top: 0px;没变化
      left: 0px;没变化
      right: 0px;由于margin为auto,margin的左右两边自动填充一半
      bottom: 0px;由于margin为auto,margin的左右两边自动填充一半
```
#### flex 弹性布局垂直居中
```
parent display:flex;
       flex-direction: row;
       justify-content: center;
       align-items: center;
```
#### grid 网格布局垂直居中
```
parent display:grid;
       justify-content: center;
       align-items: center;
```
### CSS选择器
* 内联>ID>class>元素/标签选择器
```
* ID选择器(ID selector,IS) #
* 类选择器(class selector,CS) .
* 元素(标签)选择器(element selector,ES) 标签名
* 包含选择器(package selector,PS) 容许多层嵌套
            A B{...} A里面的B标签
            .A B{...} class名为A的标签里面的B标签
* 子选择器(sub-selector,SS) 只对直接子代有用
            A>B{...} A里面的直接子代B标签
            .A>B{...} class名为A的标签里面的直接子代B标签
* 兄弟选择器(brother selector,BS)
            BS是CSS3.0新增的一个选择器,A~B{...}
            每个A标签紧邻后的所有兄弟即B标签
* 相邻选择器，语法格式：A+B
            每个A标签紧邻后的第一个元素B 因为是相邻的，所以只选择一个B
* 通用选择器 * 它的作用是匹配 html 中的所有元素标签
```
### 伪类和伪元素  给选择器添加不同的效果
```
伪类
a:hover {...} 鼠标划过链接
a:active {...} 鼠标点击一瞬间激活链接的时候变化
p:first-child 匹配第一个p元素(不是子代)
p>i:first-child 匹配为p的直接子代i,并且是第一个i
p:first-child i 匹配p标签中的第一个p标签下面的直接子代或者间接子代i
伪元素
p::first-line{color: red} 对 p 元素的第一行文本进行格式化
p::first-letter{color: red} 向文本的首字母设置特殊样式
.dd::first-letter {color:#ff0000;}
p::before{content: "you are a girl"} 在元素的内容前面插入新内容
p::after{content: "you are a girl"} 伪元素可以在元素的内容之后插入新内容
```
### 实现类式继承
```
Object.creat(obj) es6创建对象的另外一种方式
B=Object.creat(A) B.__proto__===A
一、子构造函数的this绑定到父构造函数里去
二、用父构造函数的原型创建对象赋值给子函数构造对象的原型
三、设置子构造函数原型的constructor
```
```js
function Shape(){
  this.x=0;
  this.y=0;
}
Shape.prototype.move=function(x,y){
  this.x+=x;
  this.y+=y;
  console.log("Shape moved");
}
function Rectangle(){
  Shape.call(this);
}
Rectangle.prototype=Object.create(Shape.prototype);
Rectangle.prototype.constructor=Rectangle;
var rect=new Rectangle();
console.log(rect instanceof Rectangle);
console.log(rect instanceof Shape);
rect.move(1,1);
```
### new()
```js
function Person(name,age){
  this.name=name;
  this.age=age;
}
Person.prototype.sayName=function(){
  console.log(this.name);
}
function my_new(Fun,...rest){
  // 1.以构造器的prototype属性为原型，创建新对象实例
  var that=Object.create(Fun.prototype);
  // 2.将this和调用参数传给构造器执行,完善新对象实例
  Person.apply(that,rest);
  // 3.返回第一步的新对象实例
  return that;
}
var pp=my_new(Person,"lukang",18);
console.log(pp);
pp.sayName();
//check
console.log(pp instanceof Person);//true
console.log(pp.constructor===Person);//true
console.log(pp.hasOwnProperty("name"));//true
console.log(pp.hasOwnProperty("name"));//true
console.log(pp.hasOwnProperty("sayName"));//false
```