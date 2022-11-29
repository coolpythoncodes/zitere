import { ExchangerDetails } from 'components/misc'
import { RecepientDetails } from 'components/sections/open-orders'
import { useState } from 'react'

const OrderTransactionPage = () => {
  const [orderData, setOrderData] = useState([])
  console.log(orderData)
  return (
    <div className='md:grid grid-cols-2 md:gap-x-8'>
      <RecepientDetails {...{ setOrderData, orderData }} />
      <ExchangerDetails
        transactionState={orderData?.state}
        address={orderData?.sender}
        sender={orderData?.sender} />
    </div>

  )
}

export default OrderTransactionPage