import React, { Component } from 'react';
import Select from 'react-select';
import packageTypeList from './packageTypes';
import TextField from './Forms/TextField';
import { Col } from 'react-bootstrap';
import { Field } from 'formik';
import { validateNotEmpty } from './Forms/v1StyleFormValidator';

class UploadTypeDropdown extends Component {
    
	constructor() {
		super();
		this.state = { selectedOption: null, "showOtherField": false };
	}
	
	handleChange = (selectedOption) => {
		this.props.setFieldValue('packageType', selectedOption.value);
		this.props.handleChange(selectedOption.value);
		this.setState({ selectedOption });
		if (selectedOption.value === "Other") {
			this.setState({ "showOtherField": true });
		}
	}
	
	render() {
		let { handleBlur, handleChange } = this.props;
    		let { selectedOption } = this.state;
        return (
        		<div>
        			<Col md="3">
	        			<div className="header">
	                    <b>Select a package type</b>
	                </div>
        				<Field component={Select} value={selectedOption} onChange={this.handleChange} options={packageTypeList.options} className="packageTypeSelect" name="packageType" onBlur={handleBlur} validate={validateNotEmpty}/>
        			</Col>
        				{this.state.showOtherField &&
      					<Col md="3" className="secondField">
        						<TextField name="packageTypeOther" label="Package Type Other (specify)" onChange={handleChange} onBlur={handleBlur}/>
        					</Col>
        				}
        		</div>	
        )
    }
}

export default UploadTypeDropdown;