import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';

class PrivacyStatement extends Component {
    render() {
        return (
            <article className="container justify-content-center pt-3">
                <Row>
                    <Col xs={12}>
                        <h1>MiKTMC Uploader Privacy Notice</h1>
                        <p>[Updated: April 16, 2024]</p>
                        <h2>Overview</h2>
                        <p>The MiKTMC Uploader is administered by the Michigan Kidney Translational Medicine
                            Core (miktmc.org) and maintains the content under the upload.miktmc.org domain. This policy
                            applies to site content at upload.miktmc.org, but not necessarily to additional sites in the
                            miktmc.org domain.</p>

                        <p>For questions or concerns about this policy, please email our website administrator:
                            <a href="mailto: miktmc-help@umich.edu">miktmc-help@umich.edu</a></p>
                        <h2>Collection</h2>
                        <p>MiKTMC collects personal information in the following ways:</p>
                        <p>Automatically by your institution, when you authenticate using your institution’s login
                            credentials.</p>
                        <p>Automatically by our partner, InCommon Discovery Service or other third-party identity
                            providers, contracted by us to authenticate and collect data.</p>
                        MiKTMC collects or has access to the following information from you with your use of the
                        Uploader:
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
                        <h2>Sharing</h2>
                        <p>We do not sell or rent your personal information to any third parties.
                            Individually identifiable information may be shared as required by MiKTMC, The CureGN
                            Consortium, The Neptune Consortium, or by law, including sharing with government agencies to
                            aid in an investigation.</p>
                        <h2>Contact</h2>
                        <p>Please contact <a href="mailto: miktmc-help@umich.edu">miktmc-help@umich.edu</a> for questions regarding this privacy notice.</p>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default PrivacyStatement;