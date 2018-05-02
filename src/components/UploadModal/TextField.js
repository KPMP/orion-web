import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';

class TextField extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<ControlLabel>{this.props.label}</ControlLabel>
				<div>
					<input name={this.props.input.name} type={this.props.input.type} className="form-control" />
						Is touched: {this.props.meta.touched}
					{this.props.meta.touched &&
						((this.props.meta.error && <span>{this.props.meta.error}</span>) ||
								(this.props.meta.warning && <span>{this.props.meta.warning}</span>))}
				</div>
			</div>
		);
	}
}

export default TextField;