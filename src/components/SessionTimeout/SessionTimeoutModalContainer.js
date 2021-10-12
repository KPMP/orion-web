import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SessionTimeoutModal from './SessionTimeoutModal';
import { sessionTimedOut, startTimer } from '../../actions/SessionTimeout/sessionTimeoutAction';

const mapStateToProps = (state, props) =>
    ({
        sessionIsTimedOut: state.sessionTimedOut
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        restartTimer() {
            dispatch(sessionTimedOut(false));
            startTimer(dispatch);
        },
        sessionTimedOut(isTimedOut) {
            dispatch(sessionTimedOut(isTimedOut));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionTimeoutModal));
