import { describe, it, expect } from 'vitest';
import * as subnet from '../src/subnet';

describe('newSubnet: create a new subnet; correct network address if needed', () => {
	it('returns a valid subnet when called with valid ip as string and valid suffix', () => {
		const result = subnet.newSubnet('192.168.0.11', 24);
		expect(result).toEqual({
			networkAddress: 3232235520,
			suffix: 24,
		});
	});

	it('returns a valid subnet when called with valid ip as number and valid suffix', () => {
		const result = subnet.newSubnet(168427846, 26);
		expect(result).toEqual({
			networkAddress: 168427840,
			suffix: 26,
		});
	});

	it('throws an error when called with invalid ip as string', () => {
		expect(() => subnet.newSubnet('192.168.0.256', 24)).toThrowError();
	});

	it('throws an error when called with invalid ip as number', () => {
		expect(() => subnet.newSubnet(-1, 24)).toThrowError();
	});

	it('throws an error when called with invalid suffix', () => {
		expect(() => subnet.newSubnet('10.199.10.2', 33)).toThrowError();
	});
});

describe('isSubnetValid: check if subnet is valid', () => {
	it('returns true for valid subnet', () => {
		const result = subnet.isSubnetValid({
			networkAddress: 168427840,
			suffix: 26,
		});
		expect(result).toBeTruthy();
	});

	it('returns false for invalid subnet', () => {
		const result = subnet.isSubnetValid({
			networkAddress: 168427840,
			suffix: 33,
		});
		expect(result).toBeFalsy();
	});
});

describe('networkMask: calculate network mask', () => {
	it('returns the correct network mask for a given suffix', () => {
		const result = subnet.networkMask(24);
		expect(result).toBe(4294967040);
	});

	it('throws an error for invalid suffix', () => {
		expect(() => subnet.networkMask(33)).toThrowError();
	});
});

describe('possibleHostCount: calculate possible host count', () => {
	it('returns the correct host count for a given suffix', () => {
		const result = subnet.possibleHostCount(24);
		expect(result).toBe(254);
		expect(subnet.possibleHostCount(30)).toBe(2);
		expect(subnet.possibleHostCount(26)).toBe(62);
	});

	it('throws an error for invalid suffix', () => {
		expect(() => subnet.possibleHostCount(-2)).toThrowError();
	});
});

describe('firstHost: retrieve first host address', () => {
	it('returns the correct first host address for a given subnet', () => {
		const result = subnet.firstHost({
			networkAddress: 168427840,
			suffix: 26,
		});
		expect(result).toBe(168427841);
	});
});

describe('lastHost: retrieve last host address', () => {
	it('returns the correct last host address for a given subnet', () => {
		const result = subnet.lastHost({
			networkAddress: 168427840,
			suffix: 26,
		});
		expect(result).toBe(168427902);
	});
});

describe('broadcast: retrieve broadcast address', () => {
	it('returns the correct broadcast address for a given subnet', () => {
		const t1 = subnet.broadcast({
			networkAddress: 168427840,
			suffix: 26,
		});
		expect(t1).toBe(168427903);
		const s2 = subnet.newSubnet('192.168.0.1', 28);
		const t2 = subnet.broadcast(s2);
		expect(t2).toBe(3232235535);
	});
});

describe('isHostAddress: check if an ip address is a host address in given subnet', () => {
	it('returns true for a valid host address', () => {
		const result = subnet.isHostAddress(
			{
				networkAddress: 168427840,
				suffix: 26,
			},
			168427841,
		);
		expect(result).toBeTruthy();
	});

	it('returns false for an invalid host address', () => {
		const result = subnet.isHostAddress(
			{
				networkAddress: 168427840,
				suffix: 26,
			},
			168427905,
		);
		expect(result).toBeFalsy();
	});
});

describe('areSubnetsIntersecting: check if two subnets intersect', () => {
	it('returns true for intersecting subnets', () => {
		const result = subnet.areSubnetsIntersecting(
			{
				networkAddress: 168427840,
				suffix: 26,
			},
			{
				networkAddress: 168427872,
				suffix: 27,
			},
		);
		expect(result).toBeTruthy();
	});

	it('returns false for non-intersecting subnets', () => {
		const result = subnet.areSubnetsIntersecting(
			{
				networkAddress: 168427840,
				suffix: 26,
			},
			{
				networkAddress: 168427904,
				suffix: 27,
			},
		);
		expect(result).toBeFalsy();
	});
});

describe('subnetToString: convert subnet to string', () => {
	it('returns the correct string representation for a given subnet', () => {
		const result = subnet.subnetToString({
			networkAddress: 168481600,
			suffix: 26,
		});
		expect(result).toBe('10.10.211.64/26');
	});
});

