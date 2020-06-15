import React,{useState} from 'react';
import ButtonLoading from './ButtonLoading'

const FormLogin = ({ onSubmit, loading }) => {

	const [nomorhp,setNomorHP] = useState("")
	const [password,setPassword] = useState("")

	const numberOnly = (e) => {
		const re = /^[0-9\b]+$/;

	    if (e.target.value === '' || re.test(e.target.value)) {
	       setNomorHP(e.target.value)
	    }
	}

	const onClick = () => {
		let formData = new FormData();   

		formData.append('phone', nomorhp); 
		formData.append('password', password);
		formData.append('latlong', '-');
		formData.append('device_token', '-');
		formData.append('device_type', 2);

		onSubmit(formData)
	}

	return(
		<div className="section-form-login padding-150px">
			<h4>
			  Login
			  <small className="text-muted"> With faded secondary text</small>
			</h4>
			<hr/>
			<div className="form-group">
				<label htmlFor="nomorhp">Nomor HP</label>
				<input type="text" className="form-control" maxLength="13" value={nomorhp} onChange={ numberOnly } id="nomorhp" />
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input type="password" className="form-control" value={password} onChange={ (e) => setPassword(e.target.value) } id="password" />
			</div>
			<ButtonLoading onClick={onClick} label="LOGIN" loading={loading} />
		</div>
	)
}

export default FormLogin;