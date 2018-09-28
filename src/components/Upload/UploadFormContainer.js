import { connect } from 'react-redux';
import UploadForm from './UploadForm';
import { uploadPackage } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
	isUploading: state.isUploading,
	userInformation: state.userInformation
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo, uploader) {
		dispatch(uploadPackage(packageInfo, uploader));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);    