const http=require("http");
const url=require("url");
const fs=require("fs");
/**
 * IncomingMessage 对象由 http.Server创建，req是其实例
 * ServerResponse 对象，res是其实例
 * 设置响应头？
 * setHeader要在writeHead之前;writeHead优先级高;
 * res.setHeader('Content-Type', 'text/html');
 * res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
 * res.writeHead(200,{"Content-Type": "text/html"})
 * 
 */
const server=http.createServer(async (req,res)=>{
  //请求或响应的消息头对象。消息头的名称和值的键值对。 消息头的名称都是小写的
  //console.log(req.headers);
  //在客户端响应的情况下，表示连接到的服务器的 HTTP 版本。 可能是 '1.1' 或 '1.0'
  //console.log(req.httpVersion);
  //请求方法为字符串。 只读。 示例：'GET'、 'DELETE'
  //console.log(req.method);
  //原始请求头/响应头的列表，与接收到的完全一致。键和值位于同一列表中。 它不是元组列表。 因此，偶数偏移是键值，奇数偏移是关联的值。消息头名称大写
  //console.log(req.rawHeaders);
  console.info(req.url,req.method);
  if(req.method==="GET"){
    //goto index page
    if(req.url==="/index" || req.url==="/"){
      res.writeHead(200,{
        "Content-Type": "text/html"
      })
      let path=__dirname+"/index.html";
      let data=await parseFile(path);
      res.write(data);
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
    }else{
      res.writeHead(200,{
        "Content-Type": "text/html"
      })
      res.write('<h2>this is other page</h2>');
      res.end("");
    }
  }
  if(req.method==="POST"){
    //如何从 post请求中获取对象
    if(req.url==="/testpost"){
      res.writeHead(200,{
        "Content-Type": "text/html"
      });
      let data=await parsePostData(req);
      console.log(strToJson(data));
      res.write('<h3>server response: test post request</h3>');
      res.end("");
    }
  }
  
})

server.listen("4000",()=>{
  console.log("the server is running at port 4000");
})

function parsePostData(req){
  return new Promise((resolve,reject)=>{
    let postdata="";
    try {
        req.on("data",chunk=>{
          postdata+=chunk;
        });
        req.on("end",()=>{
          resolve(decodeURIComponent(postdata));
        })
    } catch (error) {
      reject(error);
      }
  })
}

function parseFile(path){
  return new Promise((resolve,reject)=>{
    fs.readFile(path,{encoding:"utf8",flag: "r+"},(err,data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  })
}

function strToJson(str,target={}) {
  str.split("&").forEach(it=>{
    let p=it.split("=");
    target[p[0]]=p[1];
  })
  return target;
}