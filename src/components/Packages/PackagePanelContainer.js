import { connect } from 'react-redux';
import PackagePanel from './PackagePanel';

const mapStateToProps = (state, props) =>
({
	currentDTD: state.formDTD,
	dtds: state.dtds,
	packageTypeIcons: state.packageTypeIcons,
	index: props.index,
	uploadPackage: props.uploadPackage,
});
    
const mapDispatchToProps = (dispatch, props) =>
({
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagePanel);