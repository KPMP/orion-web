import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const requiredFieldDateOptions = {rules: [{required: true, message: 'Required', type:'object' }]};
const optionalFieldDateOptions = {rules: [{required: false, type:'object'}]};

class DateField extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			touched: false
		}
	}
	
	disabledDate(current) {
	  return  current > moment().endOf('day');
	}
	
	openChange = (open) => {
		if (open) {
			this.setState({ touched: true });
		}
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log("all good")
			} else {
				console.log("Received err: ", err);
			}
		});
		
	}
	
	render() {
		let { getFieldDecorator, getFieldValue, setFields, isFieldTouched, getFieldError } = this.props.form;
		let fieldOptions = this.props.isRequired ? requiredFieldDateOptions : optionalFieldDateOptions;
		let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
		let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
		
//		let error = false;
//		let value = getFieldValue(this.props.fieldName);
//		if (value === undefined && this.state.touched) {
//			error = true;
//		} else {
//			error = false;
//		}
//		onOpenChange={this.openChange} 
		
		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} >
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<DatePicker disabledDate={this.disabledDate} mode='date' format={'MM/DD/YYYY'} placeholder={placeholderText} name={this.props.fieldName}/>
				)}
			</Form.Item>		
		);
	}
	
}

DateField.propTypes = {
    fieldName: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default DateField;