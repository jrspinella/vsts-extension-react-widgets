define(["react","VSS/Utils/Core"],function(t,e){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=101)}({0:function(e,n){e.exports=t},101:function(t,e,n){var o,r,i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();o=[n,e,n(0),n(143)],void 0!==(r=function(t,e,n,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r._minWindowWidthDelta=10,r._windowResizeThrottleDelegate=o.throttledDelegate(r,50,function(){r._windowWidth=window.innerWidth,r.resize()}),r._windowWidth=window.innerWidth,$(window).resize(function(){Math.abs(r._windowWidth-window.innerWidth)>r._minWindowWidthDelta&&r._windowResizeThrottleDelegate.call(r)}),r}return i(e,t),e.prototype.render=function(){return null},e.prototype.componentDidMount=function(){this.resize()},e.prototype.componentDidUpdate=function(){this.resize()},e.prototype.resize=function(t){var e=function(){var t=document.getElementsByTagName("body").item(0);VSS.resize(null,t.offsetHeight)},n=o.throttledDelegate(this,t,e);t?n():e()},e}(n.Component);e.AutoResizableComponent=r}.apply(e,o))&&(t.exports=r)},143:function(t,n){t.exports=e}})});