[**mb-network v2.0.0**](../README.md)

***

[mb-network](../README.md) / networkMask

# Function: networkMask()

> **networkMask**(`subnetOrSuffix`): [`Ip`](../type-aliases/Ip.md)

Calculates the network mask for the provided subnet or suffix

## Parameters

### subnetOrSuffix

The subnet object or the suffix to calculate the network mask for

`number` | [`Subnet`](../interfaces/Subnet.md)

## Returns

[`Ip`](../type-aliases/Ip.md)

The network mask as a number (Ip)

## Throws

An Error if the suffix is out of range

## Defined in

[subnet.ts:60](https://github.com/mbachmann97/mb-network/blob/3f249f64df357d743cd7d48be3dc86d3f3cf1f0e/src/subnet.ts#L60)
