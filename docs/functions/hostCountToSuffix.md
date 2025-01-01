[**mb-network v2.0.0**](../README.md)

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

[subnet.ts:295](https://github.com/mbachmann97/mb-network/blob/3f5d1757544ae826d544d9a0cd9aec41c51c4650/src/subnet.ts#L295)
