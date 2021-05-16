import binary from './binary.js'

export class IP {
    #octetOne;
    #octetTwo;
    #octetThree;
    #octetFour;

    constructor(ipString) {
        const octetArray = this.#arrayFromString(ipString)
        if (typeof octetArray[0] === 'undefined') {
            throw new Error('Incorrect arguments for IP. Expected a String like 127.0.0.1')
        }
        if (typeof octetArray[1] === 'undefined') {
            throw new Error('Incorrect arguments for IP. Expected a String like 127.0.0.1')
        }
        if (typeof octetArray[2] === 'undefined') {
            throw new Error('Incorrect arguments for IP. Expected a String like 127.0.0.1')
        }
        if (typeof octetArray[3] === 'undefined') {
            throw new Error('Incorrect arguments for IP. Expected a String like 127.0.0.1')
        }
        this.#octetOne = octetArray[0]
        this.#octetTwo = octetArray[1]
        this.#octetThree = octetArray[2]
        this.#octetFour = octetArray[3]
    }

    asBinaryArray = () => {
        let binaryAddress = []
        
        binaryAddress.push(binary.octetToBinary(this.#octetOne))
        binaryAddress.push(binary.octetToBinary(this.#octetTwo))
        binaryAddress.push(binary.octetToBinary(this.#octetThree))
        binaryAddress.push(binary.octetToBinary(this.#octetFour))

        return binaryAddress
    }

    asDecimalArray = () => {
        let decimalAddress = []
        
        decimalAddress.push(Number(this.#octetOne))
        decimalAddress.push(Number(this.#octetTwo))
        decimalAddress.push(Number(this.#octetThree))
        decimalAddress.push(Number(this.#octetFour))

        return decimalAddress
    }

    #arrayFromString = (ipAsString) => {
        return ipAsString.split('.')
    }

    static fromBinaryOctetArray = (octetArray) => {
        let hostIP = ''
        for (let i = 0; i < octetArray.length; i++) {
            if (i !== 0) hostIP += '.'
            hostIP += binary.octetToDecimal(octetArray[i])
        }
        return new IP(hostIP)
    }

    static isSyntaxValid = (ipAsString) => {
        const ipAsArray = ipAsString.split('.')
        if (ipAsArray.length !== 4) return false
        else if (ipAsArray[0] < 0 || ipAsArray[1] > 255) return false
        else if (ipAsArray[1] < 0 || ipAsArray[1] > 255) return false
        else if (ipAsArray[2] < 0 || ipAsArray[2] > 255) return false
        else if (ipAsArray[3] < 0 || ipAsArray[3] > 255) return false
        else return true
    }

    toString() {
        return `${this.#octetOne}.${this.#octetTwo}.${this.#octetThree}.${this.#octetFour}`
    }

    get octetOne() {
        return this.#octetOne
    }

    get octetTwo() {
        return this.#octetTwo
    }

    get octetThree() {
        return this.#octetThree
    }

    get octetFour() {
        return this.#octetFour
    }

}