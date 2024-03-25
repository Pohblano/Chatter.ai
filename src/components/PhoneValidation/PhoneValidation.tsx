// Libraries
import React, { useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import {Link} from 'react-router-dom'
// Styling
import classes from './PhoneValidation.module.css'



const PhoneValidation = () => {
  const [oneTime, setOneTime] = useState('')

  // Event triggered as value in input changes
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
    <div className={`${classes.confirmationWrapper}`}>
      <div className={`${classes.oneTimeWrapper}`}>
        <Link to='/register' className={`${classes.oneTimeReturnLink}`} ><i className="fa-solid fa-arrow-left"></i></Link>
        <h1><i className="fa-regular fa-comments"></i>    Chatter.ai</h1>
        {/* <p>Enter Verification Code</p> */}

        {/* <h2><i className="fa-solid fa-user-check"></i>  Chatter.ai</h2> */}
        {/* <p className={`${classes.oneTimeHeader}`}>Enter Verification Code</p> */}
        <MuiOtpInput
          className={`${classes.oneTimeBoxes}`}
          value={oneTime}
          onChange={handleChange}
          onComplete={handleComplete}
          validateChar={validateChar}
          autoFocus
          length={4}
        />

        <p className={`${classes.oneTimeInfo}`}>A text message with a verification code was sent to (626) 392-8591. Enter the code to continue.</p>
        <a href='#' className={`${classes.oneTimeLink}`}>Didn't receive a code?</a>
      </div>
    </div>
  )
}

export default PhoneValidation


// Checks if input data is appropriate char for varification
function matchIsNumeric(text: string) {
  const isNumber = typeof text === 'number'
  const isString = typeof text === 'string'
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
}