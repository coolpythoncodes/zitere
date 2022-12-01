
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

![](https://img.shields.io/badge/Hackathon-blueviolet)

[![Contributors][contributors-shield]][contributors-url]
[![GitHub issues][issues-shield]][issues-url]
[![GitHub forks][forks-shield]][forks-url]
[![GitHub stars][star-shield]][star-url]
[![GitHub license][license-shield]][license-url]



## Zitere
The fastest way to send money across borders

Demo: [https://zitere.vercel.app](https://zitere.vercel.app)

### Built With

* React
* React Query
* Tailwind CSS
* Solidity
* Polygon Testnet

### The Use of the Product
Zitere enables users worldwide to send remittance payments to family members in their home countries using cryptocurrency, however, the recipient receives the money in their local currency bank account. Nigeria, Ghana, South Africa, Kenya, and Cote D'Ivore are currently the supported countries.

### Brief Description
Zitere is a decentralized, non-custodial P2P remittance payment protocol. Zitere implements a unique, on-chain escrow P2P payment solution analogous to commonly understood P2P applications like Binance, but transactions are completely pseudonymous.


#### 👨‍💻 The Core Architecture
- The Vault/Escrow
- The Sender
- The Settler
- The Receiver

The Vault: This is the key infrastructure of the network which holds funds and acts as an escrow on the platform. The Vault is built on smart contracts that execute when all conditions for the settlement are met.

The Sender: This is the user that initiates the remittance transaction (transfer) via a cryptocurrency payment and he/she is responsible for providing the details of the receiver in the form of a local bank account (fiat currency).

The Settler: This is the user that actually deposits the fiat currency to the receiver, the settler is usually resident in the receiver’s country OR can perform funds (fiat) transfer to the receiver’s local bank account.

The Receiver: This is the recipient of the fiat payment and they do not need to be on the platform, however, they can communicate with the Sender offline to acknowledge receipt of funds to their local bank account.

![flow](flow.jpg)

#### Modus Operandi 
The sender initiates a cryptocurrency transaction indicating his/her intention to send money to a recipient in a supported jurisdiction, providing all the local bank account details of the receiver. The sender sends the stablecoin equivalent to a vault.
For example, a sender transfers $1000 in stablecoins such as USDC to the Vault/Escrow, and also provides the receiver’s details. The transfer advert (order) is then published and can be fulfilled by a Settler.
The Settler picks up a transfer advert and accepts to complete the payment in the receiver’s local currency/fiat. The settlements are to be fulfilled in a 45 minutes window timeframe to give room for all necessary transactions to be carried out. Once a Settler accepts to fulfill an order, that order is frozen.
Once the Settler has fulfilled the payment in the local fiat currency, they can mark the order as completed and this generates a notification to the Sender to authorize the Vault to release payment. The Sender can communicate with the Receiver off our platform to ascertain that payment was received. In the event that payment was received the Sender can authorize the release of the payment to the Settler concluding the full cycle of the payment process. If both the Sender and Settler cannot agree that the order transaction was completed successfully, either party can open a dispute claim which triggers an arbitration process.

#### Fees, Revenues, and Incentives (Future Roadmap)
The platform generates fees from a 0.2% charge on the total amount to be sent, which serves as revenue to the protocol and is stored in the vault.
The Settler makes a profit from the differences in the exchange rate that is fixed or agreed upon by the platform.
Transaction points (XP) are introduced on the platform to help incentivize user behavior and bootstrap network effects. These points (XP) may be used to incentivize early users in various ways.

### How to run Zitere locally
* Git clone and
* cd zitere
* Copy .env.example to a new .env.local file on zitere root folder
* npm install to install dependencies
* npm start to start development server

### How to test the Zitere deployed app
* First get the Zitere USDC Testnet token from the contract on Mumbai.
* You can claim it from the mint function [here](https://mumbai.polygonscan.com/address/0x9bD0428f8b661B11cF2c646871f52DabC22e3240).
* Use the Zitere USDC Testnet token to initiate a Remittance transfer on [https://zitere.vercel.app](https://zitere.vercel.app).



## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐ if you like this project!

[contributors-shield]: https://img.shields.io/github/contributors/coolpythoncodes/zitere?style=for-the-badge
[contributors-url]: https://github.com/coolpythoncodes/zitere/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/coolpythoncodes/zitere?style=for-the-badge
[issues-url]: https://github.com/coolpythoncodes/zitere/issues
[forks-shield]: https://img.shields.io/github/forks/coolpythoncodes/zitere?style=for-the-badge
[forks-url]: https://github.com/coolpythoncodes/zitere/network
[star-shield]: https://img.shields.io/github/stars/coolpythoncodes/zitere?style=for-the-badge
[star-url]: https://github.com/coolpythoncodes/zitere/stargazers
[license-shield]: https://img.shields.io/github/license/coolpythoncodes/zitere?style=for-the-badge
[license-url]: https://github.com/coolpythoncodes/zitere/blob/master/license
