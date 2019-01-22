import { connect } from 'react-redux';
import PackagesPane from './PackagesPane';
import { addFilter, removeFilter } from '../../actions/filterActions';

const mapStateToProps = (state, props) =>
({
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	addFilter(type, value) {
		dispatch(addFilter(type, value));
	},
	removeFilter(type, value) {
		dispatch(removeFilter(type, value));
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagesPane);