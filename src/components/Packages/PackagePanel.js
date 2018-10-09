import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Panel, Col, Row, Button } from 'react-bootstrap';
import { getLocalDateString, getLocalTimeString } from '../../helpers/timezoneUtil';
import AttachmentsModal from './AttachmentsModal';
import MetadataModal from './MetadataModal';
import { shouldColorRow } from './attachmentsModalRowHelper.js';

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
    		return (
    			<div>
	            <Panel className="pkg-panel">
	                <Panel.Body className={shouldColorRow(this.props.index)?"odd-row":"even-row"}>
	                    <Row>
	                        <Col md={6} className="pkg-panel-info">
								<div><b>{packageInfo.subjectId}</b></div>
	                            <div>{packageInfo.packageType}</div>
	                            <div>Submitted <b>{submittedDate}</b> at {submittedTime} by {packageInfo.submitterFirstName} {packageInfo.submitterLastName}, {packageInfo.institution}</div>
	                        </Col>
	                        <Col md={2} mdOffset={4} className="pkg-panel-right">
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
					</Panel.Body>
	            </Panel>
            </div>
        );
    }
}

export default PackagePanel;