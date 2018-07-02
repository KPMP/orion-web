import React, { Component } from 'react';
import {  ControlLabel } from 'react-bootstrap';

class TextField extends Component {
	render() {
		let { label } = this.props;
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
						((error && <span className="formError ">{error}</span>) ||
								(warning && <span>{warning}</span>))}
				</ControlLabel>
				<div>
					<input name={name} type={type} className={classes} onBlur={onBlur}
						onChange={onChange} onFocus={onFocus}/>
					
				</div>
			</div>
		);
	}
}

export default TextField;