describe('networkMaskToSuffix: convert network mask to suffix', () => {
	it('returns the correct suffix for a given network mask', () => {
		const s24 = subnet.networkMaskToSuffix('255.255.255.0');
		const s25 = subnet.networkMaskToSuffix('255.255.255.128');
		const s24n = subnet.networkMaskToSuffix(4294967040);
		const s25n = subnet.networkMaskToSuffix(4294967168);
		expect(s24).toBe(24);
		expect(s25).toBe(25);
		expect(s24n).toBe(24);
		expect(s25n).toBe(25);
	});
});

describe('hostCountToSuffix: convert host count to suffix', () => {
	it('returns the correct suffix for a given host count', () => {
		const s24 = subnet.hostCountToSuffix(249);
		const s25 = subnet.hostCountToSuffix(111);
		const s26 = subnet.hostCountToSuffix(60);
		const negative = subnet.hostCountToSuffix(-123);
		expect(s24).toBe(24);
		expect(s25).toBe(25);
		expect(s26).toBe(26);
		expect(negative).toBe(32);
	});
});

describe('subnet iterator (newSubnetIter)', () => {
	it('manual .next() iteration returns correct values', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetIter(subnet1);
		const first = iter.next();
		const second = iter.next();
		const third = iter.next();

		expect(first.value).toBe(3232235520);
		expect(second.value).toBe(3232235521);
		expect(third.value).toBe(3232235522);
	});

	it('for-of iteration returns correct values', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetIter(subnet1);
		const expected = [
			3232235520, 3232235521, 3232235522, 3232235523, 3232235524, 3232235525,
			3232235526, 3232235527, 3232235528, 3232235529, 3232235530, 3232235531,
			3232235532, 3232235533, 3232235534, 3232235535,
		];
		const result = [];
		for (const address of iter) {
			result.push(address);
		}
		expect(result).toEqual(expected);
	});

	it('for-of iteration returns correct values for a /32 subnet', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 32);
		const iter = subnet.newSubnetIter(subnet1);
		const expected = [3232235521];
		const result = [];
		for (const address of iter) {
			result.push(address);
		}
		expect(result).toEqual(expected);
	});

	it('spread operator returns correct values', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetIter(subnet1);
		const expected = [
			3232235520, 3232235521, 3232235522, 3232235523, 3232235524, 3232235525,
			3232235526, 3232235527, 3232235528, 3232235529, 3232235530, 3232235531,
			3232235532, 3232235533, 3232235534, 3232235535,
		];
		const result = [...iter];
		expect(result).toEqual(expected);
	});

	it('throws an error when called with invalid subnet', () => {
		expect(() =>
			subnet.newSubnetIter({ networkAddress: -1, suffix: 23 }),
		).toThrowError();
	});

	it('throws an error when iterator is exhausted', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetIter(subnet1);
		[...iter];
		expect(() => iter.next()).toThrowError();
	});
});

describe('host iterator (newSubnetHostIter)', () => {
	it('manual .next() iteration returns correct values', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetHostIter(subnet1);
		const first = iter.next();
		const second = iter.next();
		const third = iter.next();

		expect(first.value).toBe(3232235521);
		expect(second.value).toBe(3232235522);
		expect(third.value).toBe(3232235523);
	});

	it('for-of iteration returns correct values', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetHostIter(subnet1);
		const expected = [
			3232235521, 3232235522, 3232235523, 3232235524, 3232235525, 3232235526,
			3232235527, 3232235528, 3232235529, 3232235530, 3232235531, 3232235532,
			3232235533, 3232235534,
		];
		const result = [];
		for (const address of iter) {
			result.push(address);
		}
		expect(result).toEqual(expected);
	});

	it('for-of iteration returns correct value for a /32 subnet', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 32);
		const iter = subnet.newSubnetHostIter(subnet1);
		const result = [];
		for (const address of iter) {
			result.push(address);
		}
		expect(result.length).toEqual(0);
	});

	it('spread operator returns correct values', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetHostIter(subnet1);
		const expected = [
			3232235521, 3232235522, 3232235523, 3232235524, 3232235525, 3232235526,
			3232235527, 3232235528, 3232235529, 3232235530, 3232235531, 3232235532,
			3232235533, 3232235534,
		];
		const result = [...iter];
		expect(result).toEqual(expected);
	});

	it('throws an error when called with invalid subnet', () => {
		expect(() =>
			subnet.newSubnetHostIter({ networkAddress: -1, suffix: 23 }),
		).toThrowError();
	});

	it('throws an error when iterator is exhausted', () => {
		const subnet1 = subnet.newSubnet('192.168.0.1', 28);
		const iter = subnet.newSubnetHostIter(subnet1);
		[...iter];
		expect(() => iter.next()).toThrowError();
	});
});
