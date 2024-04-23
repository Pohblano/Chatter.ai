// Node-modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate()


	const handleChange = (newValue: string, info: MuiTelInputInfo) => {
		setPhoneNumber(newValue)
	}

	const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
		e.preventDefault();
		if (matchIsValidTel(phoneNumber)) {
			// TODO: send a post request to the server
			auth_api.register({ phone_number: phoneNumber.replaceAll(" ", "") })
				.then((response) => {
					if (response.status === 200) {
						return navigate('/validate?phone_number=' + encodeURIComponent(phoneNumber))
					}
				})
		} else {
			setError({ type: 'invalid', msg: 'Sorry, that\'s and invalid number.' })
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
					<button className="registerButton hover:chatter_input_hover" type="submit">
						<i className="fa-solid fa-arrow-up"></i>
					</button>

					{(error && error.type === 'invalid') ?
						<ErrorMessage setError={setError}{...error} />
						: null
					}
				</div>

				<p className='text-sm mt-12 font-bold text-end'>...or you can send a text to (844) 953-2146 </p>
			</form>
		</div>
	)

}


export default Register
