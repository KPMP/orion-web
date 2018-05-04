import { connect } from 'react-redux';
import { updateFileDescription, appendToFileList, uploadPackageInfo, changeUploadTab, showUploadModalAction, 
	viewUploadedFiles, clearFileList, showFileProgressModalAction, setPackageInfo, updateUploadStatus } from '../../actions/UploadForm/uploadTabActions';
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
        uploadStatus: state.uploadDialog.uploadStatus
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        updateFileDescription(description) {
            dispatch(updateFileDescription(description));
        },
        appendToFileList(file) {
            dispatch(appendToFileList(file));
        },
        processUpload() {
        	dispatch(submit('uploadPackageInfoForm'));
            // dispatch(viewUploadedFiles());
        },
        uploadPackageInfo(formData) {
            dispatch(uploadPackageInfo(formData));
        },
        changeUploadTab(newTabIndex) {
        		dispatch(changeUploadTab(newTabIndex));
        },
        showUploadModal(visible) {
        		dispatch(showUploadModalAction(visible));
        		dispatch(changeUploadTab(0));
        },
        viewUploadedFiles() {
        		dispatch(viewUploadedFiles());
        },
        clearFileList() {
        		dispatch(clearFileList());
        },
        showFileProgress(visible) {
            dispatch(showFileProgressModalAction(visible));
        },
        resetModals() {
            dispatch(showFileProgressModalAction(false));
            dispatch(showUploadModalAction(false));
            dispatch(setPackageInfo(null));
            dispatch(updateUploadStatus(""));
            dispatch(changeUploadTab(0));
            dispatch(viewUploadedFiles());
        },
        updateUploadStatus(status) {
            dispatch(updateUploadStatus(status));
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);