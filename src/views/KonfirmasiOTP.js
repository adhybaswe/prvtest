import React from 'react'
import { useSelector } from 'react-redux';

const KonfirmasiOTP = () => {
	const auth = useSelector(state => state.authReducer.auth) 
	console.log(auth)
	
	return(
		<div className="container">
			<div className="row">
				<div className="col-md-12">
				  	<h1>Konfirmasi OTP</h1>
				</div>				
			</div>
		</div>
	)
}

export default KonfirmasiOTP