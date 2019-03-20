import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import { sendMessageToBackend } from '../../actions/Error/errorActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, props) =>
({

});

const mapDispatchToProps = (dispatch, props) =>
({
	handleError(error) {
		dispatch(sendMessageToBackend(error));
	}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary));