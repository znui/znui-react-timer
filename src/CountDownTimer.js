var React = znui.React || require('react');

module.exports = React.createClass({
	getDefaultProps: function (){
		return {
			value: null
		};
	},
	getInitialState: function (){
		return {
			valueTimestamp: 0,
			timing: true,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0
		};
	},
	componentDidMount: function (){
		this.state.valueTimestamp = (new Date(this.props.value)).getTime();
		this.start();
	},
	componentWillUnmount: function(){
		if(this._interval){
			window.clearInterval(this._interval);
			this._interval = null;
		}
	},
	start: function (){
		if(this._interval){
			window.clearInterval(this._interval);
		}
		this._interval = setInterval(()=>this.timing(), 1000);
	},
	getText: function (){
		var _value = '';
		if(!!this.state.hour){
			_value += this.__fixValue(this.state.hour) + ':';
		}
		if(!!this.state.minute){
			_value += this.__fixValue(this.state.minute) + ':';
		}
		if(!!this.state.second){
			_value += this.__fixValue(this.state.second) + ':';
		}

		return _value;
	},
	timing: function (){
		var _seconds = parseInt((this.state.valueTimestamp - Date.now()) / 1000);
		if(_seconds < 1) {
			if(this._interval){
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
	__fixValue: function (value){
		if(value < 10){
			return '0' + value;
		}else {
			return value;
		}
	},
	render: function(){
		return (
			<div className="zr-count-down-timer">
				{
					this.state.timing ? <div className="timing">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" className="svg-inline--fa fa-clock fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
						</svg>
						{!!this.state.day && <span className="day">{this.__fixValue(this.state.day) + ' 天 '}</span>}
						{!!this.state.hour && <span className="hour">{this.__fixValue(this.state.hour) + ':'}</span>}
						<span className="minute">{this.__fixValue(this.state.minute) + ':'}</span>
						<span className="second">{this.__fixValue(this.state.second)}</span>
					</div> : <div className="end"></div>
				}
			</div>
		);
	}
});
