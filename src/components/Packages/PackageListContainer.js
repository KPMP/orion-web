import { connect } from 'react-redux';
import PackageList from './PackageList';
import { setDtds, setRefresh } from '../../actions/Packages/packageActions';
import { getStateEvents } from '../../actions/stateActions';

const mapStateToProps = (state, props) =>
({
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

	setRefresh(refresh) {
		dispatch(setRefresh(refresh));
	}
});
	
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);