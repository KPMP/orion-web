import React, { Component } from 'react';
import { getLocalDateString, getLocalTimeString } from '../../../helpers/timezoneUtil';

class AttachmentsModal extends Component {

    render() => {
        return (
            <div>
                <div className="attachmentsModal static-modal">
                    <Modal show={this.props.show} className="attachmentsModal">
                        <Modal.Body className="attachmentsModalBody">
                        {this.props.files.map((file) => {
                            return <span key={file.>{file.fileName}</span>
                        })}
                        </Modal.Body>
                    </Modal>
                </div>
                <FileProgressModal show={this.props.showFileProgressModal} uploader={ this.uploader } fileList= { this.props.fileList } cancel={ this.cancel } uploadStatus={ this.props.uploadStatus }/>
            </div>
        )
    }
}
