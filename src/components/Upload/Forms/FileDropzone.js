import React, { Component } from 'react';
import Gallery from 'react-fine-uploader/gallery';
import PropTypes from 'prop-types';

class FileDropzone extends Component {
<<<<<<< HEAD

=======
	
>>>>>>> origin/develop
	uploadFile(e) {
		e.preventDefault();
		document.getElementById("upload").click();
	}
<<<<<<< HEAD

=======
	
>>>>>>> origin/develop
	render() {
		let cancelButtonClass = "react-fine-uploader-gallery-cancel-button";
		if (this.props.isUploading) {
			cancelButtonClass = cancelButtonClass + " cancel-disabled";
		}
		const children = <span className='react-fine-uploader-gallery-dropzone-content'>
			Drop file(s) here

			</span>;
		const fileInputChildren = <span>Select file(s)</span>;
		return(
			<Gallery uploader={this.props.uploader} cancelButton-className={cancelButtonClass} fileInput-disabled={this.props.isUploading} fileInput-children={fileInputChildren} children={children}/>
		);
	}
}

FileDropzone.propTypes = {
	uploader: PropTypes.object.isRequired,
	isUploading: PropTypes.bool
}

<<<<<<< HEAD
export default FileDropzone; 
=======
export default FileDropzone;
>>>>>>> origin/develop
