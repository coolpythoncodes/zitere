import { ExchangerDetails } from 'components/misc'
import { RecepientDetails } from 'components/sections/open-orders'

const OrderTransactionPage = () => {
  return (
    <div className='md:grid grid-cols-2 md:gap-x-8'>
        <RecepientDetails />
        <ExchangerDetails /> 
    </div>
  )
}

export default OrderTransactionPage