import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';

class TextField extends Component {
	render() {
		let { label, name } = this.props;
//		let classes = 'form-control';
//		if (touched && error) {
//			classes += ' fieldInError';
//		}
		return (
			<div>
				<ControlLabel>{label} &nbsp;
				</ControlLabel>
				<div>
					<input name={name} type="text" className="form-control"/>
					
				</div>
			</div>
		);
	}
}

export default TextField;
