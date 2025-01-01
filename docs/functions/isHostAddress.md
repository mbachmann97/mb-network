[**mb-network v2.0.3**](../README.md)

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

[subnet.ts:164](https://github.com/mbachmann97/mb-network/blob/ec859bc9fa23945f71168926642866140fd255b1/src/subnet.ts#L164)
