import React, { Component } from 'react';
import UploadTabContainer from './UploadForms/UploadTabContainer';
import { Button } from 'react-bootstrap';


class UploadPage extends Component {
	
	render() {
		console.log(this.props);
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
			</div>);
	}
}

export default UploadPage;
