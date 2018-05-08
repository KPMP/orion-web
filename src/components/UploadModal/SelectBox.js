import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';
import TextField from './TextField';

class SelectBox extends Component {

	constructor () {
		super();
		this.state = { "showOtherField": false }
	}
	
	changed(e) {
		this.props.input.onChange();
		console.log("[" + e.target.value + "]");
		if (e.target.value === "Other") {
			this.setState({"showOtherField": true});
		} else {
			this.setState({"showOtherField": false});
		}
	}
	
	render() {
		let { label, options } = this.props;
		let { name, type, onBlur, onChange, onFocus } = this.props.input;
		let { error, touched, warning } = this.props.meta;
		let classes = 'form-control';
		if (touched && error) {
			classes += ' fieldInError';
		}

		return (
			<div>
				<ControlLabel>{label} &nbsp;
					{touched &&
					((error && <span className="formError">{error}</span>) ||
							(warning && <span>{warning}</span>))}
				</ControlLabel>
				<select name={name} className={classes} onBlur={onBlur} onChange={(value)=>this.changed(value)} onFocus={onFocus}>
					<option value=''>- select - </option>
					{options.map(function(option, index) {
						return <option key={index} value={option.value}>{option.label}</option>
					})}
				</select>
				{this.state.showOtherField && 
					<Field name="packageTypeOther" component={TextField} type="text"/>		
				}
			</div>
		);
	}
}

export default SelectBox;