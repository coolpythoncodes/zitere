import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "components/input"
import { useQuery } from "react-query";
import numeral from "numeral";
import { fetch } from "utils/helper";

// images 
import closeIcon from 'assets/icons/close.png'


const TradeDetails = ({ showTradeDetails, setShowTradeDetails, formData, setShowRiskNoticeOne, state, dispatch }) => {

    const { data } = useQuery(["exchange-rate"], () =>
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${state.countryCurrency}&from=USD&amount=250&apikey=${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}`)
    );


    const tradeDetails = [
        {
            heading: "amount",
            description: `$${formData.amount} (${state.countryCurrency}${numeral(data?.result).format('0,0')})`
        },
        {
            heading: "bank name",
            description: formData.bankName
        },
        {
            heading: "account number",
            description: formData.accountNumber
        },
        {
            heading: "account name",
            description: formData.accountName
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


                        <div className="space-y-[10px] md:space-y-[22px]">

                            <Button
                                type="button"
                                className="w-full h-9 rounded-[5px] text-sm leading-[18px]"
                            />

                            <Button
                                type="button"
                                title="proceed with transactions"
                                className="w-full h-9 rounded-[5px] text-sm leading-[18px]"
                                onClick={handleProceedTransactions}
                            />
                        </div>

                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default TradeDetails