import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import PropTypes from 'prop-types';
import { MetadataRenderer } from './MetadataRenderer';
import { Tree } from 'antd';

class MetadataModal extends Component {

	constructor(props) {
		super(props);
		let renderer = new MetadataRenderer();
		this.renderSection = renderer.renderSection.bind(this);
		this.renderField = renderer.renderField.bind(this);
	}
	
    render() {
        let experimentDate = this.props.uploadPackage.experimentDate?dateFormat(getIEFriendlyDate(this.props.uploadPackage.experimentDate), 'yyyy-mm-dd', true):"N/A";
        let standardSection = this.renderSection(this.props.currentDTD.standardFields, this.props.uploadPackage);
        let remainingSections = "";
        let packageType = this.props.uploadPackage.packageType;
        if (packageType !== undefined) {
        	remainingSections = this.props.currentDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(packageType) });
			if (remainingSections.length > 0) {
				remainingSections = remainingSections[0][packageType];
				remainingSections = remainingSections.sections.map((section) => {
					return this.renderSection(section, this.props.uploadPackage);
				});
			}
		}
        
        return (
            <div className="metadataModal static-modal">
                <Modal size="lg" isOpen={this.props.show} onHide={this.props.close}>
                    <ModalHeader toggle={this.props.close}>
                        Package metadata
                    </ModalHeader>
                    <ModalBody className="metadataModalBody">
                        <p>ID: {this.props.uploadPackage._id}</p>
                        <Tree defaultExpandedKeys={[ this.props.currentDTD.standardFields.sectionHeader ]}>
                        	{standardSection}
                        	{remainingSections}
                        </Tree>
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
