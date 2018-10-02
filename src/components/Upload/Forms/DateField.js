import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { detect } from 'detect-browser';
import ReduxDatePicker from './ReduxDatePicker';
import { Field } from 'formik';
import { validateDate } from './v1StyleFormValidator';

class DateField extends Component {
    render() {
        let { label, name, onChange, onBlur, value, touched, error } = this.props;
        let browser = detect();
        let browserName = (browser !== null) ? browser.name : "unknown";
        let errorMessage = "";
        let classes = "form-control";
        if (touched && error !== undefined) {
        		errorMessage = <span className='formError'>{error}</span>;
        		classes += ' fieldInError';
        }
        let datePicker = <ReduxDatePicker {...this.props}/>;
        return (
            <div>
                <ControlLabel>{label} {errorMessage}
                </ControlLabel>
                <div>
                { (browserName === "ie") ? <Field name={name} render={(field) => (datePicker)} type="date" className={classes} onChange={onChange} onBlur={onBlur} value={value} validate={validateDate}/>
                    : <Field name={name} type="date" className={classes} onChange={onChange} onBlur={onBlur} value={value} validate={validateDate}/>
                }
                </div>
            </div>
        );
    }
}

export default DateField;
