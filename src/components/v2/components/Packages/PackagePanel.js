import React, { Component } from 'react';
import { Panel, Col, Row, Button } from 'react-bootstrap';

class PackagePanel extends Component {
    render() {
        return (
            <Panel className="pkg-panel">
                <Panel.Body>
                    <Row>
                        <Col md={1} className="pkg-type-img">
                            <img src="img/TypePlaceholder.jpg" alt="type-placeholder" />
                            <div>Type<br />icon</div>
                        </Col>
                        <Col md={4} className="pkg-panel-info">
                            <div><b>{this.props.pkgId}</b></div>
                            <div><a>Package Type</a></div>
                            <div>Submitted <b>YYYY-MM-DD</b> at hh:mm by <a>Joe Researcher, Michigan</a></div>
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