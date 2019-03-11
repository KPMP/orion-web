import React, { Component } from 'react';
import { Form, Select } from 'antd';
import PropTypes from "prop-types";

const Option = Select.Option;


class SelectBox extends Component {
	
	render() {
		let requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required'}]};
		let optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};
		let { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
		let mode = "default";
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);

		if(this.props.isMultiple) {
			fieldOptions.rules[0].type = 'array';
			mode = "multiple";
		}

		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<Select showSearch mode={mode} placeholder="Select..." name={this.props.fieldName}>
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
    form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default SelectBox;