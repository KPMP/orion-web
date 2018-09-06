import React, { Component } from 'react';
import { Formik } from 'formik';
import TextField from './TextField';
import DateField from './DateField';
import SelectBox from './SelectBox';
import { ControlLabel } from 'react-bootstrap';
import protocolList from './protocols';
import institutionList from './institutions';
import moment from 'moment';

const validate = (values) => {
	const errors = {};
	if(!values.submitterFirstName) {
		errors.submitterFirstName = '* Required';
	}
	if (!values.submitterLastName) {
		errors.submitterLastName = '* Required';
	}
	if(!values.institutionName) {
		errors.institutionName = '* Required';
	}
	if(!values.packageType) {
		errors.packageType = '* Required';
	}
	if (!values.packageTypeOther && values.packageType === "Other") {
		errors.packageTypeOther = "* Required";
	}
	if(values.experimentDate && !moment(values.experimentDate, ['YYYY-MM-DD'], true).isValid()) {
		errors.experimentDate = "Invalid Date";
	}
	if (!values.protocol) {
		errors.protocol = "* Required";
	}
	if (!values.subjectId) {
		errors.subjectId = "* Required";
	}
	return errors;
}

class UploadForm extends Component {
	render() {
		const {
			values, touched, errors, dirty, isSubmitting, handleChange, setFieldValue, handleBlur, handleSubmit, handleReset
		} = this.props;
		return(
			<form id="uploadPackageInfoForm">
			    <div id="uploadInfo">
			        <div>
			        		<TextField name="submitterFirstName" label="First Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterFirstName} touched={touched.submitterFirstName} error={errors.submitterFirstName}/>
			        </div>
			        <div >
			        		<TextField name="submitterLastName" label="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterLastName} touched={touched.submitterLastName} error={errors.submitterLastName}/>
			        </div>
			        <div >
			        		<SelectBox name="institutionName" label="Site Name" options={institutionList.institutions}/>
			        </div>
			        <div >
			        		<SelectBox name="protocol" label="Associated Protocol" options={protocolList.protocols}/>
			        	</div>
			        <div>
			        		<TextField name="subjectId" label="Subject/Sample ID" onChange={handleChange} onBlur={handleBlur} value={values.subjectId} touched={touched.subjectId} error={errors.subjectId}/>
			        </div>
			        <div>
			        		<DateField name="exprimentDate" label="Experiment Date (optional)"/>
					</div>
					<div>
						<ControlLabel>Description</ControlLabel>
						<div>
							<textarea name="description" type="text" />
						</div>
					</div>
				</div>
		    </form>
		);
	}
}

const Form = (props) => {
	

	return (
		<div>
			<Formik component={UploadForm} validate={validate}/>
		</div>
	);
}

export default Form;