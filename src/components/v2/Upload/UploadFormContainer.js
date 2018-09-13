import { connect } from 'react-redux';
import UploadForm from './UploadForm';
import { uploadPackage } from '../../../actions/v2/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo, uploader) {
		dispatch(uploadPackage(packageInfo, uploader));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);    