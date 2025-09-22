import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { MetadataRenderer } from './MetadataRenderer';
import { Tree } from 'antd';

class MetadataModal extends Component {

	constructor(props) {
		super(props);

		let renderer = new MetadataRenderer({userInformation: this.props.userInformation});
		this.renderSection = renderer.renderSection.bind(this);
		this.renderField = renderer.renderField.bind(this);
	}
	
	isRemoteDataLoaded() {
		return this.props.dtds && this.props.uploadPackage && this.props.dtds[this.props.uploadPackage.version];
	}

    render() {
		if (!this.isRemoteDataLoaded()) {
			return <div className="metadataModal static-modal" />;
		} else {
			let dtd = this.props.dtds[this.props.uploadPackage.version];
			let packageType = this.props.uploadPackage.packageType;
			let remainingSections = "";
			if (packageType !== undefined) {
				remainingSections = dtd.typeSpecificElements.filter(function (element) {
					return element.hasOwnProperty(packageType)
				});
				if (remainingSections.length > 0) {
					remainingSections = remainingSections[0][packageType];
				}
			}

			return (
				<div className="metadataModal static-modal">
					<Modal size="lg" isOpen={this.props.show}>
						<ModalHeader toggle={this.props.close}>
							Package metadata
						</ModalHeader>
						<ModalBody className="metadataModalBody">
							<p>ID: {this.props.uploadPackage._id}</p>
							<Tree blockNode={true} defaultExpandedKeys={[dtd.standardFields.sectionHeader]}>
								<MetadataRenderer
									dtd={dtd}
									uploadPackage={this.props.uploadPackage}
									userInformation={this.props.userInformation}
								/>
							</Tree>
						</ModalBody>
					</Modal>
				</div>
			);
		}
    }
}

MetadataModal.propTypes = {
    uploadPackage: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default MetadataModal;
