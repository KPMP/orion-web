import { connect } from 'react-redux';
import { updateFilesToUpload, updateFileDescription, appendToFileList, uploadPackageInfo, 
	changeUploadTab, showUploadModalAction, viewUploadedFiles, clearFileList, showFileProgressModalAction, setPackageInfo, updateUploadStatus } from '../../actions/UploadForm/uploadTabActions';
import UploadModal from './UploadModal';
import { submit } from 'redux-form';

const mapStateToProps = (state, props) =>
    ({
        form: state.form,
        filesToUpload: state.filesToUpload,
        fileDescription: state.fileDescription,
        fileList: state.fileList,
        packageInfo: state.packageInfo,
        currentTab: state.currentTab,
        showFileProgressModal: state.showFileProgressModal,
        uploadStatus: state.uploadStatus
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        updateFilesToUpload(files) {
            dispatch(updateFilesToUpload(files));
        },
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
        },
        updateUploadStatus(status) {
            dispatch(updateUploadStatus(status));
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);