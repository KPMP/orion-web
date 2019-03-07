import React, { Component } from 'react';
import { Form, InputNumber } from 'antd';
import PropTypes from 'prop-types';

const requiredFieldNumericOptions = {validateTrigger: [ 'onChange' ], rules: [{required: true, message: 'Required', type: 'number'}]};
const optionalFieldNumericOptions = {validateTrigger: [ 'onChange' ], rules: [{required: false, type: 'number'}]};

class NumericField extends Component {

    render() {
        let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
        let isDisabled = this.props.isDisabled || false;
        let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
        let fieldOptions = this.props.isRequired ? requiredFieldNumericOptions : optionalFieldNumericOptions;

        return (
            <Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
                {getFieldDecorator(this.props.fieldName, fieldOptions)(
                    <InputNumber name={this.props.fieldName} disabled={isDisabled}/>
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
    form: PropTypes.object.isRequired,
    additionalProps: PropTypes.object
};

export default NumericField;