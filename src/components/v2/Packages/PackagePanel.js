import React, { Component } from 'react';
import { Panel, Col, Row, Button } from 'react-bootstrap';
import { getLocalDateString, getLocalTimeString } from '../../../helpers/timezoneUtil';
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

    render() {
		let submittedDate = getLocalDateString(this.props.uploadPackage.createdAt);
		let submittedTime = getLocalTimeString(this.props.uploadPackage.createdAt);
    		return (
    			<div>
	            <Panel className="pkg-panel">
	                <Panel.Body className={shouldColorRow(this.props.index)?"odd-row":"even-row"}>
	                    <Row>
	                        <Col md={6} className="pkg-panel-info">
								<div><b>{this.props.uploadPackage.subjectId}</b></div>
	                            <div>{this.props.uploadPackage.packageType}</div>
	                            <div>Submitted <b>{submittedDate}</b> at {submittedTime} by {this.props.uploadPackage.submitterFirstName} {this.props.uploadPackage.submitterLastName}, {this.props.uploadPackage.institution}</div>
	                        </Col>
	                        <Col md={2} mdOffset={4} className="pkg-panel-right">
	                            <div><a onClick={this.handleAttachmentClick}>{this.props.uploadPackage.attachments.length} attachment(s)</a></div>
	                            <div><a onClick={this.handleMetadataClick}>Show package metadata</a></div>
	                            <div>
	                                <Button className="btn btn-primary" onClick={() => window.location.href="api/v1/packages/" + this.props.uploadPackage.packageId + "/files"}>
	                                    <span className="glyphicon glyphicon-download-alt" />
	                                    <i> </i>
	                                    <b>Download</b>
	                                </Button>
	                            </div>
	                        </Col>
	                    </Row>
	                    <AttachmentsModal show={this.state.showAttachments} attachments={this.props.uploadPackage.attachments} close={this.handleAttachmentClick}/>
						<MetadataModal show={this.state.showMetadata} uploadPackage={this.props.uploadPackage} close={this.handleMetadataClick}/>
					</Panel.Body>
	            </Panel>
            </div>
        );
    }
}

export default PackagePanel;