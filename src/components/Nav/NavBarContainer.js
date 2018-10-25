import { connect } from 'react-redux';
import NavBar from './NavBar';

const mapStateToProps = (state, props) =>
({
	isUploading: state.isUploading,
	displayName: state.userInformation.displayName,
	firstName: state.userInformation.firstName,
	lastName: state.userInformation.lastName
});

const mapDispatchToProps = (dispatch, props) =>
({

});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);    