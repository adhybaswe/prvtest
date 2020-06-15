import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import PinInput from 'react-pin-input';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { setTokenAction } from '../actions/authAction'
import { useDispatch } from 'react-redux'

const KonfirmasiOTP = () => {

	const history = useHistory();
	const [code,setCode] = useState('')
	const dispatch = useDispatch()
	const auth = useSelector(state => state.authReducer) 
	console.log('auth',auth)
	const onVerifikasi = () => {
		let formData = new FormData();
		formData.append('user_id', auth.user.userid); 
		formData.append('otp_code', code); 
		axios({
			  	method: 'post',
			  	data: formData,
			  	headers: { 
			  		'Content-Type': 'application/x-www-form-urlencoded' , 
			  		'Accept': 'application/json',
			  		'Access-Control-Allow-Origin' : '*',
			  	},
			  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/register/otp/match'
			})
		  	.then(function (response) {
			   console.log(response)
		  		if(response.status === 201){
		  			let token = response.data.data.user.access_token
		  			localStorage.setItem('token', token)
		  			dispatch(setTokenAction(token))
		  		}
		  	})
		  	.catch(function (error) {
		  		console.log(error)
		  	});
	}

	const onRequest = (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('phone', auth.user.phone);  
		axios({
			  	method: 'post',
			  	data: formData,
			  	headers: { 
			  		'Content-Type': 'application/x-www-form-urlencoded' , 
			  		'Accept': 'application/json',
			  		'Access-Control-Allow-Origin' : '*',
			  	},
			  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/register/otp/request'
			})
		  	.then(function (response) {
			    console.log(response)
		  	})
		  	.catch(function (error) {
		  		console.log(error)
		  	});
	}

	return(
		<div className="container">
			<div className="row">
				<div className="col-md-4">
				  	<PinInput 
					  length={4} 
					  initialValue=""
					  type="numeric" 
					  style={{padding: '10px',textAlign:'center'}}  
					  inputStyle={{borderColor: 'red'}}
					  inputFocusStyle={{borderColor: 'blue'}}
					  onComplete={ (value,index) => { setCode(value) } }
					/>
					<button onClick={onVerifikasi} className="btn btn-primary btn-block">Verifikasi</button>
					<div className="text-center p-2">
						<a href="#" onClick={onRequest}>Kirim Ulang Kode Verifikasi</a>
					</div>
				</div>				
			</div>
		</div>
	)
}

export default KonfirmasiOTP