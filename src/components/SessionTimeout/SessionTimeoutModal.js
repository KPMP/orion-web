import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Countdown from 'react-countdown';

class SessionTimeoutModal extends Component {

    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    welcomeURL = 'https://welcome.kpmp.org/shibds/?entityID=https%3A%2F%2Fqa-upload.kpmp.org%2Fshibboleth&return=https%3A%2F%2Fqa-upload.kpmp.org%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Fqa-upload.kpmp.org%252F';

    componentDidMount() {
        console.log(document.referrer);
    }

    minutesToMilliseconds = (minutes) => {
        return minutes * 60 * 1000;
    };

    rendererModal = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            return (
            <Modal zIndex={9999} isOpen={true} >
                <ModalHeader>Session timeout</ModalHeader>
                <ModalBody>
                    Your session is about to expire. Please login again.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => window.location = this.welcomeURL}>SIGN IN AGAIN</Button>{' '}
                </ModalFooter>
            </Modal>)
        } else {
            return (null);
        }
    };

    rendererRedirect = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            window.location = this.welcomeURL;
            return (null);
        }
    };

    render() {
        return(
            <React.Fragment>
                <Countdown date={Date.now() + this.minutesToMilliseconds(0.5)} renderer={this.rendererRedirect}/>
                <Countdown date={Date.now() + this.minutesToMilliseconds(0.25)} renderer={this.rendererModal}/>
            </React.Fragment>
        );
    }
}

export default SessionTimeoutModal;
