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