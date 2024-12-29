import { type Ip, ipToString, isIpValid, newIp } from './ip';

export interface Subnet {
	networkAddress: Ip;
	suffix: number;
}

/**
 *  Creates a new subnet object that fits the given ip address using the provided suffix
 *
 * @param ip The ip address as a 32-bit unsigned integer (Ip) or a string; any ip in the subnet can be used
 * @param suffix The CIDR suffix or the number of network bits in the network mask
 * @returns A new subnet object with the correct network address according to the provided ip address and suffix
 * @throws An Error if the ip address is invalid or the suffix is out of range
 * @hint If you want to create a subnet with the network mask instead of the suffix, use networkMaskToSuffix(mask) in place of the suffix
 */
export function newSubnet(ip: Ip | string, suffix: number): Subnet {
	// ensure we got an ip address
	const _ip = typeof ip === 'string' ? newIp(ip) : ip;

	// make sanity checks
	if (suffix < 0 || suffix > 32) {
		throw new Error('[mb-network][Subnet] Suffix needs to be between 0 and 32');
	}
	if (!isIpValid(_ip)) {
		throw new Error('[mb-network][Subnet] Invalid ip address provided');
	}

	return {
		networkAddress: _calcNetworkAddress(_ip, suffix),
		suffix: suffix,
	};
}

/**
 *  Checks if the provided subnet is valid
 *
 * @param subnet The subnet object to check
 * @returns **true** if the subnet is valid, **false** otherwise
 */
export function isSubnetValid(subnet: Subnet): boolean {
	return (
		isIpValid(subnet.networkAddress) &&
		subnet.networkAddress ===
			_calcNetworkAddress(subnet.networkAddress, subnet.suffix) &&
		subnet.suffix >= 0 &&
		subnet.suffix <= 32
	);
}

/**
 *  Calculates the network mask for the provided subnet or suffix
 *
 * @param subnetOrSuffix The subnet object or the suffix to calculate the network mask for
 * @returns The network mask as a number (Ip)
 * @throws An Error if the suffix is out of range
 */
export function networkMask(subnetOrSuffix: Subnet | number): Ip {
	const suffix = _retrieveAndValidateSuffix(subnetOrSuffix);
	return _calcNetworkMask(suffix);
}

/**
 *  Calculates the number of possible host addresses for the provided subnet or suffix
 *
 * @param subnetOrSuffix The subnet object or the suffix to calculate the number of possible host addresses for
 * @returns The number of possible host addresses
 * @throws An Error if the suffix is out of range
 */
export function possibleHostCount(subnetOrSuffix: Subnet | number): number {
	const suffix = _retrieveAndValidateSuffix(subnetOrSuffix);
	return 2 ** (32 - suffix) - 2;
}

/**
 *  Calculates the first host address in the provided subnet
 *
 * @param subnet The subnet object to calculate the first host address for
 * @returns The first host address in the subnet as a number (Ip)
 * @throws An Error if the subnet is invalid
 */
export function firstHost(subnet: Subnet): Ip {
	// validate subnet
	if (!isSubnetValid(subnet))
		throw new Error(
			'[mb-network][Subnet] Invalid subnet provided when retrieving first host address; hint: use newSubnet()',
		);

	return subnet.networkAddress + 1;
}

/**
 *  Calculates the last host address in the provided subnet
 *
 * @param subnet The subnet object to calculate the last host address for
 * @returns The last host address in the subnet as a number (Ip)
 * @throws An Error if the subnet is invalid
 */
export function lastHost(subnet: Subnet): Ip {
	// validate subnet
	if (!isSubnetValid(subnet)) {
		throw new Error(
			'[mb-network][Subnet] Invalid subnet provided when retrieving last host address; hint: use newSubnet()',
		);
	}

	return _broadcast(subnet) - 1;
}

/**
 *  Calculates the broadcast address in the provided subnet
 *
 * @param subnet The subnet object to calculate the broadcast address for
 * @returns The broadcast address in the subnet as a number (Ip)
 * @throws An Error if the subnet is invalid
 */
