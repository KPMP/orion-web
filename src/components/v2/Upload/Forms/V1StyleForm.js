import React, { Component } from 'react';
import { ControlLabel } from 'react-bootstrap';
import TextField from './TextField';
import DateField from './DateField';
import SelectBox from './SelectBox';
import moment from 'moment';
import protocolList from './protocols';
import institutionList from './institutions';
import { Formik } from 'formik';

//const validate = (values) => {
//	const errors = {};
//	if(!values.firstName) {
//		errors.firstName = '* Required';
//	}
//	if (!values.lastName) {
//		errors.lastName = '* Required';
//	}
//	if(!values.institutionName) {
//		errors.institutionName = '* Required';
//	}
//	if(!values.packageType) {
//		errors.packageType = '* Required';
//	}
//	if (!values.packageTypeOther && values.packageType === "Other") {
//		errors.packageTypeOther = "* Required";
//	}
//	if(values.experimentDate && !moment(values.experimentDate, ['YYYY-MM-DD'], true).isValid()) {
//		errors.experimentDate = "Invalid Date";
//	}
//	if (!values.protocol) {
//		errors.protocol = "* Required";
//	}
//	if (!values.subjectId) {
//		errors.subjectId = "* Required";
//	}
//	return errors;
//}

//const UploadForm = ({
//	values,
//	errors,
//	touched,
//	handleChange,
//	handleBlur,
//	handleSubmit,
//	isSubmitting,
//}) => {
//	<form id="uploadPackageInfoForm">
//	    <div id="uploadInfo">
//	        <div>
//	        		<TextField name="submitterFirstName" label="First Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterFirstName} touched={touched.submitterFirstName} error={errors.submitterFirstName}/>
//	        </div>
//	        <div >
//	        		<TextField name="submitterLastName" label="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterLastName} touched={touched.submitterLastName} error={errors.submitterLastName}/>
//	        </div>
//	        <div >
//	        		<SelectBox name="institutionName" label="Site Name" options={institutionList.institutions}/>
//	        </div>
//	        <div >
//	        		<SelectBox name="protocol" label="Associated Protocol" options={protocolList.protocols}/>
//	        	</div>
//	        <div>
//	        		<TextField name="subjectId" label="Subject/Sample ID" onChange={handleChange} onBlur={handleBlur} value={values.subjectId} touched={touched.subjectId} error={errors.subjectId}/>
//	        </div>
//	        <div>
//	        		<DateField name="exprimentDate" label="Experiment Date (optional)"/>
//			</div>
//			<div>
//				<ControlLabel>Description</ControlLabel>
//				<div>
//					<textarea name="description" type="text" />
//				</div>
//			</div>
//	    </div>
//	</form>
//}
//
//const myForm = withFormik({
//	mapPropsToValues: props => ({ submitterFirstName: '', submitterLastName: '', institutionName: '', protocol: '', subjectId: '',
//		experimentDate: '', description: ''}),
//	validate: (values, props) => {
//		const errors = {};
//		if (!values.submitterFirstName) {
//			errors.submitterFirstName = 'Required';
//		}
//		if (!values.submitterLastName) {
//			errors.submitterLastName = 'Required';
//		}
//		if (!values.institutionName) {
//			errors.institutionName = 'Required';
//		}
//		if (!values.protocol) {
//			errors.protocol = 'Required';
//		}
//		if (!values.subjectId) {
//			errors.subjectId = 'Required';
//		}
//		return errors;
//	},
//	handleSubmit: (
//		values,
//		{
//			props,
//			setSubmitting,
//			setErrors
//		}
//	) => {}
//	
//})(UploadForm);
//
//class V1StyleForm extends Component {
//	
//	render() {
//		return( <UploadForm/>);
//	}
//}

class UploadForm extends Component {
	render() {
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

const V1StyleForm = () => {
		<Formik initialValues={{ submitterFirstName: '', submitterLastName: '', institutionName: '', protocol: '', subjectId: '', 
			description: '', experimentDate: null
		}}
		validate={values => {
			const errors = {};
			if (!values.submitterFirstName) {
				errors.submitterFirstName = 'Required';
			}
			if (!values.submitterLastName) {
				errors.submitterLastName = 'Required';
			}
			if (!values.institutionName) {
				errors.institutionName = 'Required';
			}
			if (!values.protocol) {
				errors.protocol = 'Required';
			}
			if (!values.subjectId) {
				errors.subjectId = 'Required';
			}
			return errors;
		}} component={UploadForm}/>
}

export default V1StyleForm;
