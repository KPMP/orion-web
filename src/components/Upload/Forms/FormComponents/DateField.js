import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const requiredFieldDateOptions = { rules: [{required: true, message: 'Required' }] } ;
const optionalFieldDateOptions = { rules: [{required: false}]};

class DateField extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			touched: false
		}
	}
	
	disabledDate(current) {
	  return  current > moment().endOf('day');
	}
	
	openChange = (open) => {
		if (open) {
			this.setState({ opened: true });
		} else if (!open && this.state.opened) {
			this.setState({ touched: true });
		}
	}
	
	focus = () => {
		this.setState({ opened: true, touched: true });
	}
	
	isFieldDisabled = () => {
		if (this.props.isFieldDisabled !== undefined) {
			return this.props.isFieldDisabled(this.props.json, this.props.form);
		} else {
			return this.props.isDisabled;
		}
	}
	
	clearContents = () => {
		let { resetFields } = this.props.form;
		resetFields(this.props.fieldName);
	}

	convertStringValueToMoment = value => {
		return moment(value, 'MM/DD/YYYY')
	}

	convertMomentToStringValue = value => {
		return value.format('MM/DD/YYYY');
	}
	
	render() {
		const dateFormatOptions = { getValueProps: this.convertStringValueToMoment, getValueFromEvent: this.convertMomentToStringValue};
		let { getFieldDecorator, getFieldValue } = this.props.form;
		let fieldOptions = this.props.isRequired ? Object.assign(dateFormatOptions, requiredFieldDateOptions) : Object.assign(dateFormatOptions, optionalFieldDateOptions);
		let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
		let error = false;
		
		if (this.state.opened && this.state.touched && getFieldValue(this.props.fieldName) === undefined) {
			error = true;
		} else {
			error = false;
		}
		
		let isDisabled = this.isFieldDisabled();
		if (isDisabled) {
			this.clearContents();
		}

		return (
			<Form.Item label={this.props.label} validateStatus={error ? 'error' : ''} help={error ? 'Required' : ''} >
				{getFieldDecorator(this.props.fieldName, fieldOptions)(
					<DatePicker disabled={isDisabled} onFocus={this.focus} disabledDate={this.disabledDate} onOpenChange={this.openChange} mode='date' format='MM/DD/YYYY' placeholder={placeholderText} name={this.props.fieldName}/>
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