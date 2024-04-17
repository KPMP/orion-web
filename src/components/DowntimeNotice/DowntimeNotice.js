import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class DowntimeNotice extends Component {
    render() {
        return (
            <article className="container-fluid">
            <Row id="oops-content">
                <Col xs={0} md={2}>&nbsp;</Col>
                <Col xs={12} md={6}>
                    <p className="oops-big">System Unavailable</p>
                    <p className="oops-small">We’re sorry. The Uploader is currently undergoing system maintenance and is unavailable at this time. Please try again later.</p>
                    
                </Col>
            </Row>
        </article>
        );
    }
}

export default DowntimeNotice;