import { useEffect, useState } from 'react'
import { CopyToClipboard, ExchangerDetails, Status } from 'components/misc'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { orderState } from 'utils/constant'
import { formatDate, formatUnit } from 'utils/helper'
import { initRadenuContract } from 'utils/helper/contract.helper'
import { ConfirmReceive } from 'components/modals'
import { Button } from 'components/input'

const ExchangeTransactionPage = () => {
  const { id: orderId } = useParams()

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [orderData, setOrderData] = useState([])

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

  const handleReport = async () => {
    const notification = toast.loading('Opening a dispute')
    try {
      const response = await initRadenuContract()
      const contract = response.contract
      const trxHash = await contract.openDispute(Number(orderId) + 1)
      const reciept = await trxHash.wait()
      if (reciept) {
        getOrderById()
        toast.success('Dispute has been opened', {
          id: notification
        })
      }
    } catch (error) {
      toast.error('Something went wrong', {
        id: notification
      })
    }
  }

  useEffect(() => {
    getOrderById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const accountDetailsText = `Bank name: ${orderData?.bankName} \nAccount name: ${orderData?.transferTo} \nAccount number: ${orderData.accountNumber}`

  const handleReleasePayment = () => {
    setShowConfirmModal(true)
  }
  return (
    <>
      <ConfirmReceive
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        orderId={orderId}
        setOrderData={setOrderData}
      />
      <div className="layout-container md:grid md:grid-cols-2 md:gap-x-8">
        <div className="bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className='text-[#192839] capitalize  font-medium text-lg'>transaction details</h3>
            <CopyToClipboard text={accountDetailsText} />
          </div>
          {orderData.length > 0 ? <div className="space-y-4 mb-12">
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
              <p className="text-[#1C144C]">{(orderData?.bankName)}</p>
            </div>
            <div className="flex items-center capitalize text-sm justify-between">
              <p className="text-[#5B616E]">Amount</p>
              <p className="text-[#1C144C]">${formatUnit(orderData?.amount)}</p>
            </div>
            <div className="flex items-center capitalize text-sm justify-between">
              <p className="text-[#5B616E]">Rate</p>
              <p className="text-[#1C144C]">${formatUnit(orderData?.exchangeRate)}</p>
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
          </div> : null
          }
          <div className="space-y-4">
            {
              !(orderData?.state <= 1) ?
                <>
                  <Button
                    isDisabled={orderState[orderData?.state]?.toLowerCase() === "fufilled" || orderState[orderData?.state]?.toLowerCase() === "indispute"}
                    onClick={handleReleasePayment}
                    title={orderState[orderData?.state]?.toLowerCase() === "fufilled" ? "Payment has been released" : orderState[orderData?.state]?.toLowerCase() === "indispute" ? "Indispute" : "release payment"}
                    className="w-full h-10 text-base leading-[18px] disabled:bg-gray-600"
                  />

                  {
                    orderState[orderData?.state]?.toLowerCase() === "indispute" ?
                      null :
                      <button
                        onClick={handleReport}
                        className='w-full h-10 text-base leading-[18px] bg-[#F5F5F5] text-[#1C144C] btn  disabled:bg-gray-700 disabled:text-white'>
                        Report
                      </button>
                  }
                </> :
                <p className='text-center'>Waiting for someone to complete your order</p>

            }


          </div>
        </div>
        <ExchangerDetails
          transactionState={orderData?.state}
          address={orderData?.receiver}
          sender={orderData?.sender}
        />
      </div>
    </>
  )
}

export default ExchangeTransactionPage