[**mb-network v2.0.4**](../README.md)

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

[subnet.ts:227](https://github.com/mbachmann97/mb-network/blob/13e5b592b92af2d2d7b66f6aa710b2b87a7c9e34/src/subnet.ts#L227)
