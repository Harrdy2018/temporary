## day1-notebook
* document     "[object HTMLDocument]"
* 对象指的是你写的html中所有的东西，包括文档申明
```html
 <!doctype html>
 <html>
 <head>...</head>
 <body>...</body>
 </html>
 ```
* document.documentElement    "[object HTMLHtmlElement]"
* 对象指的是html元素包裹的东西，不包括文档申明
```html
<html>
 <head>...</head>
 <body>...</body>
 </html>
```
* document.head        "[object HTMLHeadElement]"
* 对象指的是head元素包裹的东西
```<head>...</head>```
* document.body        "[object HTMLBodyElement]"
* 对象指的是body元素包裹的东西
```<body>...</body>```
### 如何获取屏幕的高度以及宽度
```js
记住 document.documentElement===document.getElementsByTagName("html")[0]
高度 document.documentElement.clientHeight
     document.body.clientHeight（由于body margin影响会导致偏小）
宽度 document.documentElement.clientWidth
     document.body.clientWidth（由于body margin影响会导致偏小）
```
### 如何获取客户端类型
```js
window.navigator.userAgent
"Mozilla/5.0 ... Chrome/80.0.3987.132 Safari/537.36"
```
### display & visibility & opacity
```
display 元素如何的显示
  none 渲染之后，所在的元素块没有了，也就不影响布局
visibility 元素是显示还是隐藏
  hidden 渲染之后，所在的元素块只是隐藏了，影响布局
opacity 元素透明度设置
  0  同visibility=hidden
```