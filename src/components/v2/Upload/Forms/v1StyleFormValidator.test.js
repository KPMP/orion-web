import { validate } from './v1StyleFormValidator';
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
		expect(result.submitterFirstName).toEqual(undefined);
	});
	it("should return 'Required' in errors.submitterLastName when no last name supplied", () => {
		let values = { 'submitterLastName': '' };
		let result = validate(values);
		expect(result.submitterLastName).toEqual('Required');
	});
	it("should return undefined in errors.submitterLastName when a last name supplied", () => {
		let values = { 'submitterLastName': 'last' };
		let result = validate(values);
		expect(result.submitterLastName).toEqual(undefined);
	});
	it("should return 'Required' in errors.institutionName when no institution supplied", () => {
		let values = { "institutionName": '' };
		let result = validate(values);
		expect(result.institutionName).toEqual('Required');
	});
	it("should return undefined in errors.institutionName when a institution supplied", () => {
		let values = { "institutionName": 'name' };
		let result = validate(values);
		expect(result.institutionName).toEqual(undefined);
	});
	it("should return 'Required' in errors.packageType when no packageType supplied", () => {
		let values = { 'packageType': '' };
		let result = validate(values);
		expect(result.packageType).toEqual('Required');
	});
	it("should return undefined in errors.packageType when a packageType supplied", () => {
		let values = { 'packageType': 'type' };
		let result = validate(values);
		expect(result.packageType).toEqual(undefined);
	});
	it("should return 'Required' in errors.protocol when no protocol supplied", () => {
		let values = { 'protocol': '' };
		let result = validate(values);
		expect(result.protocol).toEqual('Required');
	});
	it("should return undefined in errors.protocol when a protocol supplied", () => {
		let values = { 'protocol': 'protocol' };
		let result = validate(values);
		expect(result.protocol).toEqual(undefined);
	});
	it("should return 'Required' in errors.subjectId when no subjectId supplied", () => {
		let values = { 'subjectId': '' };
		let result = validate(values);
		expect(result.subjectId).toEqual('Required');
	});
	it("should return undefined in errors.subjectId when a subjectId supplied", () => {
		let values = { 'subjectId': 'subjectId' };
		let result = validate(values);
		expect(result.subjectId).toEqual(undefined);
	});
	it("should return 'Required' in errors.packageTypeOther when no packageTypeOther supplied and packageType is 'Other'", () => {
		let values = { 'packageType': 'Other', 'packageTypeOther': '' };
		let result = validate(values);
		expect(result.packageTypeOther).toEqual('Required');
	});
	it("should return undefined in errors.packageTypeOther when a packageTypeOther supplied and packageType is 'Other'", () => {
		let values = { 'packageType': 'Other', 'packageTypeOther': 'stuff' };
		let result = validate(values);
		expect(result.packageTypeOther).toEqual(undefined);
	});
	it("should return 'Invalid Date' in errors.experimentDate when date is supplied in wrong format", () => {
		let values = { 'experimentDate': '12-12-2012' };
		let result = validate(values);
		expect(result.experimentDate).toEqual('Invalid Date');
	});
	it("should not set errors.experimentDate when date is not supplied", () => {
		let values = { 'experimentDate': '' };
		let result = validate(values);
		expect(result.experimentDate).toEqual(undefined);
	});
});