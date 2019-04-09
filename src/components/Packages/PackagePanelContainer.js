import { connect } from 'react-redux';
import PackagePanel from './PackagePanel';
import { getDTDByVersion } from '../../actions/dtdActions';

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
	getDTDByVersion(version) {
		dispatch(getDTDByVersion(version));
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagePanel);