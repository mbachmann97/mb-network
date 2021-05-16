let binary = {}

binary.octetToBinary = (octet) => {
    const binaryOctet = Number(octet).toString(2)
    
    let zeros = ''
    if (binaryOctet.length < 8) {
        const leadingZeros = 8 - binaryOctet.length
        for (let i = 0; i < leadingZeros; i++) {
            zeros += '0'
        }
    }

    return zeros + binaryOctet
}

binary.octetToDecimal = (octet) => {
    let octetInDecimal = 0
    
    let invalidOctet = false
    for (let i = 0; i < octet.length; i++) {
        if (octet.charAt(i) !== '0' && octet.charAt(i) !== '1') invalidOctet = true
    }

    if (invalidOctet) {
        throw new Error('The octet given is invalid since it includes numbers other then 0 or 1.')
    }

    if (octet.length !== 8) {
        throw new Error('An octet must be 8 Bits long.')
    }

    if (octet.charAt(0) === '1') octetInDecimal += 128
    if (octet.charAt(1) === '1') octetInDecimal += 64
    if (octet.charAt(2) === '1') octetInDecimal += 32
    if (octet.charAt(3) === '1') octetInDecimal += 16

    if (octet.charAt(4) === '1') octetInDecimal += 8
    if (octet.charAt(5) === '1') octetInDecimal += 4
    if (octet.charAt(6) === '1') octetInDecimal += 2
    if (octet.charAt(7) === '1') octetInDecimal += 1

    return octetInDecimal
}

binary.logicalAnd = (octetOne, octetTwo) => {
    return octetOne & octetTwo
}

binary.splitIntoOctets = (bits) => {
    const regex = Array.from(bits.matchAll(/.{1,8}/gm))
    let octetArray = []

    for (let i = 0; i < regex.length; i++) {
        octetArray.push(regex[i][0])
    }

    return octetArray
}

export default binary