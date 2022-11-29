import { useEffect, useState } from "react"
import { Button } from "components/input"
import { AcceptOrderRiskModal } from "components/modals"
import { formatUnit, formatWalletAddress } from "utils/helper"
import { initRadenuContract } from "utils/helper/contract.helper"
import toast from "react-hot-toast"
import { useContractContext } from "context/ContractContext"

const OpenOrders = () => {

    const { account } = useContractContext()
    const [showRiskModal, setShowRiskModal] = useState(false)
    const [transferData, setTransferData] = useState();
    const [orderList, setOrderList] = useState([])

    const filterOrderList = orderList?.filter((item) => item?.state === 0).reverse()


    const handleShowRiskModal = (item) => {
        setShowRiskModal(true)
        setTransferData(item)
    }

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


    useEffect(() => {
        getOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    return (
        <>
            <AcceptOrderRiskModal
                {...{ showRiskModal, setShowRiskModal, transferData }}
            />
            <div className='bg-white rounded-lg md:rounded-2xl py-6 px-3 md:p-6'>
                <h1 className='matter-bold capitalize text-[#192839] text-2xl leading-[29px]'>open orders</h1>

                {/* Table heading */}
                <div className="overflow-x-auto mt-4">
                    <div className="w-[450px] md:w-full">
                        <div className="grid grid-cols-4 matter-regular text-[#848E9C] capitalize text-base leading-[18px] py-[15px] border-b border-[#F0F0F0] lg:w-full">
                            <div>Sender</div>
                            <div>amount($)</div>
                            {/* <div>Amount(₦)</div>= */}
                            <div>bank name</div>
                            <div>Trade</div>
                        </div>
                        {/* table body */}
                        <div className="h-[calc(100vh-300px)] overflow-y-auto">
                            {
                                filterOrderList?.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4  text-[#323131] capitalize text-xs md:text-base md:leading-[18px] py-[15px] border-b border-[#F0F0F0] lg:w-full items-center">
                                        <div className='text-[#2F2280] text-xs md:text-base w-[90%] overflow-hidden'>{formatWalletAddress(item.sender)}</div>
                                        <div className='text-center md:text-left'>${formatUnit(item?.amount)}</div>
                                        {/* <div className="text-center md:text-left">{item.nairaEquivalent}</div> */}
                                        <div className='md:w-[90%]'>{item?.bankName}</div>
                                        <Button
                                            onClick={() => handleShowRiskModal(item)}
                                            title="accept order"
                                            className="w-[80px] md:w-[126px] h-[31px] text-[11px] leading-[15px]"
                                        />
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default OpenOrders