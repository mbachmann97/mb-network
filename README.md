# mb-network

[![npm version](https://img.shields.io/badge/npm-v1.1.1-orange)](https://www.npmjs.org/package/mb-network)
[![install size](https://packagephobia.com/badge?p=mb-network)](https://packagephobia.com/result?p=mb-network)

Class based Network Library for Javascript

## Install
```bash
$ npm i mb-network
```

## Basic Example
```js
import { IP, Subnet } from 'mb-network'

const asset = new IP('10.0.0.63')
const subnet = new Subnet(Subnet.calcNetworkAddress(asset, 24), 24)

console.log(subnet.possibleHostCount())
```
Output:
```bash
$ 254
```

## Class Parameters
- IP(string) `f.e. => '192.168.1.7'`
- Subnet(IP, number) `f.e. => new IP('192.168.0.0'), 16`
#### note:  The IP in the first Subnet parameter should be the network-address!

## Methods
### IP
- `ip.asBinaryArray()`, returns the IP as an Array of binary octets.
- `ip.asDecimalArray()`, returns the IP as an Array of decimal octets.
- `ip.toString()`, returns the IP as a string.
- static `IP.fromBinaryOctetArray(Array)`, returns an IP from an Array of binary octets.
- static `IP.isSyntaxValid(string)`, returns true if the given string has a valid IP syntax, otherwise false.
### Subnet
- `subnet.networkAddress`, getter of the network-address (returns an IP).
- `subnet.broadcast()`, returns the broadcast-address as an IP.
- `subnet.getDecimalNetworkMask()`, returns the subnet-mask as an Array of decimal octets.
- `subnet.possibleHostCount()`, returns the number of possible hosts in the Subnet.
- `subnet.getHostAddresses()`, returns an Array of all possible hosts in the Subnet as IP's.
- `subnet.toString()`, returns the Subnet as a string.
- static `Subnet.calcNetworkAddress(IP, number)`, returns the network-address for the combination of an IP and a suffix as an IP.



