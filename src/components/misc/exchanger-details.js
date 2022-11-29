// import { useContractContext } from "context/ContractContext";
// import { useParams } from "react-router-dom";
import { formatWalletAddress } from "utils/helper";


const ExchangerDetails = ({ address, transactionState }) => {
    // const { account } = useContractContext()
    // const { id: orderId } = useParams()
    return (
        <div className='bg-white py-8 h-fit  px-6 mt-8 md:mt-0'>
            <h3 className='text-[#0B0B27] capitalize matter-medium text-lg mb-[41px]'>exchanger</h3>

            {
                transactionState >= 1 ?
                    <div className="mb-[49px] space-y-[26px]">
                        <div className="flex item-center justify-between">
                            <p className="text-sm text-[#5B616E] capitalize">username</p>
                            <p className="text-[#4B4B4B]">{address ? formatWalletAddress(address) : "loading..."}</p>
                        </div>
                        <div className="flex item-center justify-between">
                            <p className="text-sm text-[#5B616E] capitalize">number of Trades</p>
                            <p className="text-[#4B4B4B]">16</p>
                        </div>
                    </div> :
                    <div className='mb-10'>No one has accepted  your order yet.</div>
            }

        </div>
    )
}

export default ExchangerDetails