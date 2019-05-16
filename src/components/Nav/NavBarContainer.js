import { connect } from 'react-redux';
import NavBar from './NavBar';
import { getUserInformation } from '../../actions/userActions';

const mapStateToProps = (state, props) =>
({
	userInformation: state.userInformation
});

const mapDispatchToProps = (dispatch, props) =>
({
	loadRemoteData: () => {
		dispatch(getUserInformation());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);    