## day13-notebook
### node 中的 class
* 在类中定义的方法只归本实例所有，在构造函数原型上定义的方法共有
```js
class Person{
  constructor(name,age){
    this.name=name;
    this.age=age;
  };
}
Person.prototype.myprint=function(){
  console.log(`(${this.name},${this.age})`);
}
console.log(new Person("oppo",18));
//Person { name: 'oppo', age: 18 }
console.log(new Person("oppo",18).__proto__===Person.prototype);
//true
console.log(new Person("oppo",18).__proto__.__proto__===Object.prototype);
//true
console.log(Person);
//就是一个函数 [Function: Person]
console.log(Person.prototype);
//Person { myprint: [Function] }
```
* process 是类process的一个实例，再往上面是 EventEmitter
```js
var EventEmitter=require("events");
console.log(process instanceof EventEmitter);//true
console.log(process.__proto__);//process {}
console.log(process.__proto__.__proto__===EventEmitter.prototype);//true
```
* EventEmitter 详情
```js
var EventEmitter=require("events");
console.log(EventEmitter);
//EventEmitter 是一个构造函数,也相当于一个class
/*
{ [Function: EventEmitter]
  EventEmitter: [Circular],
  usingDomains: false,
  defaultMaxListeners: [Getter/Setter],
  init: [Function],
  listenerCount: [Function] }
*/
console.log(EventEmitter.prototype)
//由此类或者构造函数新建的实例应该具备怎样的性质
/*
EventEmitter {
  _events: undefined,
  _eventsCount: 0,
  _maxListeners: undefined,
  setMaxListeners: [Function: setMaxListeners],
  getMaxListeners: [Function: getMaxListeners],
  emit: [Function: emit],
  addListener: [Function: addListener],
  on: [Function: addListener],
  prependListener: [Function: prependListener],
  once: [Function: once],
  prependOnceListener: [Function: prependOnceListener],
  removeListener: [Function: removeListener],
  off: [Function: removeListener],
  removeAllListeners: [Function: removeAllListeners],
  listeners: [Function: listeners],
  rawListeners: [Function: rawListeners],
  listenerCount: [Function: listenerCount],
  eventNames: [Function: eventNames] }
*/
```
### node中标准输入与输出
```js
var EventEmitter=require("events");

console.log(process.stdin);//ReadStream 类创建的实例
console.log(process.stdout);//WriteStream 类创建的实例
console.log(process.stdin.__proto__);//ReadStream { setRawMode: [Function] }
console.log(process.stdout.__proto__.__proto__);//Socket 类创建的实例
console.log(process.stdout.__proto__.__proto__.__proto__);//Duplex 类创建的实例
console.log(process.stdout.__proto__.__proto__.__proto__.__proto__);//Readable 类创建的实例
console.log(process.stdout.__proto__.__proto__.__proto__.__proto__.__proto__);//Stream 类创建的实例
console.log(process.stdout.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);//EventEmitter 类创建的实例

console.log(process.stdout.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__===EventEmitter.prototype);//true
console.log(process.stdin instanceof EventEmitter)//true
console.log(process.stdout instanceof EventEmitter)//true
```
### Node.js中process模块常用的属性和方法
```js
console.log(process.platform);//win32 判断当前系统平台
console.log(process.argv);//当前进程的命令行参数数组
console.log(process.execPath);//node 路径
```
* console.log()是对标准输出的封装
```js
console.mylog=function(data){
  process.stdout.write(data+"\n");
}

console.mylog("123");
console.mylog("456");
```
* 标准错误输出
```js
process.stderr.write("error");
```
* 从控制台读取并输出 只操作一次
```js
process.stdin.on("readable",()=>{
  var chunk=process.stdin.read();
  if(chunk!==null){
    process.stdout.write("data: "+chunk);
  }
})
```
* 从控制台读取并输出 操作多次
```js
process.stdin.on("data",(chunk)=>{
  if(chunk!==null){
    process.stdout.write("data: "+chunk);
  }
})
```
### 实现读取文件到控制台
```js
const fs=require("fs");
var pathFile=__dirname+"/data.txt";
fs.createReadStream(pathFile).pipe(process.stdout);
```
### get请求中应用stream
```js
const http=require("http");
const fs=require("fs");
/*
var myserver=http.createServer((req,res)=>{
  console.log(req.method);
  if(req.method==="GET"){
    var pathFile=__dirname+"/data.txt";
    fs.readFile(pathFile,{encoding:"utf-8",flag:"r+"},(err,data)=>{
      res.write(data);
      res.end("");
    })
  }
});
*/
var myserver=http.createServer((req,res)=>{
  console.log(req.method);
  if(req.method==="GET"){
    var pathFile=__dirname+"/data.txt";
    var readStream=fs.createReadStream(pathFile);
    readStream.pipe(res);
  }
})
myserver.listen("8000",()=>{
  console.log("the server is running at port 8000");
})
```
### 文件拷贝使用stream
```js
const fs=require("fs");
var source=__dirname+"/data.txt";
var dest=__dirname+"/data-bak.txt";
var rs=fs.createReadStream(source)
var ws=fs.createWriteStream(dest);
rs.pipe(ws);
rs.on("end",()=>{
  console.log("copy end");
})
```
### 总结
```
stream的常见来源方式有三种:
1,从控制台输入
2,http请求中的request
3,读取文件
stream的常见输出方式有三种:
1,输出控制台
2,http请求中的response
3,写入文件

stream的种类:
Readable Stream 可读数据流
Writeable Stream 可写数据流
Duplex Stream 双向数据流，可以同时读和写，同时实现了 Readable和Writable 接口。
Transform Stream 转换数据流，可读可写，同时可以转换（处理）数据(不常用)
```