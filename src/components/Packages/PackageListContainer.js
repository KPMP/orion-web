import { connect } from 'react-redux';
import PackageList from './PackageList';
import { getPackages } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
    packages: state.filtering,
    formDTD: state.formDTD,
	packageTypeIcons: state.packageTypeIcons,
	forms: state.forms
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	loadRemoteData() {
		dispatch(getPackages());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);