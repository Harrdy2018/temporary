## day12-notebook
### 项目经验
* 使用Element-UI组件的时候，运用 el-row/el-col布局的时候，高度无法达到100%的问题
```
在钩子函数 mounted 上面使用 js设置100%高度
```
* 诡异的样式
```html
<li class="a" style="list-style: none;"><img src="./pby.jpg" width="100px" height="80px;"></li>
<li class="b" style="list-style: none;"><img src="./pby.jpg" width="100px" height="80px;"></li>
<!--
  li标签与li标签之间的间距多出4px?
  原因：是由于li标签的font-size引起的，字体越大间距越大。
  解决： li font-size: 0px 或者 img display: block
-->
```
```html
<li class="a" style="list-style: none;"><img src="./pby.jpg" width="100px" height="80px;"></li>
<!--
  li标签高度多出4px?
  原因：是由于li标签的font-size引起的，字体越大高度越大。
  解决： li font-size: 0px 或者 img display: block
-->
```
```html
<!--
  固定尺寸的div里面的两个span标签?
  默认不换行输出。
  对inline元素设置margin-top,margin-bottom,padding-top,padding-bottom无效
  如何居中？
-->
    <div style="width: 100px;height:100px;background-color: red;">
      <span style="line-height: 40px;">我是一位</span>
      <span style="white-space: nowrap;">我是一位学生</span>
    </div>
```
* 你用过的 ES6
```
字符串占位符 `${variable}`
```
* 优化问题
```
el-tabs 标签分 el-tab-pane 分类别显示图片加载问题。
原来方法：在created钩子函数里面，直接发出请求，加载所有图片(刷新页面触发)
缺点： 资源浪费，加载时间长，没有将组建加以利用。
改进：按需加载。
后台实现一个带type关键字的条件查询接口，前台在created钩子函数请求默认的标签页(刷新页面触发)，
每一次触发tab标签页上的点击按钮时，向后台查询一次。
```
* 项目中遇到的问题？
```
做网页的时候，后台只做了关于首页的请求处理，当在浏览器中
输入http://127.0.0.1/index的时候总是报错，如何处理？
检查发现，页面只显示了纯静态的，发现js方面没有加载上，
打开开发人员工具，发现script标签请求出错，也就是后台没有
处理script标签的请求，如何处理?
设置响应头 Content-Type:text/javascript
解析js内容，传入到响应，再次运行服务，发现正常。
```
* 路由模式hash和history的区别?
```
美观：hash路径下前面有个#号，很丑。
hash模式下你无论在浏览器中输入路径还是在页面点击进行跳转，
都不会向服务器发送请求；history模式在浏览器中输入路径会向
服务器发送请求。
```
* 警告 使用element-ui报出 woff/tff文件找不到
```
MIME, 全称为“Multipurpose Internet Mail Extensions”, 比较确切的中文名称为“多用途互联网邮件扩展”
type/subtype
MIME的组成结构非常简单；由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。
type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型。
MIME类型对大小写不敏感，但是传统写法都是小写。
application/x-font-truetype           ttf;
application/x-font-woff               woff woff2;

application	表明是某种二进制数据	
application/octet-stream, 
application/pkcs12, 
application/vnd.mspowerpoint, 
application/xhtml+xml, 
application/xml,
application/pdf
对于text文件类型若没有特定的subtype，就使用 text/plain。
类似的，二进制文件没有特定或已知的 subtype，即使用 application/octet-stream。
```
#### 表单提交两个常用的编码格式
* 表单提交 enctype="application/x-www-form-urlencoded"
```
application/x-www-form-urlencoded 是默认表单 POST 提交的编码格式
相当于设置请求头 Content-Type: application/x-www-form-urlencoded,但是只在表单提交中有用
因为里面有个 "form" 这个单词，你可以这么理解。
特点：源码提交时这样的 account=lukang+&age=18%26
将键值对的参数用&连接起来，如果有空格，将空格转换为+加号；有特殊符号，将特殊符号转换为ASCII HEX值
```
* 表单提交 enctype="multipart/form-data"
```
相当于设置请求头
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryp5fUSbhnR6o3WiZV
但是只在表单提交中有用,因为里面有个 "form" 这个单词，你可以这么理解。
特点：源码提交时这样的:
------WebKitFormBoundaryp5fUSbhnR6o3WiZV
Content-Disposition: form-data; name="account"

lukang
------WebKitFormBoundaryp5fUSbhnR6o3WiZV
Content-Disposition: form-data; name="age"

18
------WebKitFormBoundaryp5fUSbhnR6o3WiZV--
```