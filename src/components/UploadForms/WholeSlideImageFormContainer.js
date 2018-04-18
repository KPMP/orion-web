import { connect } from 'react-redux';
import { uploadFile } from '../../actions/UploadForm/uploadFormAction';
import WholeSlideImageForm from './WholeSlideImageForm';

const mapStateToProps = (state, props) =>
    ({

    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        handleUpload(data) {
            dispatch(uploadFile(data))
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(WholeSlideImageForm);