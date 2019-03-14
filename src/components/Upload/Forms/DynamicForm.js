import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { DynamicFormGenerator } from './DynamicFormGenerator';
import { Row, Col } from 'reactstrap';
import FileDropzone from './FileDropzone';
import qq from 'fine-uploader/lib/core';
import { uploader } from '../fineUploader';

class DynamicForm extends Component {
	
	constructor(props) {
		super(props);

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
		this.isFieldDisabled = formGenerator.isFieldDisabled.bind(this);
	}
	
	handleSubmit = (e) => {
		let { validateFields } = this.props.form; 
		validateFields((err, values) => {
			let newValues = values;
			if (!this.needUserInfo()) {
				newValues.submitterFirstName = this.props.userInformation.firstName;
				newValues.submitterLastName = this.props.userInformation.lastName;
				newValues.submitterEmail = this.props.userInformation.email;
			}
			if(!err) {
				this.props.postPackageInformation(newValues, uploader);
			} else {
				console.log("Received err: ", err);
			}
		});
	}
	
	needUserInfo() {
		let submitterFirstBlank = this.props.userInformation.firstName === "";
		let submitterLastNameBlank = this.props.userInformation.lastName === "";
		let submitterEmailBlank = this.props.userInformation.email === "";
		return submitterFirstBlank && submitterLastNameBlank && submitterEmailBlank;
	}
	
	isFormValid(section, form) {
		let { getFieldError, getFieldValue } = form;
		let formValid = true;
		
		if (this.needUserInfo() && (getFieldValue('submitterFirstName') === undefined 
				|| getFieldValue('submitterLastName') === undefined 
				|| getFieldValue('submitterEmail') === undefined)) {
			
			return false;
		} 
		
		let fields = section.fields;
		for (let i =0; i< fields.length; i++) {
			let field = fields[i];
			let fieldName = field.fieldName;
			if ( field.type !== 'Submitter Information' ) {
				if ( field.required && !this.isFieldDisabled(field, form) 
						&& ( getFieldError(fieldName) !== undefined || getFieldValue(fieldName) === undefined )) {
					return false;
				}
			}
		}
			
		return formValid;
	}
	
	isSubmitDisabled() {
		let validForm = this.isFormValid(this.props.formDTD.standardFields, this.props.form);
		let { getFieldValue } = this.props.form;
		if (getFieldValue('packageType') !== undefined) {
			let dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(getFieldValue('packageType')) });
			if (dynamicFormElements.length > 0) {
				dynamicFormElements = dynamicFormElements[0][getFieldValue('packageType')];
				let sections = dynamicFormElements.sections;
				for (let i =0; i< sections.length; i++) {
					if (!this.isFormValid(sections[i], this.props.form)) {
						validForm = false;
						break;
					}
				}
			}
		}
		
    	if (validForm && this.state.filesAdded > 0) {
    		return false;
    	}
    	return true;
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
					return this.renderSection(section, this.props.form, this.props.userInformation);
				})
			}
		}
		
		return (
			<section id="dynamicUploadForm" className="container justify-content-center pt-4">
				{this.renderSection(this.props.formDTD.standardFields, this.props.form, this.props.userInformation)}
				{dynamicSections}
                <Row className="dropzone btn-sm">
                    <Col md={12}>
                        <FileDropzone uploader={uploader} isUploading={this.props.isUploading}/>
                    </Col>
                </Row>
        		<Row className="fixed-bottom pt-4" id="form-footer">
        			<div className="container justify-content-center">
	        			<Row className="text-center">
		                    <Col md={12}>
		                        <Button id="cancel" className="mr-3">Cancel</Button>
		                        <Button id="submit" disabled={this.isSubmitDisabled()} type="primary" onClick={this.handleSubmit}>Upload</Button>
		                    </Col>
	                    </Row>
                    </div>
                </Row>
			</section>
		);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(DynamicForm);

export default WrappedUniversalHeaderForm;