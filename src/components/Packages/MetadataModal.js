import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import PropTypes from 'prop-types';
import { Tree } from 'antd';

const { TreeNode } = Tree;

class MetadataModal extends Component {

	renderSection(section) {
		console.log(section);
		let header = section.sectionHeader;
		let fields = section.fields;
		return (
			<TreeNode title={header} key={header}>
				{ fields.map((fieldJson) => this.renderField(fieldJson)) }
			</TreeNode>
		);
	}
	
	renderField(fieldJson, userInformation) {
		let packageInfo = this.props.uploadPackage;
		if (fieldJson.type === "Submitter Information") {
			let name= packageInfo.submitter.firstName + " " + packageInfo.submitter.lastName;
			let nameField = "Submitter: " + name;
			let institutionField = "Institution: " + packageInfo.institution;
			return (
				<TreeNode title="Submitted by:" key="Submitted By">
					<TreeNode title={institutionField} key={institutionField} isLeaf/>
					<TreeNode title={nameField} key={name} isLeaf/>
				</TreeNode>
			);
		} else if (fieldJson.label === "Package Type (Other)") {
			// ignore, we don't want to display this
		} else {
			let fieldValue = packageInfo[fieldJson.fieldName] === undefined ? "" : packageInfo[fieldJson.fieldName];
			let title = fieldJson.label + ": " + fieldValue;
			return <TreeNode title={title} key={title}/>;
		}
	}
	
    render() {
        let experimentDate = this.props.uploadPackage.experimentDate?dateFormat(getIEFriendlyDate(this.props.uploadPackage.experimentDate), 'yyyy-mm-dd', true):"N/A";
        let standardSection = this.renderSection(this.props.currentDTD.standardFields);
        let remainingSections = "";
        let packageType = this.props.uploadPackage.packageType;
        if (packageType !== undefined) {
        	remainingSections = this.props.currentDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(packageType) });
			if (remainingSections.length > 0) {
				remainingSections = remainingSections[0][packageType];
				remainingSections = remainingSections.sections.map((section) => {
					return this.renderSection(section);
				});
			}
		}
        console.log(remainingSections);
        
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
