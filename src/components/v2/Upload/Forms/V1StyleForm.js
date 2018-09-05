import React, { Component } from 'react';
import { ControlLabel } from 'react-bootstrap';
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
			<form id="uploadPackageInfoForm">
            <div id="uploadInfo">
                <div>
                		<TextField name="firstName" label="First Name"/>
                </div>
                <div >
                		<TextField name="lastName" label="Last Name"/>
                </div>
                <div >
                		<SelectBox name="institutionName" label="Site Name" options={institutionList.institutions}/>
                </div>
                <div >
                		<SelectBox name="protocol" label="Associated Protocol" options={protocolList.protocols}/>
                	</div>
                <div>
                		<TextField name="subjectId" label="Subject/Sample ID"/>
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

export default V1StyleForm;
