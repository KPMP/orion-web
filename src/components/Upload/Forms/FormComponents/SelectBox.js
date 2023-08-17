import React, { Component } from 'react';
import { Form, Select } from 'antd';
import PropTypes from "prop-types";

const Option = Select.Option;

class SelectBox extends Component {

  constructor(){
    this.formRef = React.useRef(null);
  }

  componentDidMount(){
    console.log(this.formRef.current);
  }

	isFieldDisabled = () => {
    ;
		if (this.props.isFieldDisabled !== undefined) {
			return this.props.isFieldDisabled(this.props.json, this.formRef);
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
		let requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true}]};
		let optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};
		let mode = "default";
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;
		let error = this.formRef.current?.isFieldTouched(this.props.fieldName) && formRef.getFieldError(this.props.fieldName);

		if(this.props.isMultiple) {
			fieldOptions.rules[0].type = 'array';
			mode = "multiple";
		}

		let isDisabled = this.isFieldDisabled();
		if (isDisabled) {
			this.clearContents();
		}
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{this.formRef.current?.getFieldDecorator(this.props.fieldName, fieldOptions)(
					<Select
						disabled={isDisabled}
						showSearch mode={mode}
						placeholder="Select..."
						name={this.props.fieldName}
                        getPopupContainer={() => document.getElementById('dynamicUploadForm')}>
						{this.props.options.map(option => <Option key={option.value}>{option.label}</Option>)}
					</Select>
				)}
			</Form.Item>
		);
	}
}

SelectBox.propTypes = {
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    isMultiple: PropTypes.bool.isRequired,
    // form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default SelectBox;