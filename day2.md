## day2-notebook
### 实现一个动态添加动态删除的功能
*** 怎么给动态添加的元素绑定事件?
```html
<!DOCTYPE html>
<html>
  <head>
    <title>test</title>
    <style>
      html{
        height: 100%;
      }
      body{
        margin: 0px;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <button onclick="AddJob()">添加工作经历</button>
    <button onclick="GetJobs()">获取全部工作</button>
    <div id="main">
      <input name="companyName" placeholder="please input content" value="" type="text">
    </div>
    <div id="joblist"></div>
  </body>
</html>
<script src="./index.js"></script>
```
#### 第一种是在动态添加的html代码里直接添加oclick事件
```js
function  AddJob() {
  var oInput=document.querySelector("#main>input");
  if(oInput.value){
    var timestamp=new Date().valueOf();
    document.querySelector("#joblist").innerHTML+=
    `<div id="job${timestamp}">
      <input name="companyName" value=${oInput.value} type="text" disabled>
      <button onclick="DelJob(${timestamp})">删除</button>
      </div>
    `
  }
}
function DelJob(timestamp) {
  document.querySelector(`#job${timestamp}`).remove();
}
function GetJobs() {
  var jobs=[];
  var parent=document.querySelector("#joblist").children;
  if(parent.length>0){
    for(var i=0;i<parent.length;i++){
      jobs.push(parent[i].children[0].value);
    }
    alert(jobs);
  }
}
```
#### 第二种是事件委托，事件委托将一个事件侦听器实际绑定到整个容器
```js
function  AddJob() {
  var oInput=document.querySelector("#main>input");
  if(oInput.value){
    var timestamp=new Date().valueOf();
    document.querySelector("#joblist").innerHTML+=
    `<div id="job${timestamp}">
      <input name="companyName" value=${oInput.value} type="text" disabled>
      <button>删除</button>
      </div>
    `
  }
}
document.querySelector("#joblist").addEventListener("click",(ev)=>{
  var target=ev.target || ev.srcElement;
  if(target.nodeName.toLowerCase()==="button"){
    var e=document.getElementById(target.parentNode.id);
    document.querySelector("#joblist").removeChild(e);
  }
},false);
function GetJobs() {
  var jobs=[];
  var parent=document.querySelector("#joblist").children;
  if(parent.length>0){
    for(var i=0;i<parent.length;i++){
      jobs.push(parent[i].children[0].value);
    }
    alert(jobs);
  }
}
```