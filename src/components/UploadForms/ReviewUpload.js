import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

class ReviewUpload extends Component {
	
	render() {
		return(
			<div className="row buttonRow">
  			<div className="col-6 float-left">
  				<Button className="btn-outline-dark" bsStyle="default" onClick={() => this.props.showUploadModal(false)}>Cancel</Button>
  			</div>
  			<div className="col-6">
  				<ButtonGroup className="float-right">
      				<Button className="btn-outline-dark" onClick={() => this.props.changeUploadTab(1)}>Back</Button> &nbsp;
      				<Button type="submit" bsStyle="primary" onClick={() => this.props.processUpload()}>Start Upload</Button>
  				</ButtonGroup>
      		</div>
      </div>
		);
	}
}

export default ReviewUpload;