// Node-modules
import React, { useState } from "react";
import { 
	MuiTelInput, 
	MuiTelInputInfo, 
	MuiTelInputFlagElement,
	matchIsValidTel
} from 'mui-tel-input'

// Styling
import classes from './Loading.module.css'


function Register() {
	const [phoneNumber, setPhoneNumber] = React.useState<string>('')
	const unknownFlag: MuiTelInputFlagElement = <i className="fa-regular fa-comments"></i>

	const handleChange = (newValue: string, info: MuiTelInputInfo) => {
		setPhoneNumber(newValue)
		// if(matchIsValidTel(newValue)){
			
		// }else{
		// 	// set error message inside helper text
		// }
		
	}

	return <MuiTelInput 
		value={phoneNumber}
		onChange={handleChange}
		unknownFlagElement={unknownFlag}/>
		// helperText=
		// arror=

}


export default Register