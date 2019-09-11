import React from 'react';

export const stateToDisplayText = (state) => {
	
	let states = new Map([ 
		["FILES_RECEIVED", {text:"Finishing upload", classNames:"alert alert-success state-info"}],
		["METADATA_RECEIVED", {text:"Waiting for files...", classNames:"alert alert-primary state-info"}]
	]);
	
	if (states.get(state)) {
		return <div className={states.get(state).classNames}>{states.get(state).text}</div>;		
	}
	return "";
	
}
