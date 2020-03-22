const Koa=require("koa");
const app=new Koa();

app.use(async ctx=>{
  if(ctx.url==="/index"){
    ctx.cookies.set(
      'name',
      "Harrdy",
      cookie = {
        maxAge: 10*60*1000, // cookie有效时长 单位：毫秒数
        expires: new Date("2020-3-21"),  // cookie失效时间
        path: '/', // 写cookie所在的路径,默认是'/'
        domain: '', // 写cookie所在的域名
        //是否只用于http请求中获取;  默认是 true ,客户端不可读取(document.cookie)
        httpOnly: true, 
       
        // 是否允许重写  一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false).
        // 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
        overwrite: false,
        secure: false,// 安全 cookie   默认false，设置成true表示只有 https可以访问
        sameSite: '',
        signed: '',
      }
    )
    ctx.body="cookie is ok";
  }else if(ctx.url === "/delete"){
    ctx.cookies.set('name', '', { maxAge: 0});
    ctx.body="server:this cookie has delete";
  }else{
    ctx.body=ctx.cookies.get("name");
  }
})

app.listen(3000,()=>{
  console.log("this server is running at port 3000");
})