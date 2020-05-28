import React, { Component } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { getIcon, getMessage, PANEL_CONFIGS } from './packagePanelStateHelper';

const POPOVER_CLASSES = {
    classNames: '',
    innerClassNames: 'rounded p-2 small text-sm-left'
};

class PackagePanelStateText extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.configurePanelOptions = this.configurePanelOptions.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
        	popoverOpen: !this.state.popoverOpen
        });
    }
    
    configurePanelOptions() {
    	let baseConfig = PANEL_CONFIGS[this.props.panelState.state];
    	let panelConfig = baseConfig;
    	panelConfig.message = getMessage(baseConfig, this.props.panelState.state, this.props.largeFileUpload, this.props.currentUser.email, this.props.packageSubmitter.email);
    	if (this.props.handleStateInfoClick) {
    		panelConfig.icon = getIcon(this.props.panelState.state, this.props.largeFileUpload, this.props.currentUser.email, this.props.packageSubmitter.email);
    	}
    	return panelConfig;
    }
    
    render() {
    	let panelConfig = this.configurePanelOptions();

        if(panelConfig === undefined) {
            return null;
        }
        
        let currentState = this.props.panelState.state;
        let stateDisplayText = this.props.stateDisplayMap.filter(function(stateDisplayItem) {
        	if(stateDisplayItem.state === currentState) {
        		return stateDisplayItem;
        	} else {
        		return '';
        	}
        }, currentState);
        let alertClass = 'alert-' + stateDisplayText[0].apps.dlu.alertType;
        
        let popoverTargetId = 'popover-' + this.props.panelState.packageId;
        
        return <React.Fragment>
            <div className='d-flex align-items-start'>
                <div className='w-75'>
                    <div className={'mr-2 my-0 px-2 py-1 alert clickable text-dark ' + alertClass} id={popoverTargetId} >
                        <span>{stateDisplayText[0].apps.dlu.text}</span>
                    </div>
                    { panelConfig.message &&
                        <span>
                            <Popover className={POPOVER_CLASSES.classNames}
                                     innerClassName={POPOVER_CLASSES.innerClassNames}
                                     placement={'bottom'}
                                     delay={{'hide': 300}}
                                     isOpen={this.state.popoverOpen}
                                     toggle={this.toggle}
                                     target={popoverTargetId}
                            		 html={true}
                            		 trigger={'hover'}>
                                <PopoverBody>{panelConfig.message}</PopoverBody>
                            </Popover>
                        </span>
                    }
                </div>
                { panelConfig.icon && 
                	<span onClick={this.props.handleStateInfoClick}>
                        <div className='additional-icon clickable'><FontAwesomeIcon className='float-right' icon={panelConfig.icon} size='lg' inverse/></div>
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