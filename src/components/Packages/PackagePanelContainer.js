import { connect } from 'react-redux';
import PackagePanel from './PackagePanel';
import { handleError } from '../../actions/Error/errorActions';

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
	handleError() {
		dispatch(handleError());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagePanel);