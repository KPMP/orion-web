import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col, Row, Button } from 'reactstrap';
import NavFooter from '../Nav/NavFooter';
import NavUser from "../Nav/NavUser";

class Oops extends Component {
    render() {
        return (
            <article className="container-fluid">
                <Navbar id="navbar" className="px-1 py-1 fixed-top">
                    <Col sm={12}>
                        <div className="navbar-header">
                            <NavbarBrand className="d-flex align-items-center">
                                <img src="img/logo.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                                <span className="ml-2">Data Lake Uploader</span>
                            </NavbarBrand>
                        </div>
                    </Col>
                </Navbar>
                <Row id="oops-content">
                    <Col xs={0} md={2}>&nbsp;</Col>
                    <Col xs={12} md={4} className={"text-center"}>
                        <img src="img/oops.png" alt="Oops, something went wrong" id="oops-image"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <p className="oops-big">Oops...</p>
                        <p className="oops-small">Looks like something went wrong.<br/>We&#39;re working on it.</p>
                        <p className="oops-button-container">
                            <Button className="btn btn-primary"
                                    onClick={() => window.location.href = "/"}>
                                    Back to Home
                            </Button>
                        </p>
                    </Col>
                </Row>
                <NavFooter/>
            </article>
        );
    }
}

export default Oops;