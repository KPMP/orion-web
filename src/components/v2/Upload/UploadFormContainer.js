import { connect } from 'react-redux';
import UploadForm from './UploadForm';

const mapStateToProps = (state, props) =>
({
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation() {
		console.log("in post package information");
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);    