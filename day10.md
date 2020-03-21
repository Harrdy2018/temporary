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
### cookie
* 查看当前页面 cookie 是否开启 window.navigator.cookieEnabled
* 过程
```
浏览器第一次访问域名A--》服务器向客户端发送cookie--》浏览器存储
浏览器再次访问域名A--》将这个cookie返回给服务器
```
```js
const Koa=require("koa");
const app=new Koa();

app.use(async ctx=>{
  if(ctx.url==="/index"){
    ctx.cookies.set(
      'name',
      "Harrdy",
      cookie = {
        maxAge: 10*60*1000, // cookie有效时长 单位：毫秒数
        expires: new Date("2020-3-21"),  // cookie失效时间
        path: '/', // 写cookie所在的路径,默认是'/'
        domain: '', // 写cookie所在的域名
        //是否只用于http请求中获取;  默认是 true ,客户端不可读取(document.cookie)
        httpOnly: true,
        // 是否允许重写  一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false).
        // 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉
        overwrite: false,
        secure: false,// 安全 cookie   默认false，设置成true表示只有 https可以访问
        sameSite: '',
        signed: '',
      }
    )
    ctx.body="cookie is ok";
  }else if(ctx.url === "/delete"){
    ctx.cookies.set('name', '', { maxAge: 0});
    ctx.body="server:this cookie has delete";
  }else{
    ctx.body=ctx.cookies.get("name");
  }
})

app.listen(3000,()=>{
  console.log("this server is running at port 3000");
})
```