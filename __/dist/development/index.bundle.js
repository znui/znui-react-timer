(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
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
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CountDownTimer.js":
/*!***************************!*\
  !*** ./CountDownTimer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react");

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      value: null
    };
  },
  getInitialState: function getInitialState() {
    return {
      valueTimestamp: 0,
      timing: true,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.value) {
      this.state.valueTimestamp = new Date(this.props.value.split(' ').join('T')).getTime();
      this.start();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._interval) {
      window.clearInterval(this._interval);
      this._interval = null;
    }
  },
  start: function start() {
    var _this = this;

    if (this._interval) {
      window.clearInterval(this._interval);
    }

    this._interval = setInterval(function () {
      return _this.timing();
    }, 1000);
  },
  getText: function getText() {
    var _value = '';

    if (!!this.state.hour) {
      _value += this.__fixValue(this.state.hour) + ':';
    }

    if (!!this.state.minute) {
      _value += this.__fixValue(this.state.minute) + ':';
    }

    if (!!this.state.second) {
      _value += this.__fixValue(this.state.second) + ':';
    }

    return _value;
  },
  timing: function timing() {
    var _seconds = parseInt((this.state.valueTimestamp - Date.now()) / 1000);

    if (_seconds < 1) {
      if (this._interval) {
        window.clearInterval(this._interval);
        this._interval = null;
      }

      this.state.day = 0;
      this.state.hour = 0;
      this.state.minute = 0;
      this.state.second = 0;
      this.forceUpdate();
      this.props.onEnd && this.props.onEnd();
      return this.setState({
        timing: false
      }), false;
    }

    this.state.day = parseInt(_seconds / (24 * 60 * 60));
    this.state.hour = parseInt(_seconds / (60 * 60) % 24);
    this.state.minute = parseInt(_seconds / 60 % 24);
    this.state.second = parseInt(_seconds % 60);
    this.forceUpdate();
  },
  __fixValue: function __fixValue(value) {
    if (value < 10) {
      return '0' + value;
    } else {
      return value;
    }
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "zr-count-down-timer"
    }, this.state.timing ? /*#__PURE__*/React.createElement("div", {
      className: "timing"
    }, /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "clock",
      className: "svg-inline--fa fa-clock fa-w-16 ",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"
    })), !!this.state.day && /*#__PURE__*/React.createElement("span", {
      className: "day"
    }, this.__fixValue(this.state.day) + ' 天 '), !!this.state.hour && /*#__PURE__*/React.createElement("span", {
      className: "hour"
    }, this.__fixValue(this.state.hour) + ':'), /*#__PURE__*/React.createElement("span", {
      className: "minute"
    }, this.__fixValue(this.state.minute) + ':'), /*#__PURE__*/React.createElement("span", {
      className: "second"
    }, this.__fixValue(this.state.second))) : /*#__PURE__*/React.createElement("div", {
      className: "end"
    }));
  }
});

/***/ }),

