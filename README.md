# mb-network
### *Network Library for Typescript / Javascript*

[![npm version](https://img.shields.io/npm/v/mb-network)](https://www.npmjs.org/package/mb-network)
[![downloads](https://img.shields.io/npm/dw/mb-network)](https://www.npmjs.org/package/mb-network)
[![install size](https://packagephobia.com/badge?p=mb-network)](https://packagephobia.com/result?p=mb-network)


## Install
```bash
$ npm i mb-network
```

## Documentation

### Interfaces

- [Subnet](docs/interfaces/Subnet.md)
- [SubnetIter](docs/interfaces/SubnetIter.md)

### Type Aliases

- [Ip](docs/type-aliases/Ip.md)

### Functions

- [areSubnetsIntersecting](docs/functions/areSubnetsIntersecting.md)
- [broadcast](docs/functions/broadcast.md)
- [firstHost](docs/functions/firstHost.md)
- [hostCountToSuffix](docs/functions/hostCountToSuffix.md)
- [ipToString](docs/functions/ipToString.md)
- [isHostAddress](docs/functions/isHostAddress.md)
- [isIpValid](docs/functions/isIpValid.md)
- [isSubnetValid](docs/functions/isSubnetValid.md)
- [lastHost](docs/functions/lastHost.md)
- [networkMask](docs/functions/networkMask.md)
- [networkMaskToSuffix](docs/functions/networkMaskToSuffix.md)
- [newIp](docs/functions/newIp.md)
- [newSubnet](docs/functions/newSubnet.md)
- [newSubnetHostIter](docs/functions/newSubnetHostIter.md)
- [newSubnetIter](docs/functions/newSubnetIter.md)
- [possibleHostCount](docs/functions/possibleHostCount.md)
- [subnetToString](docs/functions/subnetToString.md)

## Examples

### 🦄 First steps
#### It is recommended to always use the functions *newIp* and *newSubnet* for creating new Ip's and Subnet's. Although you don't need to.

```ts
import { newIp, newSubnet, subnetToString } from 'mb-network'

const ip = newIp('192.168.0.11')
const subnet = newSubnet(ip, 24)

console.log(subnetToString(subnet)) // logs -> 192.168.0.0/24
```

### 🔢🔤 About numbers and strings
#### In mb-network Ip's are stored as a single number. To covert it to the well known readable format e.g. 192.168.0.1 you need to use the function *ipToString*.
#### It was a design decision to have the subnet functions, such as *broadcast*, also return the ip as a number (type Ip). This approach opens up more options for further working with the results.

```ts
import { newSubnet, broadcast, ipToString } from 'mb-network'

// You can also create a subnet without first creating an ip
const subnet = newSubnet('192.168.0.1', 24)
const broadcastOfSubnet = broadcast(subnet)

console.log(broadcastOfSubnet) // logs -> 3232235775
console.log(ipToString(broadcastOfSubnet)) // logs -> 192.168.0.255

// For example, this allows us to perform the following, offering maximum flexibility.
console.log(broadcastOfSubnet - 10) // logs -> 3232235765
console.log(ipToString(broadcastOfSubnet - 10)) // logs -> 192.168.0.245
```

### 🍩 Looping around
examples soon™