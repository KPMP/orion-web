import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        text:"Finishing upload",
        classNames:"alert alert-success state-info",
        tooltip: "The file(s) in this package are being finalized.  Once completed, they will be available for download."
    },

    METADATA_RECEIVED: {
        text:"Waiting for files...",
        classNames:"alert alert-primary state-info",
        icon: faClock,
        tooltip: "Awaiting file(s) to be uploaded to the Google drive folder.  Click the clock icon for upload instructions."
    }
};

class PackagePanelStateText extends Component {

    render() {
        let panelConfig = PANEL_CONFIGS[this.props.panelState];

        if(panelConfig === undefined) {
            return null;
        }

        return <Col xs={4} md={12}>
            <div className={panelConfig.classNames}>{panelConfig.text}</div>
            { panelConfig.icon && this.props.handleStateInfoClick &&
                <span onClick={this.props.handleStateInfoClick}>
                    <div className="additional-icon clickable"><FontAwesomeIcon className="float-right" icon={panelConfig.icon} size="lg" inverse/></div>
                </span>
            }
        </Col>;
    }
}

PackagePanelStateText.propTypes = {
    panelState: PropTypes.string.isRequired,
    handleStateInfoClick: PropTypes.func
};

export default PackagePanelStateText;