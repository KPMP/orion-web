import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';

class TextField extends Component {
	render() {
		let { label, name, onChange, onBlur, value, touched, error } = this.props;
		let classes = 'form-control';
		let errorMessage = '* ';
		if (touched && error !== undefined) {
			classes += ' fieldInError';
			errorMessage += error;
		}
		return (
			<div>
				<ControlLabel>{label} <span className="formError">{errorMessage}</span>
				</ControlLabel>
				<div>
					<input name={name} type="text" className={classes} onChange={onChange} onBlur={onBlur} value={value}/>
				</div>
			</div>
		);
	}
}

export default TextField;
