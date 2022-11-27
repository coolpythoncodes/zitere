import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, CheckBox } from "components/input";
import { useNavigate } from "react-router-dom";

// images 
import closeIcon from 'assets/icons/close.png'
import riskIcon from 'assets/icons/risk-icon.png'


const AcceptOrderRiskModal = ({ showRiskModal, setShowRiskModal }) => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const navigate = useNavigate();

  const handleCheckbox = () => setIsTermsAccepted(!isTermsAccepted)
  const handleNavigation = (to) => navigate(to)


  return (
    <Transition
      appear
      show={showRiskModal}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-[999999]"
        onClose={() => setShowRiskModal(false)}
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
                onClick={() => setShowRiskModal(false)}
              />
            </Dialog.Title>
            <section className="my-6">
              <div className="mx-auto w-fit flex flex-col items-center">
                <img src={riskIcon} alt="" />
                <h3 className="capitalize mt-4 text-center text-xl leading-6 text-[#192839] matter-medium md:text-2xl md:leading-6">risk notice</h3>
              </div>
              <div className="my-4">
                <p className="text-center matter-regular text-[#737374] text-sm md:text-base">
                  Clicking on accept order means you  want to be an exchanger for this order which would last for <span className="text-[#9B0C14]">45 mins.</span> <br />
                  Do you wish to continue?
                </p>
              </div>
              <div className="flex items-center">
                <CheckBox
                  checked={isTermsAccepted}
                  onChange={handleCheckbox}
                />
                <p className="text-[#737374] matter-regular text-xs md:text-base">I have read and agree to the above terms and condition</p>
              </div>
            </section>
            <div className="flex items-center space-x-[10px] justify-end md:space-x-[22px]">
              <Button
                title="Yes, Continue"
                isDisabled={!isTermsAccepted}
                onClick={() => handleNavigation('/open-orders/12')}
                className="w-full h-9 rounded-[5px] text-sm leading-[18px]"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )

}

export default AcceptOrderRiskModal