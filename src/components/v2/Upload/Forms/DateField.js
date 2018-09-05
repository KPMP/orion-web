import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';
import { detect } from 'detect-browser';
import ReduxDatePicker from './ReduxDatePicker';

class DateField extends Component {
    render() {
        let { label, name } = this.props;
        let browser = detect();
        let browserName = (browser !== null) ? browser.name : "unknown";

        return (
            <div>
                <ControlLabel>{label} &nbsp;
					
                </ControlLabel>
                <div>
                { (browserName === "ie") ? <ReduxDatePicker {...this.props} />
                    : <input name={name} type="date" className="form-control" />
                }
                </div>
            </div>
        );
    }
}

export default DateField;
