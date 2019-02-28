import React, { Component } from 'react';
import { Form, Select } from 'antd';

const Option = Select.Option;

class SelectBox extends Component {
	
	render() {
		let { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		let mode = this.props.isMultiple ? "multiple" : "default";
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

export default SelectBox;