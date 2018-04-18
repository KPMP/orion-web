import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FileDropzone from '../FileDropzone';

class UploadForm extends Component {

	onSubmit = (data) => {
		this.props.handleUpload(data);
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} name="fileUploadForm">
				<div>
					<Field name="files" component={FileDropzone} />
				</div>
				<div>
					{this.props.uploadResponse.message}
				</div>
				<input type="Submit"/>
			</form>
		);
	}
}

export default reduxForm({
  form: 'fileUploadForm'
})(UploadForm);
