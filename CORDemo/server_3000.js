const http=require("http");
const fs=require("fs");
function parseFile(path){
  return new Promise((resolve,reject)=>{
    fs.readFile(path,{encoding:"utf8",flag:"r+"},(err,data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  })
}
var server=http.createServer(async (req,res)=>{
  console.log(req.url);
  //响应主页面
  if(req.url==="/" || req.url==="/home.html"){
    res.writeHead(200,{
      "Content-Type":"text/html"
    });
    var pathFile=__dirname+"/home.html";
    var data=await parseFile(pathFile);
    res.write(data);
    res.end("");
  }
  //响应同域get请求
  if(req.url==="/getdata"){
    res.writeHead(200,{
      "Content-Type":"text/plain"
    });
    res.write("response:data from server_3000");
    res.end("");
  }
});
server.listen(3000,()=>{
  console.log("the server is runing at port 3000");
});
