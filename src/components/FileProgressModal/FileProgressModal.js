import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import FileProgress from './FileProgress';

class FileProgressModal extends Component {

    render = () => {
        return (
            <div className="fileProgressModal static-modal">
                <Modal.Dialog className="fileProgressModal">
                    <Modal.Header><div className="modalTitle">Upload Status</div></Modal.Header>
                    <Modal.Body className="uploadFilesContainer">
                        <FileProgress files={this.props.fileList} uploader={this.props.uploader}/>
                        <hr/>
                        <div className="row">
                            <div className="col-12">
                                <div className="float-right">
                                    <Button className="btn-outline-dark" onClick={() => this.props.cancel() }>Cancel</Button>
                                &nbsp;
                                    <Button bsStyle="primary" disabled={ this.props.uploadStatus === "complete" ? false : true } onClick={() => this.props.cancel() }>Done</Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        );
    }
}

export default FileProgressModal