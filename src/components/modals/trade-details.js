import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "components/input"
import { useQuery } from "react-query";
import numeral from "numeral";
import { convertToNumber, fetch, formatUnit, parseUnit } from "utils/helper";
import { ACTION_TYPES_SEND_MONEY } from "utils/reducers";
import { useContractContext } from "context/ContractContext";

// images 
import closeIcon from 'assets/icons/close.png'
import { initRadenuTokenContract } from "utils/helper/contract.helper";
import toast from "react-hot-toast";
import { RadenuContractAddress } from "utils/constant";


const TradeDetails = ({ showTradeDetails, setShowTradeDetails, setShowRiskNoticeOne, state, dispatch }) => {
    const { account, isLoading, setStore } = useContractContext()
    const [allowanceBalance, setAllowanceBalance] = useState()
    const [isApproving, setIsApproving] = useState(false)

    const { data } = useQuery(["exchange-rate"], () =>
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${state.countryCurrency}&from=USD&amount=${state.amount}&apikey=${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}`)
    );

    const tradeDetails = [
        {
            heading: "amount",
            description: `$${state.amount} (${state.countryCurrency}${numeral(data?.result).format('0,0')})`
        },
        {
            heading: "bank name",
            description: state.bankName
        },
        {
            heading: "account number",
            description: state.accountNumber
        },
        {
            heading: "account name",
            description: state.accountName
        },
        {
            heading: "rates",
            description: `${state.countryCurrency}${numeral(data?.info?.rate).format()}/$1`
        },
        {
            heading: "fee",
            description: "$5"
        },
    ]

    const handleProceedTransactions = () => {
        setShowTradeDetails(false)
        setShowRiskNoticeOne(true)
    }

    const checkAllowance = async () => {
        setStore(prev => ({
            ...prev,
            isLoading: true
        }))
        try {
            const response = await initRadenuTokenContract()
            const contract = response.contract
            const allowance = await contract.allowance(account, RadenuContractAddress)
            const balance = formatUnit(allowance)
            setAllowanceBalance(balance)
            setStore(prev => ({
                ...prev,
                isLoading: false,
            }))
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const approveTransaction = async () => {
        const approvalAmount = convertToNumber(state.amount)
        setIsApproving(true)
        const notification = toast.loading('Approving transaction')
        try {
            const response = await initRadenuTokenContract()
            const contract = response.contract
            const txHash = await contract.approve(RadenuContractAddress, parseUnit(approvalAmount))
            const receipt = await txHash.wait()
            if (receipt) {
                checkAllowance()
                toast.success("Approval was successful", {
                    id: notification
                })
            }
            setIsApproving(false)

        } catch (error) {
            toast.error("Something went wrong", {
                id: notification
            })
            setIsApproving(false)
        }
    }

    useEffect(() => {
        if (data) {
            dispatch({
                type: ACTION_TYPES_SEND_MONEY.UPDATE_RATE,
                payload: data?.info?.rate
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        checkAllowance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Transition
            appear
            show={showTradeDetails}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="fixed inset-0 z-[999999]"
                onClose={() => setShowTradeDetails(false)}
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
                            <h1 className="capitalize text-xl leading-6 text-[#0B0B27] font-bold md:text-2xl md:leading-6">trade details</h1>
                            <img
                                src={closeIcon}
                                alt=""
                                className="cursor-pointer"
                                onClick={() => setShowTradeDetails(false)}
                            />
                        </Dialog.Title>
                        <section className="my-6 space-y-5">
                            {
                                tradeDetails.map((item, index) => (
                                    <div key={index}>
                                        <h4 className="font-medium text-sm leading-[19px] text-[#0A0B0D] capitalize">{item.heading}</h4>
                                        <p className="text-[#737374] text-base leading-[22px]">{item.description}</p>
                                    </div>
                                ))
                            }

                        </section>

                        {
                            isLoading ? <p className="text-center">Please wait...</p> :

                                <div className="space-y-[10px] md:space-y-[22px]">
                                    {
                                        allowanceBalance <= convertToNumber(state.amount) &&
                                        <Button
                                            title={
                                                isApproving ?
                                                    "Approving Transaction..."
                                                    :
                                                    "Approve Transaction"}
                                            className="w-full h-9 rounded-[5px] text-sm leading-[18px] disabled:bg-gray-600"
                                            onClick={approveTransaction}
                                            isDisabled={isApproving || (allowanceBalance >= convertToNumber(state.amount))}
                                        />
                                    }
                                    <Button
                                        title="proceed with transactions"
                                        className="w-full h-9 rounded-[5px] text-sm leading-[18px] disabled:bg-gray-600"
                                        onClick={handleProceedTransactions}
                                        isDisabled={!(allowanceBalance >= convertToNumber(state.amount))}
                                    />
                                </div>
                        }

                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default TradeDetails