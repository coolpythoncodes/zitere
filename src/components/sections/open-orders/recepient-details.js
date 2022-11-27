import React, { useState } from 'react'
import Countdown from 'react-countdown';
import { CopyToClipboard, Status } from 'components/misc';
import { Button } from 'components/input';
import { ConfirmTransferModal } from 'components/modals';


// images 
import arrowLeft from 'assets/icons/arrow-left.svg'

const orderData =
{
    accountName: 'Ugoguba anthony',
    accountNumber: '0883883381',
    bankName: 'access bank',
    amount: 1000,
    exchangeRate: '750',
    timeInitiated: '22 Jun, 2022, 19:25PM'

}


const RecepientDetails = () => {
    
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const accountDetailsText = `Bank name:  \nAccount name:  \nAccount number:`

    return (
        <>
            <ConfirmTransferModal {...{ showConfirmModal, setShowConfirmModal }} />
            <div className="bg-white p-6">
                <a href="/open-orders" className="mb-[29px] inline-block">
                    <img src={arrowLeft} alt="" />
                </a>
                <div className="flex items-center justify-between mb-6">
                    <h3 className='text-[#192839] capitalize  font-medium text-lg'>recepient details</h3>
                    <CopyToClipboard text={accountDetailsText} />
                </div>
                <div className="flex space-x-2 text-[#737374] text-[15px] leading-[21px]">
                    <p className="ml-auto capitalize mb-6">
                        time remaining:
                    </p>
                    <Countdown date={Date.now() + (45 * 60000)} renderer={props => <p className="text-[#9B0C14] text-[15px] leading-[21px]">{props.minutes} : {props.seconds} </p>} />
                </div>
                <div className="space-y-4 mb-12">
                    <div className="space-y-4 mb-12">
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Transfer To</p>
                            <p className="text-[#1C144C]">{orderData?.accountName}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Account Details</p>
                            <p className="text-[#1C144C]">{orderData?.accountNumber}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Bank</p>
                            <p className="text-[#1C144C]">{orderData?.bankName}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Amount</p>
                            <p className="text-[#1C144C]">{orderData?.amount}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Rate</p>
                            <p className="text-[#1C144C]">{orderData?.exchangeRate}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Fee</p>
                            <p className="text-[#1C144C]">$5</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Date</p>
                            <p className="text-[#1C144C]">{orderData?.timeInitiated}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">status</p>
                            <Status status='accepted' />
                        </div>
                    </div>
                </div>

                <Button
                    title="confirm payment completion"
                    className="w-full h-10 text-sm md:text-base md:leading-[18px]"
                    onClick={()=>setShowConfirmModal(true)}
                />


            </div>
        </>
    )
}

export default RecepientDetails