import { stateToDisplayText } from './stateToDisplayText';
import React from 'react';

describe("mapStateToDisplayText", () => {
	it("should return the correct display text for state FILES_RECEIVED", () => {
		expect(stateToDisplayText("FILES_RECEIVED")).toEqual(<div className="alert alert-success state-info">Finishing upload</div>);
	});
	
	it("should return the correct display text for state METADAT_RECEIVED", () => {
		expect(stateToDisplayText("METADATA_RECEIVED")).toEqual(<div className="alert alert-primary state-info clickable">Waiting for files...</div>);
	});
	
	it("should return undefined when unknown state", () => {
		expect(stateToDisplayText("NOT_A_REAL_STATE")).toBe("");
	})
	
});