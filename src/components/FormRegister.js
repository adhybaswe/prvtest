import React,{useState} from 'react';

const FormRegister = ({ onSubmit }) => {

	const [nomorhp,setNomorHP] = useState("")
	const [country,setCountry] = useState("")
	const [password,setPassword] = useState("")

	const numberOnly = (e) => {
		const re = /^[0-9\b]+$/;

	    if (e.target.value === '' || re.test(e.target.value)) {
	       setNomorHP(e.target.value)
	    }
	}

	const onClick = () => {
		if(nomorhp === ""){
			alert("Nomor HP Tidak boleh kosong");
			return false
		}

		if(password === ""){
			alert("Password Tidak boleh kosong");
			return false
		}

		if(country === ""){
			alert("Country Tidak boleh kosong");
			return false
		}
		
		let formData = new FormData();   

		formData.append('phone', nomorhp); 
		formData.append('password', password);
		formData.append('country', country);
		formData.append('latlong', '-');
		formData.append('device_token', '-');
		formData.append('device_type', 2);

		onSubmit(formData)
	}

	return(
		<>
			<div className="form-group">
				<label htmlFor="registernomorhp">Nomor HP</label>
				<input type="text" className="form-control" maxLength="13" required value={nomorhp} onChange={ numberOnly } id="registernomorhp" />
			</div>

			<div className="form-group">
				<label htmlFor="registerpassword">Password</label>
				<input type="password" className="form-control" required value={password} onChange={ (e) => setPassword(e.target.value) } id="registerpassword" />
			</div>

			<div className="form-group">
				<label htmlFor="registercountry">Country</label>
				<input type="text" className="form-control" required maxLength="13" value={country} onChange={ (e) => setCountry(e.target.value) } id="registercountry" />
			</div>

			<button type="submit" onClick={onClick} className="btn btn-primary btn-block">REGISTER</button>
		</>
	)
}

export default FormRegister;