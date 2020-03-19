## day7-notebook
### vue 指令
* 文本处理 v-html v-text {{have bug}}
* 循环 v-if v-else
```
v-if 控制DOM节点的有无，自然不占空间
v-show 等价于 display:none; 不改变DOM结构，也不占空间
visibility/opacity=0 不改变DOM结构，占空间
```
* 事件 v-on:click="add" @click="add"
* v-model 双向绑定 两个输入框双向绑定，两个输入框内容相互制约、自适应
```html
  <body>
    <input class="top" type="text"><br>
    <input class="bottom" type="text">
  </body>
<script>
  //只实现了单向绑定
  var obj={};
  var name;
  Object.defineProperty(obj,"data",{
    get: function(){
      return name;
    },
    set: function(val){
      name=val;
      document.querySelector(".bottom").value=val;
    }
  })
  //keyup事件，按键弹起的时候触发
  document.querySelector('.top').onkeyup=function(event){
    obj.data=event.target.value;
  }
</script>
```
* v-bind是处理HTML中的标签属性 <a v-bind:href="url"></a><a :href="url"></a>
* v-pre 在模板中跳过vue的编译，直接输出原始值 <div v-pre>{{message}}</div>
* v-cloak 在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用，可以消掉插值的bug
```html
[v-cloak] {display: none;}
<div v-cloak>{{ message }}</div>
```
* v-once 只渲染元素和组件一次,用于优化更新性能
### v-for 和 v-if 的优先级
```
1,v-for > v-if 怎么样看出来的？
打印出渲染函数 console.log(myApp.$options.render);
看源码 node_modules\vue\src\compiler\codegen\index.js 55行
2,如果同时出现，每次渲染都会先执行循环然后再判断条件，无论如何循环无法避免，浪费了性能
3,外层嵌套 template,在这一行进行判断，然后再里面进行循环
```
### vue 组件里面 data 要用函数返回