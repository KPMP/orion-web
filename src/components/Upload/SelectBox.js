import React, { Component } from 'react';
import { Form, Select } from 'antd';

const Option = Select.Option;

class SelectBox extends Component {
	
	render() {
		return (
			<Form.Item label={this.props.label} validateStatus={this.props.error ? 'error' : ''}>
			{this.props.getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<Select showSearch  placeholder="Select..." name={this.props.fieldName}>
					{this.props.options.map(option => <Option key={option.value}>{option.label}</Option>)}
					</Select>
			)}
			</Form.Item>
		);
	}
	
}

export default SelectBox;