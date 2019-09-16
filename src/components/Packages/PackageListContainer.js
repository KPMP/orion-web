import { connect } from 'react-redux';
import PackageList from './PackageList';
import { getPackages, getPackageEvents } from '../../actions/Packages/packageActions';

const mapStateToProps = (state, props) =>
({
	packages: state.filtering,
	formDTD: state.formDTD,
	packageTypeIcons: state.packageTypeIcons
});

const mapDispatchToProps = (dispatch, props) =>
({
	loadRemoteData() {
		dispatch(getPackages());
	},

	poll(callback) {
		dispatch(getPackageEvents(callback));
	}
});
	
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);