export const loginAction = ({
	  type: 'LOGIN_ACTION',
	  payload: true,
 	}) 

export const registerAction = (payload) => {
	return {
	  type: 'REGISTER_ACTION',
	  payload: payload,
 	}
} 