import { useRef, useState } from "react"
import numeral from 'numeral'
import { Button, Input, Select } from "components/input"
import { countries } from "utils/data"
import { ACTION_TYPES_SEND_MONEY } from "utils/reducers"
import { useQuery } from "react-query"
import axios from "axios"
import toast from "react-hot-toast"

const SendMoneyOne = ({ dispatch, state }) => {
  const inputRef = useRef()

  const [userInput, setuserInput] = useState('')

  const getBanks = () => {
    const res = axios.get(`https://api.paystack.co/bank?cuiurrency=${getCountryCurrency(state.country)}`)
    return res
  }

  const { data, refetch } = useQuery('get-banks', getBanks, { enabled: false })
  const handleTextChange = (e) => setuserInput(e.target.value)

  const handleSelectOption = (option) => dispatch({
    type: ACTION_TYPES_SEND_MONEY.SELECT_OPTION,
    payload: option
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    refetch()
    const bankList = data?.data?.data?.map(item => ({
      bankName: item?.name,
      bankCode: item?.code
    }))

    if (!bankList) {
      toast.error('Could not get banks in country selected')
      return
    }

    if (+inputRef?.current?.value < 10) {
      toast.error('minimum amount is $10')
      return
    }

    dispatch({
      type: ACTION_TYPES_SEND_MONEY.FORM_ONE_SUBMISSION,
      payload: inputRef?.current?.value
    })
    dispatch({
      type: ACTION_TYPES_SEND_MONEY.UPDATE_BANK_LIST,
      payload: bankList
    })
  }

  const countriesList = countries.map(data => data.name)
  const getCountryCurrency = (country) => {
    const countryData = countries.filter(item => item.name.toLowerCase() === country.toLowerCase())
    return countryData[0].currency
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        label='Enter amount'
        additionalInfo='minimum amount $10'
        placeholder='$0'
        value={userInput && numeral(userInput).format('0,0')}
        handleTextChange={handleTextChange}
        usdc
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