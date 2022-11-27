import { formatWalletAddress } from "utils/helper";


const ExchangerDetails = () => {

    return (
        <div className='bg-white py-8 h-fit  px-6 mt-8 md:mt-0'>
            <h3 className='text-[#0B0B27] capitalize matter-medium text-lg mb-[41px]'>exchanger</h3>

            <div className="mb-[49px] space-y-[26px]">
                <div className="flex item-center justify-between">
                    <p className="text-sm text-b2 capitalize matter-regular">username</p>
                    <p className="text-[#4B4B4B] matter-medium text-sm">{formatWalletAddress('0xdac17f958d2ee523a2206206994597c13d831ec7')}</p>
                </div>
                <div className="flex item-center justify-between">
                    <p className="text-sm text-b2 capitalize matter-regular">number of Trades</p>
                    <p className="text-[#4B4B4B] matter-medium text-sm">16</p>
                </div>
            </div> 
            <div className='mb-10'>No one has accepted  your order yet.</div>

        </div>
    )
}

export default ExchangerDetails