import { connect } from 'react-redux';
import UploadForm from './UploadForm';
import { uploadPackage } from '../../../actions/v2/Packages/packageActions';
import { uploader } from './fineUploader';

const mapStateToProps = (state, props) =>
({
	uploader: uploader
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo) {
		dispatch(uploadPackage(packageInfo, uploader));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);    