import React, { Component } from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader/gallery';
import UploadIcon from 'react-fine-uploader/gallery/upload-icon';

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
	
	render() {
		const dropZoneChildren =
			<span className='react-fine-uploader-gallery-dropzone-content'>
				<UploadIcon className='react-fine-uploader-gallery-dropzone-upload-icon' />
				Drop file here
			</span>;
		const fileInputChildren = <span>Select a file</span>;
		return(
			<Gallery uploader={uploader} fileInput-children={fileInputChildren} children={dropZoneChildren} />
		);
	}
}

export default FileDropzone;