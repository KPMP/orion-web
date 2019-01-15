import { getLocalDateString, getLocalTimeString,getIEFriendlyDate } from './timezoneUtil';

describe('getLocalDate', () => {
	it('should parse the date from a timestamp', () => {
		expect(getLocalDateString('1969-07-08T13:30:00.000+0000')).toEqual('1969-07-08');
	});

	it('should translate to the correct timezone', () => {
		expect(getLocalDateString('1969-07-08T01:30:00.000+0000')).toEqual('1969-07-07');
	});
});

// Because we have developers in multiple timezones, and the date object will create the date in your
// timezone, we had to do some fancy footwork to make sure these tests pass for all of our devs
// (The code will work globally, but these will fail east of London and west of Hawaii at which point I will buy you a Guinness.)
describe('getLocalTimeString', () => {
	it('should parse the time from a timestamp', () => {
		let offset = new Date().getTimezoneOffset();
		let localHour = 11 - offset / 60;
		if (new Date().isDstObserved()) {
			localHour = 10 - offset / 60;
		}
		expect(getLocalTimeString('1969-07-20T11:30:00.000+0000')).toEqual(localHour + ':30 AM');
	});

	it('should not pad single hours', () => {
		let offset = new Date().getTimezoneOffset();
		let localHour = 9 - offset / 60;
		if (new Date().isDstObserved()) {
			localHour = 8 - offset / 60;
		}
		expect(getLocalTimeString('1969-07-20T09:30:00.000+0000')).toEqual(localHour + ':30 AM');
	});

});

describe('getIEFriendlyDate', () => {
	it('gets rid of the last bit and add a Z', () => {
		expect(getIEFriendlyDate('1969-07-08T13:30:00.000+0000')).toEqual('1969-07-08T13:30:00.000Z');
	});
});

Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}