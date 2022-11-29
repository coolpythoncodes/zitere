import Web3 from "web3"
import RadenuContractAbi from "./Radenu.json"
import RadenuTokenContractAbi from "./Token.json"

const { ethereum } = window

const web3 = new Web3(ethereum)

const networks = {
    testnet: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: 'Mumbai',
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: [
            "https://matic-mumbai.chainstacklabs.com",
            "https://rpc-mumbai.maticvigil.com",
            "https://matic-testnet-archive-rpc.bwarelabs.com"
        ],
        blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    }
}



const RadenuContractAddress = "0xa99f2A72753d78b31433C7a8Adf7b23dBfDa2BFf"
const USDCTokenContractAddress = "0x9bD0428f8b661B11cF2c646871f52DabC22e3240"
const orderState = ['INITIATED', 'ACCEPTED', 'COMPLETED', 'FUFILLED', 'CANCELLED', 'INDISPUTE']



export {
    web3,
    ethereum,
    networks,
    RadenuContractAddress,
    USDCTokenContractAddress,
    RadenuContractAbi,
    RadenuTokenContractAbi,
    orderState
}
