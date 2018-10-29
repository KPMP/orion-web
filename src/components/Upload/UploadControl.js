import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import UploadTypeDropdown from './UploadTypeDropdown';

class UploadControl extends Component {
	
    render() {
    		return (
            <Row id="upload-ctrl">
                <Col md={12}>
	                <UploadTypeDropdown {...this.props} />
                </Col>
            </Row>
        )
    }
}

export default UploadControl;