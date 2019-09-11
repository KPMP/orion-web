import React, { Component } from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import PropTypes from 'prop-types';
import {Button} from "antd";

class LargeFileModal extends Component {

    render() {
    	console.log(this.props);
        return (
            <div className="largeFileModal static-modal">
                <Modal size="lg" isOpen={this.props.show}>
                    <ModalHeader toggle={this.props.close}>
                        Upload Instructions
                    </ModalHeader>
                    <ModalBody className="largeFileModalBody">
                        <p>This method requires you to do the following in order to upload your file(s) into the data lake:</p>
                        <ol>
                            <li>Click this link to <a href={this.props.link}>open the destination folder</a> on Google Drive.</li>
                            <li>Upload your files to the Google Drive folder.</li>
                            <li>Email <a href="mailto:datauploadersupport@kpmp.org">datauploadersupport@kpmp.org</a> to let us know you have finished uploading your file(s).</li>
                        </ol>
                    </ModalBody>
                    <ModalFooter>
                        <article id="largeFileModalFooter" className="justify-content-right">
                            <Button type="primary" onClick={this.props.close}>Ok</Button>
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