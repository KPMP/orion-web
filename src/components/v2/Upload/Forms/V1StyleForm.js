import React, { Component } from 'react';
import { ControlLabel } from 'react-bootstrap';
import { Form, Field, reduxForm } from 'redux-form';
import TextField from './TextField';
import DateField from './DateField';
import SelectBox from './SelectBox';
import moment from 'moment';
import protocolList from './protocols';
import institutionList from './institutions';

const validate = (values) => {
	const errors = {};
	if(!values.firstName) {
		errors.firstName = '* Required';
	}
	if (!values.lastName) {
		errors.lastName = '* Required';
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

class V1StyleForm extends Component {
	
	render() {
		
		return(
			<Form name="uploadPackageInfoForm" id="uploadPackageInfoForm">
            <div id="uploadInfo">
                <div className="form-group">
                    <Field name="firstName" component={TextField} label="First Name" type="text"/>
                </div>
                <div className="form-group">
                    <Field name="lastName" component={TextField} label="Last Name" type="text" />
                </div>
                <div className="form-group">
                    <Field name="institutionName" label="Site Name" className="form-control" component={SelectBox} options={institutionList.institutions} />
                </div>
                <div className="form-group">
                		<Field name="protocol" className="form-control" label="Associated Protocol" component={SelectBox} options={protocolList.protocols} />
                	</div>
                <div className="form-group">
                    <Field name="subjectId" component={TextField} label="Subject/Sample ID" type="text" />
                </div>
                <div className="form-group">
					<Field name="experimentDate" component={DateField} label="Experiment Date (optional)" type="text" />
				</div>
				<div className="form-group">
					<ControlLabel>Description</ControlLabel>
					<div>
						<Field name="description" component="textarea" type="text"/>
					</div>
				</div>
            </div>
        </Form>
				
		);
	}
}

export default reduxForm({
    form: 'uploadPackageInfoForm',
    validate,
    touchOnBlur: true,
    touchOnChange: true
})(V1StyleForm);
