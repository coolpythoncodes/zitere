import { useReducer } from "react"
import { INITIAL_BANK_STATE, sendMoneyReducer } from "utils/reducers"
import StepOne from "./step-one"
import StepTwo from "./step-two"

const SendMoney = ({ setBalance, setOrderList }) => {
  const [state, dispatch] = useReducer(sendMoneyReducer, INITIAL_BANK_STATE)
  return (
    <div className='bg-white py-6 px-5 mt-5 md:mt-0 h-fit'>
      {
        !state.amount ? <StepOne {...{ state, dispatch }} /> : <StepTwo {...{ state, dispatch, setBalance, setOrderList }} />
      }
    </div>
  )
}

export default SendMoney