/***/ "./Timer.js":
/*!******************!*\
  !*** ./Timer.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react");

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      hour: 0,
      minute: 5,
      second: 0,
      timing: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      hour: this.props.hour,
      minute: this.props.minute,
      second: this.props.second
    };
  },
  componentDidMount: function componentDidMount() {
    this.start();
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._interval) {
      window.clearInterval(this._interval);
      this._interval = null;
    }
  },
  start: function start() {
    var _this = this;

    if (this._interval) {
      window.clearInterval(this._interval);
    }

    this._interval = setInterval(function () {
      return _this.timing();
    }, 1000);
  },
  getText: function getText() {
    var _value = '';

    if (!!this.state.hour) {
      _value += this.__fixValue(this.state.hour) + ':';
    }

    if (!!this.state.minute) {
      _value += this.__fixValue(this.state.minute) + ':';
    }

    if (!!this.state.second) {
      _value += this.__fixValue(this.state.second) + ':';
    }

    return _value;
  },
  restart: function restart() {
    this.setState({
      hour: this.props.hour,
      minute: this.props.minute,
      second: this.props.second,
      timing: true
    });
    this.start();
  },
  getValue: function getValue() {},
  timing: function timing() {
    if (!this.props.timing) {
      return;
    }

    if (this.state.second == 0) {
      if (this.state.minute) {
        this.state.minute = this.state.minute - 1;
        this.state.second = 59;
      } else {
        if (this.state.hour) {
          this.state.hour = this.state.hour - 1;
          this.state.minute = 59;
          this.state.second = 59;
        } else {
          this.state.hour = 0;
          this.state.minute = 0;
          this.state.second = 0;
          window.clearInterval(this._interval);
          this._interval = null;
          this.props.onEnd && this.props.onEnd();
        }
      }
    } else {
      this.state.second = this.state.second - 1;
    }

    this.forceUpdate();
  },
  __fixValue: function __fixValue(value) {
    if (value < 10) {
      return '0' + value;
    } else {
      return value;
    }
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-timer", this.props.className),
      style: this.props.style
    }, !!this.state.hour && /*#__PURE__*/React.createElement("span", {
      className: "hour"
    }, this.__fixValue(this.state.hour) + ':'), /*#__PURE__*/React.createElement("span", {
      className: "minute"
    }, this.__fixValue(this.state.minute) + ':'), /*#__PURE__*/React.createElement("span", {
      className: "second"
    }, this.__fixValue(this.state.second)));
  }
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Timer: __webpack_require__(/*! ./Timer */ "./Timer.js"),
  CountDownTimer: __webpack_require__(/*! ./CountDownTimer */ "./CountDownTimer.js")
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ291bnREb3duVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiJdLCJuYW1lcyI6WyJSZWFjdCIsInpudWkiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUNsYXNzIiwiZ2V0RGVmYXVsdFByb3BzIiwidmFsdWUiLCJnZXRJbml0aWFsU3RhdGUiLCJ2YWx1ZVRpbWVzdGFtcCIsInRpbWluZyIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJjb21wb25lbnREaWRNb3VudCIsInByb3BzIiwic3RhdGUiLCJEYXRlIiwic3BsaXQiLCJqb2luIiwiZ2V0VGltZSIsInN0YXJ0IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJfaW50ZXJ2YWwiLCJ3aW5kb3ciLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJnZXRUZXh0IiwiX3ZhbHVlIiwiX19maXhWYWx1ZSIsIl9zZWNvbmRzIiwicGFyc2VJbnQiLCJub3ciLCJmb3JjZVVwZGF0ZSIsIm9uRW5kIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJyZXN0YXJ0IiwiZ2V0VmFsdWUiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwiVGltZXIiLCJDb3VudERvd25UaW1lciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFB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LENBQWhCO0FBQXdFLFdBQUssRUFBRSxLQUFLMUIsS0FBTCxDQUFXMkI7QUFBMUYsT0FDRSxDQUFDLENBQUMsS0FBSzFCLEtBQUwsQ0FBV0wsSUFBYixpQkFBcUI7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBd0IsS0FBS2tCLFVBQUwsQ0FBZ0IsS0FBS2IsS0FBTCxDQUFXTCxJQUEzQixJQUFtQyxHQUEzRCxDQUR2QixlQUVDO0FBQU0sZUFBUyxFQUFDO0FBQWhCLE9BQTBCLEtBQUtrQixVQUFMLENBQWdCLEtBQUtiLEtBQUwsQ0FBV0osTUFBM0IsSUFBcUMsR0FBL0QsQ0FGRCxlQUdDO0FBQU0sZUFBUyxFQUFDO0FBQWhCLE9BQTBCLEtBQUtpQixVQUFMLENBQWdCLEtBQUtiLEtBQUwsQ0FBV0gsTUFBM0IsQ0FBMUIsQ0FIRCxDQUREO0FBT0E7QUFuR2lDLENBQWxCLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDRkFYLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNid0MsT0FBSyxFQUFFMUMsbUJBQU8sQ0FBQywyQkFBRCxDQUREO0FBRWIyQyxnQkFBYyxFQUFFM0MsbUJBQU8sQ0FBQyw2Q0FBRDtBQUZWLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDQUEsYUFBYSxnQ0FBZ0MsRUFBRSxJIiwiZmlsZSI6Ii4vZGlzdC9kZXZlbG9wbWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IG51bGxcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZVRpbWVzdGFtcDogMCxcblx0XHRcdHRpbWluZzogdHJ1ZSxcblx0XHRcdGRheTogMCxcblx0XHRcdGhvdXI6IDAsXG5cdFx0XHRtaW51dGU6IDAsXG5cdFx0XHRzZWNvbmQ6IDBcblx0XHR9O1xuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCl7XG5cdFx0aWYodGhpcy5wcm9wcy52YWx1ZSkge1xuXHRcdFx0dGhpcy5zdGF0ZS52YWx1ZVRpbWVzdGFtcCA9IChuZXcgRGF0ZSh0aGlzLnByb3BzLnZhbHVlLnNwbGl0KCcgJykuam9pbignVCcpKSkuZ2V0VGltZSgpO1xuXHRcdFx0dGhpcy5zdGFydCgpO1xuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5faW50ZXJ2YWwpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuXHRcdFx0dGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuXHRcdH1cblx0fSxcblx0c3RhcnQ6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuX2ludGVydmFsKXtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcblx0XHR9XG5cdFx0dGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+dGhpcy50aW1pbmcoKSwgMTAwMCk7XG5cdH0sXG5cdGdldFRleHQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfdmFsdWUgPSAnJztcblx0XHRpZighIXRoaXMuc3RhdGUuaG91cil7XG5cdFx0XHRfdmFsdWUgKz0gdGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuaG91cikgKyAnOic7XG5cdFx0fVxuXHRcdGlmKCEhdGhpcy5zdGF0ZS5taW51dGUpe1xuXHRcdFx0X3ZhbHVlICs9IHRoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLm1pbnV0ZSkgKyAnOic7XG5cdFx0fVxuXHRcdGlmKCEhdGhpcy5zdGF0ZS5zZWNvbmQpe1xuXHRcdFx0X3ZhbHVlICs9IHRoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLnNlY29uZCkgKyAnOic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF92YWx1ZTtcblx0fSxcblx0dGltaW5nOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3NlY29uZHMgPSBwYXJzZUludCgodGhpcy5zdGF0ZS52YWx1ZVRpbWVzdGFtcCAtIERhdGUubm93KCkpIC8gMTAwMCk7XG5cdFx0aWYoX3NlY29uZHMgPCAxKSB7XG5cdFx0XHRpZih0aGlzLl9pbnRlcnZhbCl7XG5cdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcblx0XHRcdFx0dGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zdGF0ZS5kYXkgPSAwO1xuXHRcdFx0dGhpcy5zdGF0ZS5ob3VyID0gMDtcblx0XHRcdHRoaXMuc3RhdGUubWludXRlID0gMDtcblx0XHRcdHRoaXMuc3RhdGUuc2Vjb25kID0gMDtcblx0XHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0XHRcdHRoaXMucHJvcHMub25FbmQgJiYgdGhpcy5wcm9wcy5vbkVuZCgpO1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHR0aW1pbmc6IGZhbHNlXG5cdFx0XHR9KSwgZmFsc2U7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdGF0ZS5kYXkgPSBwYXJzZUludChfc2Vjb25kcyAvICgyNCAqIDYwICogNjApKTtcblx0XHR0aGlzLnN0YXRlLmhvdXIgPSBwYXJzZUludChfc2Vjb25kcyAvICg2MCAqIDYwKSAlIDI0KTtcblx0XHR0aGlzLnN0YXRlLm1pbnV0ZSA9IHBhcnNlSW50KF9zZWNvbmRzIC8gNjAgJSAyNCk7XG5cdFx0dGhpcy5zdGF0ZS5zZWNvbmQgPSBwYXJzZUludChfc2Vjb25kcyAlIDYwKTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdF9fZml4VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0aWYodmFsdWUgPCAxMCl7XG5cdFx0XHRyZXR1cm4gJzAnICsgdmFsdWU7XG5cdFx0fWVsc2Uge1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInpyLWNvdW50LWRvd24tdGltZXJcIj5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUudGltaW5nID8gPGRpdiBjbGFzc05hbWU9XCJ0aW1pbmdcIj5cblx0XHRcdFx0XHRcdFx0PHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwiY2xvY2tcIiBjbGFzc05hbWU9XCJzdmctaW5saW5lLS1mYSBmYS1jbG9jayBmYS13LTE2IFwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI1NiA4QzExOSA4IDggMTE5IDggMjU2czExMSAyNDggMjQ4IDI0OCAyNDgtMTExIDI0OC0yNDhTMzkzIDggMjU2IDh6bTU3LjEgMzUwLjFMMjI0LjkgMjk0Yy0zLjEtMi4zLTQuOS01LjktNC45LTkuN1YxMTZjMC02LjYgNS40LTEyIDEyLTEyaDQ4YzYuNiAwIDEyIDUuNCAxMiAxMnYxMzcuN2w2My41IDQ2LjJjNS40IDMuOSA2LjUgMTEuNCAyLjYgMTYuOGwtMjguMiAzOC44Yy0zLjkgNS4zLTExLjQgNi41LTE2LjggMi42elwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0eyEhdGhpcy5zdGF0ZS5kYXkgJiYgPHNwYW4gY2xhc3NOYW1lPVwiZGF5XCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLmRheSkgKyAnIOWkqSAnfTwvc3Bhbj59XG5cdFx0XHRcdFx0XHR7ISF0aGlzLnN0YXRlLmhvdXIgJiYgPHNwYW4gY2xhc3NOYW1lPVwiaG91clwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5ob3VyKSArICc6J308L3NwYW4+fVxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibWludXRlXCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLm1pbnV0ZSkgKyAnOid9PC9zcGFuPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2Vjb25kXCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLnNlY29uZCl9PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPVwiZW5kXCI+PC9kaXY+XG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aG91cjogMCxcblx0XHRcdG1pbnV0ZTogNSxcblx0XHRcdHNlY29uZDogMCxcblx0XHRcdHRpbWluZzogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRob3VyOiB0aGlzLnByb3BzLmhvdXIsXG5cdFx0XHRtaW51dGU6IHRoaXMucHJvcHMubWludXRlLFxuXHRcdFx0c2Vjb25kOiB0aGlzLnByb3BzLnNlY29uZFxuXHRcdH07XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnN0YXJ0KCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMuX2ludGVydmFsKXtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcblx0XHRcdHRoaXMuX2ludGVydmFsID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLl9pbnRlcnZhbCl7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG5cdFx0fVxuXHRcdHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PnRoaXMudGltaW5nKCksIDEwMDApO1xuXHR9LFxuXHRnZXRUZXh0OiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3ZhbHVlID0gJyc7XG5cdFx0aWYoISF0aGlzLnN0YXRlLmhvdXIpe1xuXHRcdFx0X3ZhbHVlICs9IHRoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLmhvdXIpICsgJzonO1xuXHRcdH1cblx0XHRpZighIXRoaXMuc3RhdGUubWludXRlKXtcblx0XHRcdF92YWx1ZSArPSB0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5taW51dGUpICsgJzonO1xuXHRcdH1cblx0XHRpZighIXRoaXMuc3RhdGUuc2Vjb25kKXtcblx0XHRcdF92YWx1ZSArPSB0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5zZWNvbmQpICsgJzonO1xuXHRcdH1cblxuXHRcdHJldHVybiBfdmFsdWU7XG5cdH0sXG5cdHJlc3RhcnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aG91cjogdGhpcy5wcm9wcy5ob3VyLFxuXHRcdFx0bWludXRlOiB0aGlzLnByb3BzLm1pbnV0ZSxcblx0XHRcdHNlY29uZDogdGhpcy5wcm9wcy5zZWNvbmQsXG5cdFx0XHR0aW1pbmc6IHRydWVcblx0XHR9KTtcblx0XHR0aGlzLnN0YXJ0KCk7XG5cdH0sXG5cdGdldFZhbHVlOiBmdW5jdGlvbiAoKXtcblxuXHR9LFxuXHR0aW1pbmc6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKCF0aGlzLnByb3BzLnRpbWluZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZih0aGlzLnN0YXRlLnNlY29uZD09MCl7XG5cdFx0XHRpZih0aGlzLnN0YXRlLm1pbnV0ZSl7XG5cdFx0XHRcdHRoaXMuc3RhdGUubWludXRlID0gdGhpcy5zdGF0ZS5taW51dGUgLTE7XG5cdFx0XHRcdHRoaXMuc3RhdGUuc2Vjb25kID0gNTk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGlmKHRoaXMuc3RhdGUuaG91cil7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5ob3VyID0gdGhpcy5zdGF0ZS5ob3VyIC0xO1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUubWludXRlID0gNTk7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5zZWNvbmQgPSA1OTtcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUuaG91ciA9IDA7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5taW51dGUgPSAwO1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUuc2Vjb25kID0gMDtcblx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG5cdFx0XHRcdFx0dGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMub25FbmQgJiYgdGhpcy5wcm9wcy5vbkVuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5zdGF0ZS5zZWNvbmQgPSB0aGlzLnN0YXRlLnNlY29uZCAtIDE7XG5cdFx0fVxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0X19maXhWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHRpZih2YWx1ZTwxMCl7XG5cdFx0XHRyZXR1cm4gJzAnICsgdmFsdWU7XG5cdFx0fWVsc2Uge1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci10aW1lclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0eyEhdGhpcy5zdGF0ZS5ob3VyICYmIDxzcGFuIGNsYXNzTmFtZT1cImhvdXJcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuaG91cikgKyAnOid9PC9zcGFuPn1cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibWludXRlXCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLm1pbnV0ZSkgKyAnOid9PC9zcGFuPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJzZWNvbmRcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuc2Vjb25kKX08L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFRpbWVyOiByZXF1aXJlKCcuL1RpbWVyJyksXG4gICAgQ291bnREb3duVGltZXI6IHJlcXVpcmUoJy4vQ291bnREb3duVGltZXInKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=