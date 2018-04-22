import { connect } from 'react-redux';
import { updateFilesToUpload, updateFileDescription, appendToFileList, uploadPackageInfo } from '../../actions/UploadForm/UploadTabActions';
import UploadTab from './UploadTab';
import { submit } from 'redux-form'

const mapStateToProps = (state, props) =>
    ({
        filesToUpload: state.filesToUpload,
        fileDescription: state.fileDescription,
        fileList: state.fileList
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        updateFilesToUpload(files) {
            dispatch(updateFilesToUpload(files))
        },
        updateFileDescription(description) {
            dispatch(updateFileDescription(description))
        },
        appendToFileList(fileID, fileName, description) {
            dispatch(appendToFileList(fileID, fileName, description))
        },
        processUpload() {
            dispatch(submit('uploadPackageInfoForm'))
        },
        uploadPackageInfo(formData) {
            dispatch(uploadPackageInfo(formData))
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadTab);