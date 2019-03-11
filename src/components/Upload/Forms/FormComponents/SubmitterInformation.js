import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import TextField from './TextField';

class SubmitterInformation extends Component {
	
	render() {
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		
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
						<TextField label="First Name" fieldName="submitterFirstName" isDisabled={submitterLastNameDisabled} form={this.props.form} isRequired={true}/>
					</Col>
					<Col sm={12} md={6} lg={4} >
						<TextField label="Last Name" fieldName="submitterLastName" isDisabled={submitterLastNameDisabled} form={this.props.form} isRequired={true}/>
					</Col>
					<Col sm={12} md={6} lg={4}>
						<TextField label="Email" fieldName="submitterEmail" form={this.props.form} isRequired={true}/>
					</Col>
				</div>
			);
		}

	}
}

export default SubmitterInformation;