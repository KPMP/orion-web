import { connect } from 'react-redux';
import DynamicForm from './Forms/DynamicForm';
import { uploadPackage } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
	isUploading: state.isUploading,
	userInformation: state.userInformation,
	formDTD: state.formDTD
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo, uploader) {
		dispatch(uploadPackage(packageInfo, uploader));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);    