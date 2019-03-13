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
	}
	
	isFormValid(section, form) {
		let { getFieldError, isFieldTouched, getFieldValue } = form;
		let formValid = true;
		if (getFieldError('submitterFirstName') === undefined && getFieldValue('submitterFirstName') !== undefined
				&& getFieldError('submitterLastName') === undefined && getFieldValue('submitterLastName') !== undefined
				&& getFieldError('submitterEmail') === undefined && getFieldValue('submitterEmail') !== undefined) {
			
			section.fields.map((field) => {
				let fieldName = field.fieldName;
				if ( field.type !== 'Submitter Information' ) {
					if ( field.required && isFieldTouched(fieldName) ) {
						if (getFieldError(fieldName) !== undefined) {
							formValid = false;
						}
					} else if ( field.required && !isFieldTouched(fieldName)) {
						if ((fieldName === 'packageTypeOther' && getFieldValue('packageType') === 'Other') || fieldName !== 'packageTypeOther' ) {
							formValid = false;
						}
					}
				}
				// this is here because the map needs a return value...we throw this away
				return false;
			});
		} else {
			formValid = false;
		}
		return formValid;
	}
	
	isSubmitDisabled() {
		let validForm = this.isFormValid(this.props.formDTD.standardFields, this.props.form)
		let { getFieldValue } = this.props.form;
		if (getFieldValue('packageType') !== undefined) {
			let dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(getFieldValue('packageType')) });
			if (dynamicFormElements.length > 0) {
				dynamicFormElements = dynamicFormElements[0][getFieldValue('packageType')];
				dynamicFormElements.sections.map((section) => {
					validForm = this.isFormValid(section, this.props.form);
					return true;
				});
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
		                        <Button id="cancel" className="mr-3" disabled={this.isSubmitDisabled()}>Cancel</Button>
		                        <Button id="submit" type="primary">Upload</Button>
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