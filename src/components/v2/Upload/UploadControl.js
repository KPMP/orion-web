import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UploadTypeDropdown from './UploadTypeDropdown';
import SelectBox from './Forms/SelectBox';
import packageTypeList from './packageTypes';

class UploadControl extends Component {
    render() {
    		return (
            <Row id="upload-ctrl">
                <Col md={11}>
                <SelectBox name="packageType" label="Site Name" options={packageTypeList.options} onChange={this.props.handleChange} onBlur={this.props.handleBlur} error={this.props.errors.institutionName} setFieldValue={this.props.setFieldValue} additionalFieldName="packageTypeOther"/>
                </Col>
                <Col md={1} className="upload-ctrl-submit">
                    <Button className="btn-primary" disabled={this.props.submitDisabled} type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default UploadControl;