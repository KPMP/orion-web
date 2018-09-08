import React, { Component } from 'react';
import Gallery from 'react-fine-uploader/gallery';

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
			<Gallery uploader={this.props.uploader} fileInput-children={fileInputChildren} children={children}/>
		);
	}
}

export default FileDropzone;