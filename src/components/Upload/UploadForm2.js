import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';
import FileDropzone from './Forms/FileDropzone';
import UploadControl from './UploadControl';
import { validate } from './Forms/v1StyleFormValidator';
import qq from 'fine-uploader/lib/core';
import { uploader } from './fineUploader';
import { Form, Select, Input, DatePicker } from 'antd';
import packageTypeList from '../packageTypes';
import institutionList from '../institutions';
import protocolList from '../protocols';

const Option = Select.Option;
const { TextArea } = Input;

class UploadForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            filesAdded: 0,
            packageType: undefined
        };

		uploader.methods.reset();
        
        uploader.on('submit', () => {
        		let newCount = this.state.filesAdded + 1;
        		this.setState( { filesAdded: newCount } );
        		return true;
        });
        uploader.on('cancel', () => {
        		let newCount = this.state.filesAdded - 1;
        		this.setState( { filesAdded: newCount });
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

    isSubmitDisabled = (values) => {
    		let errors = validate(values);
    		if (this.props.isUploading) {
    			return true;
    		} else if (Object.keys(errors).length === 0 && this.state.filesAdded > 0) {
    			return false;
    		}
    		return true;
    }

	selectPackage = (value) => {
		this.setState({packageType: value});
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
    
	render() {
		
		const { getFieldDecorator } = this.props.form;
		const requiredConfig = {
				rules: [{required: true, message: 'Required'}]
		}
		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item label="Select package type">
						{getFieldDecorator('packageType', requiredConfig)(
							<Select showSearch  placeholder="Select..." onChange={this.selectPackage} name="packageType">
								{packageTypeList.options.map(option => <Option key={option.value}>{option.label}</Option>)}
							</Select>
						)}
					</Form.Item>
					<hr/>
					{ this.state.packageType === undefined && <DefaultUploadForm/> }
					{ this.state.packageType !== undefined && 
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
														<Form.Item label="First Name" required={true}>
															{getFieldDecorator('submitterFirstName', {
																validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]
															})(
																<Input name="submitterFirstName" disabled={submitterFirstNameDisabled} />
															)}
														</Form.Item>
													</Col>
													<Col md="4" className="secondField">
														<Form.Item label="Last Name">
															{getFieldDecorator('submitterLastName', {
																validateTrigger:['onBlur', 'onChange'], rules: [{required: true, message: 'Required', whitespace: true}]
															})(
																<Input name="submitterLastName" disabled={submitterLastNameDisabled} />
															)}
														</Form.Item>
													</Col>
													
						        				</div>
											</Row>
											<Row>
												<Col md="4">
													<Form.Item label="Email">
														{getFieldDecorator('submitterEmail', {
															validateTrigger:['onBlur', 'onChange'], rules: [{required: true, message: 'Required', whitespace: true}]
														})(
																<Input name="submitterEmail" disabled={submitterEmailDisabled} />
														)}
													</Form.Item>
												</Col>
											</Row>
											</div>)
					        		}
					        <Row>
					        		<Col md="4">
					        			<Form.Item label="Institution">
					        				{getFieldDecorator('institution', {
					        					validateTrigger: ['onBlur', 'onChange'], rules: [{required: true, message: "Required" }]
					        				})(
							        			<Select showSearch  placeholder="Select..." onChange={this.selectPackage} name="institution">
													{institutionList.options.map(option => <Option key={option.value}>{option.label}</Option>)}
												</Select>
											)}
					        			</Form.Item>
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
						        		<Form.Item label="Associated Protocol">
					        				{getFieldDecorator('protocol', {
					        					validateTrigger: ['onBlur', 'onChange'], rules: [{required: true, message: "Required" }]
					        				})(
							        			<Select showSearch  placeholder="Select..." onChange={this.selectPackage} name="protocol">
													{protocolList.options.map(option => <Option key={option.value}>{option.label}</Option>)}
												</Select>
											)}
				        				</Form.Item>
					        		</Col>
					        		<Col md="4" className="secondField">
						        		<Form.Item label="Subject/Sample ID">
											{getFieldDecorator('subjectId', {
												validateTrigger:['onBlur', 'onChange'], rules: [{required: true, message: 'Required', whitespace: true}]
											})(
												<Input name="subjectId" />
											)}
										</Form.Item>
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
									<Form.Item label="Description">
										{getFieldDecorator('description', {
											validateTrigger:['onBlur', 'onChange'], rules: [{required: true, message: 'Required', whitespace: true}]
										})(
											<TextArea name="description" rows={4} name="description"/>
										)}
									</Form.Item>
								</Col>
							</Row>
						</div>
							</Row>
							<hr/>
							<Row>
								<Col md={12} className="text-center">
									<Button className="btn-primary uploadFormSubmit" type="submit">
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