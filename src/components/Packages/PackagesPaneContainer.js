import { connect } from 'react-redux';
import PackagesPane from './PackagesPane';
import { addFilter, getUsers, removeFilter } from '../../actions/filterActions';
import { getFormDTD } from "../../actions/Upload/uploadActions";
import { getPackageTypeIcons } from '../../actions/packageTypeIconsActions';

const mapStateToProps = (state, props) =>
({
	users: state.filtering.userList,
	packageTypes: state.filtering.packageTypes,
	tisNames: state.filtering.tisNames
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
		getUsers()(dispatch);
        getFormDTD()(dispatch);
		getPackageTypeIcons()(dispatch);
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagesPane);