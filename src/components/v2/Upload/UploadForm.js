import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';
import FileDropzone from './Forms/FileDropzone';
import UploadControl from './UploadControl';

class UploadForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            packageType: 'Select',
            packageTypeOther: ''
        };
    }

    handleSelect = (packageType) => {
    		this.setState({
            packageType: packageType
        });
    }
    
    handlePackageTypeOther = (packageTypeOther) => {
    		this.setState({packageTypeOther: packageTypeOther});
    }
    
	render() {
		
		let submitEnabled = false;
		const uploadPackage = {
			packageType: this.state.packageType,
			packageTypeOther: this.state.packageTypeOther,
			submitterFirstName: '',
			submitterLastName: '',
			institution: '',
			protocol: '',
			experimentDate: null,
			description: '',
			subjectId: ''
		}
		
		if (this.state.packageType === 'Select') {
			return (
				<div>
					<UploadControl title={this.props.title} handleSelect={this.handleSelect} handlePackageTypeOther={this.handlePackageTypeOther} submitEnabled={submitEnabled} />
					<hr/>
					<DefaultUploadForm/> 
				</div>
			);
		} else {
			return (
				<div id="uploadForm">
					<UploadControl title={this.props.title} handleSelect={this.handleSelect} handlePackageTypeOther={this.handlePackageTypeOther} submitEnabled={true} />	
					<hr/>
					<Row className="dropzone">
						<Col md={12}>
							<FileDropzone/>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<V1StyleForm uploadPackage={uploadPackage}/>
						</Col>
					</Row>
				</div>
			);
		}
	}
}

export default UploadForm;