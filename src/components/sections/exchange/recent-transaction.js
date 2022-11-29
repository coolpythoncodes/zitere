import NoTransaction from 'components/misc/no-transaction'
import React from 'react'

const RecentTransactions = ({ orderList, setOrderList }) => {
    return (
        <div className='bg-white rounded-lg pt-6 pl-5 mt-[22px] h-[360px]'>
            <h2 className="matter-medium text-xl leading-6 capitalize text-[#192839]">Recent Transactions</h2>
            <NoTransaction />
        </div>
    )
}

export default RecentTransactions