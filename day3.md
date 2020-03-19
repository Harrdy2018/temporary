## day3-notebook
### JS事件流
* HTMLDomObject.addEventListener(type,listener[,useCapture]);
```
点击body里面的一个p标签
<body><p>pppp</p></body>
为了观察方便不给p标签添加事件，给window->document->html->body分别添加监听器
整个发生分为三个阶段
第一阶段：捕获阶段
<script>
  window.addEventListener("click",()=>{
    console.log("window");
  },true);
  document.addEventListener("click",()=>{
    console.log("document");
  },true);
  document.documentElement.addEventListener("click",()=>{
    console.log("html");
  },true);
  document.body.addEventListener("click",()=>{
    console.log("body");
  },true);
</script>
点击p标签 window->document->html->body事件依次触发
第二阶段：目标阶段
    只是我没有给目标添加事件，不然也会有打印消息
第三阶段：冒泡阶段
    将true改为false即可
点击p标签 body->html->document->window事件依次触发
```
### 给元素添加事件的三种方法
```js
第一种：直接嵌入DOM
<p onclick='console.log("hello world!!!");'>pppp</p>
第二种：将函数嵌入DOM
可以这样理解，test("xiaoming"); 好像要执行这个函数一样！！！
<p onclick='test("xiaoming");'>pppp</p>
<script>
  function test(params) {
    console.log(params);
  };
</script>
第三种：给元素添加监听器
<p>pppp</p>
<script>
  document.getElementsByTagName("p")[0].addEventListener("click",()=>{
    console.log("I am clicking p tag;");
  },false);
</script>
第四种: 给元素添加事件
<p>pppp</p>
<script>
  document.getElementsByTagName("p")[0].onclick=function(){
    console.log("I am clicking p tag;");
  };
</script>
```
### 计算两个div之间的距离
* getBoundingClientRect() 获取元素左上角到窗口的垂直距离
```
两者相减:
document.querySelector(".top").getBoundingClientRect();
document.querySelector(".bottom").getBoundingClientRect();
```
### 外边距折叠
* 浮动和绝对定位的元素不会出现！
* 发生条件：渲染之后的元素位置相邻，而不是dom结构上的相邻
* 情形一：垂直方向上外相邻的两个元素
```
BFC解决外边距折叠：
对两个中的任意元素触发BFC：display: inline-block;
存在多余距离的后遗症，对它们的container：font-size: 0px;
```
* 情形二：父元素和第一个或者最后一个子元素之间相邻
```
BFC解决外边距折叠，貌似没有后遗症：
对两个中的任意元素触发BFC：display: inline-block;
```
* 如何计算外边距折叠之后的大小？ 异号相加；同号取绝对值最大值；
### 如何去除inline-block(inline)块之间的多余间隙
* 为什么？标签与标签之间的间隙产生的，它们的父容器字体越大，间隙也就越大；
* 解决方案
```
一、将代码写成一行/注释填充
二、子元素设置负margin(不好控制，需要调)
三、父容器设置font-size:0px; 内部子元素单独设置字体大小；
四、弹性布局可以去除多余间隙
```
### JS获取DOM元素的方法(8种)
* 通过id属性 document.getElementById() 因为ID属性是惟一的
* 通过name属性 document.getElementsByName()
* 通过标签名 document.getElementsByTagName()
* 通过类名 document.getElementsByClassName()
* 获取html的方法 document.documentElement
* 获取body的方法 document.body
* documment.querySelector()
* document.querySelectorAll()