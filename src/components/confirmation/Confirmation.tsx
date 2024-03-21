import React,{useState} from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

const Confirmation = () => {
  const [oneTime, setOneTime] = useState('')

  // 
  const handleChange = (newValue: string) => {
    setOneTime(newValue)
  }
  // Event triggered when finaly input is filled correctly 
  const handleComplete = (value: string) => {
	/**
	value: "ABCD"
	**/
  }

  // Event to validate and control user input
  const validateChar = (value: string, index: number) => {
	return matchIsNumeric(value)
  }

  return (
    <MuiOtpInput 
		value={oneTime} 
		onChange={handleChange}
		onComplete={handleComplete}
		validateChar={validateChar}
		autoFocus
		length={6} />
  )
}

export default Confirmation


// Checks if input data is appropriate char for varification
function matchIsNumeric(text:string) {
	const isNumber = typeof text === 'number'
	const isString = typeof text === 'string'
	return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
  }