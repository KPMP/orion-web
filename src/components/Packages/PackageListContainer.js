import { connect } from 'react-redux';
import PackageList from './PackageList';
import { getPackages } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
    packages: state.packages,
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	getPackages() {
		dispatch(getPackages());
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);    