import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { MetadataRenderer } from './MetadataRenderer';
import { Tree } from 'antd';
import Api from '../../helpers/Api';
const api = Api.getInstance();

class MetadataModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			dtd: props.currentDTD
		}
		let renderer = new MetadataRenderer();
		this.renderSection = renderer.renderSection.bind(this);
		this.renderField = renderer.renderField.bind(this);
	}
	
	componentDidMount() {
		if (this.isNewDTD()) {
			this.getDTDByVersion(this.props.uploadPackage.version).then(data => {
				this.setState({dtd: data});
			});
		}
	}

	isNewDTD() {
		return (!this.state.currentDTD && this.props.uploadPackage) ||
			(this.props.currentDTD &&
			this.props.uploadPackage &&
			this.props.currentDTD.version !== this.props.currentDTD.version);
	}
	
	async getDTDByVersion (version) {
		let result = await api.get('/api/v1/form/version/' + version );
		return await result.data;
	}
	
    render() {
        let standardSection = this.renderSection(this.state.dtd.standardFields, this.props.uploadPackage);

        let defaultExpandedKeys = this.state.dtd.standardFields.hasOwnProperty('sectionHeader') ?
            this.state.dtd.standardFields.sectionHeader :
			null;

        console.log('+++ this.state: ', this.state);

        let remainingSections = "";
        let packageType = this.props.uploadPackage.packageType;
        if (packageType !== undefined) {
        	remainingSections = this.state.dtd.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(packageType) });
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
                        <Tree defaultExpandedKeys={[ defaultExpandedKeys ]}>
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