export function broadcast(subnet: Subnet): Ip {
	// validate subnet
	if (!isSubnetValid(subnet))
		throw new Error(
			'[mb-network][Subnet] Invalid subnet provided when retrieving broadcast address; hint: use newSubnet()',
		);

	return _broadcast(subnet);
}

/**
 *  Checks if the provided ip address is a host address in the provided subnet
 *
 * @param subnet The subnet object to check the ip address against
 * @param ip The ip address to check
 * @returns **true** if the ip address is a host address in the subnet, **false** otherwise
 * @throws An Error if the subnet is invalid
 */
export function isHostAddress(subnet: Subnet, ip: Ip): boolean {
	// validate subnet
	if (!isSubnetValid(subnet)) {
		throw new Error(
			'[mb-network][Subnet] Invalid subnet provided when checking if ip is a host address; hint: use newSubnet()',
		);
	}
	return ip > subnet.networkAddress && ip < _broadcast(subnet);
}

/**
 *  Checks if the provided subnets are intersecting
 *
 * @param a The first subnet object
 * @param b The second subnet object
 * @returns **true** if the subnets are intersecting, **false** otherwise
 * @throws An Error if any of the subnets are invalid
 */
export function areSubnetsIntersecting(a: Subnet, b: Subnet): boolean {
	// validate both subnets
	if (!isSubnetValid(a) || !isSubnetValid(b)) {
		throw new Error(
			'[mb-network][Subnet] Invalid subnet provided when checking intersection between subnets; hint: use newSubnet()',
		);
	}

	// check if the network addresses are the same
	if (a.networkAddress === b.networkAddress) return true;

	// check if one subnet is contained within the other
	if (a.networkAddress >= b.networkAddress) {
		return a.networkAddress <= _broadcast(b);
	}
	return b.networkAddress <= _broadcast(a);
}

/**
 *  Converts a network mask to a CIDR suffix
 *
 * @param mask The network mask as a number (Ip) or a string
 * @returns The CIDR suffix for the provided network mask
 * @throws An Error if the network mask is invalid
 */
export function networkMaskToSuffix(mask: Ip | string): number {
	const _mask = typeof mask === 'string' ? newIp(mask) : mask;

	// check if the mask is valid
	if (!isIpValid(_mask)) {
		throw new Error('[mb-network][Subnet] Invalid network mask provided');
	}

	// count the number of network bits
	const suffix = _mask.toString(2).split('1').length - 1;

	return suffix;
}

/**
 *  Converts a subnet object to a string
 *
 * @param subnet The subnet object to convert
 * @returns The subnet in the CIDR notation as a string
 * @throws An Error if network address is not a valid ip address
 */
export function subnetToString(subnet: Subnet): string {
	return `${ipToString(subnet.networkAddress)}/${subnet.suffix}`;
}

// internal broadcast function without validation
function _broadcast(subnet: Subnet): Ip {
	return subnet.networkAddress | _calcInverseNetworkMask(subnet.suffix);
}

function _calcNetworkAddress(ip: Ip, suffix: number): Ip {
	const mask = _calcNetworkMask(suffix);
	const networkAddress = (ip & mask) >>> 0;
	return networkAddress;
}

function _calcNetworkMask(suffix: number): number {
	return (0xffffffff << (32 - suffix)) >>> 0;
}

function _calcInverseNetworkMask(suffix: number): number {
	return ~_calcNetworkMask(suffix) >>> 0;
}

function _retrieveAndValidateSuffix(subnetOrSuffix: Subnet | number): number {
	const suffix =
		typeof subnetOrSuffix === 'number' ? subnetOrSuffix : subnetOrSuffix.suffix;
	if (suffix < 0 || suffix > 32) {
		throw new Error('[mb-network][Subnet] Suffix needs to be between 0 and 32');
	}
	return suffix;
}
