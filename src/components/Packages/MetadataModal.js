import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import MetadataRenderer from './MetadataRenderer';
import { Tree } from 'antd';
import TestChild from './TestChild';

class MetadataModal extends Component {

	constructor(props) {
		super(props);
	}
	
	isRemoteDataLoaded() {
		return this.props.dtds && this.props.uploadPackage && this.props.dtds[this.props.uploadPackage.version];
	}

    render() {
		if(!this.isRemoteDataLoaded()) {
            console.log("MetadataModal: Remote data not loaded yet.");
			return <div className="metadataModal static-modal" />;
		} else {
            console.log("MetadataModal: Remote data loaded, rendering modal.");
			let dtd = this.props.dtds[this.props.uploadPackage.version];
            // let standardSection = this.renderSection(dtd.standardFields, this.props.uploadPackage);
            let defaultExpandedKeys = dtd.standardFields.hasOwnProperty('sectionHeader') &&
                dtd.standardFields !== null &&
                dtd.standardFields !== undefined ?
                dtd.standardFields.sectionHeader :
                null;
            console.log("Default Expanded Keys:", defaultExpandedKeys);
            console.log("DTD:", dtd);
            console.log("Upload Package:", this.props.uploadPackage);
            console.log("User Information:", this.props.userInformation);
            // let remainingSections = "";
            // let packageType = this.props.uploadPackage.packageType;
            // if (packageType !== undefined) {
            //     remainingSections = dtd.typeSpecificElements.filter(function (element) {
            //         return element.hasOwnProperty(packageType)
            //     });
            //     if (remainingSections.length > 0) {
            //         remainingSections = remainingSections[0][packageType];
            //         remainingSections = remainingSections.sections.map((section) => {
            //             return this.renderSection(section, this.props.uploadPackage);
            //         });
            //     }
            // }

            return (
                <div className="metadataModal static-modal">
                    <Modal size="lg" isOpen={this.props.show}>
                        <ModalHeader toggle={this.props.close}>
                            Package metadata
                        </ModalHeader>
                        <ModalBody className="metadataModalBody">
                            <p>ID: {this.props.uploadPackage._id}</p>
                            <Tree blockNode={true} defaultExpandedKeys={[defaultExpandedKeys]}>
                                <MetadataRenderer
                                    dtd={dtd}
                                    userInformation={this.props.userInformation}
                                    uploadPackage={this.props.uploadPackage}
                                />
                                <TestChild />
                            </Tree>
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
