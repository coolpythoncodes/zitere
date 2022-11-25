import { Select } from 'components/input'
import React from 'react'

const SendMoneyTwo = ({ state, dispatch }) => {
    return (
        <form>
            <Select data={[]} label='Bank name' state={state.bankName} />
        </form>
    )
}

export default SendMoneyTwo