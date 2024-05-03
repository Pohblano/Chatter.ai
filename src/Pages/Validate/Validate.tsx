// Libraries
import React, { useEffect, useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// Custom Components
import { ErrorMessage } from '../../components/Utils/Messages'
// Api
import { auth_api } from '../../Api/AuthApi'
// Styling
import './Validate.scss'


interface Error {
	type?: string,
	msg?: string
}


const Validate = () => {
  const { search } = useLocation()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [one_time, setOneTime] = useState<string>('')
  // const [timer, setTimer] = useState<number>()
  const [error, setError] = useState<Error>({
    type: '',
    msg: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const query = new URLSearchParams(search);
    const number = query.get("phone_number")
    setPhoneNumber(number)
  }, [])

  // Event triggered as value in input changes
  const handleChange = (newValue: string) => {
    setOneTime(newValue)
  }

  // Event to validate and control user input
  const validateChar = (value: string, index: number) => {
    return matchIsNumeric(value)
  }


  // Checks if input data is appropriate char for varification
  function matchIsNumeric(text: string) {
    const isNumber = typeof text === 'number'
    const isString = typeof text === 'string'
    return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
  }

  ////SAVE USER PHONE NUMBER (AFTER VALIDATION) TO LOCAL STORAGE
  // Event triggered when finaly input is filled correctly 
  const handleComplete = (login_code: string) => {
    const phone_number = phoneNumber.replaceAll(" ", "");
    auth_api.validate({ login_code, phone_number })
      .then(response => {
        if (response.status === 200) {
          const { token } = response.data
          saveTokenToLocalStorage(token)
          navigate('../')
        }
      }).catch(err => {
        const { error } = err.response.data
          setError(error)
      })
  }

  // Function to handle saving the token to localStorage
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  return (
    <div className='confirmationWrapper h-dvh'>
      <div className='oneTimeWrapper'>
        <Link to='/register' className='oneTimeReturnLink' ><i className="fa-solid fa-arrow-left"></i></Link>

        <div className='chatter_bg z-30'>
          <h1 className="text-white mb-5 font-bold text-center" >Enter Verification Code</h1>
          <MuiOtpInput
            className='oneTimeBoxes'
            value={one_time}
            onChange={handleChange}
            onComplete={handleComplete}
            validateChar={validateChar}
            autoFocus
            length={6}
          />
        </div>
        {(error && error.type === 'invalid') ?
						<ErrorMessage setError={setError}{...error} />
						: null
					}

        <p className='oneTimeInfo text-center text-sm'>A verification code was sent to: <span className=' text-white'>{phoneNumber}</span></p>
        <Link className='oneTimeLink text-center text-xs' to='../register'> Didn't receive a code?</Link>
      </div>
    </div>
  )
}

export default Validate

