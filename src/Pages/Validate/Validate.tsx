// Libraries
import React, { useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Link } from 'react-router-dom'
// Styling
import './Validate.scss'
import { auth_api } from '../../Api/AuthApi'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


const Validate = () => {
  const { search } = useLocation()
  const [oneTime, setOneTime] = useState<string>('')
  const [timer, setTimer] = useState<number>()
  const [error, setError] = useState<object>({
    type: '',
    msg: ''
  })
  const navigate = useNavigate()

  // Event triggered as value in input changes
  const handleChange = (newValue: string) => {
    setOneTime(newValue)
  }

  ////SAVE USER PHONE NUMBER (AFTER VALIDATION) TO LOCAL STORAGE
  // Event triggered when finaly input is filled correctly 
  const handleComplete = (login_code: string) => {
    const query = new URLSearchParams(search);
    const phone_number = query.get("phone_number").replaceAll(" ", "");
    auth_api.validate({ login_code, phone_number}).then((response) => {
      if (response.status === 200) {
        console.log('success')
        navigate('./dashboard')
        return
      } else {
        setError({
          type: 'invalid',
          msg: 'this code is invalid'
        })
      }
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
            length={6}
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