import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getLocalDateString } from '../../helpers/timezoneUtil';

class MetadataModal extends Component {

    render() {
        let experimentDate = this.props.uploadPackage.experimentDate?getLocalDateString(this.props.uploadPackage.experimentDate):"N/A";
        return (
            <div>
                <div className="metadataModal static-modal">
                    <Modal show={this.props.show} onHide={this.props.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Provided Metadata</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="metadataModalBody">
                            <p>Package type: {this.props.uploadPackage.packageType}</p>
                            <p>Description: {this.props.uploadPackage.description}</p>
                            <p>Subject/Sample ID: {this.props.uploadPackage.subjectId}</p>
                            <p>Experiment date: {experimentDate}</p>
                            <p>Submitted by:</p>
                            <ul>
                                <li>Institution: {this.props.uploadPackage.institution}</li>
                                <li>Submitter: {this.props.uploadPackage.submitterFirstName} {this.props.uploadPackage.submitterLastName}</li>
                            </ul>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default MetadataModal;
