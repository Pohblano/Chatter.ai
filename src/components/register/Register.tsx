// Node-modules
import React, { useState, useEffect } from "react";
import {
	MuiTelInput,
	MuiTelInputFlagElement,
	matchIsValidTel,
} from 'mui-tel-input'
// Styling
import './Register.scss'




function Register() {
	const [phoneNumber, setPhoneNumber] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')
	const unknownFlag: MuiTelInputFlagElement = <i className="fas fa-globe-americas"></i>

	useEffect(()=>{
		fetch('/api/ml')
			.then(res => console.log(res))
	}, [])

	const handleChange = (newValue: string) => {
		// if (!matchIsValidTel(newValue)) {
		// 	setPhoneNumber(newValue)
		// } else {
		// 	setError('Entered more than 10digits')
		// }
	}



	// TODO: make this sends a post request to the server (/api/send_registration_code) with phone_number in the body
	// then display confirmation message ("Check your phone for a text message with a code to enter below.")
	const handleSubmit = (e: React.SyntheticEvent<EventTarget>) =>{
		console.log(e)
	}

	return (
		<form onSubmit={handleSubmit} className='registerWrapper'>
			
		 	<h1><i className="fa-regular fa-comments"></i>  Chatter.ai</h1>

		 	<div className='phoneInput'>
		 		<MuiTelInput 
		 			value={phoneNumber}
		 			onChange={handleChange}
		 			unknownFlagElement={unknownFlag}
		 			placeholder="Enter a valid numer"
		 		/>
		 	</div>

		 	<p className='registerInfo'><sub>*We'll be sending you a text. Don't worry this only happens once</sub></p>
		</form>
	)
	// helperText=
	// error=

}


export default Register