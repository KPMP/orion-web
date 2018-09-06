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
	
	uploadFile(e) {
		e.preventDefault();
		document.getElementById("upload").click();
	}
	
	render() {
		const children = <span/>;
		const fileInputChildren = <span>Drop file(s) here or <a>browse</a></span>;
//		<span className='react-fine-uploader-gallery-dropzone-content'>
//		Drop file(s) here or <span><a onClick={this.uploadFile}>browse</a><input multiple type="file" name="qqfile" id="upload"/></span>
//	</span>;
		return(
			<Gallery uploader={uploader} fileInput-children={fileInputChildren} children={children}/>
		);
	}
}

export default FileDropzone;