import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const requiredFieldNumericOptions = {validateTrigger: [ 'onChange', 'onBlur' ], rules: [{required: true, message: 'Required'}]};
const optionalFieldNumericOptions = {validateTrigger: [ 'onChange', 'onBlur' ], rules: [{required: false}]};
const formRef = React.useRef(null);
class NumericField extends Component {

	isFieldDisabled = () => {
		if (this.props.isFieldDisabled !== undefined) {
			return this.props.isFieldDisabled(this.props.json, formRef);
		} else {
			return this.props.isDisabled;
		}
	}
	
	clearContents = () => {
		formRef.current.resetFields(this.props.fieldName);
	}
	
    render() {
        let error = formRef.current.isFieldTouched(this.props.fieldName) && formRef.current.getFieldError(this.props.fieldName);
        let fieldOptions = this.props.isRequired ? requiredFieldNumericOptions : optionalFieldNumericOptions;
        let isDisabled = this.isFieldDisabled();
        if (isDisabled) {
        	this.clearContents();
        }
        let placeholderText = undefined;
		if (this.props.additionalProps !== undefined) {
			placeholderText = this.props.additionalProps.placeholderText;
		}
        
        return (
            <Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
                {formRef.current.getFieldDecorator(this.props.fieldName, fieldOptions)(
                    <Input type="number" name={this.props.fieldName} placeholder={placeholderText} disabled={isDisabled}/>
                )}
            </Form.Item>
        );

    }
}

NumericField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    // form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default NumericField;