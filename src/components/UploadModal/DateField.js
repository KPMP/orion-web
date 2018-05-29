import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { detect } from 'detect-browser';
import ReduxDatePicker from './ReduxDatePicker';

class DateField extends Component {
    render() {
        let { label } = this.props;
        let { name, onBlur, onChange, onFocus} = this.props.input;
        let { error, touched, warning } = this.props.meta;
        let classes = 'form-control';
        if (touched && error) {
            classes += ' fieldInError';
        }
        let browser = detect();
        let browserName = (browser !== null) ? browser.name : "unknown";

        return (
            <div>
                <ControlLabel>{label} &nbsp;
					{touched &&
                    ((error && <span className="formError ">{error}</span>) ||
                    (warning && <span>{warning}</span>))}
                </ControlLabel>
                <div>
                { (browserName === "ie") ? <ReduxDatePicker {...this.props} />
                    : <input name={name} type="date" className={classes} onBlur={onBlur}
                        onChange={onChange} onFocus={onFocus}/>
                }
                </div>
            </div>
        );
    }
}

export default DateField;
