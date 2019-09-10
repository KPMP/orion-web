import { connect } from 'react-redux';
import { clearShowLargeFileModal } from '../../actions/Packages/packageActions';
import PackagePanel from './PackagePanel';

const mapStateToProps = (state, props) =>
({
	currentDTD: state.formDTD,
	dtds: state.dtds,
	packageTypeIcons: state.packageTypeIcons,
	index: props.index,
	uploadPackage: props.uploadPackage,
	showLargeFileModal : state.showLargeFileModal
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	clearShowLargeFileModal() {
		dispatch(clearShowLargeFileModal());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagePanel);