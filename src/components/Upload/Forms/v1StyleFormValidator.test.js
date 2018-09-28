import { validate, validateNotEmpty, validateDate } from './v1StyleFormValidator';
import React from 'react';

describe("validate", () => {
	it("should return 'Required' in errors.submitterFirstName when no first name supplied", () => {
		let values = { "submitterFirstName": '' };
		let result = validate(values);
		expect(result.submitterFirstName).toEqual('Required');
	});
	it("should return undefined in errors.submitterFirstName when a first name supplied", () => {
		let values = { "submitterFirstName": 'firstName' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('submitterFirstName'));
	});
	it("should return 'Required' in errors.submitterLastName when no last name supplied", () => {
		let values = { 'submitterLastName': '' };
		let result = validate(values);
		expect(result.submitterLastName).toEqual('Required');
	});
	it("should return undefined in errors.submitterLastName when a last name supplied", () => {
		let values = { 'submitterLastName': 'last' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('submitterLastName'));
	});
	it("should return 'Required' in errors.institution when no institution supplied", () => {
		let values = { "institution": '' };
		let result = validate(values);
		expect(result.institution).toEqual('Required');
	});
	it("should return undefined in errors.institution when a institution supplied", () => {
		let values = { "institution": 'name' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('institution'));
	});
	it("should return 'Required' in errors.packageType when no packageType supplied", () => {
		let values = { 'packageType': '' };
		let result = validate(values);
		expect(result.packageType).toEqual('Required');
	});
	it("should return undefined in errors.packageType when a packageType supplied", () => {
		let values = { 'packageType': 'type' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('packageType'));
	});
	it("should return 'Required' in errors.protocol when no protocol supplied", () => {
		let values = { 'protocol': '' };
		let result = validate(values);
		expect(result.protocol).toEqual('Required');
	});
	it("should return undefined in errors.protocol when a protocol supplied", () => {
		let values = { 'protocol': 'protocol' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('protocol'));
	});
	it("should return 'Required' in errors.subjectId when no subjectId supplied", () => {
		let values = { 'subjectId': '' };
		let result = validate(values);
		expect(result.subjectId).toEqual('Required');
	});
	it("should return undefined in errors.subjectId when a subjectId supplied", () => {
		let values = { 'subjectId': 'subjectId' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('subjectId'));
	});
	it("should return 'Required' in errors.packageTypeOther when no packageTypeOther supplied and packageType is 'Other'", () => {
		let values = { 'packageType': 'Other', 'packageTypeOther': '' };
		let result = validate(values);
		expect(result.packageTypeOther).toEqual('Required');
	});
	it("should return undefined in errors.packageTypeOther when a packageTypeOther supplied and packageType is 'Other'", () => {
		let values = { 'packageType': 'Other', 'packageTypeOther': 'stuff' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('packageTypeOther'));
	});
	it("should return 'Invalid Date' in errors.experimentDate when date is supplied in wrong format", () => {
		let values = { 'experimentDate': '12-12-2012' };
		let result = validate(values);
		expect(result.experimentDate).toEqual('Invalid Date');
	});
	it("should not set errors.experimentDate when date is not supplied", () => {
		let values = { 'experimentDate': '' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('experimentDate'));
	});
	it("should return 'Required' in errors.description when no description supplied", () => {
		let values = { 'description': '' };
		let result = validate(values);
		expect(result.description).toEqual('Required');
	});
	it("should return undefined in errors.description when a description supplied", () => {
		let values = { 'description': 'description' };
		let result = validate(values);
		expect(false).toEqual(result.hasOwnProperty('description'));
	});
});

describe('validateNotEmpty', () => {
	it('should return "Required" when value is empty', () => {
		expect(validateNotEmpty('')).toEqual('Required');
	});
	
	it('should return undefined when value is given', () => {
		expect(validateNotEmpty('stuff')).toEqual(undefined);
	});
});

describe('validateDate', () => {
	it('should return "Invalid Date" if date is not in YYYY-MM-DD format', () => {
		expect(validateDate('12-12-2012')).toEqual("Invalid Date");
	});
	it('should return undefined if date is in YYYY-MM-DD format', () => {
		expect(validateDate('2012-12-30')).toEqual(undefined);
	})
});