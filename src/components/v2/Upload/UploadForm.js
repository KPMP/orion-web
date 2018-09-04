import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UploadTypeDropdown from './UploadTypeDropdown';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';


class UploadForm extends Component {
	render() {
		console.log(this.props.packageType);
		if (this.props.packageType === undefined) {
			return ( <DefaultUploadForm/> );
		} else {
			return (<V1StyleForm/>);
		}
	}
}

export default UploadForm;