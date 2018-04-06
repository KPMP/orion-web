import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

class FileDropzone extends Component {
	
	render() {
		var componentConfig = {
		    postUrl: '/'
		};
		return (
			<DropzoneComponent config={componentConfig} >
				<div className="dz-message">Drag and drop, or click to browse.</div>
			</DropzoneComponent>
        );
	}
}

export default FileDropzone;