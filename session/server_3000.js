//正常 session 是存放在数据库中的，我们这里为了方便就用一个名为 session 的对象来代替。
// 原生中使用 session
const http=require("http");
const fs=require("fs");

/**
 * 案例是一个网校的场景，一个新用户默认有 30 次学习机会，以后每次访问服务器学习次数减 1，
 * 如果 studyCount 值为 0，则提示学习次数用完，否则提示当前用户的 ID 和剩余学习次数，
 * session 中存储的是每一个用户 ID 对应的剩余学习次数，这样就不会轻易的被修改学习剩余次数，
 * 因为服务器只认用户 ID，再通过 ID 去更改对应的剩余次数
 * （当然忽略了别人冒充这个 ID 的情况，只能减，不能加），
 * 这样就不会因为篡改 cookie 而篡改用户存在 session 中的数据，除非连整个数据库都拖走。
 */
let id=1217012512;
function uuid(){
  id=id+1;
  return String(id);
}
const server=http.createServer(async (req,res)=>{
  const session=JSON.parse(await parseFile("./data.json"));
  console.log(req.headers.cookie);
  if(req.url==="/user"){
    //预先解析好 cookie
    let cookie={};
    if(req.headers.cookie){
      let arr=req.headers.cookie.split("=");
      cookie[arr[0]]=arr[1];
    }
    //取出 cookie 存储的用户 ID
    let userId=cookie["studyId"];
    if(userId){
      if(session[userId].studyCount===0){
        res.end("you have no chance to use");
      }else{
        session[userId].studyCount--;
        writeFile("./data.json",JSON.stringify(session));
      }
    }else{
      userId=uuid();
      session[userId]={studyCount: 30};
      writeFile("./data.json",JSON.stringify(session));
      let time=100*60;
      res.setHeader("Set-Cookie",[`studyId=${userId};Max-Age=${time};HttpOnly;Domain=127.0.0.1;Path=/`]);
    }
    res.end(`
    studyId ${userId},
    learnCount ${session[userId].studyCount}
    `)
  }else{
    res.end("Not Found");
  }
})

server.listen(3000,()=>{
  console.log("the server is running at port 3000");
})

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

function writeFile(path,str){
  let ws=fs.createWriteStream(path);
  ws.write(str);
  ws.on("error",()=>{
    console.error("write file error :"+error);
  })
}