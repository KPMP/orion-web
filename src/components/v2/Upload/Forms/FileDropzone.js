import React, { Component } from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader/gallery';

const uploader = new FineUploaderTraditional ({
	options: {
		chunking: {
			enabled: true
		},
		deleteFile: {
			enabled: false,
		},
		request: {
			endpoint: '/api/uploader/fileChunk'
		},
		retry: {
			enableAuto: false
		}
	}
});

class FileDropzone extends Component {
	
	uploadFile(e) {
		e.preventDefault();
		document.getElementById("upload").click();
	}
	
	render() {
		const children = <span className='react-fine-uploader-gallery-dropzone-content'>
			Drop file(s) here
			</span>;
		const fileInputChildren = <span>Select file(s)</span>;
		return(
			<Gallery uploader={uploader} fileInput-children={fileInputChildren} children={children}/>
		);
	}
}

export default FileDropzone;