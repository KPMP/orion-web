import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UploadTypeDropdown from './UploadTypeDropdown';

class UploadControl extends Component {
    render() {
        return (
            <Row id="upload-ctrl">
                <Col md={2}>
                    <div className="upload-type-sel">
                        <b>Select a package type</b>
                    </div>
                    <UploadTypeDropdown title={this.props.title} onSelect={this.props.handleSelect}/>
                </Col>
                <Col md={1} className="upload-ctrl-submit">
                    <Button className="btn-primary">
                        Submit
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default UploadControl;