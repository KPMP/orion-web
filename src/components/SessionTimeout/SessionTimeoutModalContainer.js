import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SessionTimeoutModal from './SessionTimeoutModal';
import { setSessionStart } from '../../actions/SessionTimeout/sessionTimeoutAction';

const mapStateToProps = (state, props) =>
    ({
        sessionStart: state.sessionStart
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSessionStart(time) {
            dispatch(setSessionStart(time));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionTimeoutModal));
