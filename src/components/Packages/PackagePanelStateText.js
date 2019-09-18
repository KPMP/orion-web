import React, { Component } from 'react';
import { Row, Col, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        text: "Finishing upload",
        classNames: "m-0 px-2 py-1 alert alert-success clickable text-dark",
        tooltip: {
            classNames: "",
            innerClassNames: "border rounded border-dark p-2 small bg-light text-secondary text-sm-left",
            arrowClassNames: "panel-state-tooltip-arrow",
            text: "The file(s) in this package are being finalized.  Once completed, they will be available for download."
        }
    },

    METADATA_RECEIVED: {
        text: "Waiting for files...",
        classNames: "m-0 px-2 py-1 alert alert-primary clickable text-dark",
        icon: faClock,
        tooltip: {
            classNames: "",
            innerClassNames: "border rounded border-dark p-2 small bg-light text-secondary text-sm-left",
            arrowClassNames: "panel-state-tooltip-arrow",
            text: "Awaiting file(s) to be uploaded to the Google drive folder.  Click the clock icon for upload instructions."
        }
    }
};

class PackagePanelStateText extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        let panelConfig = PANEL_CONFIGS[this.props.panelState.state];

        if(panelConfig === undefined) {
            return null;
        }

        let tooltipTargetId = 'tooltip-' + this.props.panelState.packageId;
        let hasIcon = panelConfig.icon && this.props.handleStateInfoClick;

        return <React.Fragment>
            <Row className="no-gutters">
                <Col xs={4} md={9}>
                    <div className={panelConfig.classNames} id={tooltipTargetId} >
                        <span>{panelConfig.text}</span>
                    </div>
                    { panelConfig.tooltip &&
                        <span>
                            <Tooltip className={panelConfig.tooltip.classNames}
                                     innerClassName={panelConfig.tooltip.innerClassNames}
                                     placement={"bottom"}
                                     delay={0}
                                     isOpen={this.state.tooltipOpen}
                                     toggle={this.toggle}
                                     target={tooltipTargetId}>
                                {panelConfig.tooltip.text}
                            </Tooltip>
                        </span>
                    }
                </Col>
                { hasIcon &&
                    <Col xs={8} md={3}>
                        <span onClick={this.props.handleStateInfoClick}>
                            <div className="additional-icon clickable"><FontAwesomeIcon className="float-right" icon={panelConfig.icon} size="lg" inverse/></div>
                        </span>
                    </Col>
                }
            </Row>
        </React.Fragment>;
    }
}

PackagePanelStateText.propTypes = {
    panelState: PropTypes.object.isRequired,
    handleStateInfoClick: PropTypes.func
};

export default PackagePanelStateText;