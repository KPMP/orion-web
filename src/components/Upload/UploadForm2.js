import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import FileDropzone from './Forms/FileDropzone';
import qq from 'fine-uploader/lib/core';
import { uploader } from './fineUploader';
import { Form, Input, DatePicker, Button } from 'antd';
import packageTypeList from '../packageTypes';
import institutionList from '../institutions';
import protocolList from '../protocols';
import SelectBox from './SelectBox';
import TextField from './TextField';

const { TextArea } = Input;
let submitDisabled = true;
let requiredFields = ['packageType', 'submitterFirstName', 'submitterLastName', 'submitterEmail', 'institution', 'protocol', 'subjectId', 'description'];

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
		this.props.form.validateFields((err, values) => {
			if(!err) {
				this.props.postPackageInformation(values, uploader);
			} else {
				console.log("Received err: ", err);
			}
		})
	}
    
	isSubmitDisabled = () => {
		let fieldsTouched = 0;
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
		
		const { getFieldDecorator, getFieldValue, getFieldError, isFieldTouched } = this.props.form;
		const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
		
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		
		let packageTypeError = isFieldTouched('packageType') && getFieldError('packageType');
		let submitterFirstNameError = isFieldTouched('submitterFirstName') && getFieldError('submitterFirstName');
		let submitterLastNameError = isFieldTouched('submitterLastName') && getFieldError('submitterLastName');
		let submitterEmailError = isFieldTouched('submitterEmailName') && getFieldError('submitterEmailName');
		let institutionError = isFieldTouched('institution') && getFieldError('institution');
		let protocolError = isFieldTouched('protocol') && getFieldError('protocol');
		let subjectIdError = isFieldTouched('subjectId') && getFieldError('subjectId');
		let descriptionError = isFieldTouched('description') && getFieldError('description');
		
		return (
			<div>
				<Form >
					<SelectBox label="Select a package type" fieldName='packageType' options={packageTypeList.options} fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} error={packageTypeError}/>
					<hr/>
					{ getFieldValue('packageType') === undefined && <DefaultUploadForm/> }
					{ getFieldValue('packageType') !== undefined && 
						<div id="uploadForm">
							<Row className="dropzone">
								<Col md={12}>
									<FileDropzone uploader={uploader} isUploading={this.props.isUploading}/>
								</Col>
							</Row>
							<Row>
							 <div id="uploadInfo">
					    		<div className="header">
					    			Submitted by
					    		</div>
					        		{(dontNeedUserInfo) ?
					        			(	<Row>
												<Col md="8">{this.props.userInformation.firstName} {this.props.userInformation.lastName} ({this.props.userInformation.email}) </Col>
											</Row> ) :
						        		( <div>
											<Row>
												<div>
													<Col md="4">
														<TextField label="First Name" fieldName="submitterFirstName" fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} isDisabled={submitterLastNameDisabled} error={submitterFirstNameError}/>
													</Col>
													<Col md="4" className="secondField">
														<TextField label="Last Name" fieldName="submitterLastName" fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} isDisabled={submitterLastNameDisabled} error={submitterLastNameError}/>
													</Col>
													
						        				</div>
											</Row>
											<Row>
												<Col md="4">
													<TextField label="Email" fieldName="submitterEmail" fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} error={submitterEmailError}/>
												</Col>
											</Row>
											</div>)
					        		}
					        <Row>
					        		<Col md="4">
					        			<SelectBox label="Institution" fieldName='institution' options={institutionList.options} fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} error={institutionError}/>
					        		</Col>
					        	</Row>
					        	<Row>
					        		<Col md="12">
							        	<div className="header" id="packageInformationSection">
							        		Package Information
							        	</div>
						        	</Col>
					        	</Row>
					        <Row >
					        		<Col md="4">
					        			<SelectBox label="Associated Protocol" fieldName='protocol' options={protocolList.options} fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} error={protocolError}/>
					        		</Col>
					        		<Col md="4" className="secondField">
					        			<TextField label="Subject/Sample ID" fieldName="subjectId" fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} error={subjectIdError}/>
					        		</Col>
					        	</Row>
					        <Row>
					        		<Col md="4">
					        			<Form.Item label="Experiment Date">
					        			{getFieldDecorator('experimentDate', {rules: [{required: false}]})(
					        				<DatePicker format={'MM/DD/YYYY'} placeholder='mm/dd/yyyy' name='experimentDate'/>
					        			)}
					        			</Form.Item>
					        		</Col>
					        	</Row>
							<Row>
								<Col md="8">
									<Form.Item label="Description"  validateStatus={descriptionError ? 'error' : ''}>
										{getFieldDecorator('description', {
											validateTrigger:['onBlur', 'onChange'], rules: [{required: true, message: 'Required', whitespace: true}]
										})(
											<TextArea name="description" rows={4} />
										)}
									</Form.Item>
								</Col>
							</Row>
						</div>
							</Row>
							<hr/>
							<Row>
								<Col md={12} className="text-center">
									<Button className="uploadFormSubmit" htmlType="submit" type="primary" onClick={this.handleSubmit} disabled={submitDisabled}>
										Submit
									</Button>
								</Col>
							</Row>
						</div>
					}
				</Form>
			</div>
		);
	}
}

const WrappedUploadForm = Form.create({ name: 'upload', validateMessage: "Required" })(UploadForm);

export default WrappedUploadForm;