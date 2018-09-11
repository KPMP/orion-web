import React, { Component } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import filesize from 'filesize';

class MetadataModal extends Component {

    render() {
        return (
            <div>
                <div className="metadataModal static-modal">
                    <Modal show={this.props.show} onHide={this.props.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Provided Metadata</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="metadataModalBody">
                            <div>Package type: {this.props.uploadPackage.packageType}</div>
                            <div>Subject ID: {this.props.uploadPackage.subjectId}</div>
                            Experiment number: AAAA-1234-YY-ZZZZZ
                            Experiment date: 2018-05-31
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default MetadataModal;
