import { ethers } from "ethers";
import { ethereum, RadenuContractAbi, RadenuContractAddress, RadenuTokenContractAbi, USDCTokenContractAddress } from "utils/constant";

const initRadenuContract = async () => {
    try {
        if (!ethereum) return "You must install Metamask in your browser extension."
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const _walletAddress = await signer.getAddress();

        const _contract = new ethers.Contract(
            RadenuContractAddress,
            RadenuContractAbi,
            signer
        );
        return {
            contract: _contract,
            walletAddress: _walletAddress,
        };
    } catch (error) {
        throw Error("Address is Null")
    }
}

const initRadenuTokenContract = async () => {
    try {
        if (!ethereum) return "You must install Metamask in your browser extension."
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const _walletAddress = await signer.getAddress();

        const _contract = new ethers.Contract(
            USDCTokenContractAddress,
            RadenuTokenContractAbi,
            signer
        );
        return {
            contract: _contract,
            walletAddress: _walletAddress,
        };
    } catch (error) {
        throw Error("Address is Null")
    }
}




export {
    initRadenuContract,
    initRadenuTokenContract,
}

