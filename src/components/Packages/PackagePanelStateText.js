import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        text: "Finishing upload",
        classNames: "block no-underline alert alert-success state-info text-dark",
        tooltip: {
            classNames: "",
            innerClassNames: "border rounded border-dark p-2 small bg-light text-secondary text-sm-left",
            arrowClassNames: "panel-state-tooltip-arrow",
            text: "The file(s) in this package are being finalized.  Once completed, they will be available for download."
        }
    },

    METADATA_RECEIVED: {
        text: "Waiting for files...",
        classNames: "block no-underline alert alert-primary state-info text-dark",
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
        let tooltipTargetId = 'tooltip-' + this.props.panelState.packageId;

        if(panelConfig === undefined) {
            return null;
        }

        return <React.Fragment>
            <a className={panelConfig.classNames} id={tooltipTargetId} href="#">
                <span>{panelConfig.text}</span>
            </a>
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
            { panelConfig.icon && this.props.handleStateInfoClick &&
                <span onClick={this.props.handleStateInfoClick}>
                    <div className="additional-icon clickable"><FontAwesomeIcon className="float-right" icon={panelConfig.icon} size="lg" inverse/></div>
                </span>
            }
        </React.Fragment>;
    }
}

PackagePanelStateText.propTypes = {
    panelState: PropTypes.object.isRequired,
    handleStateInfoClick: PropTypes.func
};

export default PackagePanelStateText;