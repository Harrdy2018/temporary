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
```
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
第三种：给元素添加监听事件
<p>pppp</p>
<script>
  document.getElementsByTagName("p")[0].addEventListener("click",()=>{
    console.log("I am clicking p tag;");
  },false);
</script>
```