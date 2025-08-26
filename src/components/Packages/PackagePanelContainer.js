import { connect } from 'react-redux';
import PackagePanel from './PackagePanel';

const mapStateToProps = (state, props) =>
({
	currentDTD: state.formDTD,
	dtds: state.dtds,
	packageTypeIcons: state.packageTypeIcons,
	index: props.index,
	uploadPackage: props.uploadPackage,
	recallPackage: props.recallPackage,
	userInformation: state.userInformation,
	stateDisplayMap: state.stateDisplayMap
});
    
const mapDispatchToProps = (dispatch, props) =>
({
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagePanel);