import { connect } from 'react-redux';
import PackagePanel from './PackagePanel';
import { uploadFiles, replaceFile } from "../../actions/Packages/packageActions";

const mapStateToProps = (state, props) =>
({
	currentDTD: state.formDTD,
	dtds: state.dtds,
	packageTypeIcons: state.packageTypeIcons,
	index: props.index,
	uploadPackage: props.uploadPackage,
	lockPackage: props.lockPackage,
	updatePackageMetadata: props.updatePackageMetadata,
	userInformation: state.userInformation,
	stateDisplayMap: state.stateDisplayMap
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	uploadFiles(packageId, uploader) {
		dispatch(uploadFiles(packageId, uploader));
	},
	replaceFile(packageId, fileId, uploader) {
		dispatch(replaceFile(packageId, fileId, uploader));
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagePanel);