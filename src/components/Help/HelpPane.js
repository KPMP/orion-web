import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class HelpPane extends Component {

    render() {
        return (
            <article id="help-pane" className="container py-3">
                <section className="py-2">
                    <h4 className="text-dark">Need Help?</h4>
                    <p>
                        If you have questions or issues to report, email <a href="mailto:upload-support@kpmp.org">upload-support@kpmp.org</a>.
                    </p>
                    <h4 className="text-dark">About the Data Lake Uploader</h4>
                    <p>Short overview of the Data Lake Uploader.  orem ipsum dolor amet authentic cred hexagon, viral woke lo-fi whatever pinterest live-edge migas. Before they sold out locavore food truck tacos roof party keytar franzen, biodiesel bitters XOXO man bun. Vegan pinterest organic ethical freegan fanny pack literally synth. Etsy cred VHS kitsch man braid meditation selfies whatever actually tousled hexagon cliche forage.
                        Lo-fi tumeric vegan pinterest try-hard flannel fashion axe viral squid ethical fixie kitsch fingerstache raw denim. Meditation brooklyn gluten-free hashtag waistcoat, distillery taxidermy kitsch beard hell of church-key bushwick lomo aesthetic. Snackwave XOXO air plant meditation, typewriter chicharrones enamel pin disrupt photo booth tattooed. Vice schlitz actually poutine normcore literally tilde beard palo santo pug crucifix drinking vinegar roof party pour-over whatever. Waistcoat chillwave af hella, farm-to-table fanny pack iceland poutine succulents disrupt aesthetic.</p>
                </section>
                <section className="py-2">
                    <h4 className="text-dark">How to use</h4>
                    <div id="help-howto-container"
                         className="d-flex border border-secondary bg-light w-100 align-items-center justify-content-center">
                        <i>Tutorial section of how to use this tool.</i>
                    </div>
                </section>
                <section className="py-2">
                    <h4 className="text-dark">Metadata Versions</h4>
                    <Row>
                        <Col xs={12}>
                            <table className="table">
                                <thead className="bg-light text-dark"><tr>
                                    <th scope="col">Version</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Description</th>
                                </tr></thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">v1.0</th>
                                        <td>2019-03-25</td>
                                        <td>Description notes, blah blah blah</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </section>
            </article>
        );
    }
}

export default HelpPane;