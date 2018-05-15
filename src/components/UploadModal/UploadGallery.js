import Dropzone from 'react-fine-uploader/dropzone';
import FileInput from 'react-fine-uploader/file-input';
import UploadIcon from 'react-fine-uploader/gallery/upload-icon';
import React, { Component } from 'react';

class UploadGallery extends Component {

    render() {
        return (
        <Dropzone multiple={false} className='react-fine-uploader-gallery-dropzone'
            uploader={ this.props.uploader }>
            <FileInput uploader={ this.props.uploader } className='react-fine-uploader-gallery-file-input-container' />
            <span className='react-fine-uploader-gallery-dropzone-content'>
                <UploadIcon className='react-fine-uploader-gallery-dropzone-upload-icon' />
                Drop file here
            </span>
        </Dropzone>

        )
    }

}

export default UploadGallery