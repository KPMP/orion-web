import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const TOOLTIP_CLASSES = {
    classNames: "",
    innerClassNames: "border rounded border-dark p-2 small text-sm-left"
};

const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        text: "Finishing upload",
        classNames: "alert-success",
        tooltip: "The file(s) in this package are being finalized.  Once completed, they will be available for download."
    },

    METADATA_RECEIVED: {
        text: "Waiting for files...",
        classNames: "alert-primary",
        icon: faClock,
        tooltip: "Awaiting file(s) to be uploaded to the Google drive folder.  Click the clock icon for upload instructions."
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
            <div className="d-flex align-items-start">
                <div className="w-75">
                    <div className={"mr-2 my-0 px-2 py-1 alert clickable text-dark " + panelConfig.classNames} id={tooltipTargetId} >
                        <span>{panelConfig.text}</span>
                    </div>
                    { panelConfig.tooltip &&
                        <span>
                            <Tooltip className={TOOLTIP_CLASSES.classNames}
                                     innerClassName={TOOLTIP_CLASSES.innerClassNames}
                                     placement={"bottom"}
                                     delay={0}
                                     isOpen={this.state.tooltipOpen}
                                     toggle={this.toggle}
                                     target={tooltipTargetId}>
                                {panelConfig.tooltip}
                            </Tooltip>
                        </span>
                    }
                </div>
                { hasIcon && <span onClick={this.props.handleStateInfoClick}>
                        <div className="additional-icon clickable"><FontAwesomeIcon className="float-right" icon={panelConfig.icon} size="lg" inverse/></div>
                    </span>
                }
            </div>
        </React.Fragment>;
    }
}

PackagePanelStateText.propTypes = {
    panelState: PropTypes.object.isRequired,
    handleStateInfoClick: PropTypes.func
};

export default PackagePanelStateText;