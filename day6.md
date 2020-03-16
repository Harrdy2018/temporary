## day6-notebook
### vue文件扩展名
* vue.js 直接用在<script>标签中的，完整版本，直接就可以通过script引用。
* vue.common.js  预编译调试时，CommonJS规范的格式，可以使用require("")引用的NODEJS格式。
* vue.esm.js 预编译调试时， EcmaScript Module（ES MODULE)，支持import from 最新标准的。
* vue.runtime.js 生产的运行时，需要预编译，比完整版小30%左右，前端性能最优
* vue.runtime.esm.js 生产运行时，esm标准。
* vue.runtime.common.js 生产运行时，commonJS标准。
### webpack源码阅读
#### 静态加载文件
* 情形
```
入口文件 index.js
import name from "./my-module.js";
console.log(name);

从属文件 my-module.js
var girl="pby";
export default girl;
```
* 一、代码结构
```js
(function(modules){
    /*code*/
})
(
  {
    "./src/index.js":f(module, __webpack_exports__, __webpack_require__),
    "./src/my-module.js":f(module, __webpack_exports__, __webpack_require__) 
  }
)
```
* 二、初始化函数以及其属性 __webpack_require__
```js
__webpack_require__: ƒ __webpack_require__(moduleId)//moduleId 文件路径名
//所有的模块对象
m: {
  "./src/index.js": ƒ(module, __webpack_exports__, __webpack_require__),
  "./src/my-module.js": ƒ(module, __webpack_exports__, __webpack_require__)
  }
//模块缓存，即installedModules 初始化为空
c: {}
d: ƒ (exports, name, getter)
/*
在 exports 上面定义两个属性
	Symbol.toStringTag：'Module'
  '__esModule'：true
*/
r: ƒ (exports)
t: ƒ (value, mode)
n: ƒ (module)
//判断该对象是否有属性
o: ƒ (object, property)
//webpack 公共路径
p: ""
//入口文件
s: "./src/index.js"
```
* 三、__webpack_require__作函数使用，执行入口文件
```js
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
          //moduleId="./src/index.js"
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/*
模块对象 module: {
          i: "./src/index.js",
          l: false,
          exports: {}
        }
模块缓存 installedModules: {
          "./src/index.js": module
        }
更新 __webpack_require__.c 属性
*/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/*
更新
模块对象 module: {
          i: "./src/index.js",
          l: false,
          exports: {
            Symbol.toStringTag：'Module'
            '__esModule'：true
          }
        }
模块缓存 installedModules: {
          "./src/index.js": module
        }
更新 __webpack_require__.c 属性

__webpack_require__("./src/index.js") 最终结果
模块缓存 installedModules: {
          "./src/index.js": {
            i: "./src/index.js",
            l: false,
            exports: {
              Symbol.toStringTag：'Module'
              '__esModule'：true
            }
          }
        }
执行__webpack_require__("./src/my-module.js") 最终结果
模块缓存 installedModules: {
          "./src/my-module.js": {
            i: "./src/my-module.js",
            l: true,
            exports: {
              Symbol.toStringTag：'Module'
              '__esModule'：true,
              "default": "pby"
            }
          }
        }

var _my_module_js__WEBPACK_IMPORTED_MODULE_0__= {
              Symbol.toStringTag：'Module'
              '__esModule'：true,
              "default": "pby"
            }
console.log(_my_module_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
*/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
//最后将入口文件 模块缓存中的 l 变为true
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
```