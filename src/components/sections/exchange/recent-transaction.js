import { Status } from 'components/misc'
import NoTransaction from 'components/misc/no-transaction'
import { useContractContext } from 'context/ContractContext'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { orderState } from 'utils/constant'
import { formatDate, formatUnit } from 'utils/helper'
import { initRadenuContract } from 'utils/helper/contract.helper'

const RecentTransactions = ({ orderList, setOrderList }) => {

    const { account } = useContractContext()
    const sections = ["all", 'initiated', 'accepted', 'completed', 'fulfilled', 'cancelled', 'indispute']
    const [activeSection, setActiveSection] = useState(0)
    const navigate = useNavigate();

    const handleNavigation = (to) => navigate(to)
    const getOrders = async () => {
        try {
            const response = await initRadenuContract()
            const contract = response.contract
            const totalOrder = await contract.getTotalOrder()
            setOrderList(totalOrder)
        } catch (error) {
            toast.error('Something went wrong')
            console.log({ error })
        }
    }

    const handleSeeTransaction = (orderId) => {
        const _id = Math.round((formatUnit(orderId) * (10 ** 18)) - 1)
        handleNavigation(`/home/${_id}`)
    }

    const recentTransactionsAll = orderList.filter((item) => item?.sender.toLowerCase() === account.toLowerCase() || item?.receiver?.toLowerCase() === account.toLowerCase()).reverse()
    const transactionCategory = (state) => {
        if (state === 0) return recentTransactionsAll
        return recentTransactionsAll?.filter(item => item?.state === state - 1)


    }

    const changeActiveSection = (index) => {
        setActiveSection(index)
    }

    useEffect(() => {
        getOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);
    return (
        <div className='bg-white rounded-lg pt-6 pl-5 mt-[22px] h-[360px]'>
            <h2 className="matter-medium text-xl leading-6 capitalize text-[#192839]">Recent Transactions</h2>
            {
                recentTransactionsAll.length < 1 ?
                    < NoTransaction /> : (
                        // list of transactions 
                        <div div className='mt-6'>

                            <div className="hidden lg:flex items-center space-x-2 mb-6 pb-2 border-b border-[#F0F0F0]">
                                {
                                    sections.map((item, index) => (
                                        <div key={item} onClick={() => changeActiveSection(index)} className={`text-[#737374] cursor-pointer capitalize text-sm leading-[19px] ${activeSection === index ? "text-[#5E44FF]" : ""}`}>
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Table heading */}
                            <div className="grid grid-cols-4 capitalize pb-[14px] w-full border-b border-[#F0F0F0] text-[#5B616E] text-sm leading-[18px]">
                                <div className="">reciepient</div>
                                <div className="lg:text-center">amount</div>
                                {/* <div className="">fee</div> */}
                                <div className="">date</div>
                                <div className="lg:w-[70px] lg:mx-auto">status</div>
                            </div>

                            {/* Table body */}

                            <div className="h-[215px] text-[#1C144C] overflow-auto">
                                {
                                    transactionCategory(activeSection)?.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSeeTransaction(item.orderId)}
                                            // onClick={() => handleNavigation(`/exchange/${formatUnit(item.orderId) * (10 ** 18)}`)}
                                            className="grid grid-cols-4 items-center py-[10px] w-full border-b border-[#F0F0F0] text-[#5B616E] text-sm cursor-pointer leading-[18px]">
                                            <div>{item.accountName}</div>
                                            <div className='lg:text-center'>{`$${formatUnit(item.amount)}`}</div>
                                            <div>{formatDate(item?.timeInitiated)}</div>
                                            <div className="lg:mx-auto">
                                                <Status status={orderState[item?.state]} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
        </div >
    )
}

export default RecentTransactions