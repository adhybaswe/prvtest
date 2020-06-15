export default (state = {auth : false}, action) => {
 switch (action.type) {
  case 'LOGIN_ACTION':
   return {
    auth: action.payload
   }
   case 'REGISTER_ACTION':
   return {
   	...state,
    user: action.payload
   }
   case 'SET_TOKEN_ACTION':
   return {
   	...state,
    token: action.payload
   }
  default:
   return state
 }
}