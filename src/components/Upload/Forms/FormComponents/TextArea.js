import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from "prop-types";

const { TextArea } = Input;

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

class TextAreaComponent extends Component {

  constructor(){
    this.formRef = React.createRef(null);
  }
	
	isFieldDisabled = () => {
		if (this.props.isFieldDisabled !== undefined) {
			return this.props.isFieldDisabled(this.props.json, formRef);
		} else {
			return this.props.isDisabled;
		}
	}
	
	clearContents = () => {
    ;
		this.formRef.current?.resetFields(this.props.fieldName);
	}
	
	render() {
    ;
		let error = this.formRef.current?.isFieldTouched(this.props.fieldName) && this.formRef.current?.getFieldError(this.props.fieldName);
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;
		let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
		let isDisabled = this.isFieldDisabled();
		if (isDisabled) {
			this.clearContents();
		}
		
		return(
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} className="textArea">
				{this.formRef.current?.getFieldDecorator(this.props.fieldName, fieldOptions)(
					<TextArea disabled={isDisabled} name={this.props.fieldName} rows={3} placeholder={placeholderText}/>
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
    // form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default TextAreaComponent;