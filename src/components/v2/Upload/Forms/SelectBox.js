import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import TextField from './TextField';
import Select from 'react-select';

class SelectBox extends Component {
	
	constructor () {
		super();
		this.state = { "showOtherField": false,
				selectedOption: null}
	}
	
	changed = (selectedOption) => {
		this.setState({ "selectedOption": selectedOption });
		if (selectedOption.value === "Other" && this.props.additionalFieldName !== undefined) {
			this.setState({"showOtherField": true});
		} else {
			this.setState({"showOtherField": false});
		}
	}
	
	render() {
		let { label, options, name } = this.props;
		let { selectedOption } = this.state;
		return (
			<div>
				<ControlLabel>{label} &nbsp;
				</ControlLabel>
				<Select value={selectedOption} onChange={this.changed} options={options}/>
				{this.state.showOtherField && 
					<TextField name={this.props.additionalFieldName} />
				}
			</div>
		);
	}
}

export default SelectBox;