
// images
import arrowLeft from 'assets/icons/arrow-left.svg'
import { SendMoneyTwo } from 'components/form'
import { ACTION_TYPES_SEND_MONEY } from 'utils/reducers'

const StepTwo = ({ state, dispatch }) => {
    return (
        <div>
            <button className="mb-[13px]" onClick={() => dispatch({ type: ACTION_TYPES_SEND_MONEY.FORM_ONE_SUBMISSION })}>
                <img src={arrowLeft} alt="" />
            </button>
            <h3 className="matter-medium text-xl leading-6 text-[#0B0B27]">
                Enter recepient bank details
            </h3>
            <SendMoneyTwo  {...{ state, dispatch }} />
        </div>
    )
}

export default StepTwo