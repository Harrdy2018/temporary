## day8-notebook
### let、const、var
* 顶层对象
```js
//顶层对象，在浏览器环境指的是window对象
//var命令和function命令声明的全局变量，依旧是顶层对象的属性；
var a=1;
function add(){};
console.log(window.a,window.add);
//let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
let b=1;
const c=2;
console.log(window.b,window.c);

//下面也是顶层对象属性  可以用 delete 删除变量
d=3;
console.log(window.d);
```
* var function 变量提升`
```js
console.log(a);//undefined
var a=2;
var a=function(){};

console.log(b);//func b
var b=3;
function b(){};
```
* let
```js
//let声明的变量只在它所在的代码块有效。
{
  var a=1;
  let b=2;
}
console.log(a);
//console.log(b);//b is not defined

for(let i=0;i<3;i++){

}
//console.log(i);//i is not defined

var arr=[];
for(var j=0;j<3;j++){
  arr[j]=function(){
    console.log(j)
  }
}
arr[2]();//3

//当前的j只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。
//这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量j时，就在上一轮循环的基础上进行计算。
var arr=[];
for(let j=0;j<3;j++){
  arr[j]=function(){
    console.log(j)
  }
}
arr[2]();//2

//for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
```
* let实际上为 JavaScript 新增了块级作用域
```js
var a=19;
(function(){
  var a=5;
})();
console.log(a);//19

//块级作用域写法
{
  let a=7;
}
```
* const 不变？
```js
//其实const保证的并不是变量的值不动，而是变量指向的内存地址不得改动
//先分配内存单元,将 hello 存入，内存首地址付给 message,即指针
const message = 'hello'
//先分配内存单元,将de存入，内存首地址付给 message,即改变了message 的指向
message="de";

const foo={};
// 将 foo 指向另一个对象，就会报错
foo = {}; 
//常量foo储存的是一个地址，这个地址指向一个对象。
//不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。
```
### 深拷贝、浅拷贝
* 黑科技实现深拷贝
```js
var obj={
  name: "oppo",
  arr: [1,2,3]
}
var targetObj=JSON.parse(JSON.stringify(obj));
```
* Object.create() 实现
```js
var obj={
  name: "oppo",
  arr: [1,2,3]
}
var targetObj=Object.create(obj);
```
* 浅拷贝
```js
//浅拷贝第二层拷贝的是引用
var obj={
  name: "oppo",
  arr: [1,2,3]
}
function shallowCopy(source,target={}){
  var key;
  for(key in source){
    if(source.hasOwnProperty(key)){
      target[key]=source[key];
    }
  }
  return target;
}
var targetObj=shallowCopy(obj);
```