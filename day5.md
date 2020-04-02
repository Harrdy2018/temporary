## day5-notebook
### 箭头函数
* 箭头函数作为匿名函数,是不能作为构造函数的,不能使用new
* 箭头函数不绑定arguments,用的也是外层函数的，取而代之用rest参数…解决
```((...param)=>console.log(param))(1,2,3);//[1,2,3]```
* 箭头函数的this永远指向其上下文的 this，任何方法都改变不了其指向，如call、bind、apply
```js
//由于在vue中自动绑定 this 上下文到实例中，因此不能使用箭头函数来定义一个周期方法
var a=12;
var obj={
  a:10,
  b: function(){
      console.log(this.a);
    },
  c: ()=>console.log(this.a),
  d: function(){
      return ()=>console.log(this.a);
    }
};
obj.b();//10
obj.c();//12
obj.d()();//10
```
```html
 <script>
      //this指向什么是根据在哪里调用以及什么绑定规则确定的
      var name="window";
      var obj={
        name:"obj",
        testa:function(){
          console.log(this.name);//obj
          function inner(){
            console.log(this.name);//window
          }
          inner();
        },
        testb:function(){
          console.log(this.name);//obj
          (function inner(){
            console.log(this.name);//window
          })();
        },
        testc:function(){
          console.log(this.name);//obj
          return function (){
            console.log(this.name);//window
          }
        },
        //箭头函数可以解决嵌套函数this获取不到的问题
        testd:function(){
          console.log(this.name);//obj
          var inner=()=>console.log(this.name);//obj
          inner();
        }
      }
      obj.testa();
      obj.testb();
      obj.testc()();
      obj.testd();
    </script>
```
* 通过 call、apply、bind方法调用一个函数时，只是传入了参数而已，对 this并没有什么影响
```html
  <script>
      var obj={
        a:10,
        b:function(){
          console.log(this.a);
        },
        c:function(){
          var f=()=>console.log(this.a);
          var obj={a:20};
          f.call(obj);
        }
      }
      obj.b();//10
      obj.c();//10
    </script>
```
* 箭头函数没有 prototype属性
```
普通函数
ff.prototype.__proto__===Object.prototype
ff.__proto__===Function.__proto__===Function.prototype===[native code]
箭头函数
ff.prototype==undefined
ff.__proto__===Function.__proto__===Function.prototype===[native code]
```
* 箭头函数不能当做 Generator 函数,不能使用 yield 关键字
### overflow
* visible	默认值。内容不会被修剪，会呈现在元素框之外。
* hidden	内容会被修剪，并且其余内容是不可见的。
* scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
* auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
* inherit	规定应该从父元素继承 overflow 属性的值。
### float
* 包裹性
```
包裹指的是一个浮动元素，如果子元素宽度足够小，则浮动元素的宽度就是该子元素的宽度
p 标签将紧紧的包住 span 标签
.float{
  float: left;
  background-color: lightsalmon;
}
<p class="float">
  <span>ppppppppppppp</span>
</p>

自适应指的是如果浮动元素的父元素有设置宽度，则浮动元素的宽度继承父元素的宽度
.father{
  width: 100px;
}
.child{
  float: left;
  color: red;
  background-color: mediumaquamarine;
}
<div class="father">
  <p class="child">you are a good teacher !!!</p>
</div>
```
* BFC
* 破坏文档流(高度坍塌)；但是不完全脱离文档流(行框盒子和浮动元素的不可重叠性)；
```
这是float最本质的特性，因此float设计的初衷就是破坏文档流
<style>
  .float{
    float: left;
    width: 200px;
  }
</style>
  <body>
    <div style="width: 400px;background-color: palegreen;">
      <img src="./pby.jpg" title="this is pby" class="float">
      <p>this is pby.this is pby.this is pby.this is pby.</p>
    </div>
  </body>
```
* 没有margin合并,设置了float的元素，由于形成了BFC，因此也就没有了margin合并
### 经典两栏布局
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>经典两栏布局</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      .father{
        overflow: hidden;
        background-color: palegreen;
      }
     .float{
       float: left;
       width: 200px;
       margin-right: 20px;
     }
    </style>
  </head>
  <body>
    <div class="father">
      <img src="./pby.jpg" title="this is pby" class="float">
      <p class="content">
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
        this is pby.this is pby.this is pby.this is pby.this is pby.this is pby.
      </p>
    </div>
  </body>
</html>
<script>
</script>
```
### 经典三栏布局
* overflow: hidden 在布局时有神奇的治理布局塌方的功效
* 计算BFC的高度时，浮动元素也参与计算
* 两边宽度固定，中间自适应
* float 解决 div顺序 left->right->main
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>经典三栏布局</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      .left{
        float: left;
        width: 300px;
        background-color: brown;
      }
      .right{
        float: right;
        width: 300px;
        background-color: brown;
      }
      .main{
        background-color: cornflowerblue;
      }
      .container{
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        left left left left left left left left left
        left left left left left left left left left
        left left left left left left left left left
      </div>
      <div class="right">
        right right right right right right right right right
        right right right right right right right right right
      </div>
      <div class="main">
        main main main main main main main main main
        main main main main main main main main main
        main main main main main main main main main
      </div>
    </div>
  </body>
</html>
```
* 容器相对定位，里面div全部绝对定位,div顺序 left->main->right
* 绝对定位完全脱离了文档流，引起的坍塌无法撑开
* obj.offsetHeight=height+padding+border
* obj.clientHeight=height+padding
* obj.style.height 不可读，只可以设置，而且 格式为 100px
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>经典三栏布局</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      .container{
        position: relative;
      }
      .left{
        width: 300px;
        background-color: brown;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      .main{
        background-color: cornflowerblue;
        position: absolute;
        top: 0px;
        left: 300px;
        right: 300px;
      }
      .right{
        width: 300px;
        background-color: brown;
        position: absolute;
        top: 0px;
        right: 0px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        left left left left left left left left left
        left left left left left left left left left
        left left left left left left left left left
      </div>
      <div class="main">
        main main main main main main main main main
        main main main main main main main main main
        main main main main main main main main main
      </div>
      <div class="right">
        right right right right right right right right right
        right right right right right right right right right
      </div>
    </div>
  </body>
</html>
<script>
  let oDiv=document.querySelector(".left");
  document.querySelector(".container").style.height=oDiv.offsetHeight+'px';
</script>
```
* flex 布局(简单)