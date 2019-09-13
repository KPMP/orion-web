import { stateToDisplayText, getAdditionalIcon } from './stateToDisplayText';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

describe("mapStateToDisplayText", () => {
	it("should return the correct display text for state FILES_RECEIVED", () => {
		expect(stateToDisplayText("FILES_RECEIVED")).toEqual(<div className="alert alert-success state-info">Finishing upload</div>);
	});
	
	it("should return the correct display text for state METADATA_RECEIVED", () => {
		expect(stateToDisplayText("METADATA_RECEIVED")).toEqual(<div className="alert alert-primary state-info">Waiting for files...</div>);
	});
	
	it("should return undefined when unknown state", () => {
		expect(stateToDisplayText("NOT_A_REAL_STATE")).toBe("");
	});
	
});

describe("getAdditionalIcon", () => {
	it("should return correct item when state is METADATA_RECEIVED", () => {
		expect(getAdditionalIcon("METADATA_RECEIVED")).toEqual(<div className="additional-icon clickable"><FontAwesomeIcon className="float-right" icon={faClock} size="lg" inverse/></div>);
	});
	it("should return '' when state is anything else", () => {
		expect(getAdditionalIcon("FAKE_STATE")).toEqual("");
	});
});