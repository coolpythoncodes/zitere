import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import { CopyToClipboard, Status } from 'components/misc';
import { Button } from 'components/input';
import { ConfirmTransferModal } from 'components/modals';
import { initRadenuContract } from 'utils/helper/contract.helper';
import { useParams } from 'react-router-dom';
import { formatDate, formatUnit } from 'utils/helper';
import { orderState } from 'utils/constant';


// images 
import arrowLeft from 'assets/icons/arrow-left.svg'


const RecepientDetails = ({ orderData, setOrderData }) => {

    const { id: orderId } = useParams()
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const getOrderById = async () => {
        try {
            const response = await initRadenuContract()
            const contract = response.contract
            const data = await contract.order(Number(orderId))
            setOrderData(data)
        } catch (error) {
            console.log({ error })
        }
    }

    const accountDetailsText = `Bank name: ${orderData?.bankName} \nAccount name: ${orderData?.accountName} \nAccount number: ${formatUnit(orderData?.accountNumber)}`

    const handleReleasePayment = () => {
        setShowConfirmModal(true)
    }

    useEffect(() => {
        getOrderById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ConfirmTransferModal {...{ showConfirmModal, setShowConfirmModal, orderData, setOrderData, orderId }} />
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
                            <p className="text-[#1C144C]">{formatUnit(orderData?.accountNumber)}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Bank</p>
                            <p className="text-[#1C144C]">{orderData?.bankName}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Amount</p>
                            <p className="text-[#1C144C]">{formatUnit(orderData?.amount)}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Rate</p>
                            <p className="text-[#1C144C]">{formatUnit(orderData?.exchangeRate)}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Fee</p>
                            <p className="text-[#1C144C]">$5</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">Date</p>
                            <p className="text-[#1C144C]">{formatDate(orderData?.timeInitiated)}</p>
                        </div>
                        <div className="flex items-center capitalize text-sm justify-between">
                            <p className="text-[#5B616E]">status</p>
                            <Status status={orderState[orderData?.state]} />
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleReleasePayment}
                    title={orderState[orderData?.state]?.toLowerCase() === "completed" ? "you've confirmed your payment" : "confirm payment completion"}
                    className="w-full h-10 text-sm md:text-base md:leading-[18px] disabled:bg-gray-600"
                    isDisabled={orderState[orderData?.state]?.toLowerCase() === "completed"}
                />

            </div>
        </>
    )
}

export default RecepientDetails