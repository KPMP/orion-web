import { connect } from 'react-redux';
import PackageList from './PackageList';
import { setDtds, setRefreshPackages } from '../../actions/Packages/packageActions';
import { getStateEvents } from '../../actions/stateActions';

const mapStateToProps = (state, props) =>
({
	refreshPackages: state.refreshPackages,
	filtering: state.filtering,
	formDTD: state.formDTD,
	packageTypeIcons: state.packageTypeIcons
});

const mapDispatchToProps = (dispatch, props) =>
({
	setDtds(packages) {
		dispatch(setDtds(packages));
	},

	poll(callback) {
		dispatch(getStateEvents(callback));
	},

	setRefreshPackages(refreshPackages) {
		dispatch(setRefreshPackages(refreshPackages));
	}
});
	
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);