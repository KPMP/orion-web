import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import SelectBox from './Forms/SelectBox';
import packageTypeList from './packageTypes';

class UploadControl extends Component {
    render() {
    		return (
            <Row id="upload-ctrl">
                <Col md={11}>
	                <SelectBox name="packageType" label="Select a package type" options={packageTypeList.options} {...this.props} error={this.props.errors.packageType} setFieldValue={this.props.setFieldValue} additionalFieldName="packageTypeOther" additionalFieldLabel="Package Type Other (specify)"/>
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