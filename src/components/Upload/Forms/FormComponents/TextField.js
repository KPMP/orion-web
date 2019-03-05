import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

class TextField extends Component {
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
		let isDisabled = this.props.isDisabled || false;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<Input name={this.props.fieldName} disabled={isDisabled}/>
				)}
			</Form.Item>
		);
		
	}
}

TextField.propTypes = {
	fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
	isRequired: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool,
	form: PropTypes.object.isRequired
};

export default TextField;