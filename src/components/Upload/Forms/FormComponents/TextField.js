import React, { Component } from 'react';
import { Form, Input } from 'antd';

class TextField extends Component {
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator, getFieldValue } = this.props.form;
		let isDisabled = this.props.isDisabled || false;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
				{getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<Input name={this.props.fieldName} disabled={isDisabled}/>
				)}
			</Form.Item>
		);
		
	}
}

export default TextField;