## day11-notebook
### 数组去重
```js
  let arr=[1,2,2,3,3,4,4,4,5,6,8];
  let obj={};
  let target=[];
  arr.forEach((it,index,arr)=>{
    if(obj[it]){

    }else{
      obj[it]=true
      target.push(it);
    }
  });
  console.log(target);

  var ss=new Set(arr);
  console.log([...ss]);
```
### 1 物理像素
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>1 物理像素</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      #box{
        width: 0.5rem;
        height: 0.5rem;
        border-bottom: 1px solid red;
      }
    </style>
  </head>
  <body>
    <div id="box">
      
    </div>
  </body>
</html>
<script type="application/javascript">
  //dpr=物理像素/css像素  1px由多少个像素组成
  let dpr=window.devicePixelRatio;
  console.log(window.devicePixelRatio);
  let scale=1/dpr;
  let metaNode=document.querySelector("meta[name='viewport']");
  metaNode.setAttribute("content",`width=device-width,initial-scale=${scale},user-scalable=no`);
  /*
  比如说 dpr=2;那么物理像素等于 2,需要缩放 scale=0.5;
  一旦设置scale,屏幕宽度像素变大了2倍，盒子宽度等等像素变大了2倍，
  但是盒子还是只有那么大，也就是说盒子也被缩放了。
  所以设置 html 字体大小为 width*dpr
  */
  let width=document.documentElement.clientWidth;
  document.documentElement.style.fontSize=width*dpr+"px";
</script>
```
### 移动端 rem 适配
* rem===the fontsize of root element
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!--
      手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，
      这样就不用把每个网页挤到很小的窗口中.viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放

      width：控制 viewport 的大小，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）
      height：和 width 相对应，指定高度
      initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例
      maximum-scale：允许用户缩放到的最大比例
      minimum-scale：允许用户缩放到的最小比例
      user-scalable：用户是否可以手动缩放

      当设置 width=600 document.documentElement.clientWidth=600
    -->
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>移动端 rem 适配</title>
    <style>
      html{
        height: 100%;
      }
      body{
        height: 100%;
        margin: 0px;
      }
      #box{
        width: 0.5rem;
        height: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <p style="font-size: 16px;">this is test 1 rem </p>
    </div>
  </body>
</html>
<script type="application/javascript">
  let width=document.documentElement.clientWidth;
  let htmlNode=document.documentElement;
  htmlNode.style.fontSize=width+'px';
</script>
```