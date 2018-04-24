import { connect } from 'react-redux';
import { updateFilesToUpload, updateFileDescription, appendToFileList, uploadPackageInfo, 
	changeUploadTab, showUploadModalAction } from '../../actions/UploadForm/uploadTabActions';
import UploadTab from './UploadTab';
import { submit } from 'redux-form';

const mapStateToProps = (state, props) =>
    ({
        filesToUpload: state.filesToUpload,
        fileDescription: state.fileDescription,
        fileList: state.fileList,
        packageInfo: state.packageInfo,
        currentTab: state.currentTab
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
        },
        uploadPackageInfo(formData) {
            dispatch(uploadPackageInfo(formData));
        },
        changeUploadTab(newTabIndex) {
        		dispatch(changeUploadTab(newTabIndex));
        },
        showUploadModal(visible) {
        		dispatch(showUploadModalAction(visible));
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadTab);