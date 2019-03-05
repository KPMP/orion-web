import React, { Component } from 'react';
import { Form, Select } from 'antd';
import PropTypes from "prop-types";

const Option = Select.Option;

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

class SelectBox extends Component {
	
	render() {
		let { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		let mode = this.props.isMultiple ? "multiple" : "default";
		let fieldOptions = this.props.isRequired ? requiredFieldOptions : optionalFieldOptions;

		if(this.props.isMultiple) {
			fieldOptions = Object.assign({}, fieldOptions);
			fieldOptions.rules[0].type = 'array';
            console.log('+++ Is multiple!  field: ', this.props.fieldName, '+++ options: ', fieldOptions);
		}

		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
			{getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<Select mode={mode} showSearch placeholder="Select..." name={this.props.fieldName}>
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
    form: PropTypes.object.isRequired
};

export default SelectBox;