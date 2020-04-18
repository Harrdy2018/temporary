## day11-notebook
### 数组去重
```js
  let arr=[1,2,2,3,3,4,4,4,5,6,8];
  let obj={};
  let target=[];
  arr.forEach((it,index,arr)=>{
    if(obj[it]){

    }else{
      obj[it]=true
      target.push(it);
    }
  });
  console.log(target);

  var ss=new Set(arr);
  console.log([...ss]);
```
### 1 物理像素
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>1 物理像素</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      #box{
        width: 0.5rem;
        height: 0.5rem;
        border-bottom: 1px solid red;
      }
    </style>
  </head>
  <body>
    <div id="box">
      
    </div>
  </body>
</html>
<script type="application/javascript">
  //dpr=物理像素/css像素  1px由多少个像素组成
  let dpr=window.devicePixelRatio;
  console.log(window.devicePixelRatio);
  let scale=1/dpr;
  let metaNode=document.querySelector("meta[name='viewport']");
  metaNode.setAttribute("content",`width=device-width,initial-scale=${scale},user-scalable=no`);
  /*
  比如说 dpr=2;那么物理像素等于 2,需要缩放 scale=0.5;
  一旦设置scale,屏幕宽度像素变大了2倍，盒子宽度等等像素变大了2倍，
  但是盒子还是只有那么大，也就是说盒子也被缩放了。
  所以设置 html 字体大小为 width*dpr
  */
  let width=document.documentElement.clientWidth;
  document.documentElement.style.fontSize=width*dpr+"px";
</script>
```
### 移动端 rem 适配
* rem===the fontsize of root element
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!--
      手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，
      这样就不用把每个网页挤到很小的窗口中.viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放

      width：控制 viewport 的大小，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）
      height：和 width 相对应，指定高度
      initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例
      maximum-scale：允许用户缩放到的最大比例
      minimum-scale：允许用户缩放到的最小比例
      user-scalable：用户是否可以手动缩放

      当设置 width=600 document.documentElement.clientWidth=600
    -->
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>移动端 rem 适配</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      #box{
        width: 0.5rem;
        height: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <p style="font-size: 16px;">this is test 1 rem </p>
    </div>
  </body>
</html>
<script type="application/javascript">
  let width=document.documentElement.clientWidth;
  let htmlNode=document.documentElement;
  htmlNode.style.fontSize=width+'px';
</script>
```
### 闭包
```html
<script type="application/javascript">
  //闭包
  //形成条件：函数嵌套；子函数引用父函数的局部变量
  //闭包优点： 延长父函数的局部变量的生命周期
  //闭包缺点： 内存泄漏
  /*
  function parent(){
    let count=2;
    function child(){
      console.log(count);
    }
    child();
  }
  parent();
  */
 //一道面试题
 /*
  function parent(){
    let count=2;
    return function(){
      count++;
      console.log(count);
    }
  }
  let child=parent();
  child();//3
  child();//4
*/
</script>
```
### vue组件通信方式
* 父组件->子组件
* 子组件->父组件
* 隔代组件间通信
* 兄弟组件通信
#### 实现通信方式
* props
```
子组件的props属性接受父组件绑定的属性值
```
* vue自定义事件
```
子组件模板定义一个按钮事件 <button v-on:click="sendData()">send</button>
sendData: function(){this.$emit("other",this.message);}
父组件模板里面 <child v-on:other="showMessage($event)"></child>
showMessage: function(x){console.log(x);}
```
* 消息订阅与发布
```
可以实现任意间组件通信
```
* vuex
```
管理组件间的状态，实现任意的
```
* slot slot可以在自定义组件时传递给组件内容，组件接收内容并输出
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
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
  <body>
    <div id="app-1">
      <parent>
        <span slot="username">{{info.username}}</span>
        <span slot="ps">{{info.ps}}</span>
      </parent>
    </div>
  </body>
</html>
<script src="./vue.js"></script>
<script src="./jquery-3.4.1.js"></script>
<script type="application/javascript">
let parent={
  template: `
  <div>
    <p><slot name="username"></slot></p>
    <p <slot name="ps"></slot></p>
  </div>
  `
}
  const app=new Vue({
    el: "#app-1",
    data: {
      info: {
        username:"lukang",
        age:18
      }
    },
    components:{
      parent: parent
    }
  })
</script>
```
### 函数防抖和节流
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>debounce and throttle</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 200%;
        margin: 0px;
      }
    </style>
  </head>
  <body>
    <button>按钮</button>
  </body>
</html>
<script type="application/javascript">
  //函数防抖 一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面不生效
  //点击按钮，点一下等待一段时间触发一次，一直点只触发最后一次
  function debounce(fn,delay){
    var timer=null;
    return function(){
      clearTimeout(timer);
      timer=setTimeout(function (){
        fn.apply(this);
      }, delay);
    }
  }
  document.querySelector("button").onclick=debounce(function(){
    console.log("click button"+Date.now());
  },1000)

  //函数节流: 一个函数被触发以后，只有大于设定的执行周期后才会执行第二次
  function throttle(fn,delay){
    //记录上一次函数执行的时间
    let lastTime=0;
    return function(){
      //记录当前函数触发的时间
      let nowTime=Date.now();
      if(nowTime-lastTime>delay){
        //修复 this指向
        fn.call(this);
        lastTime=nowTime;
      }
    }
  }

  document.onscroll=throttle(function(){
    console.log("scroll"+Date.now());
  },200);
</script>
```
### permute
* 给定一个没有重复数字的序列，返回其所有可能的全排列
```js
//无空间复杂度的异或交换算法，只适合对于两个不等的数值
let swap=function(arr,i,j){
  if(i!==j){
    arr[i]=arr[i]^arr[j];
    arr[j]=arr[i]^arr[j];
    arr[i]=arr[i]^arr[j];
  }
};
//全排列问题->回溯算法->典型的DFS(Depth-First-Search)
var permute = function(nums) {
  let output=[];
  let n=nums.length;
  function backtrack(first=0){
    if(first===n-1){
      output.push(JSON.parse(JSON.stringify(nums)));
    }else{
      for(let i=first;i<n;i++){
        swap(nums,first,i);
        backtrack(first+1);
        swap(nums,first,i);
      }
    }
  }
  backtrack();
  return output;
};
```
### 字符串的不可变性
```js
//说明字符串的值是不可变的
var str = "hello";
str[1] = "E";
console.log(str);//hello
//str指向了另一个字符串的地址，字符串本身没有变
str = "test";
console.log(str);//test
```
### 5个常用的 css单位
* 1个px就是一个像素点的意思，在段落设置的时候，font-size和line-height要同时兼顾
* em 是一个相对单位，基于本容器font-size的设定，不是基于父容器(font-size具有继承性)
* rem，是html字体大小的倍数，与父级元素无关
* vh/vw，viewport height/viewport width 和浏览器当前尺寸有关，即浏览器当前长宽的百分比
* vmin/vmax 百分比，vmin代表荧幕较短的一边，vmax代表荧幕较长的一边
```
img width: 100vmin 表示将屏幕较短的一边作为图片的宽度，这样无论你怎么旋转频谱，图片
                   都能完整显示
img width: 100vmax 表示将屏幕较长的一边作为图片的宽度
```
