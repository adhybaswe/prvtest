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

export const setTokenAction = (payload) => {
	return {
	  type: 'SET_TOKEN_ACTION',
	  payload: payload,
 	}
} 