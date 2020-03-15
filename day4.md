## day4-notebook
### 跨域实战(ajax+CORS+JSONP)
* [demo](./CORDemo/home.html)
### 缓存 Cache-Control  服务器端响应头部设置
* "Cache-Control":"max-age=number",代表缓存的时间(秒)
```
实验：关闭浏览器  network->disabled cache 表示要使用浏览器端缓存
第一次刷新页面的时候，浏览器向客户端发起请求；
第二次刷新的时候如果时间小于 max-age 浏览器直接读取memory

当我们设置max-age为20s，在这个期间即使我改变script.js的内容，浏览器仍然会用memory里面的内容，而得不到更新。
很显然实际开发中，如果出现这样的问题，是很可怕的。
同时如果每次去后端请求response，又会使网页很慢，实际中max-age往往要设置很大，表示在本地保存很久的时间，
那么下次请求的Time为0。

那么实际开发中，如何去解决这两者的矛盾呢？
就是通过改变url的方法，在请求的文件名后面加上根据内容生成的哈希值（刷新浏览器缓存的方案），
这样实际请求的url将会改变，那么自然就会去重新请求，
如果后端的文件没有更新，也就是url没有变，则自然会在缓存中读取，则不需要经过网络传输，
则速度是很快的，用户体验是很好的。
```
* "Cache-Control":"no-cache" 表示浏览器端不可直接用缓存，而是先要到服务器端进行验证。
```
如果Cache-Control中max-age的值设置很大，那么一直用本地的缓存肯定是不可取的。
所以除了给文件名后面加上哈希码之外的方法，我们可以通过每次去后端询问是否文件有所改动？
```
* [server_3000设置](./cache_control/server_3000.js)
```js
  if(req.url==="/test.js"){
    res.writeHead(200,{
      "Content-Type":"text/javascript",
      "Cache-Control":"no-cache,max-age=60"
    });
    var pathFile=__dirname+"/test.js";
    var data=await parseFile(pathFile);
    res.end(data);
  }
```
* "Last-Modified": "Sat Mar 14 2020 20:10:51 GMT+0800 (China Standard Time)"
```
在浏览器第一次请求某一个URL时，服务器端的返回状态会是200，内容是你请求的资源，
同时有一个Last-Modified的属性标记此文件在服务期端最后被修改的时间，格式类似这样：
"Last-Modified": "Sat Mar 14 2020 20:10:51 GMT+0800 (China Standard Time)"

客户端第二次请求此URL时，根据 HTTP 协议的规定，浏览器会向服务器传送 If-Modified-Since 报头，
询问该时间之后文件是否有被修改过：
"If-Modified-Since": "Sat Mar 14 2020 20:10:51 GMT+0800 (China Standard Time)"

如果服务器端的资源没有变化，则自动返回 HTTP 304 （Not Changed.）状态码，内容为空，这样就节省了传输数据量。
当服务器端代码发生改变或者重启服务器时，则重新发出资源，返回和第一次请求时类似。
从而保证不向客户端重复发出资源，也保证当服务器有变化时，客户端能够得到最新的资源。
```
* "Etag": "对资源内容进行哈希计算"
```
服务端 "Etag": "hashData";
客户端 "If-None-Match": "hashData";
```
### 数据协商
```
请求头中会声明希望拿到的数据格式，以及其他与数据相关的一些限制，
服务端会根据它的请求中的声明，来做针对性的返回。
  请求头                                  响应头
Accept 指定我想要的数据类型     Content-Type 从Accept中选取一种数据格式，来说明实际返回的数据格式
Accept-Encoding 代表数据以什么编码的方式来实现传输 Content-Encoding 选择哪一种数据格式进行压缩
Accept-Language 希望获得的语言，用什么语言来展示 Content-Language 选择你喜欢的语言
User-Agent 客户端
```
### leetcode20-有效的括号
* stack实现
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var arr=[];
    var obj={")":"(","]":"[","}":"{"};
    if(s.length===0){
        return true;
    }
    for(var i=0;i<s.length;i++){
        var item=s[i];
        if(item ==="(" || item==="[" || item==="{"){
            arr.push(item);
        }else{
            if(arr.length===0) return false;
            if(obj[item] !== arr.pop()) return false;
        }
    }
    return arr.length===0;
};
```
* 正则匹配
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var reg=/\(\)|\{\}|\[\]/;
    while(reg.test(s)){
        s=s.replace(reg,"");
    }
    return !s;
};
```