## day10-notebook
### 前端所有基本事件
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>基本事件</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
    </style>
  </head>
  <body 
    onresize="console.log('窗口被调整时触发');"
    onload="console.log('页面载入完成时触发');" 
    onscroll="console.log('元素滚动时被触发');">
  <img src="./pby.jpg" width="150px" onload="console.log('图片加载完成时触发');">
  <h2>鼠标事件</h2>
  <p onclick="testclick()">onclick</p>
  <p onmouseover="testmouseover()">onmouseover</p>
  <p id="p3">onmouseout</p>
  <h2>键盘事件</h2>
  <input type="text" onkeyup="console.log('键盘按键弹起才触发');">
  <input type="text" onkeydown="console.log('键盘按键按下去一直触发 与press效果一样');">
  <input type="text" onkeypress="console.log('键盘按键按下去一直触发 与down效果一样');">
  </body>
</html>
<script src="./vue.js"></script>
<script src="./jquery-3.4.1.js"></script>
<script type="application/javascript">
  function testclick(){
    console.log("mouse click");
  }
  var testmouseover=function(){
    console.log("mouse over");
  }
  document.querySelector("#p3").addEventListener("mouseout",event=>{
    console.log("mouse out");
    console.log(event.target.nodeName,event.target.tagName);
    console.log(event.srcElement);
  })
</script>
```