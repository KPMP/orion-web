import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { DynamicFormGenerator } from './dynamicFormGenerator';
import { Row, Col } from 'react-bootstrap';
import FileDropzone from './FileDropzone';
import qq from 'fine-uploader/lib/core';
import { uploader } from '../fineUploader';

let submitDisabled = true;
let requiredFieldCount = 0;

class DynamicForm extends Component {
	
	constructor(props) {
		super(props);
		
		requiredFieldCount = this.updateRequiredFieldCount(this.props.formDTD.standardFields);
		
		this.state = {
			filesAdded: 0
		}
		
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
		
		
		let formGenerator = new DynamicFormGenerator();
		this.renderSection = formGenerator.renderSection.bind(this);
		this.renderField = formGenerator.renderField.bind(this);
	}
	
	updateRequiredFieldCount (section) {
		let newCount = requiredFieldCount;
		
		section.fields.map((field) => {
			if (field.required) {
				newCount ++;
			}
		});
		
		requiredFieldCount = newCount;
	}
	
	isSubmitDisabled() {
		let fieldsTouched = 0;
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		if (dontNeedUserInfo) {
			fieldsTouched = 3;
		}
		let allFields = this.props.form.getFieldsError();
    	for (var fieldName in allFields) {
    		if (this.props.form.isFieldTouched(fieldName)) {
    			fieldsTouched++;
    		}
    	}
    	let fieldsError = this.props.form.getFieldsError();
    	let hasErrors = Object.keys(fieldsError).some(field => fieldsError[field]);
    	
    	if (!hasErrors && fieldsTouched >= requiredFieldCount && this.state.filesAdded > 0) {
    		submitDisabled = false;
    	}
	}
	
    componentDidUpdate() {
    	this.isSubmitDisabled();
    }
	
	render() {
		
		let { getFieldValue } = this.props.form;
		let dynamicFormElements = [];
		let dynamicSections = null;
		if (getFieldValue('packageType') !== undefined) {
			dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(getFieldValue('packageType')) });
			if (dynamicFormElements.length > 0) {
				dynamicFormElements = dynamicFormElements[0][getFieldValue('packageType')];
				dynamicSections = dynamicFormElements.sections.map((section) => {
					this.updateRequiredFieldCount(section);
					return this.renderSection(section, this.props.form, this.props.userInformation);
				})
			}
		}
		
		return (
			<section id="dynamicUploadForm"  className="container justify-content-center">
				<Row className="dropzone">
					<Col md={12}>
						<FileDropzone uploader={uploader} isUploading={this.props.isUploading}/>
					</Col>
				</Row>
				<hr/>
				{this.renderSection(this.props.formDTD.standardFields, this.props.form, this.props.userInformation)}
				{dynamicSections}
				<Row className="submit-button-row">
					<Col md={12}>
						<Button id="submit" disabled={submitDisabled}>Submit</Button>
					</Col>
				</Row>
			</section>
		);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(DynamicForm);

export default WrappedUniversalHeaderForm;