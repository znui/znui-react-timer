var React = znui.React || require('react');

module.exports = React.createClass({
	getDefaultProps: function (){
		return {
			hour: 0,
			minute: 5,
			second: 0,
			timing: false
		};
	},
	getInitialState: function (){
		return {
			hour: this.props.hour,
			minute: this.props.minute,
			second: this.props.second
		};
	},
	componentDidMount: function (){
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
	restart: function (){
		this.setState({
			hour: this.props.hour,
			minute: this.props.minute,
			second: this.props.second,
			timing: true
		});
		this.start();
	},
	getValue: function (){

	},
	timing: function (){
		if(!this.props.timing) {
			return;
		}
		if(this.state.second==0){
			if(this.state.minute){
				this.state.minute = this.state.minute -1;
				this.state.second = 59;
			}else {
				if(this.state.hour){
					this.state.hour = this.state.hour -1;
					this.state.minute = 59;
					this.state.second = 59;
				}else {
					this.state.hour = 0;
					this.state.minute = 0;
					this.state.second = 0;
					window.clearInterval(this._interval);
					this._interval = null;
					this.props.onEnd && this.props.onEnd();
				}
			}
		}else {
			this.state.second = this.state.second - 1;
		}
		this.forceUpdate();
	},
	__fixValue: function (value){
		if(value<10){
			return '0' + value;
		}else {
			return value;
		}
	},
	render: function(){
		return (
			<div className={znui.react.classname("zr-timer", this.props.className)} style={this.props.style}>
				{!!this.state.hour && <span className="hour">{this.__fixValue(this.state.hour) + ':'}</span>}
				<span className="minute">{this.__fixValue(this.state.minute) + ':'}</span>
				<span className="second">{this.__fixValue(this.state.second)}</span>
			</div>
		);
	}
});
