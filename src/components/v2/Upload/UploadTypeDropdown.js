import React, { Component } from 'react';
import Select from 'react-select';
import packageTypeList from './packageTypes';
import TextField from './Forms/TextField';
import { Row, Col } from 'react-bootstrap';

class UploadTypeDropdown extends Component {
    
	constructor() {
		super();
		this.state = { selectedOption: null, "showOtherField": false };
	}
	
	handleChange = (selectedOption) => {
		if (selectedOption.value === "Other") {
			this.setState({ "showOtherField": true });
		}
		this.props.onSelect(selectedOption.value);
		this.setState({ selectedOption });
	}
	
	render() {
    		let { selectedOption } = this.state;
        return (
        		<Row>
        			<Col md="3">
	        			<div className="header">
	                    <b>Select a package type</b>
	                </div>
        				<Select value={selectedOption} onChange={this.handleChange} options={packageTypeList.options} className="packageTypeSelect"/>
        			</Col>
        				{this.state.showOtherField &&
      					<Col md="3">
        						<TextField name="packageTypeOther" label="Package Type Other (specify)" onChange={this.props.handlePackageTypeOther}/>
        					</Col>
        				}
        			
            </Row>
        )
    }
}

export default UploadTypeDropdown;