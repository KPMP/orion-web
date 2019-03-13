import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col, Row, Button } from 'reactstrap';

class Oops extends Component {
    render() {
        return (
            <article className="container-fluid">
                <Navbar className="container-fluid">
                    <NavbarBrand>
                        <img src="img/logo.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                    </NavbarBrand>
                </Navbar>
                <Row id="oops-content">
                    <Col xs={0} md={2}>&nbsp;</Col>
                    <Col xs={12} md={4} className={"text-center"}>
                        <img src="img/oops.png" alt="Oops, something went wrong" id="oops-image"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <p className="oops-big">Oops...</p>
                        <p className="oops-small">Looks like something went wrong.<br/>We're working on it.</p>
                        <p className="oops-button-container">
                            <Button className="btn btn-primary"
                                    onClick={() => window.location.href = "/"}>
                                    Back to Home
                            </Button>
                        </p>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default Oops;