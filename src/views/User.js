import React,  { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const User = () => {

	const inputFile = useRef(null);
	const [data,setData] = useState([])
	const [accesstoken,setAccessToken] = useState(null)
	const [file,setFile] = useState(null)

	useEffect(() => {
		let token = localStorage.getItem('token',null)
		setAccessToken(token)
	   axios({
		  	method: 'get',
		  	headers: { 
		  		'Accept': 'application/json',
		  		'Access-Control-Allow-Origin' : '*',
		  		'Authorization' : token
		  	},
		  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/profile/me'
		})
	  	.then(function (response) {
		   console.log(response)
		   setData(response.data.data)
	  	})
	  	.catch(function (error) {
	  		console.log(error)
	  	});
 
	  }, []);

	const uploadpicture = (e) => {
		e.preventDefault()
		// console.log(file)
		inputFile.current.click()
	}

	const onUploadChange = (e) => {
		let formData = new FormData();
		formData.append('image', e.target.files[0]); 
		axios({
			  	method: 'post',
			  	data: formData,
			  	headers: { 
			  		'Content-Type': 'application/x-www-form-urlencoded' , 
			  		'Accept': 'application/json',
			  		'Access-Control-Allow-Origin' : '*',
		  			'Authorization' : accesstoken
			  	},
			  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/uploads/profile'
			})
		  	.then(function (response) {
		  		console.log(response)
			    // if(response.status === 201){
			    // 	let id = response.data.data.user.id
			    // 	localStorage.setItem('userid', id)
			    // 	dispatch(registerAction({userid : id,phone : data.get('phone')}))
			    // 	history.push('/konfirmasiotp')
			    // }else{
			    // 	setError(response.data.data.error.errors)
			    // }
		  	})
		  	.catch(function (error1) {
		  		console.log(error1)
		  		// alert(error1.response.data.error.errors.join('\n'))
		  	});
	}

	if(data.length === 0){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-12">
					  	Loading Data
					</div>
				</div>
			</div>
		)
	}

	return(
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="profile-cover">
						<img className="img-fluid" src={ data.user.cover_picture.url === null ? "https://via.placeholder.com/800x200" : data.user.cover_picture.url} />
					</div>
					<div className="profile-photo">
						<input type="file" ref={inputFile} className="d-none" onChange={ onUploadChange }  />
						<a href="#" onClick={uploadpicture}>
							<img className="img-fluid" src={data.user.user_picture === null ? "https://via.placeholder.com/150" : data.user.user_picture.picture.url } />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default User