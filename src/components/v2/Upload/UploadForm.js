import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';


class UploadForm extends Component {
	render() {
		if (this.props.packageType === undefined) {
			return ( <DefaultUploadForm/> );
		} else {
			return (
				<Row>
					<Col md={12}>
						Dropzone
					</Col>
					<Col md={12}>
						<V1StyleForm/>
					</Col>
				</Row>
			);
		}
	}
}

export default UploadForm;