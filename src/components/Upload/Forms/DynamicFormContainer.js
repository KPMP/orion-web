import { connect } from 'react-redux';
import DynamicForm from './DynamicForm';
import {clearShowLargeFileModal, uploadPackage} from '../../../actions/Packages/packageActions';
import {getFormDTD} from "../../../actions/Upload/uploadActions";

const mapStateToProps = (state, props) =>
({
	isUploading: state.isUploading,
	formDTD: state.formDTD,
	userInformation: state.userInformation,
	codicil: state.showLargeFileModal
});

const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo, uploader) {
		dispatch(uploadPackage(packageInfo, uploader));
	},

	loadRemoteData() {
		getFormDTD()(dispatch);
	},

	clearShowLargeFileModal() {
		dispatch(clearShowLargeFileModal());
		dispatch(() => window.location = '/');
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);    