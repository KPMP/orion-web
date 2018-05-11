import { connect } from 'react-redux';
import { updateFileDescription, appendToFileList, uploadPackageInfo, changeUploadTab, showUploadModalAction, 
	viewUploadedFiles, showFileProgressModalAction, updateUploadStatus, removeFileFromList,
	resetUploadModal} from '../../actions/UploadForm/uploadTabActions';
import UploadModal from './UploadModal';
import { submit } from 'redux-form';

const mapStateToProps = (state, props) =>
    ({
        form: state.form,
        fileDescription: state.uploadDialog.fileDescription,
        fileList: state.uploadDialog.fileList,
        packageInfo: state.uploadDialog.packageInfo,
        currentTab: state.uploadDialog.currentTab,
        showFileProgressModal: state.uploadDialog.showFileProgressModal,
        uploadStatus: state.uploadDialog.uploadStatus,
        showUploadModal: state.uploadDialog.showUploadModal
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
	    	appendToFileList(file) {
	    		dispatch(appendToFileList(file));
	    	},
	    	changeUploadTab(newTabIndex) {
	    		dispatch(changeUploadTab(newTabIndex));
	    	},
        processUpload() {
        		dispatch(submit('uploadPackageInfoForm'));
        },
        removeFileFromList(index) {
        		dispatch(removeFileFromList(index));
        },
        resetModals() {
	        	dispatch(resetUploadModal());
	        	dispatch(viewUploadedFiles());
        },
        showFileProgress(visible) {
        		dispatch(showFileProgressModalAction(visible));
        },
        updateFileDescription(description) {
        		dispatch(updateFileDescription(description));
        },
        uploadPackageInfo(formData) {
            dispatch(uploadPackageInfo(formData));
        },
        updateShowUploadModal(visible) {
        		dispatch(showUploadModalAction(visible));
        },
        updateUploadStatus(status) {
            dispatch(updateUploadStatus(status));
        },
        viewUploadedFiles() {
        		dispatch(viewUploadedFiles());
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);