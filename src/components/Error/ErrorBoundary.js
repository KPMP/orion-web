import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
	
	componentDidCatch(error) {
		this.props.handleError(error);
	}
	
	render() {
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	handleError: PropTypes.func.isRequired,
	children: PropTypes.node
};

export default ErrorBoundary;