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
    this.state.valueTimestamp = new Date(this.props.value).getTime();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ291bnREb3duVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiJdLCJuYW1lcyI6WyJSZWFjdCIsInpudWkiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUNsYXNzIiwiZ2V0RGVmYXVsdFByb3BzIiwidmFsdWUiLCJnZXRJbml0aWFsU3RhdGUiLCJ2YWx1ZVRpbWVzdGFtcCIsInRpbWluZyIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJjb21wb25lbnREaWRNb3VudCIsInN0YXRlIiwiRGF0ZSIsInByb3BzIiwiZ2V0VGltZSIsInN0YXJ0IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJfaW50ZXJ2YWwiLCJ3aW5kb3ciLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJnZXRUZXh0IiwiX3ZhbHVlIiwiX19maXhWYWx1ZSIsIl9zZWNvbmRzIiwicGFyc2VJbnQiLCJub3ciLCJmb3JjZVVwZGF0ZSIsIm9uRW5kIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJyZXN0YXJ0IiwiZ2V0VmFsdWUiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwiVGltZXIiLCJDb3VudERvd25UaW1lciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxp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VUFBTCxDQUFnQixLQUFLWixLQUFMLENBQVdKLElBQTNCLElBQW1DLEdBQTNELENBRHZCLGVBRUM7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBMEIsS0FBS2dCLFVBQUwsQ0FBZ0IsS0FBS1osS0FBTCxDQUFXSCxNQUEzQixJQUFxQyxHQUEvRCxDQUZELGVBR0M7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBMEIsS0FBS2UsVUFBTCxDQUFnQixLQUFLWixLQUFMLENBQVdGLE1BQTNCLENBQTFCLENBSEQsQ0FERDtBQU9BO0FBbkdpQyxDQUFsQixDQUFqQixDOzs7Ozs7Ozs7OztBQ0ZBWCxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYnNDLE9BQUssRUFBRXhDLG1CQUFPLENBQUMsMkJBQUQsQ0FERDtBQUVieUMsZ0JBQWMsRUFBRXpDLG1CQUFPLENBQUMsNkNBQUQ7QUFGVixDQUFqQixDOzs7Ozs7Ozs7OztBQ0FBLGFBQWEsZ0NBQWdDLEVBQUUsSSIsImZpbGUiOiIuL2Rpc3QvZGV2ZWxvcG1lbnQvaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBudWxsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWVUaW1lc3RhbXA6IDAsXG5cdFx0XHR0aW1pbmc6IHRydWUsXG5cdFx0XHRkYXk6IDAsXG5cdFx0XHRob3VyOiAwLFxuXHRcdFx0bWludXRlOiAwLFxuXHRcdFx0c2Vjb25kOiAwXG5cdFx0fTtcblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuc3RhdGUudmFsdWVUaW1lc3RhbXAgPSAobmV3IERhdGUodGhpcy5wcm9wcy52YWx1ZSkpLmdldFRpbWUoKTtcblx0XHR0aGlzLnN0YXJ0KCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMuX2ludGVydmFsKXtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcblx0XHRcdHRoaXMuX2ludGVydmFsID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLl9pbnRlcnZhbCl7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG5cdFx0fVxuXHRcdHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PnRoaXMudGltaW5nKCksIDEwMDApO1xuXHR9LFxuXHRnZXRUZXh0OiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3ZhbHVlID0gJyc7XG5cdFx0aWYoISF0aGlzLnN0YXRlLmhvdXIpe1xuXHRcdFx0X3ZhbHVlICs9IHRoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLmhvdXIpICsgJzonO1xuXHRcdH1cblx0XHRpZighIXRoaXMuc3RhdGUubWludXRlKXtcblx0XHRcdF92YWx1ZSArPSB0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5taW51dGUpICsgJzonO1xuXHRcdH1cblx0XHRpZighIXRoaXMuc3RhdGUuc2Vjb25kKXtcblx0XHRcdF92YWx1ZSArPSB0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5zZWNvbmQpICsgJzonO1xuXHRcdH1cblxuXHRcdHJldHVybiBfdmFsdWU7XG5cdH0sXG5cdHRpbWluZzogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9zZWNvbmRzID0gcGFyc2VJbnQoKHRoaXMuc3RhdGUudmFsdWVUaW1lc3RhbXAgLSBEYXRlLm5vdygpKSAvIDEwMDApO1xuXHRcdGlmKF9zZWNvbmRzIDwgMSkge1xuXHRcdFx0aWYodGhpcy5faW50ZXJ2YWwpe1xuXHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG5cdFx0XHRcdHRoaXMuX2ludGVydmFsID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHRoaXMuc3RhdGUuZGF5ID0gMDtcblx0XHRcdHRoaXMuc3RhdGUuaG91ciA9IDA7XG5cdFx0XHR0aGlzLnN0YXRlLm1pbnV0ZSA9IDA7XG5cdFx0XHR0aGlzLnN0YXRlLnNlY29uZCA9IDA7XG5cdFx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uRW5kICYmIHRoaXMucHJvcHMub25FbmQoKTtcblx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0dGltaW5nOiBmYWxzZVxuXHRcdFx0fSksIGZhbHNlO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhdGUuZGF5ID0gcGFyc2VJbnQoX3NlY29uZHMgLyAoMjQgKiA2MCAqIDYwKSk7XG5cdFx0dGhpcy5zdGF0ZS5ob3VyID0gcGFyc2VJbnQoX3NlY29uZHMgLyAoNjAgKiA2MCkgJSAyNCk7XG5cdFx0dGhpcy5zdGF0ZS5taW51dGUgPSBwYXJzZUludChfc2Vjb25kcyAvIDYwICUgMjQpO1xuXHRcdHRoaXMuc3RhdGUuc2Vjb25kID0gcGFyc2VJbnQoX3NlY29uZHMgJSA2MCk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRfX2ZpeFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdGlmKHZhbHVlIDwgMTApe1xuXHRcdFx0cmV0dXJuICcwJyArIHZhbHVlO1xuXHRcdH1lbHNlIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ6ci1jb3VudC1kb3duLXRpbWVyXCI+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLnRpbWluZyA/IDxkaXYgY2xhc3NOYW1lPVwidGltaW5nXCI+XG5cdFx0XHRcdFx0XHRcdDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cImNsb2NrXCIgY2xhc3NOYW1lPVwic3ZnLWlubGluZS0tZmEgZmEtY2xvY2sgZmEtdy0xNiBcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yNTYgOEMxMTkgOCA4IDExOSA4IDI1NnMxMTEgMjQ4IDI0OCAyNDggMjQ4LTExMSAyNDgtMjQ4UzM5MyA4IDI1NiA4em01Ny4xIDM1MC4xTDIyNC45IDI5NGMtMy4xLTIuMy00LjktNS45LTQuOS05LjdWMTE2YzAtNi42IDUuNC0xMiAxMi0xMmg0OGM2LjYgMCAxMiA1LjQgMTIgMTJ2MTM3LjdsNjMuNSA0Ni4yYzUuNCAzLjkgNi41IDExLjQgMi42IDE2LjhsLTI4LjIgMzguOGMtMy45IDUuMy0xMS40IDYuNS0xNi44IDIuNnpcIj48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0XHRcdHshIXRoaXMuc3RhdGUuZGF5ICYmIDxzcGFuIGNsYXNzTmFtZT1cImRheVwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5kYXkpICsgJyDlpKkgJ308L3NwYW4+fVxuXHRcdFx0XHRcdFx0eyEhdGhpcy5zdGF0ZS5ob3VyICYmIDxzcGFuIGNsYXNzTmFtZT1cImhvdXJcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuaG91cikgKyAnOid9PC9zcGFuPn1cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm1pbnV0ZVwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5taW51dGUpICsgJzonfTwvc3Bhbj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNlY29uZFwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5zZWNvbmQpfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT1cImVuZFwiPjwvZGl2PlxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhvdXI6IDAsXG5cdFx0XHRtaW51dGU6IDUsXG5cdFx0XHRzZWNvbmQ6IDAsXG5cdFx0XHR0aW1pbmc6IGZhbHNlXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aG91cjogdGhpcy5wcm9wcy5ob3VyLFxuXHRcdFx0bWludXRlOiB0aGlzLnByb3BzLm1pbnV0ZSxcblx0XHRcdHNlY29uZDogdGhpcy5wcm9wcy5zZWNvbmRcblx0XHR9O1xuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5zdGFydCgpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLl9pbnRlcnZhbCl7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG5cdFx0XHR0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXHRzdGFydDogZnVuY3Rpb24gKCl7XG5cdFx0aWYodGhpcy5faW50ZXJ2YWwpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuXHRcdH1cblx0XHR0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT50aGlzLnRpbWluZygpLCAxMDAwKTtcblx0fSxcblx0Z2V0VGV4dDogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF92YWx1ZSA9ICcnO1xuXHRcdGlmKCEhdGhpcy5zdGF0ZS5ob3VyKXtcblx0XHRcdF92YWx1ZSArPSB0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5ob3VyKSArICc6Jztcblx0XHR9XG5cdFx0aWYoISF0aGlzLnN0YXRlLm1pbnV0ZSl7XG5cdFx0XHRfdmFsdWUgKz0gdGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUubWludXRlKSArICc6Jztcblx0XHR9XG5cdFx0aWYoISF0aGlzLnN0YXRlLnNlY29uZCl7XG5cdFx0XHRfdmFsdWUgKz0gdGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuc2Vjb25kKSArICc6Jztcblx0XHR9XG5cblx0XHRyZXR1cm4gX3ZhbHVlO1xuXHR9LFxuXHRyZXN0YXJ0OiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhvdXI6IHRoaXMucHJvcHMuaG91cixcblx0XHRcdG1pbnV0ZTogdGhpcy5wcm9wcy5taW51dGUsXG5cdFx0XHRzZWNvbmQ6IHRoaXMucHJvcHMuc2Vjb25kLFxuXHRcdFx0dGltaW5nOiB0cnVlXG5cdFx0fSk7XG5cdFx0dGhpcy5zdGFydCgpO1xuXHR9LFxuXHRnZXRWYWx1ZTogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0dGltaW5nOiBmdW5jdGlvbiAoKXtcblx0XHRpZighdGhpcy5wcm9wcy50aW1pbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5zZWNvbmQ9PTApe1xuXHRcdFx0aWYodGhpcy5zdGF0ZS5taW51dGUpe1xuXHRcdFx0XHR0aGlzLnN0YXRlLm1pbnV0ZSA9IHRoaXMuc3RhdGUubWludXRlIC0xO1xuXHRcdFx0XHR0aGlzLnN0YXRlLnNlY29uZCA9IDU5O1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRpZih0aGlzLnN0YXRlLmhvdXIpe1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUuaG91ciA9IHRoaXMuc3RhdGUuaG91ciAtMTtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLm1pbnV0ZSA9IDU5O1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUuc2Vjb25kID0gNTk7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmhvdXIgPSAwO1xuXHRcdFx0XHRcdHRoaXMuc3RhdGUubWludXRlID0gMDtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLnNlY29uZCA9IDA7XG5cdFx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuXHRcdFx0XHRcdHRoaXMuX2ludGVydmFsID0gbnVsbDtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uRW5kICYmIHRoaXMucHJvcHMub25FbmQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuc3RhdGUuc2Vjb25kID0gdGhpcy5zdGF0ZS5zZWNvbmQgLSAxO1xuXHRcdH1cblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdF9fZml4VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSl7XG5cdFx0aWYodmFsdWU8MTApe1xuXHRcdFx0cmV0dXJuICcwJyArIHZhbHVlO1xuXHRcdH1lbHNlIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItdGltZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG5cdFx0XHRcdHshIXRoaXMuc3RhdGUuaG91ciAmJiA8c3BhbiBjbGFzc05hbWU9XCJob3VyXCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLmhvdXIpICsgJzonfTwvc3Bhbj59XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm1pbnV0ZVwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5taW51dGUpICsgJzonfTwvc3Bhbj5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2Vjb25kXCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLnNlY29uZCl9PC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBUaW1lcjogcmVxdWlyZSgnLi9UaW1lcicpLFxuICAgIENvdW50RG93blRpbWVyOiByZXF1aXJlKCcuL0NvdW50RG93blRpbWVyJylcbn07IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9