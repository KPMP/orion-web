import { connect } from 'react-redux';
import { updateFilesToUpload } from '../../actions/UploadForm/uploadTabActions';
import UploadTab from './UploadTab';

const mapStateToProps = (state, props) =>
    ({
        filesToUpload: state.filesToUpload
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        updateFilesToUpload(files) {
            dispatch(updateFilesToUpload(files))
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadTab);