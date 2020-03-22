const http=require("http");
const url=require("url");
//Cookie 不是一种理想的客户端储存机制。它的容量很小（4KB），缺乏数据操作接口，而且会影响性能
/**
 * 查看当前页面 cookie 是否开启 window.navigator.cookieEnabled
 * 浏览器第一次访问域名A--》服务器向客户端发送cookie--》浏览器存储
 * 浏览器再次访问域名A--》将这个cookie返回给服务器
 * 服务端不设置大写的 HttpOnly属性的话，客户端可以 document.cookie 读取
 */
const server=http.createServer(async (req,res)=>{
  console.info(req.url,req.method);
  if(req.method==="GET"){
    //会话期Cookie是最简单的Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。
    //会话期Cookie不需要指定过期时间（Expires）或者有效期（Max-Age）
    //需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie也会被保留下来，
    //就好像浏览器从来没有关闭一样。
    if(req.url==="/index"){
      res.writeHead(200,{
        "Content-Type": "text/html",
        "Set-Cookie": ["name=harrdy","age=18"]
      })
      res.write("cookie is ok");
      res.end("");
    }else if(req.url==="/home"){
      //持久性 cookie
      //持久性Cookie可以指定一个特定的过期时间（Expires）或有效期（Max-Age）
      //设置 Path=/docs,可以匹配当前路径和它的所有子路径
      //设置SameSite=Strict允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。
      res.writeHead(200,{
        "Content-Type": "text/html",
        "Set-Cookie": ["color=red;Max-Age=120;HttpOnly;Domain=127.0.0.1;Path=/docs;SameSite=Strict;"]
      })
      res.write("cookie is ok");
      res.end("");
    }else if(req.url==="/favicon.ico"){
      //request for favicon.ico
      res.writeHead(200,{
        "Content-Type": "text/html"
      })
      res.write("test favicon.ico");
      res.end("");
    }else if(/\?/.test(req.url)){
      //如何从get请求中获取查询字段
      res.writeHead(200,{
        "Content-Type": "text/html"
      })
      console.group("queryobject start");
      console.log(url.parse(req.url,true).query);
      console.groupEnd();
      res.write("querystring: "+url.parse(req.url).query);
      res.end("");
    }else if(req.url==="/delete"){
      //delete cookie
      res.writeHead(200,{
        "Content-Type": "text/html",
        "Set-Cookie": ["name=harrdy;Max-Age=0","age=18;Max-Age=0","color=red;Max-Age=0"]
      })
      res.write("server: this cookie has delete");
      res.end("");
    }else{
      res.writeHead(200,{
        "Content-Type": "text/html"
      })
      res.write('<h2>this is other page</h2>');
      res.end("");
    }
  }
})

server.listen("4000",()=>{
  console.log("the server is running at port 4000");
})