import { connect } from 'react-redux';
import UploadForm from './UploadForm';

const mapStateToProps = (state, props) =>
({
});
    
const mapDispatchToProps = (dispatch, props) =>
({
	postPackageInformation(packageInfo) {
		console.log("in post package information");
		console.log(packageInfo);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);    