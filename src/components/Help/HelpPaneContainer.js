import { connect } from 'react-redux';
import HelpPane from './HelpPane';
import {getReleases} from "../../actions/Release/releaseActions";

const mapStateToProps = (state, props) =>
    ({
        help: state.help
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        loadRemoteData() {
            dispatch(getReleases());
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(HelpPane);