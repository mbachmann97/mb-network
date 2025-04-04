[**mb-network v2.0.6**](../README.md)

***

[mb-network](../README.md) / hostCountToSuffix

# Function: hostCountToSuffix()

> **hostCountToSuffix**(`hostCount`): `number`

Converts the amount of hosts that a subnet should be able to hold to the CIDR suffix of the smallest subnet that can hold that amount of hosts

## Parameters

### hostCount

`number`

The amount of hosts that a subnet should be able to hold

## Returns

`number`

The suffix for the smallest subnet that can hold the provided amount of hosts

## Defined in

[subnet.ts:279](https://github.com/mbachmann97/mb-network/blob/5e5222ea7151abcf5275f0e1cf330bb7ec4668ba/src/subnet.ts#L279)
