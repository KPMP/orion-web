import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class DateField extends Component {
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<DatePicker format={'MM/DD/YYYY'} placeholder={this.props.additionalProps.placeholderText} name={this.props.fieldName}/>
				)}
			</Form.Item>		
		);
	}
	
}

export default DateField;