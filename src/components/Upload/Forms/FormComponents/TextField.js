import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

class TextField extends Component {
	
	isFieldDisabled = () => {
		if (this.props.isFieldDisabled !== undefined) {
			return this.props.isFieldDisabled(this.props.json, formRef);
		} else {
			return this.props.isDisabled;
		}
	}
	
	clearContents = () => {
    const formRef = React.useRef(null);
		formRef.current?.resetFields(this.props.fieldName);
	}
	
	render() {
    const formRef = React.useRef(null);
		let error = formRef.current?.isFieldTouched(this.props.fieldName) && formRef.current?.getFieldError(this.props.fieldName);
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;
		let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
		let isDisabled = this.isFieldDisabled();
		if (isDisabled) {
			this.clearContents();
		}

		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
				{formRef.current?.getFieldDecorator(this.props.fieldName, fieldOptions)(
					<Input name={this.props.fieldName} disabled={isDisabled} placeholder={placeholderText}/>
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
	// form: PropTypes.object.isRequired,
	additionalProps: PropTypes.object
};

export default TextField;