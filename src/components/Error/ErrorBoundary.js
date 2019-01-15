import { Component } from 'react';


class ErrorBoundary extends Component {
	
	componentDidCatch(error) {
		this.props.handleError(error);
	}
	
	render() {
		return this.props.children;
	}
}

export default ErrorBoundary;