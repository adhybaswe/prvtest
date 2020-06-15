import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'
import axios from 'axios';
import { registerAction } from '../actions/authAction'
import { useHistory } from "react-router-dom";

function RegisterLogin(){

	const dispatch = useDispatch()
	const history = useHistory();
	const [error,setError] = useState([])
	
	const register = (data) => {
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
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
		    console.log(response.data);
		    if(response.status === 201){
		    	let id = response.data.data.user.id
		    	localStorage.setItem('userid', id)
		    	dispatch(registerAction(id))
		    	history.push('/konfirmasiotp')
		    }else{
		    	setError(response.data.data.error.errors)
		    	console.log(response.data.data.error.errors)
		    }
		  })
		  .catch(function (error1) {
		  	alert(error1.response.data.error.errors.join('\n'))
		  });
	}

	const login = (data) => {
		console.log('data login',data)	
	}

	const renderError = () => {
		if(error.length > 1){
			let res = ''
			error.forEach(function(entry) {
			    res += entry+'</br>'
			});
			return( <div className="alert alert-danger">res</div> )
		}else{

		}

	}

	return(
		<div className="container">
			<div className="row">
				<div className="col-md-6">
				  	<FormRegister onSubmit={register} />
				</div>
				<div className="col-md-6">					
					<FormLogin onSubmit={login} />
				</div>
			</div>
		</div>
	)
}

export default RegisterLogin;