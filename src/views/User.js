import React,  { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import SectionEducation from '../components/SectionEducation'

const User = () => {

	const inputFile = useRef(null);
	const inputMultipleFile = useRef(null);
	const inputCoverFile = useRef(null);
	const imagePhoto = useRef(null);
	const imageCover = useRef(null);

	const [data,setData] = useState([])
	const [companyname,setCompanyName] = useState('')
	const [position,setPosition] = useState('')
	const [startingfrom,setStartingFrom] = useState('')
	const [endingin,setEndingIn] = useState('')


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
		   setCompanyName(response.data.data.user.career.company_name)
		   setStartingFrom(response.data.data.user.career.starting_from)
		   setEndingIn(response.data.data.user.career.ending_in)
	  	})
	  	.catch(function (error) {
	  		console.log(error)
	  	});
 
	  }, []);

	const uploadpicture = (e) => {
		e.preventDefault()
		inputFile.current.click()
	}

	const onCoverChange = (e) => {
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
		  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/uploads/cover'
		})
	  	.then(function (response) {
	  		console.log(response)
		    if(response.status === 201){
		    	let url = response.data.data.user_picture.cover_picture.url
		    	imageCover.current.src = url
		    }else{
		    	console.log(response.data.data.error.errors)
		    }
	  	})
	  	.catch(function (error1) {
	  		console.log(error1)
	  		// alert(error1.response.data.error.errors.join('\n'))
	  	});
	}

	const onClickCover = (e) => {
		e.preventDefault()
		inputCoverFile.current.click();
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

	const setPhotoDefault = (photo) => {
		alert('set default photo')
	}

	const addmultiplephoto = (e) => {
		e.preventDefault()
		inputMultipleFile.current.click()
	}

	const onUploadMultiple = (e) => {
		// let formData = new FormData();
		// for (let i = 0; i < e.target.files.length; i++) {
		//     formData.append(`image[${i}]`, files[i])
		// }
		// axios({
		// 	  	method: 'post',
		// 	  	data: formData,
		// 	  	headers: { 
		// 	  		'Content-Type': 'application/x-www-form-urlencoded' , 
		// 	  		'Accept': 'application/json',
		// 	  		'Access-Control-Allow-Origin' : '*',
		//   			'Authorization' : accesstoken
		// 	  	},
		// 	  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/uploads/profile'
		// 	})
		//   	.then(function (response) {
		//   		console.log(response)
		// 	    // if(response.status === 201){
		// 	    // 	let id = response.data.data.user.id
		// 	    // 	localStorage.setItem('userid', id)
		// 	    // 	dispatch(registerAction({userid : id,phone : data.get('phone')}))
		// 	    // 	history.push('/konfirmasiotp')
		// 	    // }else{
		// 	    // 	setError(response.data.data.error.errors)
		// 	    // }
		//   	})
		//   	.catch(function (error1) {
		//   		console.log(error1)
		//   		// alert(error1.response.data.error.errors.join('\n'))
		//   	});
	}

	const onSaveCareer = () => {
		let formData = new FormData();
		formData.append('position', position)
		formData.append('company_name', companyname)
		formData.append('starting_from', startingfrom)
		formData.append('ending_in', endingin)
		axios({
			  	method: 'post',
			  	data: formData,
			  	headers: { 
			  		'Content-Type': 'application/x-www-form-urlencoded' , 
			  		'Accept': 'application/json',
			  		'Access-Control-Allow-Origin' : '*',
		  			'Authorization' : accesstoken
			  	},
			  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/profile/career'
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
						<input type="file" ref={inputCoverFile} className="d-none" onChange={ onCoverChange }  />
						<a href="#" onClick={onClickCover}>
						<img ref={imageCover} className="img-fluid" src={ data.user.cover_picture.url === null ? "https://via.placeholder.com/1110x200" : data.user.cover_picture.url} />
						</a>
					</div>
					<div className="profile-photo">
						<input type="file" ref={inputFile} className="d-none" onChange={ onUploadChange }  />
						<a href="#" onClick={uploadpicture}>
							<img ref={imagePhoto}  className="img-fluid" src={data.user.user_picture === null ? "https://via.placeholder.com/150" : data.user.user_picture.picture.url } />
						</a>
					</div>
					<div className="list-photos">
						{
							data.user.user_pictures.map( (value,index) => {
								return(
									<div key={index} className="photo-item">
										<a href="#" onClick={ () => setPhotoDefault(value) }>
										<img src={value.picture.url} className="img-fluid" />
										</a>
									</div>
								)
							} )
						}
						<div className="photo-item photoadd">
							<input multiple type="file" ref={inputMultipleFile} className="d-none" onChange={ onUploadMultiple }  />
							<a href="#" onClick={addmultiplephoto}>+</a>
						</div>
					</div>

					<div className="section-career">


					 	<div className="form-group">
						    <label htmlFor="companyname">Company Name</label>
						    <input id="companyname" type="text" value={companyname} onChange={ (e) => setCompanyName(e.target.value) } className="form-control" />
					  	</div>

					  	<div className="form-group">
						    <label htmlFor="position">Position</label>
						    <input id="position" type="text" value={position} onChange={ (e) => setPosition(e.target.value) } className="form-control" />
					  	</div>

					  	<div className="form-group">
						    <label htmlFor="startingfrom">Starting From</label>
						    <input id="startingfrom" type="date" value={startingfrom} onChange={ (e) => setStartingFrom(e.target.value) } className="form-control" />
					  	</div>

					  	<div className="form-group">
						    <label htmlFor="endingin">Ending In</label>
						    <input id="endingin" type="date" value={endingin} onChange={ (e) => setEndingIn(e.target.value) } className="form-control" />
					  	</div>

					  	<button className="btn btn-primary btn-block" onClick={onSaveCareer}>Save Career</button>
						
					</div>

					<SectionEducation accesstoken={accesstoken} SchoolName={data.user.education.school_name} GraduationTime={data.user.education.graduation_time} />

				</div>
			</div>
		</div>
	)
}

export default User