"use strict";

var React = znui.React || require('react');

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