export type Ip = number;

/**
 *  Packages an ip address into a 32-bit unsigned integer
 *
 * @param ip The ip address e.g., "192.168.0.1" or 3232235521 (number | Ip)
 * @returns The ip address as a 32-bit unsigned integer (Ip)
 * @throws An Error if the ip address is invalid
 */
export function newIp(ip: number | string): Ip {
	// choose strategy based on type of ip
	switch (typeof ip) {
		case 'string':
			return newIpFromString(ip);
		case 'number':
			return newIpFromNumber(ip);
	}
}

/**
 *  Converts an ip address to the string representation
 *
 * @param ip The ip (number | Ip) address e.g. 3232235521
 * @returns The ip address as a string e.g. "192.168.0.1"
 * @throws An Error if the ip address is invalid
 */
export function ipToString(ip: Ip): string {
	const octet1 = (ip >> 24) & 255;
	const octet2 = (ip >> 16) & 255;
	const octet3 = (ip >> 8) & 255;
	const octet4 = ip & 255;

	if (ip < 0 || ip > 0xffffffff) {
		throw Error(
			'[mb-network][Ip] Ip address must be in 32-bit unsigned integer range',
		);
	}

	return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

/**
 *  Checks if an ip address is valid
 *
 * @param ip The ip (number | Ip) address e.g. 3232235521
 * @returns **true** if the ip address is valid, **false** otherwise
 */
export function isIpValid(ip: Ip): boolean {
	try {
		ipToString(ip);
		return true;
	} catch (e) {
		return false;
	}
}

function newIpFromString(s: string): Ip {
	const stringOctets = s.split('.');
	if (stringOctets.length === 4) {
		const octets: number[] = [];
		for (const octet of stringOctets) {
			const _octet = Number.parseInt(octet, 10);
			if (Number.isNaN(_octet) || _octet < 0 || _octet > 255) {
				throw Error('[mb-network][Ip] One or more octets are not valid');
			}
			octets.push(_octet);
		}
		// force unsigned shift to convert to unsigned 32-bit integer
		const packaged: Ip =
			((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>>
			0;
		return packaged;
	}

	// if we reach here, the octet count is not 4 and we throw an error
	throw Error('[mb-network][Ip] Octet count not equal to 4');
}

function newIpFromNumber(n: number): Ip {
	if (n < 0 || n > 4294967295) {
		throw Error('[mb-network][Ip] Ip out of range when creating from number');
	}
	return n;
}
