const http=require("http");
const fs=require("fs");

var parseFile=function(path){
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

const server=http .createServer(async (req,res)=>{
  console.log(req.url);
  if(req.url==="/" || req.url==="/index.html"){
    res.writeHead(200,{
      "Content-Type":"text/html"
    });
    var pathFile=__dirname+"/index.html";
    var data=await parseFile(pathFile);
    res.write(data);
    res.end("");
  }
  if(req.url==="/test.js"){
    res.writeHead(200,{
      "Content-Type":"text/javascript",
      "Cache-Control":"no-cache,max-age=60"
    });
    var pathFile=__dirname+"/test.js";
    var data=await parseFile(pathFile);
    res.end(data);
  }
});

server.listen(3000,()=>{
  console.log("server is running at port 3000");
})