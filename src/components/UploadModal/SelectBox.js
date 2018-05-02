import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';

class SelectBox extends Component {
	
	render() {
		let { label, options } = this.props;
		let { name, type, onBlur, onChange, onFocus } = this.props.input;
		let { error, touched, warning } = this.props.meta;
		let classes = 'form-control';
		if (touched && error) {
			classes += ' fieldInError';
		}
		return (
			<div>
				<ControlLabel>{label} &nbsp;
					{touched &&
					((error && <span className="formError">{error}</span>) ||
							(warning && <span>{warning}</span>))}
				</ControlLabel>
				<select name={name} class={classes} onBlur={onBlur} onChange={onChange} onFocus={onFocus}>
					<option value=''>- select - </option>
					{options.map(function(option, index) {
						return <option value={option.value}>{option.label}</option>
					})}
				</select>
								
			</div>
		);
	}
}

export default SelectBox;