[**mb-network v2.0.0**](../README.md)

***

[mb-network](../globals.md) / isHostAddress

# Function: isHostAddress()

> **isHostAddress**(`subnet`, `ip`): `boolean`

Checks if the provided ip address is a host address in the provided subnet

## Parameters

### subnet

[`Subnet`](../interfaces/Subnet.md)

The subnet object to check the ip address against

### ip

`number`

The ip address to check

## Returns

`boolean`

**true** if the ip address is a host address in the subnet, **false** otherwise

## Throws

An Error if the subnet is invalid

## Defined in

[subnet.ts:137](https://github.com/mbachmann97/mb-network/blob/7fec164a867a1a55636ff23695e44eb55e93955f/src/subnet.ts#L137)
