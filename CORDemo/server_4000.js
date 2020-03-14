const Koa=require("koa");
const app=new Koa();
/**
 * 在server_3000服务器上的主页上面发送ajax请求 http://127.0.0.1:4000/getdata
 * 在server_4000服务器应该设置 Access-Control-Allow-Origin
 *     它表示本次请求来自哪个域（协议+域名+端口） http://127.0.0.1:3000或*
 *     在这里一定不能写成 http://127.0.0.1:3000/
 * 
 * 跨域中的简单请求：HEAD，GET，POST
 *     设置 "Access-Control-Allow-Origin":"http://127.0.0.1:3000"
 * 跨域中的非简单请求：PUT，DELETE
 *         浏览器在给服务器发送跨域的非简单的请求时，首先会发一次OPTIONS预检请求
 *         还需要设置 "Access-Control-Allow-Methods":"PUT,DELETE"
 *     跨域中的非简单请求还包括自定义请求头：xhr.setRequestHeader("xhr-test-harrdy","youcan")
 *         需要设置 "Access-Control-Allow-Headers":"xhr-test-harrdy"
 *     跨域中的非简单请求还包括一个特例：xhr.setRequestHeader("Content-Type","application/json")
 *         使用post提交的时候，也是会发一次OPTIONS预检请求
 *         需要设置 "Access-Control-Allow-Headers":"Content-Type"
 * CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持GET请求，CORS 支持所有类型的 HTTP 请求
 */
app.use(async ctx=>{
  console.log(ctx.url,ctx.method);
  //响应跨域get请求
  if(ctx.url==="/getdata"){
    ctx.res.writeHead("200",{
      "Content-Type":"text/plain",
      "Access-Control-Allow-Origin":"http://127.0.0.1:3000",
      "Access-Control-Allow-Headers":"xhr-test-harrdy",
      "Access-Control-Allow-Methods":"PUT,DELETE"
    })
    ctx.res.write("response:data from server_4000");
    ctx.res.end("");
  }
  //响应跨域post请求
  if(ctx.url==="/postdata"){
    ctx.res.writeHead("200",{
      "Content-Type":"text/plain",
      "Access-Control-Allow-Origin":"http://127.0.0.1:3000",
      "Access-Control-Allow-Headers":"Content-Type",
      "Access-Control-Allow-Methods":""
    })
    ctx.res.write("response:data from server_4000");
    ctx.res.end("");
  }
  //响应jsonp跨域
  if(/jsonp/.test(ctx.url)){
    ctx.res.writeHead("200",{
      "Content-Type":"text/plain",
      "Access-Control-Allow-Origin":"",
      "Access-Control-Allow-Headers":"",
      "Access-Control-Allow-Methods":""
    })
    var cb=ctx.request.query.callback;
    console.log(cb);
    var obj={name:"jsonp",age:21};
    var jsonStr=JSON.stringify(obj);
    ctx.res.write(`${cb}(${jsonStr})`);
    ctx.res.end("");
  }  
});

app.listen(4000,()=>{
  console.log("the server is runing at port 4000");
})