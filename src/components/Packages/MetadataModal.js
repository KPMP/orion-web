import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import MetadataRenderer from './MetadataRenderer';

class MetadataModal extends Component {

	constructor(props) {
		super(props);
	}
	
	isRemoteDataLoaded() {
		return this.props.dtds && this.props.uploadPackage && this.props.dtds[this.props.uploadPackage.version];
	}

    render() {
		if(!this.isRemoteDataLoaded()) {
			return <div className="metadataModal static-modal" />;
		} else {
			let dtd = this.props.dtds[this.props.uploadPackage.version];
            // let standardSection = this.renderSection(dtd.standardFields, this.props.uploadPackage);
            let defaultExpandedKeys = dtd.standardFields.hasOwnProperty('sectionHeader') &&
                dtd.standardFields !== null &&
                dtd.standardFields !== undefined ?
                dtd.standardFields.sectionHeader :
                null;

            return (
                <div className="metadataModal static-modal">
                    <Modal size="lg" isOpen={this.props.show}>
                        <ModalHeader toggle={this.props.close}>
                            Package metadata
                        </ModalHeader>
                        <ModalBody className="metadataModalBody">
                            <p>ID: {this.props.uploadPackage._id}</p>
                                <MetadataRenderer
                                    dtd={dtd}
                                    userInformation={this.props.userInformation}
                                    uploadPackage={this.props.uploadPackage}
                                    defaultExpandedKeys={defaultExpandedKeys}
                                />
                        </ModalBody>
                    </Modal>
                </div>
            )
        }
    }
}

MetadataModal.propTypes = {
    uploadPackage: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default MetadataModal;
