import { shouldColorRow } from './attachmentsModalRowHelper';

describe('shouldColorRow', () => {
	it('should return false on the first row', () => {
		expect(shouldColorRow(0)).toBe(false);
	});
	it('should return true on the second row', () => {
		expect(shouldColorRow(1)).toBe(true);
	});
	it('should return true on a row that has an index +1 divisible by two', () => {
		expect(shouldColorRow(25)).toBe(true);
	})
});