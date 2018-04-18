import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class FileDropzone extends Component {

	render() {
		let field = this.props;
		let files = this.props.input.value;
		return (
			<div>
				<Dropzone
					name={field.input.name}
					onDrop={( filesToUpload, e ) => {console.log(filesToUpload); field.input.onChange(filesToUpload)}}>
					<div>Try dropping some files here, or click to select files to upload.</div>
				</Dropzone>
			 	{field.meta.touched && field.meta.error &&
					<span className="error">{field.meta.error}</span> }
			 	{files && Array.isArray(files) && (
					 <ul>
					  { files.map((file, i) => <li key={i}>{file.name}</li>) }
					 </ul>
			 	)}
			</div>
		);
	};
}

export default FileDropzone;