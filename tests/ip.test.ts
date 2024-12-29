import { describe, it, expect } from 'vitest';
import * as ip from '../src/ip';

describe('newIp: create a new Ip', () => {
	it('returns the correct IP for valid string input', () => {
		const result = ip.newIp('192.168.0.1');
		expect(result).toBe(3232235521);
	});

	it('returns the correct IP for valid ip / number input', () => {
		const validIp = ip.newIp('10.73.1.32');
		const result = ip.newIp(validIp);
		expect(result).toBe(172556576);
	});

	it('throws an error for invalid string input', () => {
		expect(() => ip.newIp('192.168.0.256')).toThrowError();
	});

	it('throws an error for invalid number input', () => {
		expect(() => ip.newIp(-1)).toThrowError();
	});
});

describe('ipToString: convert Ip to string', () => {
	it('returns the correct string for valid Ip', () => {
		const result = ip.ipToString(3232235521);
		expect(result).toBe('192.168.0.1');
	});

	it('throws an error for invalid Ip', () => {
		expect(() => ip.ipToString(-1)).toThrowError();
	});
});

describe('isIpValid: check if Ip is valid', () => {
	it('returns true for valid Ip', () => {
		const result = ip.isIpValid(172556576);
		expect(result).toBe(true);
	});

	it('returns false for invalid Ip', () => {
		const result = ip.isIpValid(-1);
		expect(result).toBe(false);
	});
});
