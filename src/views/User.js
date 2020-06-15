import React,  { useState, useEffect } from 'react'
import axios from 'axios'

const User = () => {

	const [data,setData] = useState([])

	useEffect(() => {
		let token = localStorage.getItem('token',null)
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
						<img src={ data.user.cover_picture.url === null ? "https://via.placeholder.com/800x200" : data.user.cover_picture.url} />
					</div>
					<div className="profile-photo">
						<img src={data.user.user_picture === null ? "https://via.placeholder.com/150" : data.user.user_picture } />
					</div>
				</div>
			</div>
		</div>
	)
}

export default User