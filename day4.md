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
* [server_3000设置](./cache_control/index.html)
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