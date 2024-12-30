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

[subnet.ts:200](https://github.com/mbachmann97/mb-network/blob/3f249f64df357d743cd7d48be3dc86d3f3cf1f0e/src/subnet.ts#L200)
