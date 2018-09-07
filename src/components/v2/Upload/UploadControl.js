import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UploadTypeDropdown from './UploadTypeDropdown';

class UploadControl extends Component {
    render() {
        return (
            <Row id="upload-ctrl">
                <Col md={12}>
                    <UploadTypeDropdown title={this.props.title} onSelect={this.props.handleSelect} handlePackageTypeOther={this.props.handlePackageTypeOther}/>
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