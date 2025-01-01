[**mb-network v2.0.1**](../README.md)

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

[subnet.ts:227](https://github.com/mbachmann97/mb-network/blob/a3b03f60431299c07af00173f7280a3aa0a15a80/src/subnet.ts#L227)
