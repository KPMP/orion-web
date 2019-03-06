import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Col, Row, Button } from 'reactstrap';
import { getLocalDateString, getLocalTimeString } from '../../helpers/timezoneUtil';
import AttachmentsModal from './AttachmentsModal';
import MetadataModal from './MetadataModal';
import { shouldColorRow } from './attachmentsModalRowHelper.js';
import { getDataTypeIconInfo } from './dataTypeIconHelper.js';

class PackagePanel extends Component {

	constructor() {
		super();
		this.state = { showAttachments: false };
		this.handleAttachmentClick = this.handleAttachmentClick.bind(this);
		this.handleMetadataClick = this.handleMetadataClick.bind(this);
	}
	
    handleAttachmentClick() {
    		let show = !this.state.showAttachments;
    		this.setState({ showAttachments: show });
    }

	handleMetadataClick() {
		let show = !this.state.showMetadata;
		this.setState({ showMetadata: show });
	}

	handleDownloadClick(packageId, e) {
		ReactGA.event({
			category: 'Download',
			action: 'File Package',
			label: packageId
		});
		window.location.href="api/v1/packages/" + packageId + "/files"
	}

    render() {
		let packageInfo = this.props.uploadPackage.packageInfo;
    	let submittedDate = getLocalDateString(packageInfo.createdAt);
		let submittedTime = getLocalTimeString(packageInfo.createdAt);
		let { iconDataType, iconImage } = getDataTypeIconInfo(packageInfo.packageType);
    		return (
				<section>
					<Row className={
						(shouldColorRow(this.props.index) ? "bg-light " : " ") +
						"border border-primary rounded no-gutters px-2 py-2 mx-2 my-2"}>
						<Col md={10} className="media">
							<img src={"img/" + iconImage} alt={iconDataType} height="80px" />
							<Row className="media-body mx-2 align-items-center">
								<Col xs={12}><b>{packageInfo.subjectId}</b></Col>
								<Col xs={12}>{packageInfo.packageType}</Col>
								<Col xs={12}>Submitted <b>{submittedDate}</b> at {submittedTime} by {packageInfo.submitter.firstName} {packageInfo.submitter.lastName}, {packageInfo.institution}</Col>
							</Row>
						</Col>
						<Col md={2}>
							<div><a onClick={this.handleAttachmentClick}>{packageInfo.attachments.length} attachment(s)</a></div>
							<div><a onClick={this.handleMetadataClick}>Show package metadata</a></div>
							{this.props.uploadPackage.downloadable &&
								<div>
									<Button className="btn btn-primary" value={packageInfo.packageId} onClick={(e) => this.handleDownloadClick(packageInfo.packageId, e)}>
										<span className="glyphicon glyphicon-download-alt" />
										<i> </i>
										<b>Download</b>
									</Button>
								</div>
							}
						</Col>
					</Row>
					<AttachmentsModal show={this.state.showAttachments} attachments={packageInfo.attachments} close={this.handleAttachmentClick}/>
					<MetadataModal show={this.state.showMetadata} uploadPackage={packageInfo} close={this.handleMetadataClick}/>
				</section>
        );
    }
}

export default PackagePanel;