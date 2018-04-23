import { showUploadModalAction } from '../actions/UploadForm/uploadTabActions';
import UploadPage from './UploadPage';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) =>
({
    shouldShowUploadModal: state.showUploadModal
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	showUploadModalAction() {
		dispatch(showUploadModalAction(true));
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);    