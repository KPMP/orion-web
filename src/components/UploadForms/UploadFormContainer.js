import { connect } from 'react-redux';
import { uploadFile } from '../../actions/UploadForm/uploadFormAction';
import UploadForm from './UploadForm';

const mapStateToProps = (state, props) =>
    ({
        uploadResponse: state.uploadResponse
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        handleUpload(data) {
            dispatch(uploadFile(data))
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);