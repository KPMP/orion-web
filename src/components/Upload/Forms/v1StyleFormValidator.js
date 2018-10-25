import moment from 'moment';

export const validate = (values) => {
	const errors = {};

	setError(values.submitter.id, errors, validateNotEmpty, 'submitterId');
	setError(values.institution, errors, validateNotEmpty, 'institution');
	setError(values.packageType, errors, validateNotEmpty, 'packageType');
	setError(values.protocol, errors, validateNotEmpty, 'protocol');
	setError(values.subjectId, errors, validateNotEmpty, 'subjectId');
	setError(values.experimentDate, errors, validateDate, 'experimentDate');
	setError(values.description, errors, validateNotEmpty, 'description');

	if (!values.packageTypeOther && values.packageType === "Other") {
		errors.packageTypeOther = "Required";
	}
	return errors;
}

export const setError = (fieldValue, errors, validation, fieldKey) => {
	let error = validation(fieldValue);
	if (error !== undefined) {
		errors[fieldKey] = error;
	}
}

export const validateNotEmpty = (value) => {
	let error;
	if (!value) {
		error = "Required";
	}
	return error;
}

export const validateDate = (date) => {
	let error;
	if (date && !moment(date, ['YYYY-MM-DD'], true).isValid()) {
		error = "Invalid Date";
	}
	return error;
}