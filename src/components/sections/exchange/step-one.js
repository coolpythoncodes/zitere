import { SendMoneyOne } from 'components/form'
import React from 'react'

const StepOne = ({ state, dispatch }) => {
    return (
        <div>
            <h1 className="capitalize matter-bold text-xl text-[#0B0B27] mb-6">send money</h1>
            <SendMoneyOne {...{ state, dispatch }} />
        </div>
    )
}

export default StepOne