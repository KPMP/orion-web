import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Countdown from 'react-countdown';

class SessionTimeoutModal extends Component {

    componentDidMount() {
        console.log(document.referrer);
    }

    renderer = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            window.location='https://welcome.kpmp.org/shibds/?entityID=https%3A%2F%2Fqa-upload.kpmp.org%2Fshibboleth&return=https%3A%2F%2Fqa-upload.kpmp.org%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Fqa-upload.kpmp.org%252F'
        }
    };

    minutesToMilliseconds = (minutes) => {
        return minutes * 60 * 1000;
    };

    render() {
        let countdown = <Countdown date={Date.now() + this.minutesToMilliseconds(1)} renderer={this.renderer}/>
        return(
            <React.Fragment>
            <Countdown date={Date.now() + this.minutesToMilliseconds(1)} renderer={this.renderer}/>
            <Countdown date={Date.now() + this.minutesToMilliseconds(0.5)}>
                <Modal zIndex={9999} isOpen={true} >
                    <ModalHeader>Session timeout</ModalHeader>
                    <ModalBody>
                        Your session is about to expire. Please login again.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => window.location='https://welcome.kpmp.org/shibds/?entityID=https%3A%2F%2Fqa-upload.kpmp.org%2Fshibboleth&return=https%3A%2F%2Fqa-upload.kpmp.org%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Fqa-upload.kpmp.org%252F'}>SIGN IN AGAIN</Button>{' '}
                    </ModalFooter>
                </Modal>
            </Countdown>
            </React.Fragment>
        );
    }
}

export default SessionTimeoutModal;
