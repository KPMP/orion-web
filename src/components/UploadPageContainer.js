import { showUploadModalAction, viewUploadedFiles } from '../actions/UploadForm/uploadTabActions';
import UploadPage from './UploadPage';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) =>
({
    shouldShowUploadModal: state.uploadDialog.showUploadModal,
    uploadedFiles: state.uploadedFiles
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	showUploadModalAction(shouldShow) {
		dispatch(showUploadModalAction(shouldShow));
	},
	viewUploadedFiles() {
		dispatch(viewUploadedFiles());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);    