import { RecentTransactions, SendMoney, WalletBalance } from "components/sections/exchange"
import { useState } from "react"

const Exchange = () => {
  const [balance, setBalance] = useState()
  const [orderList, setOrderList] = useState([])
  return (
    <div className="md:grid grid-cols-2 gap-x-9">
      <div className="">
        <WalletBalance {...{ balance, setBalance }} />
        <RecentTransactions {...{ orderList, setOrderList }} />
      </div>
      <SendMoney {...{ setBalance, setOrderList }} />
    </div>
  )
}

export default Exchange