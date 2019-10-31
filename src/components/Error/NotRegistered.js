import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class NotRegistered extends Component {
	
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
							You must be a registered user in order to use this KPMP application. If you would like to register or believe you received this page in error, please contact: &nbsp;
								<a href="mailto:admin@kpmp.org">admin@kpmp.org</a>
							</div>
						</Col>
					</Row>
				</article>
		);
	}
}

export default NotRegistered;