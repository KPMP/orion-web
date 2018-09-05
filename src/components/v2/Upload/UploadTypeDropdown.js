import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';
import Select from 'react-select';
import packageTypeList from './packageTypes';

class UploadTypeDropdown extends Component {
    
	constructor() {
		super();
		this.state = { selectedOption: null };
	}
	
	handleChange = (selectedOption) => {
		this.props.onSelect(selectedOption.value);
		this.setState({ selectedOption });
	}
	
	render() {
    		let { selectedOption } = this.state;
        return (
            <Select value={selectedOption} onChange={this.handleChange} options={packageTypeList.options} className="packageTypeSelect"/>
        )
    }
}

export default UploadTypeDropdown;