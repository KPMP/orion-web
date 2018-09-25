import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { Field } from 'formik';
import { validateNotEmpty } from './v1StyleFormValidator';

class TextField extends Component {
	
	render() {
		let { label, name, onChange, onBlur, value, touched, error, placeholder } = this.props;
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
					<Field name={name} type="text" className={classes} onChange={onChange} onBlur={onBlur} value={value} validate={validateNotEmpty} placeholder={placeholder}/>
				</div>
			</div>
		);
	}
}

export default TextField;
