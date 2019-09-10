import { stateToDisplayText } from './stateToDisplayText';

describe("mapStateToDisplayText", () => {
	it("should return the correct display text for state FILES_RECEIVED", () => {
		expect(stateToDisplayText("FILES_RECEIVED")).toEqual("Finishing upload");
	});
	
	it("should return the correct display text for state METADAT_RECEIVED", () => {
		expect(stateToDisplayText("METADATA_RECEIVED")).toEqual("Waiting for files");
	});
	
	it("should return undefined when unknown state", () => {
		expect(stateToDisplayText("NOT_A_REAL_STATE")).toBe(undefined);
	})
	
});