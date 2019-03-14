import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const requiredFieldNumericOptions = {validateTrigger: [ 'onChange', 'onBlur' ], rules: [{required: true, message: 'Required'}]};
const optionalFieldNumericOptions = {validateTrigger: [ 'onChange', 'onBlur' ], rules: [{required: false}]};

class NumericField extends Component {

    render() {
        let { isFieldTouched, getFieldError, getFieldDecorator } = this.props.form;
        let isDisabled = this.props.isDisabled || false;
        let error = isFieldTouched(this.props.fieldName) && getFieldError(this.props.fieldName);
        let fieldOptions = this.props.isRequired ? requiredFieldNumericOptions : optionalFieldNumericOptions;

        return (
            <Form.Item label={this.props.label} validateStatus={error ? 'error' : ''}>
                {getFieldDecorator(this.props.fieldName, fieldOptions)(
                    <Input type="number" name={this.props.fieldName} disabled={isDisabled}/>
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