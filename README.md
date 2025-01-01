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
It is recommended to always use the functions *newIp* and *newSubnet* for creating new Ip's and Subnet's. Although you don't need to.

```ts
import { newIp, newSubnet, subnetToString } from 'mb-network'

const ip = newIp('192.168.0.11')
const subnet = newSubnet(ip, 24)

console.log(subnetToString(subnet)) // logs -> 192.168.0.0/24
```

### 🔢🔤 About numbers and strings
In mb-network Ip's are stored as a single number. To convert them to the well known readable format e.g. 192.168.0.1 you need to use the function *ipToString*.
It was a design decision to have the subnet functions, such as *broadcast*, also return the ip as a number (type Ip). <br /> This approach opens up more options for further working with the results.

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
A subnet object consists solely of a network address (Ip) and a suffix (number). But what if you need to work with the addresses within the subnet? <br />
For this purpose mb-network provides two **iterators**. A general address iterator *newSubnetIter(): SubnetIter* and a host address iterator *newSubnetHostIter(): SubnetIter* <br />
This iterators sit on top of a subnet and are ***not*** a direct part of it as you may know it from Arrays.

#### Spreading a subnet
```ts
import { newSubnet, newSubnetIter }

const subnet = newSubnet('192.168.0.5', 28)
const iter = newSubnetIter(subnet) // Iterator over all addresses including network address and broadcast

const addresses = [...iter] // Array<Ip>
```

#### Classic for..of loop
````ts
import { newSubnet, newSubnetHostIter }

const subnet = newSubnet('192.168.0.5', 28)
const iter = newSubnetHostIter(subnet) // Iterator over all host addresses

for (const host of iter) {
  // do something with host address (Ip)
}
````

#### Manual consumption
````ts
import { newSubnet, newSubnetIter, ipToString }

const subnet = newSubnet('192.168.0.5', 28)
const iter = newSubnetIter(subnet)

// skip first three addresses (for some reason)
iter.next()
iter.next()
iter.next()

// do something with the rest
let result = iter.next();
while (!result.done) {
  const address = iter.next().value
  console.log(ipToString(address))
  result = iter.next();    
}
````

#### So exhausting..
Compared to e.g. the Array iterator these iterators will be exhausted after one use. Trying to consume an iterator twice will result in an Error. <br />
Although the infinite iterator usage of an Array could be mimicked, we would then lose the classical "manual consumption" method of consuming the iterator.
<br/><br/>

## 🤝 Contributing and Getting Involved

Thank you for checking out **mb-network**! This library is built with the goal of simplifying network-related operations for developers, and we’d love for you to join us in making it even better.

- **Contribute**: Found a bug or have an idea for an improvement? Contributions are always welcome! Feel free to submit an issue or open a pull request on our 
[GitHub repository](https://github.com/mbachmann97/mb-network/issues).
- **Build with it**: mb-network is designed to be flexible and powerful. If you build something cool using the library,
[share it with us](https://github.com/mbachmann97/mb-network/discussions/categories/show-and-tell)! We’d love to feature your projects and learn how this library helps you. 
- **Stay connected**: Got feedback or questions? Open a discussion on our [GitHub Discussions](https://github.com/mbachmann97/mb-network/discussions). We’re always here to collaborate and help.
