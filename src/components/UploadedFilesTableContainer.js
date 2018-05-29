import { connect } from 'react-redux';
import UploadedFilesTable from './UploadedFilesTable';

const mapStateToProps = (state, props) =>
({
    uploadedFiles: state.uploadedFiles
});
    
const mapDispatchToProps = (dispatch, props) =>
({
});
    
export default connect(mapStateToProps, mapDispatchToProps)(UploadedFilesTable);   