import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class FileDropzone extends Component {

	onChange(files) {
		if (this.props.input) {
			const {input: {onChange}} = this.props;
			onChange(files[0]);
		}
		else if(this.props.onChange){
			this.props.onChange(files[0]);
		}
		else{
			console.warn('redux-form-dropzone => Forgot to pass onChange props ?');
		}
	}

	render() {
		return (
			<Dropzone onDrop={ this.onChange } {...this.props} />
		)
	}
}

export default FileDropzone;