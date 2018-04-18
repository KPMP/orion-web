import React, { Component } from 'react';
import UploadFormContainer from './UploadForms/UploadFormContainer';

class UploadPage extends Component {
	
	render() {
		return (
			<div className="container-fluid" id="outerContainer">
				<div className="row" id="navbar">
					<div className="col-sm-12">
						<nav className="navbar navbar-dark bg-primary">
							<div className="container-fluid">
								<a className="navbar-brand" href="#">KPMP Data Lake Upload Tool</a>
							</div>
						</nav>
					</div>
				</div>
				<div className="row">
					<div className="container-fluid" id="content">
						<div className="row">
							<div className="col-sm-6">
								<UploadFormContainer/>
							</div>
						</div>
					</div>
				</div>
			</div>);
	}
}

export default UploadPage;