import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultForm from './Forms/DefaultForm';
import qq from 'fine-uploader/lib/core';
import { uploader } from './fineUploader';

let requiredFields = ['packageType', 'submitterFirstName', 'submitterLastName', 'submitterEmail', 'institution', 'protocol', 'subjectId', 'description'];
let submitDisabled = true;

class UploadForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            filesAdded: 0
        };

		uploader.methods.reset();
        
        uploader.on('submit', () => {
    		let newCount = this.state.filesAdded + 1;
    		this.setState( { filesAdded: newCount } );
    		this.isSubmitDisabled();
    		return true;
        });
        uploader.on('cancel', () => {
    		let newCount = this.state.filesAdded - 1;
    		this.setState( { filesAdded: newCount });
    		this.isSubmitDisabled();
    		return true;
        });
        uploader.on('submit', (id, name) => {
    		let files = uploader.methods.getUploads({
            status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});
    		for(let fileIndex in files) {
    			let existingName = files[fileIndex].name;
    			if (existingName === name) {
    				alert("You have already selected " + existingName + " to upload.");
    				return false;
    			}
    		}
    		return true;
        });
    }
    
    componentDidUpdate() {
    	this.isSubmitDisabled();
    }
    
	handleSubmit = (e) => {
		let { validateFields, setFieldsValue } = this.props.form; 
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		if (dontNeedUserInfo) {
			setFieldsValue({ submitterFirstName: this.props.userInformation.firstName });
			setFieldsValue({ submitterLastName: this.props.userInformation.lastName });
			setFieldsValue({ submitterEmail: this.props.userInformation.email });
		}
		validateFields((err, values) => {
			if(!err) {
				this.props.postPackageInformation(values, uploader);
			} else {
				console.log("Received err: ", err);
			}
		})
	}
    
	isSubmitDisabled = () => {
		
		let fieldsTouched = 0;
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		if (dontNeedUserInfo) {
			fieldsTouched = 3;
		}
    	for (var index in requiredFields) {
    		let field = requiredFields[index];
    		if (this.props.form.isFieldTouched(field)) {
    			fieldsTouched++;
    		}
    	}
    	let fieldsError = this.props.form.getFieldsError()
    	let hasErrors = Object.keys(fieldsError).some(field => fieldsError[field]);
    	
    	if (!hasErrors && fieldsTouched === requiredFields.length && this.state.filesAdded > 0) {
    		submitDisabled = false;
    	}
	}
	
	render() {
		
		return (
			<DefaultForm uploader={uploader} isUploading={this.props.isUploading} userInformation={this.props.userInformation} handleSubmit={this.handleSubmit} submitDisabled={submitDisabled}/>
		);
	}
}

export default UploadForm;