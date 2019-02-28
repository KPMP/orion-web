import React, { Component } from 'react';
import SelectBox from './FormComponents/SelectBox';
import TextField from './FormComponents/TextField';
import { Form, Input, DatePicker, Button } from 'antd';
import FileDropzone from './FileDropzone';
import { Row, Col } from 'react-bootstrap';	
import packageTypeList from '../../packageTypes';
import institutionList from '../../institutions';
import protocolList from '../../protocols';
import NoFormSelected from './NoFormSelected';


const { TextArea } = Input;

class DefaultForm extends Component {

	render() {
		let { uploader, submitDisabled, isUploading, userInformation, form } = this.props;
		const { getFieldDecorator, getFieldValue, getFieldError, isFieldTouched } = form;
		
		let submitterFirstNameDisabled = userInformation.firstName !== "";
		let submitterLastNameDisabled = userInformation.lastName !== "";
		let submitterEmailDisabled = userInformation.email !== "";
		
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		
		let descriptionError = isFieldTouched('description') && getFieldError('description');
		let packageTypeOtherError = isFieldTouched('packageTypeOther') && getFieldError('packageTypeOther');
		
		const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
		return(
			<Form >
				<Row>
					<Col md={3}>
						<SelectBox label="Select a package type" fieldName='packageType' options={packageTypeList.options} fieldOptions={requiredFieldOptions} form={this.props.form}/>
					</Col>
					{getFieldValue('packageType') === 'Other' &&
						<Col md={3} className="secondField">
							<TextField label="Package Type Other (specify)" fieldName="packageTypeOther" fieldOptions={requiredFieldOptions} getFieldDecorator={getFieldDecorator} error={packageTypeOtherError}/>
						</Col>	
					}
				</Row>
				<hr/>
				{ getFieldValue('packageType') === undefined && <NoFormSelected/> }
				{ getFieldValue('packageType') !== undefined &&  
				
				
				<div id="uploadForm">
					<Row className="dropzone">
						<Col md={12}>
							<FileDropzone uploader={uploader} isUploading={isUploading}/>
						</Col>
					</Row>
					<Row>
					<div id="uploadInfo">
						<div className="header">
							Submitted by
						</div>
						{(dontNeedUserInfo) ?
							(	<Row>
									<Col md={8}>{userInformation.firstName} {userInformation.lastName} ({userInformation.email}) </Col>
								</Row> ) :
				    		( <div>
								<Row>
									<div>
										<Col md={4}>
											<TextField label="First Name" fieldName="submitterFirstName" fieldOptions={requiredFieldOptions} isDisabled={submitterLastNameDisabled} form={this.props.form}/>
										</Col>
										<Col md={4} className="secondField">
											<TextField label="Last Name" fieldName="submitterLastName" fieldOptions={requiredFieldOptions} isDisabled={submitterLastNameDisabled} form={this.props.form}/>
										</Col>
										
				    				</div>
								</Row>
								<Row>
									<Col md={4}>
										<TextField label="Email" fieldName="submitterEmail" fieldOptions={requiredFieldOptions} form={this.props.form}/>
									</Col>
								</Row>
								</div>)
						}
						<Row>
							<Col md={4}>
								<SelectBox label="Institution" fieldName='institution' options={institutionList.options} fieldOptions={requiredFieldOptions} form={this.props.form}/>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
					        	<div className="header" id="packageInformationSection">
					        		Package Information
					        	</div>
					    	</Col>
						</Row>
						<Row >
							<Col md={4}>
								<SelectBox label="Associated Protocol" fieldName='protocol' options={protocolList.options} fieldOptions={requiredFieldOptions} form={this.props.form}/>
							</Col>
							<Col md={4} className="secondField">
								<TextField label="Subject/Sample ID" fieldName="subjectId" fieldOptions={requiredFieldOptions} form={this.props.form}/>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<Form.Item label="Experiment Date">
								{getFieldDecorator('experimentDate', {rules: [{required: false}]})(
									<DatePicker format={'MM/DD/YYYY'} placeholder='mm/dd/yyyy' name='experimentDate'/>
								)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col md={8}>
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
				
		);
		
	}
	
}

const WrappedUploadForm = Form.create({ name: 'upload', validateMessage: "Required" })(DefaultForm);
	
export default WrappedUploadForm;


