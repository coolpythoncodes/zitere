import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from 'components/input'

// images
import closeIcon from "assets/icons/close.png"
import riskIcon from "assets/icons/risk-icon.png"
import { initRadenuContract } from 'utils/helper/contract.helper'
import toast from 'react-hot-toast'

const ConfirmReceive = ({ showConfirmModal, orderId, setShowConfirmModal, setOrderData }) => {
  const [isConfirming, setIsConfirming] = useState(false)
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

  const handleConfirm = async () => {
      setIsConfirming(true)
      const notification = toast.loading("Processing request...")
      try {
          const response = await initRadenuContract()
          const contract = response.contract
          const trxHash = await contract.releasePayment(Number(orderId) + 1)
          const receipt = await trxHash.wait()
          if (receipt) {
              getOrderById()
              setIsConfirming(false)
              toast.success("Payment has been released", {
                  id: notification
              })
              setShowConfirmModal(false)
          }
      } catch (error) {
          console.log({ error })
          setIsConfirming(false)
          setShowConfirmModal(false)
          toast.error("Something went wrong", {
              id: notification
          })
      }
  }
  return (
    <Transition
      appear
      show={showConfirmModal}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-[999999]"
        onClose={() => setShowConfirmModal(false)}
      >
        <div className="min-h-screen text-center">
          <Dialog.Overlay className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-75 z-[999999]" />
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-11/12 text-left align-middle transition-all z-[999999999] relative shadow-xl bg-white max-w-lg px-6 py-6 rounded-[10px]">
            <Dialog.Title as="div" className="flex justify-between items-center">
              <img
                src={closeIcon}
                alt=""
                className="cursor-pointer ml-auto"
                onClick={() => setShowConfirmModal(false)}
              />
            </Dialog.Title>
            <section className="my-6">
              <div className="mx-auto w-fit flex flex-col items-center">
                <img src={riskIcon} alt="" />
                <h3 className="capitalize mt-4 text-center text-xl leading-6 text-black font-bold md:text-2xl md:leading-6">risk notice</h3>
              </div>
              <div className="my-4">
                <p className="text-[#737374] text-center text-sm md:text-base">Clicking on confirm success means your receipient have received the funds. Do you want to continue</p>
              </div>

            </section>
            <div className="flex items-center space-x-[10px] justify-end md:space-x-[22px]">
              <Button
                title={isConfirming ? 'transaction in progress...' : "Approve"}
                className="w-full h-9 rounded-[5px] text-sm leading-[18px] disabled:bg-gray-600"
                onClick={handleConfirm}
                isDisabled={isConfirming}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConfirmReceive