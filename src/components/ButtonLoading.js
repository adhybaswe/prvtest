import React from 'react'

const ButtonLoading = ({label,loading,onClick}) => {
	if(loading){
		return(
			<button disabled className="btn btn-primary">{label}</button>
		)
	}

	return(
		<button onClick={onClick} className="btn btn-primary btn-block">{label}</button>
	)
}

export default ButtonLoading