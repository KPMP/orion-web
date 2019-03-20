import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import { sendMessageToBackend } from '../../actions/Error/errorActions';

const mapStateToProps = (state, props) =>
({
    
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	handleError(error) {
		dispatch(sendMessageToBackend(error));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);