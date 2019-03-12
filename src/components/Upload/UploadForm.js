import React, { Component } from 'react';
import DynamicForm from './Forms/DynamicForm';
import { connect } from 'react-redux';

class UploadForm extends Component {
	

	render() {
		return (
			<DynamicForm {...this.props} />
		);
	}
}

export default connect()(UploadForm);