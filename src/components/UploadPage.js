import React, { Component } from 'react';
import UploadTabContainer from './UploadForms/UploadTabContainer';
import { Button } from 'react-bootstrap';
import UploadedFilesTableContainer from './UploadedFilesTableContainer';

class UploadPage extends Component {
	
	render() {
		return (
			<div className="container-fluid" id="outerContainer">
				<div className="row" id="navbar">
					<div className="col-12">
						<nav className="navbar navbar-dark bg-primary">
							<div className="container-fluid">
								<a className="navbar-brand" href="/">KPMP Data Lake Uploader</a>
							</div>
						</nav>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<Button bsStyle="primary" className="uploadButton" onClick={() => this.props.showUploadModalAction() }>New Upload</Button>
					</div>
					{this.props.shouldShowUploadModal &&
						<UploadTabContainer />
					}
				</div>
					<UploadedFilesTableContainer/>
			</div>);
	}
}

export default UploadPage;
