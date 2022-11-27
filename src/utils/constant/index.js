// import Web3 from "web3"

// const rpcUrl = {
//     mainnet: 'https://api.s0.t.hmny.io',
//     testnet: 'https://api.s0.b.hmny.io'
// }

// const { ethereum } = window

// const web3 = new Web3(ethereum)
// const shardId = 0;

// const networks = {
//     mainnet: {
//         chainId: '0x' + Number(1666600000 + shardId).toString(16),
//         chainName: 'Harmony Mainnet Shard ' + shardId,
//         nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
//         rpcUrls: ['https://' + (shardId === 0 ? 'api.harmony.one' : 'api.s' + shardId + '.t.hmny.io')],
//         blockExplorerUrls: ['https://explorer.harmony.one/'],
//     },
//     testnet: {
//         chainId: `0x${Number(1666700000 + shardId).toString(16)}`,
//         chainName: `Harmony Testnet Shard ${shardId}`,
//         nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
//         rpcUrls: [`https://api.s${shardId}.b.hmny.io/`,],
//         blockExplorerUrls: ['https://explorer.harmony.one/'],
//     }
// }


// export {
//     rpcUrl,
//     web3,
//     ethereum,
//     shardId,
//     networks
// }