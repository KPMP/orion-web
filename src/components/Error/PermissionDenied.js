import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class PermissionDenied extends Component {
	
	render() {
		return (
				<article className="container justify-content-center pt-3">
					<Row >
						<Col xs={12} className="error-header pb-3">
							We're sorry. You are not authorized to access this application.
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<div  className="alert alert-danger">
							Your account does not have permission to use this KPMP application. If you believe you received this page in error, please contact: &nbsp;
								<a href="mailto:admin@kpmp.org">admin@kpmp.org</a>
							</div>
						</Col>
					</Row>
				</article>
		);
	}
}

export default PermissionDenied;