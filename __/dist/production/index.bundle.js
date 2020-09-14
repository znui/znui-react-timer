!function(t,e){for(var n in e)t[n]=e[n]}(this,function(n){var s={};function i(t){if(s[t])return s[t].exports;var e=s[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}return i.m=n,i.c=s,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){!function(){t.exports=this.React}()},function(t,e,n){t.exports={Timer:n(2),CountDownTimer:n(3)}},function(t,e,n){var s=znui.React||n(0);t.exports=s.createClass({displayName:"exports",getDefaultProps:function(){return{hour:0,minute:5,second:0,timing:!1}},getInitialState:function(){return{hour:this.props.hour,minute:this.props.minute,second:this.props.second}},componentDidMount:function(){this.start()},componentWillUnmount:function(){this._interval&&(window.clearInterval(this._interval),this._interval=null)},start:function(){var t=this;this._interval&&window.clearInterval(this._interval),this._interval=setInterval(function(){return t.timing()},1e3)},getText:function(){var t="";return this.state.hour&&(t+=this.__fixValue(this.state.hour)+":"),this.state.minute&&(t+=this.__fixValue(this.state.minute)+":"),this.state.second&&(t+=this.__fixValue(this.state.second)+":"),t},restart:function(){this.setState({hour:this.props.hour,minute:this.props.minute,second:this.props.second,timing:!0}),this.start()},getValue:function(){},timing:function(){this.props.timing&&(0==this.state.second?this.state.minute?(this.state.minute=this.state.minute-1,this.state.second=59):this.state.hour?(this.state.hour=this.state.hour-1,this.state.minute=59,this.state.second=59):(this.state.hour=0,this.state.minute=0,this.state.second=0,window.clearInterval(this._interval),this._interval=null,this.props.onEnd&&this.props.onEnd()):this.state.second=this.state.second-1,this.forceUpdate())},__fixValue:function(t){return t<10?"0"+t:t},render:function(){return s.createElement("div",{className:znui.react.classname("zr-timer",this.props.className),style:this.props.style},!!this.state.hour&&s.createElement("span",{className:"hour"},this.__fixValue(this.state.hour)+":"),s.createElement("span",{className:"minute"},this.__fixValue(this.state.minute)+":"),s.createElement("span",{className:"second"},this.__fixValue(this.state.second)))}})},function(t,e,n){var s=znui.React||n(0);t.exports=s.createClass({displayName:"exports",getDefaultProps:function(){return{value:null}},getInitialState:function(){return{valueTimestamp:0,timing:!0,day:0,hour:0,minute:0,second:0}},componentDidMount:function(){this.state.valueTimestamp=new Date(this.props.value).getTime(),this.start()},componentWillUnmount:function(){this._interval&&(window.clearInterval(this._interval),this._interval=null)},start:function(){var t=this;this._interval&&window.clearInterval(this._interval),this._interval=setInterval(function(){return t.timing()},1e3)},getText:function(){var t="";return this.state.hour&&(t+=this.__fixValue(this.state.hour)+":"),this.state.minute&&(t+=this.__fixValue(this.state.minute)+":"),this.state.second&&(t+=this.__fixValue(this.state.second)+":"),t},timing:function(){var t=parseInt((this.state.valueTimestamp-Date.now())/1e3);if(t<1)return this._interval&&(window.clearInterval(this._interval),this._interval=null),this.state.day=0,this.state.hour=0,this.state.minute=0,this.state.second=0,this.forceUpdate(),this.props.onEnd&&this.props.onEnd(),this.setState({timing:!1}),!1;this.state.day=parseInt(t/86400),this.state.hour=parseInt(t/3600%24),this.state.minute=parseInt(t/60%24),this.state.second=parseInt(t%60),this.forceUpdate()},__fixValue:function(t){return t<10?"0"+t:t},render:function(){return s.createElement("div",{className:"zr-count-down-timer"},this.state.timing?s.createElement("div",{className:"timing"},s.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"clock",className:"svg-inline--fa fa-clock fa-w-16 ",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},s.createElement("path",{fill:"currentColor",d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"})),!!this.state.day&&s.createElement("span",{className:"day"},this.__fixValue(this.state.day)+" 天 "),!!this.state.hour&&s.createElement("span",{className:"hour"},this.__fixValue(this.state.hour)+":"),s.createElement("span",{className:"minute"},this.__fixValue(this.state.minute)+":"),s.createElement("span",{className:"second"},this.__fixValue(this.state.second))):s.createElement("div",{className:"end"}))}})}]));