import React, { Component } from 'react';
import DynamicForm from './Forms/DynamicForm';
import { connect } from 'react-redux';

class UploadForm extends Component {
	
//    
//	handleSubmit = (e) => {
//		let { validateFields, setFieldsValue } = this.props.form; 
//		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
//		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
//		let submitterEmailDisabled = this.props.userInformation.email !== "";
//		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
//		if (dontNeedUserInfo) {
//			setFieldsValue({ submitterFirstName: this.props.userInformation.firstName });
//			setFieldsValue({ submitterLastName: this.props.userInformation.lastName });
//			setFieldsValue({ submitterEmail: this.props.userInformation.email });
//		}
//		validateFields((err, values) => {
//			if(!err) {
//				this.props.postPackageInformation(values, uploader);
//			} else {
//				console.log("Received err: ", err);
//			}
//		})
//	}
	
	render() {
		return (
			<DynamicForm {...this.props} />
		);
	}
}

export default connect()(UploadForm);