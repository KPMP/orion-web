import { connect } from 'react-redux';
import NavBar from './NavBar';

const mapStateToProps = (state, props) =>
({
	isUploading: state.isUploading
});

const mapDispatchToProps = (dispatch, props) =>
({

});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);    