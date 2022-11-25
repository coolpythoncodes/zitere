import getBankDetails from 'api'
import { Button, Input, Select } from 'components/input'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ACTION_TYPES_SEND_MONEY } from 'utils/reducers'

const SendMoneyTwo = ({ state, dispatch }) => {
    const [isValid, setIsValid] = useState(false)

    const bankList = state.bankList.map(item => item.bankName)
    const handleSelectOption = (option) => {
        const bankName = option
        const bankDetails = state.bankList.filter(item => item.bankName.toLowerCase() === bankName.toLowerCase())
        const bankCode = bankDetails[0].bankCode
        dispatch({
            type: ACTION_TYPES_SEND_MONEY.SELECT_OPTION_BANK_NAME,
            payload: {
                option: option,
                bankCode:bankCode
            }
        })
    }

    const { data, refetch, error } = useQuery('Validate-account', getBankDetails(state.accountNumber, state.bankCode), { enabled: false })

    const _getBankDetails = ()=>{
        
    }

    const handleTextChange = (e) => {
        dispatch({
            type: ACTION_TYPES_SEND_MONEY.CHANGE_INPUT,
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    useEffect(() => {
        if (
            state.accountNumber &&
            state.bankName &&
            state.accountName
        )
            setIsValid(true);
    }, [state.accountNumber, state.bankName, state.accountName]);

    useEffect(() => {
        if (state?.accountNumber?.length === 10 && state?.bankName) {
            refetch()
            console.log('data',data)
            console.error('error', error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.accountNumber, state?.bankCode])


    return (
        <form className='mt-6 space-y-6'>
            <Select
                data={bankList}
                label='Bank name'
                state={state.bankName || 'Bank name'}
                handleSelectOption={handleSelectOption}
            />
            <Input
                type='number'
                label='Account number'
                name='accountNumber'
                placeholder='Account Number'
                handleTextChange={handleTextChange}
            />
            <Input
                label="Account name"
                name="accountName"
                placeholder="Account Name"
                isDisabled
                handleTextChange={handleTextChange}
                value={state?.accountName}
            />
            <Button
                title='Continue'
                className='w-full disabled:bg-gray-700'
                isDisabled={!isValid}
            />
        </form>
    )
}

export default SendMoneyTwo