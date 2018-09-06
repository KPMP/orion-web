import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { detect } from 'detect-browser';
import ReduxDatePicker from './ReduxDatePicker';

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
        return (
            <div>
                <ControlLabel>{label} {errorMessage}
                </ControlLabel>
                <div>
                { (browserName === "ie") ? <ReduxDatePicker {...this.props} />
                    : <input name={name} type="date" className="form-control" onChange={onChange} onBlur={onBlur}/>
                }
                </div>
            </div>
        );
    }
}

export default DateField;
