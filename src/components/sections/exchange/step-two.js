import { ACTION_TYPES_SEND_MONEY } from 'utils/reducers'
import { SendMoneyTwo } from 'components/form'

// images
import arrowLeft from 'assets/icons/arrow-left.svg'

const StepTwo = ({ state, dispatch, setBalance, setOrderList }) => {
    return (
        <div>
            <button className="mb-[13px]" onClick={() => dispatch({ type: ACTION_TYPES_SEND_MONEY.GO_BACK })}>
                <img src={arrowLeft} alt="" />
            </button>
            <h3 className="matter-medium text-xl leading-6 text-[#0B0B27]">
                Enter recepient bank details
            </h3>
            <SendMoneyTwo  {...{ state, dispatch, setBalance, setOrderList }} />
        </div>
    )
}

export default StepTwo