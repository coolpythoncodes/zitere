import { useState } from "react"
import { Button } from "components/input"
import { AcceptOrderRiskModal } from "components/modals"
import { formatWalletAddress } from "utils/helper"


const orders = [
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'Access bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'VWTG7W6IYCHK7XPY5S4DDP56LIBKKDUBUCC6JZEBFVDP6GPLZKDUD26WSQ',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'United bank of Africa',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'IQNCUMJWHT8G2QPZCFJGG7MBEKXDEWQADEN77NUAUGCH64QMVUO6PZJV6T',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'raven bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'HNTSzxevyqmiDYr9tiohhvqq8N6FEvMu1sAvyqg6NZh5',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'Wema bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'Access bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'VWTG7W6IYCHK7XPY5S4DDP56LIBKKDUBUCC6JZEBFVDP6GPLZKDUD26WSQ',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'United bank of Africa',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'IQNCUMJWHT8G2QPZCFJGG7MBEKXDEWQADEN77NUAUGCH64QMVUO6PZJV6T',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'raven bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'HNTSzxevyqmiDYr9tiohhvqq8N6FEvMu1sAvyqg6NZh5',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'Wema bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'Access bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'VWTG7W6IYCHK7XPY5S4DDP56LIBKKDUBUCC6JZEBFVDP6GPLZKDUD26WSQ',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'United bank of Africa',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'IQNCUMJWHT8G2QPZCFJGG7MBEKXDEWQADEN77NUAUGCH64QMVUO6PZJV6T',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'raven bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
    {
        transferTo: 'Ugoguba anthony',
        accountNumber: '0883883381',
        status: 'accepted',
        sender: 'HNTSzxevyqmiDYr9tiohhvqq8N6FEvMu1sAvyqg6NZh5',
        amount: '$1,000',
        nairaEquivalent: '₦700,578',
        bankName: 'Wema bank',
        title: 'accept order',
        date: '22 Jun, 2022, 19:25PM',
    },
]

const OpenOrders = () => {

    const [showRiskModal, setShowRiskModal] = useState(false)

    return (
        <>
            <AcceptOrderRiskModal
                {...{ showRiskModal, setShowRiskModal }}
            />
            <div className='bg-white rounded-lg md:rounded-2xl py-6 px-3 md:p-6'>
                <h1 className='matter-bold capitalize text-[#192839] text-2xl leading-[29px]'>open orders</h1>

                {/* Table heading */}
                <div className="overflow-x-auto mt-4">
                    <div className="w-[450px] md:w-full">
                        <div className="grid grid-cols-4 matter-regular text-[#848E9C] capitalize text-base leading-[18px] py-[15px] border-b border-[#F0F0F0] lg:w-full">
                            <div>Sender</div>
                            <div>amount($)</div>
                            {/* <div>Amount(₦)</div>= */}
                            <div>bank name</div>
                            <div>Trade</div>
                        </div>
                        {/* table body */}
                        <div className="h-[calc(100vh-300px)] overflow-y-auto">
                            {
                                orders?.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4  text-[#323131] capitalize text-xs md:text-base md:leading-[18px] py-[15px] border-b border-[#F0F0F0] lg:w-full items-center">
                                        <div className='text-[#2F2280] text-xs md:text-base w-[90%] overflow-hidden'>{formatWalletAddress(item.sender)}</div>
                                        <div className='text-center md:text-left'>{item?.amount}</div>
                                        {/* <div className="text-center md:text-left">{item.nairaEquivalent}</div> */}
                                        <div className='md:w-[90%]'>{item?.bankName}</div>
                                        <Button
                                            onClick={() => setShowRiskModal(true)}
                                            title="accept order"
                                            className="w-[80px] md:w-[126px] h-[31px] text-[11px] leading-[15px]"
                                        />
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default OpenOrders