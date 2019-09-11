import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';


export const stateToDisplayText = (state) => {
	
	let states = new Map([ 
		["FILES_RECEIVED", {text:"Finishing upload", classNames:"alert alert-success state-info"}],
		["METADATA_RECEIVED", {text:"Waiting for files...", classNames:"alert alert-primary state-info clickable"}]
	]);
	
	if (state === "FILES_RECEIVED") {
		return <div className={states.get(state).classNames}>{states.get(state).text}</div>;
	}
	
	if (state === "METADATA_RECEIVED") {
		return <span><div className={states.get(state).classNames}>{states.get(state).text}</div>
			<div className="additional-icon"><FontAwesomeIcon className="float-right" icon={faClock} size="lg" inverse/>
			</div></span>;
	}
	
	
	return "";
	
}
