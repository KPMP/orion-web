import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import TextField from './TextField';

class SelectBox extends Component {

	constructor () {
		super();
		this.state = { "showOtherField": false }
	}
	
	changed(e) {
		this.props.input.onChange(e);
		if (e.target.value === "Other" && this.props.additionalFieldName !== undefined) {
			this.setState({"showOtherField": true});
		} else {
			this.setState({"showOtherField": false});
		}
	}
	
	render() {
		let { label, options, name } = this.props;
//		let classes = 'form-control';
//		if (touched && error) {
//			classes += ' fieldInError';
//		}

		return (
			<div>
				<ControlLabel>{label} &nbsp;
				</ControlLabel>
				<select name={name} className="form-control">
					<option value=''>- select - </option>
					{options.map(function(option, index) {
						return <option key={index} value={option.value}>{option.label}</option>
					})}
				</select>
				{this.state.showOtherField && 
					<TextField name={this.props.additionalFieldName} />
				}
			</div>
		);
	}
}

export default SelectBox;