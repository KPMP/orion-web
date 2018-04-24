import { connect } from 'react-redux';
import { updateFilesToUpload, updateFileDescription, appendToFileList, uploadPackageInfo } from '../../actions/UploadForm/UploadTabActions';
import UploadTab from './UploadTab';
import { submit } from 'redux-form'

const mapStateToProps = (state, props) =>
    ({
        filesToUpload: state.filesToUpload,
        fileDescription: state.fileDescription,
        fileList: state.fileList,
        packageInfo: state.packageInfo
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        updateFilesToUpload(files) {
            dispatch(updateFilesToUpload(files))
        },
        updateFileDescription(description) {
            dispatch(updateFileDescription(description))
        },
        appendToFileList(file) {
            dispatch(appendToFileList(file))
        },
        processUpload() {
            console.log('processUpload');
            dispatch(submit('uploadPackageInfoForm'))
        },
        uploadPackageInfo(formData) {
            console.log('uploadPackageInfo');
            dispatch(uploadPackageInfo(formData))
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadTab);