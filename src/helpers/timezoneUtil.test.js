import { getLocalDateString, getLocalTimeString } from './timezoneUtil';

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
describe('getLocalTime', () => {
    it('should parse the time from a timestamp', () => {
        let offset = new Date().getTimezoneOffset();
        let localHour = 11 - offset / 60;
        expect(getLocalTimeString('1969-07-20T11:30:00.000+0000')).toEqual(localHour + ':30 AM');
    });

    it('should not pad single hours', () => {
        let offset = new Date().getTimezoneOffset();
        let localHour = 9 - offset / 60;
        expect(getLocalTimeString('1969-07-20T09:30:00.000+0000')).toEqual(localHour + ':30 AM');
    });

});

describe('getIEFriendlyDate', () => {
    it('get rid of the last bit and add a Z', () => {
        expect(getLocalDateString('1969-07-08T13:30:00.000+0000')).toEqual('1969-07-08T13:30:00.000Z');
    });
});