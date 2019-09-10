export const stateToDisplayText = (state) => {
	
	let states = new Map([ 
		["FILES_RECEIVED", "Finishing upload"],
		["METADATA_RECEIVED", "Waiting for files"]
	]);
	
	return states.get(state);
	
}
