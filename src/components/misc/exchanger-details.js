import { Button, Input } from "components/input";
import { useContractContext } from "context/ContractContext";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatWalletAddress } from "utils/helper";


const ExchangerDetails = ({ address, transactionState }) => {
    const { account } = useContractContext()
    const { id: orderId } = useParams()

    const messageBoxRef = useRef()
    // const { messages, sendMessage } = useChat(orderId)
    const [userMessage, setUserMessage] = useState('');
    const [messages, sendMessage] = useState([])

    const handleChangeText = (e) => setUserMessage(e.target.value)

    const handleSendMessage = (e) => {
        e.preventDefault()
        // sendMessage(userMessage)
        setUserMessage(' ')
    }
    useEffect(() => {
        const messageBoxElement = messageBoxRef.current
        messageBoxElement.scrollTop = messageBoxElement.scrollHeight
    }, [messages]);

    return (
        <div className='bg-white py-8 h-fit  px-6 mt-8 md:mt-0'>
            <h3 className='text-[#0B0B27] capitalize matter-medium text-lg mb-[41px]'>exchanger</h3>

            {
                transactionState >= 1 ?
                    <div className="mb-[49px] space-y-[26px]">
                        <div className="flex item-center justify-between">
                            <p className="text-sm text-[#5B616E] capitalize">username</p>
                            <p className="text-[#4B4B4B]">{address ? formatWalletAddress(address) : "loading..."}</p>
                        </div>
                        <div className="flex item-center justify-between">
                            <p className="text-sm text-[#5B616E] capitalize">number of Trades</p>
                            <p className="text-[#4B4B4B]">16</p>
                        </div>
                    </div> :
                    <div className='mb-10'>No one has accepted  your order yet.</div>
            }

            {/* messaging */}
            <div ref={messageBoxRef} className='overflow-y-scroll border-[#A7B7C8] border p-2 h-[200px]'>
                <ul className='space-y-8 text-sm'>
                    {messages?.map((msg, index) => [
                        <li key={index} className={`rounded-lg p-2 ${msg.ownedByCurrentUser ? "bg-[#F2F3F7] text-[#595959]" : "bg-[#8E7CFF] text-white"}`}>
                            {msg?.body}
                            <p className='mt-2'>sent by {msg.ownedByCurrentUser ? formatWalletAddress(account) : formatWalletAddress(address)}</p>

                            {/* <span>{msg.sender}</span> */}
                        </li>
                    ])}
                </ul>
            </div>
            <form onSubmit={handleSendMessage} className="">
                <Input
                    onChange={handleChangeText}
                    value={userMessage}
                    placeholder="type message here"
                    className="mt-5"
                />
                <Button
                    title="send message"
                    className='ml-auto mt-5 text-sm p-2'

                />
            </form>

        </div>
    )
}

export default ExchangerDetails