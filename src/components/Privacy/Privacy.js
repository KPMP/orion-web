import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';

class PrivacyStatement extends Component {
    render() {
        return (
            <article className="container justify-content-center pt-3">
                <Row>
                    <Col xs={12}>
                        <h1>MiKTMC Uploader Privacy Statement</h1>
                        <p>Updated: April 16, 2024</p>
                        <p>&nbsp;</p>
                        <p>The MiKTMC Uploader and its content is administered by the Michigan Kidney Translational Medicine Center (miktmc.org) under the upload.miktmc.org domain. This policy only applies to site content under upload.miktmc.org, but not necessarily to additional sites under the miktmc.org domain.</p>
                        <h2>How we collect information</h2>
                        <p>MiKTMC collects personal information in the following ways:</p>
                        <ul>
                        <li>Automatically by your institution, when you authenticate using your institution’s login credentials.</li>
                        <li>Automatically by our partner, InCommon Discovery Service, or other third-party identity providers contracted by us to authenticate and collect data.</li>
                        </ul>
                            <h2>What type of information do we collect</h2>
                        <p>By using the aforementioned authentication systems, MiKTMC collects or has access to the following information from use of the Uploader:</p>
                        <ul>
                            <li>Email address</li>
                            <li>First and last name</li>
                            <li>Institutional identifier (EPPN) if your institution is part of the InCommon Federation
                            </li>
                            <li>Internet domain from which you access the application</li>
                            <li>Name and IP address assigned to your device</li>
                            <li>Type of device and browser you are using</li>
                            <li>Date and time when you are using this application</li>
                            <li>Interactions and content added to the application</li>
                        </ul>
                        <h2>With whom this information will be shared </h2>
                        <p>MiKTMC does not sell or rent your personal information to any third parties. Individually identifiable information may be shared as required by MiKTMC, The CureGN Consortium, The Neptune Consortium, or by law, including sharing with government agencies to aid in an investigation</p>
                        <h2>Contact</h2>
                        <p>For questions regarding this privacy statement, please contact <a href="mailto: miktmc-help@umich.edu">miktmc-help@umich.edu</a>.</p>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default PrivacyStatement;