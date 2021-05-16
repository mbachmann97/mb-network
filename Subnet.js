import IP from "./IP.js"
import binary from './binary.js'

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export default class Subnet {
    #networkAddress
    #suffix

    constructor(networkAddress, suffix) {
        if (typeof networkAddress === 'undefined') {
            throw new Error('Incorrect arguments for Subnet. Expected (IP, number)')
        }
        if (typeof suffix === 'undefined') {
            throw new Error('Incorrect arguments for Subnet. Expected (IP, number)')
        }

        const correctNetworkAddress = Subnet.calcNetworkAddress(networkAddress, suffix).asDecimalArray()
        let wrongNetworkAddress = false
        for (let i = 0; i < networkAddress.asDecimalArray().length; i++) {
            if (networkAddress.asDecimalArray()[i] !== correctNetworkAddress[i]) wrongNetworkAddress = true
        }

        if (wrongNetworkAddress) {
            throw new Error(`Wrong network address for given suffix.
                Expected: ${checkNetworkAddress.toString()} got: ${decimalArgumentIP.toString()}`)
        }

        this.#networkAddress = networkAddress
        this.#suffix = suffix
    }

    #getBinaryNetworkMask = () => {
        let networkMask = ''
        for (let i = 0; i < this.#suffix; i++) {
            networkMask += '1'
        }
        for (let j = 0; j < 32 - this.#suffix; j++) {
            networkMask += '0'
        }
        return binary.splitIntoOctets(networkMask)
    }

    getDecimalNetworkMask = () => {
        const binaryAddress = this.#getBinaryNetworkMask()
        let networkMask = []
    
        for (let i = 0; i < binaryAddress.length; i++) {
            networkMask.push(binary.octetToDecimal(binaryAddress[i]))
        }
    
        return networkMask
    }

    broadcast = () => {
        let hostBits = ''
        for (let i = 0; i < 32 - this.#suffix; i++) {
            hostBits += '1'
        }

        const broadcastBinaryString = this.#networkBitsToBinaryString() + hostBits
        const broadcastOctetArray = binary.splitIntoOctets(broadcastBinaryString)

        return IP.fromBinaryOctetArray(broadcastOctetArray)
    }

    #findPermutations = (bits) => {
        if (!bits || typeof bits !== "string"){
            throw new Error(`Invalid argument. expected (String)`)
        } else if (bits.length < 2 ){
            return bits
        }
      
        let permutationsArray = [] 
         
        for (let i = 0; i < bits.length; i++){
            let bit = bits[i]
        
            if (bits.indexOf(bit) != i)
            continue
        
            let remainingBits = bits.slice(0, i) + bits.slice(i + 1, bits.length)
        
            for (let permutation of this.#findPermutations(remainingBits)){
                permutationsArray.push(bit + permutation) 
            }
        }
        return permutationsArray
    }

    #networkBitsToBinaryString = () => {
        let networkBits = ''

        for (let octet of this.#networkAddress.asBinaryArray()) {
            networkBits += octet
        }
        networkBits = networkBits.slice(0, this.#suffix)
        
        return networkBits
    }

    #hostBitPermutations = () => {
        let hostBits = ''
        for (let i = 0; i < 32 - this.#suffix; i++) {
            hostBits += '0'
        }

        let permutations = []

        for (let j = 0; j < hostBits.length - 1; j++) {
            hostBits = hostBits.replaceAt(j, '1')
            for (let permutation of this.#findPermutations(hostBits)) {
                permutations.push(permutation)
            }
        }

        permutations.sort()
        return permutations
    }

    getHostAddresses = () => {
        let hostAddresses = []

        if (this.#suffix < 16)
            throw new Error('This method is disabled for subnets with less then 16 networkbits! (For js performance reasons)')

        for (let hostBits of this.#hostBitPermutations()) {
            const hostAddressBinaryString = this.#networkBitsToBinaryString() + hostBits
            const hostAddressOctetArray = binary.splitIntoOctets(hostAddressBinaryString)

            hostAddresses.push(IP.fromBinaryOctetArray(hostAddressOctetArray))
        }

        return hostAddresses
    }

    static calcNetworkAddress = (address, suffix) => {
        let networkMask = ''
        for (let i = 0; i < suffix; i++) {
            networkMask += '1'
        }
        for (let j = 0; j < 32 - suffix; j++) {
            networkMask += '0'
        }
        
        const binaryAddress = binary.splitIntoOctets(networkMask)
        let decimalNetworkMask = []
        for (let i = 0; i < binaryAddress.length; i++) {
            decimalNetworkMask.push(binary.octetToDecimal(binaryAddress[i]))
        }
        
        const decimalAddress = address.asDecimalArray()
        let na = []
        for (let i = 0; i < decimalAddress.length; i++) {
            na.push(binary.logicalAnd(decimalAddress[i], decimalNetworkMask[i]))
        }
    
        return new IP(`${na[0]}.${na[1]}.${na[2]}.${na[3]}`)
    }

    possibleHostCount = () => {
        return (2 ** (32 - this.#suffix)) - 2
    }

    toString = () => {
        return `${this.#networkAddress} /${this.#suffix}`
    }

    get networkAddress() {
        return this.#networkAddress
    }

    get suffix() {
        return this.#suffix
    }
}