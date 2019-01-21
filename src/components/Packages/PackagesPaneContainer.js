import { connect } from 'react-redux';
import PackagesPane from './PackagesPane';
import { addFilter } from '../../actions/filterActions';

const mapStateToProps = (state, props) =>
({
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	addFilter(type, value) {
		dispatch(addFilter(type, value));
	}
});
    
export default connect(mapStateToProps, mapDispatchToProps)(PackagesPane);