import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import PropTypes from "prop-types";

const requiredFieldDateOptions = {validateTrigger: [ 'onChange' ], rules: [{required: true, message: 'Required' }]};
const optionalFieldDateOptions = {validateTrigger: [ 'onChange' ], rules: [{required: false}]};

class DateField extends Component {
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		let fieldOptions = this.props.isRequired ? requiredFieldDateOptions : optionalFieldDateOptions;

		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<DatePicker mode='date' format={'MM/DD/YYYY'} placeholder={'MM/DD/YYYY'} name={this.props.fieldName}/>
				)}
			</Form.Item>		
		);
	}
	
}

DateField.propTypes = {
    fieldName: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    form: PropTypes.object.isRequired
};

export default DateField;