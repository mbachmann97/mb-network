[**mb-network v2.0.6**](../README.md)

***

[mb-network](../README.md) / isHostAddress

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

[subnet.ts:210](https://github.com/mbachmann97/mb-network/blob/5e5222ea7151abcf5275f0e1cf330bb7ec4668ba/src/subnet.ts#L210)
