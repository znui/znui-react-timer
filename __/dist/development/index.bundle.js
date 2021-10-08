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
      className: znui.react.classname('zr-count-down-timer', this.props.className),
      style: this.props.style
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ291bnREb3duVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiJdLCJuYW1lcyI6WyJSZWFjdCIsInpudWkiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUNsYXNzIiwiZ2V0RGVmYXVsdFByb3BzIiwidmFsdWUiLCJnZXRJbml0aWFsU3RhdGUiLCJ2YWx1ZVRpbWVzdGFtcCIsInRpbWluZyIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJjb21wb25lbnREaWRNb3VudCIsInByb3BzIiwic3RhdGUiLCJEYXRlIiwic3BsaXQiLCJqb2luIiwiZ2V0VGltZSIsInN0YXJ0IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJfaW50ZXJ2YWwiLCJ3aW5kb3ciLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJnZXRUZXh0IiwiX3ZhbHVlIiwiX19maXhWYWx1ZSIsIl9zZWNvbmRzIiwicGFyc2VJbnQiLCJub3ciLCJmb3JjZVVwZGF0ZSIsIm9uRW5kIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwicmVzdGFydCIsImdldFZhbHVlIiwiVGltZXIiLCJDb3VudERvd25UaW1lciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFB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LFFBQU0sRUFBRSxrQkFBVTtBQUNqQix3QkFDQztBQUFLLGVBQVMsRUFBRXBDLElBQUksQ0FBQ3FDLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQixVQUFyQixFQUFpQyxLQUFLdkIsS0FBTCxDQUFXd0IsU0FBNUMsQ0FBaEI7QUFBd0UsV0FBSyxFQUFFLEtBQUt4QixLQUFMLENBQVd5QjtBQUExRixPQUNFLENBQUMsQ0FBQyxLQUFLeEIsS0FBTCxDQUFXTCxJQUFiLGlCQUFxQjtBQUFNLGVBQVMsRUFBQztBQUFoQixPQUF3QixLQUFLa0IsVUFBTCxDQUFnQixLQUFLYixLQUFMLENBQVdMLElBQTNCLElBQW1DLEdBQTNELENBRHZCLGVBRUM7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBMEIsS0FBS2tCLFVBQUwsQ0FBZ0IsS0FBS2IsS0FBTCxDQUFXSixNQUEzQixJQUFxQyxHQUEvRCxDQUZELGVBR0M7QUFBTSxlQUFTLEVBQUM7QUFBaEIsT0FBMEIsS0FBS2lCLFVBQUwsQ0FBZ0IsS0FBS2IsS0FBTCxDQUFXSCxNQUEzQixDQUExQixDQUhELENBREQ7QUFPQTtBQW5HaUMsQ0FBbEIsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNGQVgsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2J3QyxPQUFLLEVBQUUxQyxtQkFBTyxDQUFDLDJCQUFELENBREQ7QUFFYjJDLGdCQUFjLEVBQUUzQyxtQkFBTyxDQUFDLDZDQUFEO0FBRlYsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNBQSxhQUFhLGdDQUFnQyxFQUFFLEkiLCJmaWxlIjoiLi9kaXN0L2RldmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogbnVsbFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlVGltZXN0YW1wOiAwLFxuXHRcdFx0dGltaW5nOiB0cnVlLFxuXHRcdFx0ZGF5OiAwLFxuXHRcdFx0aG91cjogMCxcblx0XHRcdG1pbnV0ZTogMCxcblx0XHRcdHNlY29uZDogMFxuXHRcdH07XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnByb3BzLnZhbHVlKSB7XG5cdFx0XHR0aGlzLnN0YXRlLnZhbHVlVGltZXN0YW1wID0gKG5ldyBEYXRlKHRoaXMucHJvcHMudmFsdWUuc3BsaXQoJyAnKS5qb2luKCdUJykpKS5nZXRUaW1lKCk7XG5cdFx0XHR0aGlzLnN0YXJ0KCk7XG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLl9pbnRlcnZhbCl7XG5cdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG5cdFx0XHR0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXHRzdGFydDogZnVuY3Rpb24gKCl7XG5cdFx0aWYodGhpcy5faW50ZXJ2YWwpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuXHRcdH1cblx0XHR0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT50aGlzLnRpbWluZygpLCAxMDAwKTtcblx0fSxcblx0Z2V0VGV4dDogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF92YWx1ZSA9ICcnO1xuXHRcdGlmKCEhdGhpcy5zdGF0ZS5ob3VyKXtcblx0XHRcdF92YWx1ZSArPSB0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5ob3VyKSArICc6Jztcblx0XHR9XG5cdFx0aWYoISF0aGlzLnN0YXRlLm1pbnV0ZSl7XG5cdFx0XHRfdmFsdWUgKz0gdGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUubWludXRlKSArICc6Jztcblx0XHR9XG5cdFx0aWYoISF0aGlzLnN0YXRlLnNlY29uZCl7XG5cdFx0XHRfdmFsdWUgKz0gdGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuc2Vjb25kKSArICc6Jztcblx0XHR9XG5cblx0XHRyZXR1cm4gX3ZhbHVlO1xuXHR9LFxuXHR0aW1pbmc6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfc2Vjb25kcyA9IHBhcnNlSW50KCh0aGlzLnN0YXRlLnZhbHVlVGltZXN0YW1wIC0gRGF0ZS5ub3coKSkgLyAxMDAwKTtcblx0XHRpZihfc2Vjb25kcyA8IDEpIHtcblx0XHRcdGlmKHRoaXMuX2ludGVydmFsKXtcblx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuXHRcdFx0XHR0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnN0YXRlLmRheSA9IDA7XG5cdFx0XHR0aGlzLnN0YXRlLmhvdXIgPSAwO1xuXHRcdFx0dGhpcy5zdGF0ZS5taW51dGUgPSAwO1xuXHRcdFx0dGhpcy5zdGF0ZS5zZWNvbmQgPSAwO1xuXHRcdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5wcm9wcy5vbkVuZCAmJiB0aGlzLnByb3BzLm9uRW5kKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHRpbWluZzogZmFsc2Vcblx0XHRcdH0pLCBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLnN0YXRlLmRheSA9IHBhcnNlSW50KF9zZWNvbmRzIC8gKDI0ICogNjAgKiA2MCkpO1xuXHRcdHRoaXMuc3RhdGUuaG91ciA9IHBhcnNlSW50KF9zZWNvbmRzIC8gKDYwICogNjApICUgMjQpO1xuXHRcdHRoaXMuc3RhdGUubWludXRlID0gcGFyc2VJbnQoX3NlY29uZHMgLyA2MCAlIDI0KTtcblx0XHR0aGlzLnN0YXRlLnNlY29uZCA9IHBhcnNlSW50KF9zZWNvbmRzICUgNjApO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0X19maXhWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKXtcblx0XHRpZih2YWx1ZSA8IDEwKXtcblx0XHRcdHJldHVybiAnMCcgKyB2YWx1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZSgnenItY291bnQtZG93bi10aW1lcicsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS50aW1pbmcgPyA8ZGl2IGNsYXNzTmFtZT1cInRpbWluZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJjbG9ja1wiIGNsYXNzTmFtZT1cInN2Zy1pbmxpbmUtLWZhIGZhLWNsb2NrIGZhLXctMTYgXCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptNTcuMSAzNTAuMUwyMjQuOSAyOTRjLTMuMS0yLjMtNC45LTUuOS00LjktOS43VjExNmMwLTYuNiA1LjQtMTIgMTItMTJoNDhjNi42IDAgMTIgNS40IDEyIDEydjEzNy43bDYzLjUgNDYuMmM1LjQgMy45IDYuNSAxMS40IDIuNiAxNi44bC0yOC4yIDM4LjhjLTMuOSA1LjMtMTEuNCA2LjUtMTYuOCAyLjZ6XCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHR7ISF0aGlzLnN0YXRlLmRheSAmJiA8c3BhbiBjbGFzc05hbWU9XCJkYXlcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuZGF5KSArICcg5aSpICd9PC9zcGFuPn1cblx0XHRcdFx0XHRcdHshIXRoaXMuc3RhdGUuaG91ciAmJiA8c3BhbiBjbGFzc05hbWU9XCJob3VyXCI+e3RoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLmhvdXIpICsgJzonfTwvc3Bhbj59XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJtaW51dGVcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUubWludXRlKSArICc6J308L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJzZWNvbmRcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuc2Vjb25kKX08L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9XCJlbmRcIj48L2Rpdj5cblx0XHRcdFx0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRob3VyOiAwLFxuXHRcdFx0bWludXRlOiA1LFxuXHRcdFx0c2Vjb25kOiAwLFxuXHRcdFx0dGltaW5nOiBmYWxzZVxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhvdXI6IHRoaXMucHJvcHMuaG91cixcblx0XHRcdG1pbnV0ZTogdGhpcy5wcm9wcy5taW51dGUsXG5cdFx0XHRzZWNvbmQ6IHRoaXMucHJvcHMuc2Vjb25kXG5cdFx0fTtcblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuc3RhcnQoKTtcblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5faW50ZXJ2YWwpe1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuXHRcdFx0dGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuXHRcdH1cblx0fSxcblx0c3RhcnQ6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuX2ludGVydmFsKXtcblx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcblx0XHR9XG5cdFx0dGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+dGhpcy50aW1pbmcoKSwgMTAwMCk7XG5cdH0sXG5cdGdldFRleHQ6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfdmFsdWUgPSAnJztcblx0XHRpZighIXRoaXMuc3RhdGUuaG91cil7XG5cdFx0XHRfdmFsdWUgKz0gdGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUuaG91cikgKyAnOic7XG5cdFx0fVxuXHRcdGlmKCEhdGhpcy5zdGF0ZS5taW51dGUpe1xuXHRcdFx0X3ZhbHVlICs9IHRoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLm1pbnV0ZSkgKyAnOic7XG5cdFx0fVxuXHRcdGlmKCEhdGhpcy5zdGF0ZS5zZWNvbmQpe1xuXHRcdFx0X3ZhbHVlICs9IHRoaXMuX19maXhWYWx1ZSh0aGlzLnN0YXRlLnNlY29uZCkgKyAnOic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF92YWx1ZTtcblx0fSxcblx0cmVzdGFydDogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRob3VyOiB0aGlzLnByb3BzLmhvdXIsXG5cdFx0XHRtaW51dGU6IHRoaXMucHJvcHMubWludXRlLFxuXHRcdFx0c2Vjb25kOiB0aGlzLnByb3BzLnNlY29uZCxcblx0XHRcdHRpbWluZzogdHJ1ZVxuXHRcdH0pO1xuXHRcdHRoaXMuc3RhcnQoKTtcblx0fSxcblx0Z2V0VmFsdWU6IGZ1bmN0aW9uICgpe1xuXG5cdH0sXG5cdHRpbWluZzogZnVuY3Rpb24gKCl7XG5cdFx0aWYoIXRoaXMucHJvcHMudGltaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmKHRoaXMuc3RhdGUuc2Vjb25kPT0wKXtcblx0XHRcdGlmKHRoaXMuc3RhdGUubWludXRlKXtcblx0XHRcdFx0dGhpcy5zdGF0ZS5taW51dGUgPSB0aGlzLnN0YXRlLm1pbnV0ZSAtMTtcblx0XHRcdFx0dGhpcy5zdGF0ZS5zZWNvbmQgPSA1OTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0aWYodGhpcy5zdGF0ZS5ob3VyKXtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmhvdXIgPSB0aGlzLnN0YXRlLmhvdXIgLTE7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5taW51dGUgPSA1OTtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLnNlY29uZCA9IDU5O1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5ob3VyID0gMDtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLm1pbnV0ZSA9IDA7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5zZWNvbmQgPSAwO1xuXHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcblx0XHRcdFx0XHR0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbkVuZCAmJiB0aGlzLnByb3BzLm9uRW5kKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLnN0YXRlLnNlY29uZCA9IHRoaXMuc3RhdGUuc2Vjb25kIC0gMTtcblx0XHR9XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRfX2ZpeFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpe1xuXHRcdGlmKHZhbHVlPDEwKXtcblx0XHRcdHJldHVybiAnMCcgKyB2YWx1ZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLXRpbWVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuXHRcdFx0XHR7ISF0aGlzLnN0YXRlLmhvdXIgJiYgPHNwYW4gY2xhc3NOYW1lPVwiaG91clwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5ob3VyKSArICc6J308L3NwYW4+fVxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJtaW51dGVcIj57dGhpcy5fX2ZpeFZhbHVlKHRoaXMuc3RhdGUubWludXRlKSArICc6J308L3NwYW4+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNlY29uZFwiPnt0aGlzLl9fZml4VmFsdWUodGhpcy5zdGF0ZS5zZWNvbmQpfTwvc3Bhbj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVGltZXI6IHJlcXVpcmUoJy4vVGltZXInKSxcbiAgICBDb3VudERvd25UaW1lcjogcmVxdWlyZSgnLi9Db3VudERvd25UaW1lcicpXG59OyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==