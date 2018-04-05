import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class WholeSlideImageForm extends Component {
	render() {
		return (
			<form>
				<div><label>Institution</label></div>
				<Field name="institution" component="select">
					<option />
					<option value="University of Michigan">University of Michigan</option>
					<option value="University of Washington">University of Washington</option>
				</Field>
			</form>
		);
	}
}

export default reduxForm({
  form: 'wholeSlideImageForm', // a unique identifier for this form
})(WholeSlideImageForm);