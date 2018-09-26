import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { Field } from 'formik';
import { validateNotEmpty } from './v1StyleFormValidator';

class TextArea extends Component {
	
	render() {
		let { label, name, onChange, onBlur, value, touched, error, placeholder } = this.props;
		let classes = '';
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
					<Field name={name} component="textarea" className={classes} onChange={onChange} onBlur={onBlur} value={value} validate={validateNotEmpty} placeholder={placeholder}/>
				</div>
			</div>
		);
	}
}

export default TextArea;
