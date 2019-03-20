import { connect } from 'react-redux';
import PackagesPane from './PackagesPane';
import {addFilter, getUsers, removeFilter} from '../../actions/filterActions';
import {getUserInformation} from "../../actions/userActions";

const mapStateToProps = (state, props) =>
({
	users: state.filtering.userList
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	addFilter(type, value) {
		dispatch(addFilter(type, value));
	},

	removeFilter(type, value) {
		dispatch(removeFilter(type, value));
	},

	loadRemoteData() {
		getUserInformation()(dispatch);
		getUsers()(dispatch);
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagesPane);