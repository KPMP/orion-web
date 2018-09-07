import moment from 'moment';

export const validate = (values) => {
	const errors = {};
	if(!values.submitterFirstName) {
		errors.submitterFirstName = 'Required';
	}
	if (!values.submitterLastName) {
		errors.submitterLastName = 'Required';
	}
	if(!values.institutionName) {
		errors.institutionName = 'Required';
	}
	if(!values.packageType) {
		errors.packageType = 'Required';
	}
	if (!values.packageTypeOther && values.packageType === "Other") {
		errors.packageTypeOther = "Required";
	}
	if(values.experimentDate && !moment(values.experimentDate, ['YYYY-MM-DD'], true).isValid()) {
		errors.experimentDate = "Invalid Date";
	}
	if (!values.protocol) {
		errors.protocol = "Required";
	}
	if (!values.subjectId) {
		errors.subjectId = "Required";
	}
	return errors;
}