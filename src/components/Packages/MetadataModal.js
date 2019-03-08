import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import PropTypes from 'prop-types';

class MetadataModal extends Component {

    render() {
        let experimentDate = this.props.uploadPackage.experimentDate?dateFormat(getIEFriendlyDate(this.props.uploadPackage.experimentDate), 'yyyy-mm-dd', true):"N/A";
        return (
            <div className="metadataModal static-modal">
                <Modal isOpen={this.props.show} onHide={this.props.close}>
                    <ModalHeader toggle={this.props.close}>
                        Package metadata
                    </ModalHeader>
                    <ModalBody className="metadataModalBody">
                        <p>ID: {this.props.uploadPackage.packageId}</p>
                        <p>Package type: {this.props.uploadPackage.packageType}</p>
                        <p>Associated protocol: {this.props.uploadPackage.protocol}</p>
                        <p>Description: {this.props.uploadPackage.description}</p>
                        <p>Subject/Sample ID: {this.props.uploadPackage.subjectId}</p>
                        <p>Experiment date: {experimentDate}</p>
                        <p>Submitted by:</p>
                        <ul>
                            <li>Institution: {this.props.uploadPackage.institution}</li>
                            <li>Submitter: {this.props.uploadPackage.submitter.firstName} {this.props.uploadPackage.submitter.lastName}</li>
                        </ul>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

MetadataModal.propTypes = {
    uploadPackage: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default MetadataModal;
