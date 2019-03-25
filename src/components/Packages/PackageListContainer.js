import { connect } from 'react-redux';
import PackageList from './PackageList';
import { getPackages } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
    packages: state.filtering,
	packageTypeIcons: state.packageTypeIcons
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	loadRemoteData() {
		dispatch(getPackages());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);