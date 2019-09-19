import React, { Component } from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import PropTypes from 'prop-types';
import {Button} from "antd";

class LargeFileModal extends Component {

    render() {
        return (
            <div className="largeFileModal static-modal">
                <Modal size="lg" isOpen={this.props.show}>
                    <ModalHeader toggle={this.props.close}>
                        Upload Instructions
                    </ModalHeader>
                    <ModalBody className="largeFileModalBody">
                        <p>This method requires you to do the following in order to upload your file(s) into the data lake:</p>
                        <ol>
                            <li>Click this link to <a rel="noopener noreferrer" href={"https://drive.google.com/drive/folders/" + this.props.link} target="_blank">open the destination folder</a> on Google Drive.</li>
                            <li>Upload your files to the Google Drive folder. <br/>(NOTE: You may need to sign in with a Google account)</li>
                            <li>Email <a target="_blank" rel="noopener noreferrer" href="mailto:datalakeuploadersupport@kpmp.org">datalakeuploadersupport@kpmp.org</a> to let us know you have finished uploading your file(s).</li>
                        </ol>
                    </ModalBody>
                    <ModalFooter>
                        <article id="largeFileModalFooter" className="justify-content-right">
                            <Button type="primary" id="largeFileButton" onClick={this.props.close}>OK</Button>
                        </article>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

LargeFileModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default LargeFileModal;