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
    this.formRef = React.createRef(null);
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
			return this.props.isFieldDisabled(this.props.json, formRef);
		} else {
			return this.props.isDisabled;
		}
	}
	
	clearContents = () => {
    ;
		this.formRef.current?.resetFields(this.props.fieldName);
	}

	convertStringValueToMoment = value => {
		return moment(value, 'YYYY-MM-DD')
	}

	convertMomentToStringValue = value => {
		return value.format('YYYY-MM-DD');
	}
	
	render() {
    ;
		const dateFormatOptions = { getValueProps: this.convertStringValueToMoment, getValueFromEvent: this.convertMomentToStringValue};
		let fieldOptions = this.props.isRequired ? Object.assign(dateFormatOptions, requiredFieldDateOptions) : Object.assign(dateFormatOptions, optionalFieldDateOptions);
		let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
		let error = false;
		
		if (this.state.opened && this.state.touched && this.formRef.current?.getFieldValue(this.props.fieldName) === undefined) {
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
				{this.formRef.current?.getFieldDecorator(this.props.fieldName, fieldOptions)(
					<DatePicker disabled={isDisabled} onFocus={this.focus} disabledDate={this.disabledDate} onOpenChange={this.openChange} mode='date' format='YYYY-MM-DD' placeholder={placeholderText} name={this.props.fieldName}/>
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
    // form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default DateField;