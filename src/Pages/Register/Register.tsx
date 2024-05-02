// Node-modules
import React, { useState } from "react";
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
		<div className="registerWrapper mx-10">
			<h1 className="font-bold mb-7 mt-12
			 text-white"><i className="fa-regular fa-comments"></i>  Chatter.ai</h1>
			<form onSubmit={handleSubmit} className=''>

				<div className='phoneInput'>
					{/* <h2 className="text-white mb-3 font-bold text-start" >Register <i className=" fa fa-right-to-bracket"></i></h2> */}
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

				<p className='w-3/3 text-xs mt-6 pl-2 text-gray-600 text-center break-words'>By submitting this form, you agree to receive text messages from our chatbot and any personalized notifications from us at the cell number used. </p>
				<p className="w-2/3 text-xs text-gray-600 mt-2">Reply <span className="font-bold text-white">HELP</span> for help and <span className="font-bold text-white">STOP</span> to cancel. Message frequency varies.
				
				Msg/data rates may apply.</p>
			</form>
		</div>
	)

}


export default Register
