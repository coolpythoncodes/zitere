import Web3 from "web3"

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


export {
    web3,
    ethereum,
    networks
}
