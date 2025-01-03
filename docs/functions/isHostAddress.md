[**mb-network v2.0.4**](../README.md)

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

[subnet.ts:164](https://github.com/mbachmann97/mb-network/blob/13e5b592b92af2d2d7b66f6aa710b2b87a7c9e34/src/subnet.ts#L164)
