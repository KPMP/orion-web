import { connect } from 'react-redux';
import PackageList from './PackageList';
import { getPackages } from '../../actions/Packages/packageActions';
import { getStateEvents } from '../../actions/stateActions';

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
		dispatch(getStateEvents(callback));
	}
});
	
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);