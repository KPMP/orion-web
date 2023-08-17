import React, { Component } from 'react';
import { Form, Button, Layout } from 'antd';
import { DynamicFormGenerator } from './DynamicFormGenerator';
import { Row, Col } from 'reactstrap';
import LargeFileModal from '../../Packages/LargeFileModal';
import { Link, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';



class DynamicForm extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			filesAdded: 0,
			submitClicked: false,
			largeFilesChecked: true,
		};

		this.handleLargeFilesToggle = this.handleLargeFilesToggle.bind(this);
		this.handleLargeFilesClick= this.handleLargeFilesClick.bind(this);
		
		let formGenerator = new DynamicFormGenerator();
		this.renderSection = formGenerator.renderSection.bind(this);
		this.renderField = formGenerator.renderField.bind(this);
		this.isFieldDisabled = formGenerator.isFieldDisabled.bind(this);
	}

	handleLargeFilesToggle(checked) {
		this.setState({ largeFilesChecked: checked });
	}

	handleLargeFilesClick() {
		let show = !this.state.showLargeFile;
		this.setState({ showLargeFile: show });
		this.props.clearShowLargeFileModal();
	}

	componentDidMount() {
		if(!this.isRemoteDataLoaded()) {
			this.props.loadRemoteData();
		}
	}

	isRemoteDataLoaded() {
		return Object.keys(this.props.formDTD).length !== 0
			&& this.props.formDTD.constructor === Object;
	}
	
	handleSubmit = (e) => {
    const formRef = React.useRef(null)
		this.setState({submitClicked: true});
		// let { validateFields } = this.props.form;
		formRef.current?.validateFields((err, values) => {
			let newValues = JSON.parse(JSON.stringify(values).replace(/"\s+|\s+"/g,'"'));
			if (!this.needUserInfo()) {
				newValues.submitterFirstName = this.props.userInformation.firstName;
				newValues.submitterLastName = this.props.userInformation.lastName;
				newValues.submitterEmail = this.props.userInformation.email;
			}
			newValues.version = this.props.formDTD.version;
			newValues.datasetInformationVersion = this.props.formDTD.standardFields.version;
			newValues.packageTypeMetadataVersion = this.determinePackageTypeMetadataVersion();
            newValues.largeFilesChecked = this.state.largeFilesChecked;
            if(!err) {
				this.props.postPackageInformation(newValues);
			} else {
				console.log("Received err: ", err);
				throw new Error("Unable to submit form: ", err);
			}
		});
	}
	
	determinePackageTypeMetadataVersion= () => {
    const formRef = React.useRef(null)
		// let { getFieldValue } = this.props.form; 
		let dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(formRef.current?.getFieldValue('packageType')) });
		if (dynamicFormElements.length > 0) {
			dynamicFormElements = dynamicFormElements[0][formRef.current?.getFieldValue('packageType')];
			return dynamicFormElements.version;
		}
		return undefined;
	}
	
	needUserInfo() {
		let submitterFirstBlank = this.props.userInformation.firstName === "";
		let submitterLastNameBlank = this.props.userInformation.lastName === "";
		let submitterEmailBlank = this.props.userInformation.email === "";
		return submitterFirstBlank && submitterLastNameBlank && submitterEmailBlank;
	}
	
	isFormValid(section, form) {
		// let { getFieldError, getFieldValue } = form;
		let formValid = true;

		if (this.needUserInfo() && (form.current.getFieldValue('submitterFirstName') === undefined 
				|| form.current.getFieldValue('submitterLastName') === undefined 
				|| form.current.getFieldValue('submitterEmail') === undefined)) {
			
			return false;
		}
		
		let fields = section.fields;
		for (let i =0; i< fields.length; i++) {
			let field = fields[i];
			let fieldName = field.fieldName;
			if ( field.type !== 'Submitter Information' ) {
				if ( field.required && !this.isFieldDisabled(field, form)) {
				const fieldValue = form.getFieldValue(fieldName);
					if(getFieldError(fieldName) !== undefined){
						return false;
					}
					if(fieldValue === undefined || fieldValue.length === 0){
						return false;
					}
				}
			}
		}
			
		return formValid;
	}
	
	isSubmitDisabled() {
    const formRef = React.useRef(null);
		let validForm = this.isFormValid(this.props.formDTD.standardFields, formRef);

		if (formRef.current?.getFieldValue('packageType') !== undefined) {
			let dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(
				function(element) {
					return element.hasOwnProperty(getFieldValue('packageType'))
				});

			if (dynamicFormElements.length > 0) {
				dynamicFormElements = dynamicFormElements[0][formRef.current?.getFieldValue('packageType')];
				let sections = dynamicFormElements.sections;
				for (let i =0; i< sections.length; i++) {
					if (!this.isFormValid(sections[i], formRef)) {
						validForm = false;
						break;
					}
				}
			}
		}

		return !(!this.state.submitClicked && validForm && (this.state.filesAdded > 0 || this.state.largeFilesChecked));
	}
	
	render() {
    // const formRef = React.useRef(null);

		if(!this.isRemoteDataLoaded()) {
			return (
				<h4 className="text-center pt-3">
					Loading upload form...
				</h4>
			);
		}
    let dynamicFormElements = [];
		let dynamicSections = null;
    ({ getFieldValue }) =>
          getFieldValue('packageType') !== undefined ? (
            dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(getFieldValue('packageType')) })
          )
           : dynamicFormElements.length > 0 ? (
              dynamicFormElements = dynamicFormElements[0][getFieldValue('packageType')], 
              dynamicSections = dynamicFormElements.sections.map((section) => {
                return this.renderSection(section, formRef, this.props.userInformation);
              })
           ): null
		// let { getFieldValue } = this.props.form;
		let dropzoneHidden = this.state.largeFilesChecked?" hidden":"";
		return (
			<React.Fragment>
				<Prompt
					when={true}
					message={'Your data will be lost.  Press OK to continue or Cancel to stay.'}
				/>
				<article id="largeFileSupport" className="upload-form-section container justify-content-center pt-4">
					<section>
						<h4>STEP 1: Do you have the most recent metadata template?</h4>
						<p>It is important that you submit the metadata for your experiment using the most recent <a href='https://www.kpmp.org/metadata' target='_blank'>metadata template</a>.</p>
					</section>
				</article>
				<article id="dynamicUploadForm" className="upload-form-section container justify-content-center pt-4">
					<h4>STEP 2: Provide the dataset information</h4>
          <Form
            {...Layout} form={formRef}>
              {this.renderSection(this.props.formDTD.standardFields, formRef, this.props.userInformation)}
					    {dynamicSections}
          </Form>
					
					{<h4>STEP 3: Click upload and add your files with the upload instructions that follow</h4>}
					<Row className="fixed-bottom pt-4" id="form-footer">
						<div className="container justify-content-center">
							<Row className="text-center">
								<Col md={12}>
									<Link to="/">
										<Button id="cancel" className="mr-3">Cancel</Button>
									</Link>
									<Button id="submit" disabled={this.isSubmitDisabled()} type="primary" onClick={this.handleSubmit}>Upload</Button>
								</Col>
							</Row>
						</div>
					</Row>
					
				</article>
				<LargeFileModal show={this.props.codicil} close={this.handleLargeFilesClick} link={this.props.codicil}/>
			</React.Fragment>
		);
	}
}

DynamicForm.propTypes = {
	loadRemoteData: PropTypes.func.isRequired,
	formDTD: PropTypes.object,
	isUploading: PropTypes.bool.isRequired,
	form: PropTypes.object.isRequired,
	userInformation: PropTypes.any,
}


export default DynamicForm;