import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Col, Row, Button } from 'reactstrap';
import { getLocalDateString, getLocalTimeString } from '../../helpers/timezoneUtil';
import { shouldColorRow } from './attachmentsModalRowHelper.js';
import { getDataTypeIconInfo } from './dataTypeIconHelper.js';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AttachmentsModal from './AttachmentsModal';
import MetadataModal from './MetadataModal';
import LargeFileModal from './LargeFileModal';
import PropTypes from 'prop-types';
import Api from '../../helpers/Api';
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
		if (this.props.uploadPackage.state.state === "METADATA_RECEIVED") {
			let show = !this.state.showLargeFile;
			this.setState({ showLargeFile: show });
		}
	}
	
	handleDownloadClick(packageId, e) {
		ReactGA.event({
			category: 'Download',
			action: 'File Package',
			label: packageId
		});
		let api = Api.getInstance();
		let url = api.getBaseURL() + api.fixArguments(["api/v1/packages/"]) + packageId + "/files";
		
		window.location.href=url;
	}

	render() {
		
		let packageInfo = this.props.uploadPackage.packageInfo;
		let packageTypeIcons = this.props.packageTypeIcons;
		let submittedDate = getLocalDateString(packageInfo.createdAt);
		let submittedTime = getLocalTimeString(packageInfo.createdAt);
		let { iconDataType, iconImage } = getDataTypeIconInfo(packageTypeIcons, packageInfo.packageType);

		return (
			<section className="package">
				<Row className={
						(shouldColorRow(this.props.index) ? "bg-light " : " ") +
						"border rounded no-gutters px-2 py-2 mx-2 my-2"}>
					<Col xs={12} md={9} className="media align-items-center">
						<img src={"img/" + iconImage} alt={iconDataType} height="80px" />
						<Row className="media-body mx-2 d-flex align-items-center">
							<Col xs={12} className="pb-1"><b>{packageInfo.subjectId}</b></Col>
							<Col xs={12} className="pb-1">{packageInfo.packageType}</Col>
							<Col xs={12}>Submitted <b>{submittedDate}</b> at {submittedTime} by {packageInfo.submitter.firstName} {packageInfo.submitter.lastName}, {packageInfo.tisName}</Col>
						</Row>
					</Col>
					<Col xs={12} md={3}>
						<Row>
							<Col xs={4} md={12}>
								{/* eslint-disable-next-line */} 
								<a className="d-block" onClick={this.handleAttachmentClick}>{packageInfo.files.length} attachment(s)</a>
							</Col>
							<Col xs={4} md={12}>
								{/* eslint-disable-next-line */} 
								<a className="d-block pb-1" onClick={this.handleMetadataClick}>Show package metadata</a>
							</Col>
							{this.props.uploadPackage.downloadable &&
								<Col xs={4} md={12}>
									<Button size="sm" color="primary" value={packageInfo._id} onClick={(e) => this.handleDownloadClick(packageInfo._id, e)}>
										<FontAwesomeIcon icon={faDownload} />
										<span>&nbsp;Download</span>
									</Button>
								</Col>
							}
							{!this.props.uploadPackage.downloadable && this.props.uploadPackage.state &&
							<Col xs={this.props.uploadPackage.downloadable ? 6 : 4}
								 md={12}
								 className={this.props.uploadPackage.downloadable ? "pt-2" : ""}>
								<PackagePanelStateText
									handleStateInfoClick={this.handleStateInfoClick}
									panelState={this.props.uploadPackage.state}
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
	dtds: PropTypes.object.isRequired

}

export default PackagePanel;
