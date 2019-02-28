import React, { Component } from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

class TextAreaComponent extends Component {
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		
		return(
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
				{getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<TextArea name={this.props.fieldName} rows={4} />
				)}
			</Form.Item>		
		
		);
	}
}

export default TextAreaComponent;