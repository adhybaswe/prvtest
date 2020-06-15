import React, {useState} from 'react'
import axios from 'axios'

const SectionEducation = ({accesstoken,SchoolName,GraduationTime}) => {

	const [cls,setCls] = useState('section section-education')
	const [schoolname,setSchoolName] = useState(SchoolName)
	const [graduationtime,setGraduationtime] = useState(GraduationTime)

	const onSave = () => {
		setCls('section section-education loading')
		let formData = new FormData();
		formData.append('school_name', schoolname)
		formData.append('graduation_time', graduationtime)
		axios({
		  	method: 'post',
		  	data: formData,
		  	headers: { 
		  		'Content-Type': 'application/x-www-form-urlencoded' , 
		  		'Accept': 'application/json',
		  		'Access-Control-Allow-Origin' : '*',
	  			'Authorization' : accesstoken
		  	},
		  	url: process.env.REACT_APP_API_BASE_URL+'api/v1/profile/education'
		})
	  	.then(function (response) {
	  		setCls('section section-education')
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
	  		setCls('section section-education')
	  		console.log(error1)
	  		// alert(error1.response.data.error.errors.join('\n'))
	  	});
	}

	return(
		<div className={cls}>
			<div className="form-group">
			    <label htmlFor="schoolname">School Name</label>
			    <input id="schoolname" type="text" value={schoolname} onChange={ (e) => setSchoolName(e.target.value) } className="form-control" />
		  	</div>

		  	<div className="form-group">
			    <label htmlFor="graduationtime">Graduation Time</label>
			    <input id="graduationtime" type="date" value={graduationtime} onChange={ (e) => setGraduationtime(e.target.value) } className="form-control" />
		  	</div>		

		  	<button className="btn btn-primary btn-block" onClick={onSave}>Save Education</button>	
		</div>
	)
}

export default SectionEducation