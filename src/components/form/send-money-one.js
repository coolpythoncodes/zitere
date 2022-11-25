import { useRef, useState } from "react"
import numeral from 'numeral'
import { Button, Input, Select } from "components/input"
import { countries } from "utils/data"
import { ACTION_TYPES_SEND_MONEY } from "utils/reducers"

const SendMoneyOne = ({ dispatch, state }) => {
  const inputRef = useRef()

  const [userInput, setuserInput] = useState('')

  const handleTextChange = (e) => setuserInput(e.target.value)

  const handleSelectOption = (option) => dispatch({
    type: ACTION_TYPES_SEND_MONEY.SELECT_OPTION,
    payload: option
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: ACTION_TYPES_SEND_MONEY.FORM_ONE_SUBMISSION,
      payload: inputRef?.current?.value
    })
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
      />
      <Select
        data={countries}
        label='Country'
        state={state.country}
        handleSelectOption={handleSelectOption}
      />
      <Button title='Continue' className='w-full' />
    </form>
  )
}

export default SendMoneyOne