[**mb-network v2.0.0**](../README.md)

***

[mb-network](../globals.md) / networkMask

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

[subnet.ts:60](https://github.com/mbachmann97/mb-network/blob/7fec164a867a1a55636ff23695e44eb55e93955f/src/subnet.ts#L60)
