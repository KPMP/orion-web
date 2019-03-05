import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class DateField extends Component {
	
	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
	}
	
	change(date, dateString) {
		let fieldName = this.props.fieldName
		this.props.form.setFieldsValue({ fieldName: date });
		console.log(this.props.form.getFieldValue(fieldName));
	}
	
	render() {
		let { isFieldTouched, getFieldError, getFieldDecorator, getFieldValue } = this.props.form;
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		
//		console.log(this.props.fieldName, getFieldValue(this.props.fieldName));
//		console.log(this.props.fieldName, getFieldError(this.props.fieldName));
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<DatePicker mode='date' onChange={this.change} format={'MM/DD/YYYY'} placeholder={'MM/DD/YYYY'} name={this.props.fieldName}/>
				)}
			</Form.Item>		
		);
	}
	
}

export default DateField;