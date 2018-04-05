import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

class FileDropzone extends Component {
	
	render() {
		var componentConfig = {
		    iconFiletypes: ['.jpg', '.png', '.gif'],
		    showFiletypeIcon: true,
		    postUrl: '/uploadHandler'
		};
		return (
			<DropzoneComponent config={componentConfig} />
        );
	}
}

export default FileDropzone;