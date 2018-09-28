import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UploadTypeDropdown from './UploadTypeDropdown';

class UploadControl extends Component {
	
    render() {
    		return (
            <Row id="upload-ctrl">
                <Col md={11}>
	                <UploadTypeDropdown {...this.props} />
                	</Col>
                <Col md={1} className="upload-ctrl-submit">
                    <Button className="btn-primary pull-right" disabled={this.props.submitDisabled} type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default UploadControl;