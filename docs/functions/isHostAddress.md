[**mb-network v2.0.0**](../README.md)

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

[subnet.ts:137](https://github.com/mbachmann97/mb-network/blob/3f249f64df357d743cd7d48be3dc86d3f3cf1f0e/src/subnet.ts#L137)
