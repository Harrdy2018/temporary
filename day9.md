## day9-notebook
### vue 生命周期
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>learn life-cycle</title>
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
    <div id="app">
      {{message}}
      <p>{{count}}</p>
      <button v-on:click="add()">add</button>
    </div> 
    <button onclick="destroy()">destroy</button>
  </body>
</html>
<script src="./vue.js"></script>
<script src="./jquery-3.4.1.js"></script>
<script type="application/javascript">
const app=new Vue({
  el: "#app",
  data: {
    message: "hello world",
    count: 0,
  },
  methods: {
    add: function(){
      this.count++;
    }
  },
  beforeCreate: function(){
    //beforeCreate阶段，el和data都为undefined，还未初始化
    console.log("1 beforeCreate");
    console.log(document.querySelector("#app"));
    console.log(this.$el,this.$data);
  },
  created: function(){
    //created阶段，vue实例的数据对象data有了，el还没有,页面还无法显示
    console.log("2 created");
    console.log(document.querySelector("#app"));
    console.log(this.$el,this.$data);
  },
  beforeMount: function(){
    //beforeMount阶段，vue实例的$el和data都初始化了，
    //data里面的数据还没替换，为虚拟的dom节点，页面还无法显示
    console.log("3 beforeMount");
    console.log(document.querySelector("#app"));
    console.log(this.$el,this.$data);
  },
  mounted: function(){
    //mounted阶段，vue实例挂载完成，data.message成功渲染
    console.log("4 mounted");
    console.log(document.querySelector("#app"));
    console.log(this.$el,this.$data);
  },
  beforeUpdate: function(){
    //data 变化时触发
    console.log("5 beforeUpdate");
  },
  updated: function(){
    //data 变化时触发
    console.log("6 updated");
  },
  //在执行destroy方法触发下面两个状态，此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
  beforeDestroy: function(){
    console.log("9 beforeDestroy");
    console.log(document.querySelector("#app"));
    console.log(this.$el,this.$data);
  },
  destroyed: function(){
    console.log("10 destroyed");
    console.log(document.querySelector("#app"));
    console.log(this.$el,this.$data);
  }
})
var destroy=function(){
  app.$destroy();
}
</script>
```