import React, { useEffect } from 'react'
import { useContractContext } from 'context/ContractContext'
import numeral from 'numeral'
import { formatUnit } from 'utils/helper'
import { initRadenuTokenContract } from 'utils/helper/contract.helper'

const WalletBalance = ({ balance, setBalance }) => {
  const { account } = useContractContext()
  const getUserBalance = async () => {
    const response = await initRadenuTokenContract()
    const contract = await response.contract
    const accountBalance = await contract.balanceOf(account)
    setBalance(formatUnit(accountBalance))
  }

  useEffect(() => {
    getUserBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return (
    <div className='bg-white py-4 md:py-8 pl-3 md:pl-6 rounded-lg'>
      <p className="capitalize matter-regular text-[#0B0B27] text-lg leading-[22px]">Balance</p>
      <h1 className="mt-1 matter-semiBold text-2xl md:text-4xl md:leading-[43px]">${numeral(balance).format(',')}</h1>
    </div>
  )
}

export default WalletBalance