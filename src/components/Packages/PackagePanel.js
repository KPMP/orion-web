import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { getLocalDateString, getLocalTimeString } from '../../helpers/timezoneUtil';
import { shouldColorRow } from './attachmentsModalRowHelper.js';
import { getDataTypeIconInfo } from './dataTypeIconHelper.js';
import AttachmentsModal from './AttachmentsModal';
import MetadataModal from './MetadataModal';
import LargeFileModal from './LargeFileModal';
import PropTypes from 'prop-types';
import PackagePanelStateText from './PackagePanelStateText';

class PackagePanel extends Component {

	constructor(props) {
		super(props);
		this.state = { showAttachments: false, showMetadata: false, showLargeFile: false};
		this.handleAttachmentClick = this.handleAttachmentClick.bind(this);
		this.handleMetadataClick = this.handleMetadataClick.bind(this);
		this.handleLargeFileClick = this.handleLargeFileClick.bind(this);
		this.handleStateInfoClick = this.handleStateInfoClick.bind(this);
	}
	
	handleAttachmentClick() {
		let show = !this.state.showAttachments;
		this.setState({ showAttachments: show });
	}

	handleMetadataClick() {
		let show = !this.state.showMetadata;
		this.setState({ showMetadata: show });
	}

	handleLargeFileClick() {
		let show = !this.state.showLargeFile;
		this.setState({ showLargeFile: show });
	}

	handleStateInfoClick() {
		if (this.props.uploadPackage.state.state === 'METADATA_RECEIVED') {
			let show = !this.state.showLargeFile;
			this.setState({ showLargeFile: show });
		}
	}

	render() {
		
		let packageInfo = this.props.uploadPackage.packageInfo;
		let packageTypeIcons = this.props.packageTypeIcons;
		let submittedDate = getLocalDateString(packageInfo.createdAt);
		let submittedTime = getLocalTimeString(packageInfo.createdAt);
		let { iconDataType, iconImage } = getDataTypeIconInfo(packageTypeIcons, packageInfo.packageType);

		return (
			<section className='package'>
				<Row className={
						(shouldColorRow(this.props.index) ? 'bg-light ' : ' ') +
						'border rounded no-gutters px-2 py-2 mx-2 my-2'}>
					<Col xs={12} md={9} className='media align-items-center'>
						<img src={'img/' + iconImage} alt={iconDataType} height='80px' />
						<Row className='media-body mx-2 d-flex align-items-center'>
							<Col xs={12} className='pb-1'><b>{packageInfo.subjectId}</b></Col>
							<Col xs={12} className='pb-1'>{packageInfo.packageType}</Col>
							<Col xs={12}>Submitted <b>{submittedDate}</b> at {submittedTime} by {packageInfo.submitter.firstName} {packageInfo.submitter.lastName}, {packageInfo.siteName}</Col>
							<Col xs={12} className='pb-1'>Upload ID: {packageInfo._id}</Col>
						</Row>
					</Col>
					<Col xs={12} md={3}>
						<Row>
							<Col xs={4} md={12}>
								{/* eslint-disable-next-line */} 
								<a className='d-block' onClick={this.handleAttachmentClick}>{packageInfo.files.length} attachment(s)</a>
							</Col>
							<Col xs={4} md={12}>
								{/* eslint-disable-next-line */} 
								<a className='d-block pb-1' onClick={this.handleMetadataClick}>Show upload metadata</a>
							</Col>
							{this.props.uploadPackage.state &&
							<Col xs={4} md={12} >
								<PackagePanelStateText
									handleStateInfoClick={this.handleStateInfoClick}
									panelState={this.props.uploadPackage.state}
									currentUser={this.props.userInformation}
									packageSubmitter={packageInfo.submitter}
									largeFileUpload={packageInfo.largeFilesChecked}
									stateDisplayMap={this.props.stateDisplayMap}
								/>
							</Col>
							}
					   </Row>
				   </Col>
				</Row>
				
				<AttachmentsModal show={this.state.showAttachments} attachments={packageInfo.files} close={this.handleAttachmentClick}/>
				<MetadataModal show={this.state.showMetadata} uploadPackage={packageInfo} close={this.handleMetadataClick} dtds={this.props.dtds}/>
				<LargeFileModal show={this.state.showLargeFile} close={this.handleLargeFileClick} link={this.props.uploadPackage.state ? this.props.uploadPackage.state.codicil: ''}/>
			</section>
		);
	}
}

PackagePanel.propTypes = {
	uploadPackage: PropTypes.object.isRequired,
	packageTypeIcons: PropTypes.array.isRequired,
	dtds: PropTypes.object.isRequired,
	userInformation: PropTypes.object.isRequired,
	stateDisplayMap: PropTypes.object.isRequired
}

export default PackagePanel;
