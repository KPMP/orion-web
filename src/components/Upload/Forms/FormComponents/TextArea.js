import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from "prop-types";

const { TextArea } = Input;

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

class TextAreaComponent extends Component {
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;
		
		return(
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} className="textArea">
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<TextArea name={this.props.fieldName} rows={3} placeholder={this.props.additionalProps.placeholderText}/>
				)}
			</Form.Item>		
		
		);
	}
}

TextAreaComponent.propTypes = {
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default TextAreaComponent;