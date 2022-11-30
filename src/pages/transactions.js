import React, { useEffect, useState } from 'react'
import { Status, TransactionCategories } from 'components/misc'
import { useContractContext } from 'context/ContractContext'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatUnit } from 'utils/helper'
import { initRadenuContract } from 'utils/helper/contract.helper'
import toast from 'react-hot-toast'
import { orderState } from 'utils/constant'


const Transactions = () => {
    const { account } = useContractContext()
    const [activeSection, setActiveSection] = useState(0)
    const [orderList, setOrderList] = useState([])
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
        <div className='py-6 px-3 md:px-6 bg-white '>
            <h1 className='matter-bold text-[#192839] text-2xl leading-[29px] capitalize mb-5'>Transaction history</h1>
            <TransactionCategories {...{ changeActiveSection, activeSection }} />

            {/* Table heading */}
            <div className="grid grid-cols-4 capitalize pb-[14px] w-full border-b border-[#F0F0F0] text-[#5B616E] text-sm leading-[18px]">
                <div className="">reciepient</div>
                <div className="lg:text-center">amount</div>
                {/* <div className="">fee</div> */}
                <div className="">date</div>
                <div className="lg:w-[70px] lg:mx-auto">status</div>
            </div>

            {/* Table body */}

            <div className="h-[calc(100vh-300px)] text-primary-2 matter-regular overflow-auto">
                {
                    transactionCategory(activeSection)?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSeeTransaction(item.orderId)}
                            className="grid grid-cols-4 items-center py-[10px] w-full border-b border-[#F0F0F0]  text-sm cursor-pointer leading-[18px]">
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

export default Transactions