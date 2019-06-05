import { connect } from 'react-redux';
import DynamicForm from './DynamicForm';
import { uploadPackage } from '../../../actions/Packages/packageActions';
import {getFormDTD} from "../../../actions/Upload/uploadActions";

const mapStateToProps = (state, props) =>
({
	isUploading: state.isUploading,
	formDTD: state.formDTD
});

const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo, uploader) {
		dispatch(uploadPackage(packageInfo, uploader));
	},

	loadRemoteData() {
		getFormDTD()(dispatch);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);    