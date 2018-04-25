import { showUploadModalAction, viewUploadedFiles } from '../actions/UploadForm/uploadTabActions';
import UploadPage from './UploadPage';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) =>
({
    shouldShowUploadModal: state.showUploadModal,
    uploadedFiles: state.uploadedFiles
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	showUploadModalAction() {
		dispatch(showUploadModalAction(true));
	},
	viewUploadedFiles() {
		dispatch(viewUploadedFiles());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);    