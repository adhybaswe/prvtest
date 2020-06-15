import React, {useState} from 'react'
import axios from 'axios'

const SectionCareer = ({accesstoken,Companyname,StartingFrom,EndingIn}) => {

	const [cls,setCls] = useState('section section-career')
	const [companyname,setCompanyName] = useState(Companyname)
	const [startingfrom,setStartingFrom] = useState(StartingFrom)
	const [endingin,setEndingIn] = useState(EndingIn)

	const onSave = () => {
		setCls('section section-career loading')
		let formData = new FormData();
		formData.append('position', "-")
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
	  		setCls('section section-career')
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
	  		setCls('section section-career')
	  		console.log(error1)
	  		// alert(error1.response.data.error.errors.join('\n'))
	  	});
	}

	return(
		<div className={cls}>

		 	<div className="form-group">
			    <label htmlFor="companyname">Company Name</label>
			    <input id="companyname" type="text" value={companyname} onChange={ (e) => setCompanyName(e.target.value) } className="form-control" />
		  	</div>

		  	<div className="form-group">
			    <label htmlFor="startingfrom">Starting From</label>
			    <input id="startingfrom" type="date" value={startingfrom} onChange={ (e) => setStartingFrom(e.target.value) } className="form-control" />
		  	</div>

		  	<div className="form-group">
			    <label htmlFor="endingin">Ending In</label>
			    <input id="endingin" type="date" value={endingin} onChange={ (e) => setEndingIn(e.target.value) } className="form-control" />
		  	</div>

		  	<button className="btn btn-primary btn-block" onClick={onSave}>Save Career</button>
			
		</div>
	)
}

export default SectionCareer