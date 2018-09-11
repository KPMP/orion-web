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
		this.props.setFieldValue(selectedOption.value);
		this.props.handleChange(selectedOption.value);
		this.setState({ selectedOption });
		if (selectedOption.value === "Other") {
			this.setState({ "showOtherField": true });
		}
	}
	
	render() {
		let { label, options, name, error, handleBlur, handleChange } = this.props;
    		let { selectedOption } = this.state;
        return (
        		<Row>
        			<Col md="3">
	        			<div className="header">
	                    <b>Select a package type</b>
	                </div>
        				<Select value={selectedOption} onChange={this.handleChange} options={packageTypeList.options} className="packageTypeSelect" name="packageType" onBlur={handleBlur}/>
        			</Col>
        				{this.state.showOtherField &&
      					<Col md="3">
        						<TextField name="packageTypeOther" label="Package Type Other (specify)" onChange={handleChange} onBlur={handleBlur}/>
        					</Col>
        				}
        			
            </Row>
        )
    }
}

export default UploadTypeDropdown;