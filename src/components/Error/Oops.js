import React, { Component } from 'react';
import { Navbar, Col, Row, Button } from 'react-bootstrap';


class Oops extends Component {
    render() {
        return (
            <div>
                <Navbar fluid className="nav-container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src="img/logo_KPMP-Data-Lake-Uploader.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Row id="oops-content">
                    <Col md={2}>
                        &nbsp;
                    </Col>
                    <Col md={8}>
                        <div className="media-left">
                            <img src="img/oops.png" alt="Oops, something went wrong" id="oops-image"/>
                        </div>
                        <div className="oops-content-right media-body">
                            <p className="oops-big">Oops...</p>
                            <p className="oops-small">Looks like something went wrong.<br/>We're working on it.</p>
                            <p className="oops-button-container"><Button className="btn btn-primary" onClick={() => window.location.href = "/"}>Back to Home</Button>
                            </p>
                        </div>
                    </Col>
                    <Col md={2}>
                        &nbsp;
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Oops;