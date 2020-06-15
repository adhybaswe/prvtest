import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'
import axios from 'axios';
import { registerAction, setTokenAction} from '../actions/authAction'
import { useHistory } from "react-router-dom";

function RegisterLogin(){

	const dispatch = useDispatch()
	const history = useHistory();
	const [error,setError] = useState([])
	const [loginLoading,setLoginLoading] = useState(false)
	const [registerLoading,setRegisterLoading] = useState(false)
	
	const register = (data) => {
			axios({
			  	method: 'post',
			  	data: data,
			  	headers: { 
			  		'Content-Type': 'application/x-www-form-urlencoded' , 
			  		'Accept': 'application/json',
			  		'Access-Control-Allow-Origin' : '*',
			  	},
			  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/register'
			})
		  	.then(function (response) {
			    if(response.status === 201){
			    	let id = response.data.data.user.id
			    	localStorage.setItem('userid', id)
			    	localStorage.setItem('userphone', data.get('phone'))
			    	dispatch(registerAction({userid : id,phone : data.get('phone')}))
			    	history.push('/konfirmasiotp')
			    }else{
			    	setError(response.data.data.error.errors)
			    }
		  	})
		  	.catch(function (error1) {
		  		alert(error1.response.data.error.errors.join('\n'))
		  	});
	}

	const login = (data) => {
		setLoginLoading(true)
		axios({
			  	method: 'post',
			  	data: data,
			  	headers: { 
			  		'Content-Type': 'application/x-www-form-urlencoded' , 
			  		'Accept': 'application/json',
			  		'Access-Control-Allow-Origin' : '*',
			  	},
			  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/oauth/sign_in'
			})
		  	.then(function (response) {
		  		// setLoginLoading(false)
		  		// console.log(response)
			    if(response.status === 201){
			    	let token = response.data.data.user.access_token
		  			localStorage.setItem('token', token)
		  			dispatch(setTokenAction(token))
			    	history.push('/user')
			    }else{
			    	setError(response.data.data.error.errors)
			    }
		  	})
		  	.catch(function (error) {
		  		setLoginLoading(false)
		  		if(error.response.status == 401){
		  			let id = error.response.data.error.errors[0].user_id
		  			localStorage.setItem('userid', id)
		  			localStorage.setItem('userphone', data.get('phone'))
		  			dispatch(registerAction({userid:id,phone : data.get('phone')}))
		  			history.push('/konfirmasiotp')
		  		}else{
		  			alert(error.response.data.error.errors.join('\n'))
		  		}
		  	});
	}

	return(
		<div className="container-fluid">
			<div className="row bg-primary vh-100">
				<div className="col-md-6 text-white">
				  	<FormRegister onSubmit={register} loading={loginLoading} />
				</div>
				<div className="col-md-6 bg-white border-radius-login">					
					<FormLogin onSubmit={login} loading={registerLoading} />
				</div>
			</div>
		</div>
	)
}

export default RegisterLogin;