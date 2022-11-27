import React, { useState } from 'react'
import { Status, TransactionCategories } from 'components/misc'


const transactions = Array(10).fill({
    accountName: 'Ugoguba anthony',
    amount: '1000',
    timeInitiated: '22 Jun, 2022, 19:25PM',
    state: 'completed'
})

const Transactions = () => {

    const [activeSection, setActiveSection] = useState(0)

    const changeActiveSection = (index) => {
        setActiveSection(index)
    }
    return (
        <div className='py-6 px-3 md:px-6 bg-white '>
            <h1 className='matter-bold text-[#192839] text-2xl leading-[29px] capitalize'>Transaction history</h1>
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
                    transactions?.map((item, index) => (
                        <div
                            key={index}
                            // onClick={() => handleSeeTransaction(item.orderId)}
                            // onClick={() => handleNavigation(`/exchange/${formatUnit(item.orderId) * (10 ** 18)}`)}
                            className="grid grid-cols-4 items-center py-[10px] w-full border-b border-[#F0F0F0]  text-sm cursor-pointer leading-[18px]">
                            <div>{item.accountName}</div>
                            <div className='lg:text-center'>{item.amount}</div>
                            <div>{item?.timeInitiated}</div>
                            <div className="lg:mx-auto">
                                <Status status={item?.state} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Transactions