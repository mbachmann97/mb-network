[**mb-network v2.0.6**](../README.md)

***

[mb-network](../README.md) / newSubnet

# Function: newSubnet()

> **newSubnet**(`ip`, `suffix`): [`Subnet`](../interfaces/Subnet.md)

Creates a new subnet object that fits the given ip address using the provided suffix

## Parameters

### ip

The ip address as a 32-bit unsigned integer (Ip) or a string; any ip in the subnet can be used

`string` | `number`

### suffix

`number`

The CIDR suffix or the number of network bits in the network mask

## Returns

[`Subnet`](../interfaces/Subnet.md)

A new subnet object with the correct network address according to the provided ip address and suffix

## Throws

An Error if the ip address is invalid or the suffix is out of range

## Remarks

If you want to create a subnet with the network mask instead of the suffix, use networkMaskToSuffix(mask) in place of the suffix;
If you want to create a subnet with the amount of hosts that the subnet should be able to hold, use hostCountToSuffix(hostCount) in place of the suffix

## Defined in

[subnet.ts:82](https://github.com/mbachmann97/mb-network/blob/5e5222ea7151abcf5275f0e1cf330bb7ec4668ba/src/subnet.ts#L82)
