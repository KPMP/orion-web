import React, { Component } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { getIcon, getMessage, getClickEvent, getDisplayInfo } from './packagePanelStateHelper';
import { faClock } from '@fortawesome/free-solid-svg-icons';

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
		let panelConfig = {};
		panelConfig.message = getMessage(this.props.panelState.state, this.props.largeFileUpload, this.props.currentUser.email, this.props.packageSubmitter.email);
		if (this.props.handleStateInfoClick) {
			panelConfig.icon = getIcon(this.props.panelState.state, this.props.largeFileUpload, this.props.currentUser.email, this.props.packageSubmitter.email, this.props.stateDisplayMap);
		}
		return panelConfig;
    }
    
    render() {
    	let panelConfig = this.configurePanelOptions();

        if(!panelConfig) {
            return null;
        }
        
        let clickEvent = getClickEvent(this.props.panelState.state, this.props.stateDisplayMap, this.props.handleStateInfoClick);
        
        let stateDisplayInfo = getDisplayInfo(this.props.panelState.state, this.props.stateDisplayMap);
        
        let alertClass = '';
        if (stateDisplayInfo) {
        	alertClass = 'alert-' + stateDisplayInfo.apps.dlu.alertType;
        }
        
        let popoverTargetId = 'popover-' + this.props.panelState.packageId;
        console.log({
            roles: this.props.currentUser?.roles,
            isDeveloper: this.props.currentUser?.roles.includes("uw_rit_kpmp_role_developer"),
            isSubmitter: this.props.packageSubmitter.email === this.props.currentUser.email,
            panelConfig: panelConfig
         });
         

        return <React.Fragment>
            <div className='d-flex align-items-start'>
            	{ stateDisplayInfo &&
	                <div className='w-75'>
	                    <div className={'mr-2 my-0 px-2 py-1 alert clickable text-dark ' + alertClass} id={popoverTargetId} >
	                        <span>{ stateDisplayInfo.apps.dlu.text }</span>
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
            	}
                {
                (this.props.currentUser?.roles.includes("uw_rit_kpmp_role_developer") || 
                    this.props.packageSubmitter.email === this.props.currentUser.email) 
                    && panelConfig.message === "Awaiting file(s) to be uploaded. Click the clock icon for upload instructions." ? 
                       <span onClick={clickEvent}>
                          <div className='additional-icon clickable'>
                             <FontAwesomeIcon className='float-right' icon={faClock} size='lg' inverse />
                          </div>
                       </span>
                    :
                    null
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