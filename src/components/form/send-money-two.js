import { getBankDetails } from 'api'
import { Button, Input, Select } from 'components/input'
import { RiskNoticeOne, TradeDetails } from 'components/modals'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ACTION_TYPES_SEND_MONEY } from 'utils/reducers'

const SendMoneyTwo = ({ state, dispatch, setBalance, setOrderList }) => {
    const [isValid, setIsValid] = useState(false)
    const [showTradeDetails, setShowTradeDetails] = useState(false)
    const [showRiskNoticeOne, setShowRiskNoticeOne] = useState(false);

    const bankList = state?.bankList?.map(item => item.bankName)
    const handleSelectOption = (option) => {
        const bankName = option
        const bankDetails = state.bankList.filter(item => item.bankName.toLowerCase() === bankName.toLowerCase())
        const bankCode = bankDetails[0].bankCode
        dispatch({
            type: ACTION_TYPES_SEND_MONEY.SELECT_OPTION_BANK_NAME,
            payload: {
                option: option,
                bankCode: bankCode
            }
        })
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
        dispatch({
            type: ACTION_TYPES_SEND_MONEY.ACCOUNT_NOT_VALIDATED
        })

    }, [state.accountNumber, state.bankName, dispatch])


    useEffect(() => {
        if (
            state.accountNumber &&
            state.bankName &&
            state.accountName
        )
            setIsValid(true);
    }, [state.accountNumber, state.bankName, state.accountName]);

    const validateAccount = async (e) => {
        e.preventDefault()
        if (!state.accountNumber || !state.bankCode) {
            toast.error('Account number and bank are required')
            return
        }
        const notification = toast.loading('Validating account details')

        try {
            const response = await getBankDetails(
                state.accountNumber,
                state.bankCode
            );
            if (response?.status) {
                dispatch({
                    type: ACTION_TYPES_SEND_MONEY.UPDATE_ACCOUNT_NAME,
                    payload: {
                        accountName: response?.data?.data?.account_name,
                        accountNumber: response?.data?.data?.account_number
                    }
                })

                dispatch({
                    type: ACTION_TYPES_SEND_MONEY.ACCOUNT_VALIDATED
                })

                toast.success("Account details fetched successfully", {
                    id: notification
                })

            } else {
                toast.error("Please check the account details", {
                    id: notification
                });
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: notification
            });
        }
    }

    const handleContinue = (e) => {
        e.preventDefault()
        setShowTradeDetails(true)
    }

    return (
        <>
            {showTradeDetails && (
                <TradeDetails
                    formData={state}
                    {...{ state, dispatch, setShowTradeDetails, showTradeDetails, setShowRiskNoticeOne, setBalance, setOrderList }}
                />
            )}

            {
                showRiskNoticeOne && (
                    <RiskNoticeOne {...{ showRiskNoticeOne, setShowRiskNoticeOne, state, dispatch, setOrderList, setBalance }} />
                )
            }
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
                {
                    state.isAccountValidated ?
                        <Button
                            title='Continue'
                            className='w-full disabled:bg-gray-700'
                            isDisabled={!isValid}
                            onClick={handleContinue}
                        />
                        :
                        <Button
                            title='Validate account'
                            className='w-full'
                            onClick={validateAccount}
                        />
                }


            </form>
        </>
    )
}

export default SendMoneyTwo