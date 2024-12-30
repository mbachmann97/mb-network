[**mb-network v2.0.0**](../README.md)

***

[mb-network](../globals.md) / hostCountToSuffix

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

[subnet.ts:200](https://github.com/mbachmann97/mb-network/blob/7fec164a867a1a55636ff23695e44eb55e93955f/src/subnet.ts#L200)
