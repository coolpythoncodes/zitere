import { RecentTransactions, SendMoney, WalletBalance } from "components/sections/exchange"

const Exchange = () => {
  return (
    <div className="md:grid grid-cols-2 gap-x-9">
      <div className="">
        <WalletBalance />
        <RecentTransactions />
      </div>
      <SendMoney />
    </div>
  )
}

export default Exchange