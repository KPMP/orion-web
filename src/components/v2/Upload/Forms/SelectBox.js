import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import TextField from './TextField';
import Select from 'react-select';

class SelectBox extends Component {
	
	constructor () {
		super();
		this.state = { "showOtherField": false,
				selectedOption: null, touched: false }
	}
	
	changed = (selectedOption) => {
		this.props.setFieldValue(this.props.name, selectedOption.value);
		this.props.onChange(selectedOption.value);
		this.setState({ "selectedOption": selectedOption });
		if (selectedOption.value === "Other" && this.props.additionalFieldName !== undefined) {
			this.setState({"showOtherField": true});
		} else {
			this.setState({"showOtherField": false});
		}
	}
	
	blur = (e) => {
		this.props.onBlur(e);
		this.setState({touched: true});
	}
	
	render() {
		let { label, options, name, error } = this.props;
		let classes = '';
		let errorMessage = "* ";
		if (this.state.touched && error !== undefined) {
			classes = 'fieldInError';
			errorMessage += error;
		}
		let { selectedOption } = this.state;
		return (
			<div>
				<ControlLabel>{label} <span className="formError">{errorMessage}</span>
				</ControlLabel>
				<Select name={name} value={selectedOption} onChange={this.changed} options={options} className={classes} onBlur={this.blur}/>
				{this.state.showOtherField && 
					<TextField name={this.props.additionalFieldName} />
				}
			</div>
		);
	}
}

export default SelectBox;