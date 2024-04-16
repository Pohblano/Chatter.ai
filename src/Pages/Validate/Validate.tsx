// Libraries
import React, { useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Link } from 'react-router-dom'
// Styling
import './Validate.scss'



const Validate = () => {
  const [oneTime, setOneTime] = useState<string>('')
  const [error, setError] = useState<object>({
    type: '',
    msg: ''
  })
  const [timer, setTimer] = useState<number>()

  // Event triggered as value in input changes
  const handleChange = (newValue: string) => {
    setOneTime(newValue)
  }

  // Event triggered when finaly input is filled correctly 
  const handleComplete = (value: string) => {
    setError({
      type: 'invalid',
      msg: 'this code is invalid'
    })
  }

  // Event to validate and control user input
  const validateChar = (value: string, index: number) => {
    return matchIsNumeric(value)
  }

  return (
    <div className='confirmationWrapper'>
      <div className='oneTimeWrapper'>
        <Link to='/register' className='oneTimeReturnLink' ><i className="fa-solid fa-arrow-left"></i></Link>
        
        <div className=''>
          <h1 className="text-white  mb-7 font-bold text-center" >Enter Verification Code</h1>
          <MuiOtpInput
            className='oneTimeBoxes'
            value={oneTime}
            onChange={handleChange}
            onComplete={handleComplete}
            validateChar={validateChar}
            autoFocus
            length={4}
          />
        </div>

        <p className='oneTimeInfo text-center'>A text message with a verification code was sent to (626) 392-8591. Your code will expire in 60 sec.</p>
        <a href='#' className='oneTimeLink text-center'>Didn't receive a code?</a>
      </div>
    </div>
  )
}

export default Validate


// Checks if input data is appropriate char for varification
function matchIsNumeric(text: string) {
  const isNumber = typeof text === 'number'
  const isString = typeof text === 'string'
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
}