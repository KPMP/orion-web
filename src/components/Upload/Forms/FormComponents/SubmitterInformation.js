import React, { Component } from 'react';
import { Col } from 'reactstrap';
import TextField from './TextField';

class SubmitterInformation extends Component {
	
	render() {
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
		
		if (dontNeedUserInfo) {
			return (
				<Col sm={12} md={12} lg={12}>
					<div className="ant-form-item-label">
						<label>Submitted By</label>
					</div>
					{this.props.userInformation.firstName} {this.props.userInformation.lastName} ({this.props.userInformation.email}) 
				</Col>
			);
		} else {
			return(
	    		 <div>
					<Col sm={12} md={6} lg={4}>
						<TextField label="First Name" fieldName="submitterFirstName" fieldOptions={requiredFieldOptions} isDisabled={submitterLastNameDisabled} form={this.props.form}/>
					</Col>
					<Col sm={12} md={6} lg={4} >
						<TextField label="Last Name" fieldName="submitterLastName" fieldOptions={requiredFieldOptions} isDisabled={submitterLastNameDisabled} form={this.props.form}/>
					</Col>
					<Col sm={12} md={6} lg={4}>
						<TextField label="Email" fieldName="submitterEmail" fieldOptions={requiredFieldOptions} form={this.props.form}/>
					</Col>
				</div>
			);
		}

	}
}

export default SubmitterInformation;