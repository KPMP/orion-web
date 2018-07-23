import React, { Component } from 'react';
import { Panel, Col, Row, Button } from 'react-bootstrap';
import { getLocalDateString, getLocalTimeString } from '../../../helpers/timezoneUtil';

class PackagePanel extends Component {

    render() {
        var submittedDate = getLocalDateString(this.props.uploadPackage.submitted);
        var submittedTime = getLocalTimeString(this.props.uploadPackage.submitted);
    		return (
            <Panel className="pkg-panel">
                <Panel.Body>
                    <Row>
                        <Col md={1} className="pkg-type-img">
                            <img src="img/TypePlaceholder.jpg" alt="type-placeholder" />
                            <div>Type<br />icon</div>
                        </Col>
                        <Col md={4} className="pkg-panel-info">
                            <div><b>{this.props.uploadPackage.packageId}</b></div>
                            <div><a>{this.props.uploadPackage.packageType}</a></div>
                            <div>Submitted <b>{submittedDate}</b> at {submittedTime} by <a>{this.props.uploadPackage.submitter}, {this.props.uploadPackage.institution}</a></div>
                        </Col>
                        <Col md={2} mdOffset={5} className="pkg-panel-right">
                            <div><a>nn attachments</a></div>
                            <div><a>Show package metadata</a></div>
                            <div>
                                <Button className="btn btn-primary">
                                    <span className="glyphicon glyphicon-download-alt" />
                                    <i> </i>
                                    <b>Download</b>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        );
    }
}

export default PackagePanel;