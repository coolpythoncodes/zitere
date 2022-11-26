import { useRef, useState } from "react"
import numeral from 'numeral'
import { Button, Input, Select } from "components/input"
import { countries } from "utils/data"
import { ACTION_TYPES_SEND_MONEY } from "utils/reducers"
import toast from "react-hot-toast"
import { getBankList } from "api"

const SendMoneyOne = ({ dispatch, state }) => {
  const inputRef = useRef()

  const [userInput, setuserInput] = useState('')


  const handleTextChange = (e) => setuserInput(e.target.value)

  const handleSelectOption = (option) => {
    const getCountryCurrency = countries.filter(item => item.name.toLowerCase() === option.toLowerCase())
    dispatch({
      type: ACTION_TYPES_SEND_MONEY.SELECT_OPTION,
      payload: {
        option,
        countryCurrency: getCountryCurrency[0].currency
      }
    })
  }

  const fetchBankList = async () => {
    try {
      const res = await getBankList(state.countryCurrency)
      if (res?.status) {
        const bankList = res?.data?.data?.map(item => ({
          bankName: item?.name,
          bankCode: item?.code
        }))

        dispatch({
          type: ACTION_TYPES_SEND_MONEY.UPDATE_BANK_LIST,
          payload: bankList
        })
      } else {
        toast.error('Could not get banks in the country selected')
      }
    } catch (error) {
      toast.error('Could not get banks in the country selected')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (+inputRef?.current?.value < 10) {
      toast.error('minimum amount is $10')
      return
    }
    fetchBankList()

    dispatch({
      type: ACTION_TYPES_SEND_MONEY.FORM_ONE_SUBMISSION,
      payload: inputRef?.current?.value
    })
  }



  const countriesList = countries.map(data => data.name)


  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        label='Enter amount'
        additionalInfo='minimum amount $10'
        placeholder='$0'
        value={userInput && numeral(userInput).format('0,0')}
        handleTextChange={handleTextChange}
        usdc={true}
      />
      <Select
        data={countriesList}
        label='Country'
        state={state.country}
        handleSelectOption={handleSelectOption}
      />
      <Button title='Continue' className='w-full' />
    </form>
  )
}

export default SendMoneyOne