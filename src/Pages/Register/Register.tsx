// Node-modules
import React, { useState, useEffect } from "react";
import {
	MuiTelInput,
	MuiTelInputInfo,
	MuiTelInputFlagElement,
	matchIsValidTel,
} from 'mui-tel-input'
// Custom Componets
import { ErrorMessage } from "../../components/Utils/Messages";
// Styling
import './Register.scss'
// Api
import { auth_api } from "../../Api/AuthApi";



interface Error {
	type?: string,
	msg?: string
}

function Register() {
	const [phoneNumber, setPhoneNumber] = useState<string>('')
	const [error, setError] = useState<Error>()
	const unknownFlag: MuiTelInputFlagElement = <i className="fas fa-globe-americas"></i>

	const handleChange = (newValue: string, info: MuiTelInputInfo) => {
		setPhoneNumber(newValue)
	}

	// TODO: make this sends a post request to the server (/api/send_registration_code) with phone_number in the body
	// then display confirmation message ("Check your phone for a text message with a code to enter below.")
	const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
		e.preventDefault();
		if (matchIsValidTel(phoneNumber)) {
			
		} else {
			setError({type: 'invalid',msg: 'Sorry, that\'s and invalid number.'})
		}
	}

	return (
		<div className="registerWrapper">
			<h1 className="font-bold mb-7 mt-12
			 text-white"><i className="fa-regular fa-comments"></i>  Chatter.ai</h1>
			<form onSubmit={handleSubmit} className=''>

				<div className='phoneInput'>
					<h3 className="text-white mb-3 font-bold text-start" >To use our messenger</h3>
					<MuiTelInput
						className="shadow-lg"
						value={phoneNumber}
						onChange={handleChange}
						unknownFlagElement={unknownFlag}
						continents={['NA']} placeholder="Enter a mobile number."
					/>
						
					{(error && error.type === 'invalid') ?
						<ErrorMessage setError={setError}{...error} />
						: null
					}
				</div>

				
				<p className='text-sm mt-12 font-bold text-end'>...or you can send a text to (626) 392-8591</p>
			</form>
		</div>
	)

}


export default Register
