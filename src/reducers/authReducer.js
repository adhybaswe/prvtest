export default (state = {auth : false}, action) => {
 switch (action.type) {
  case 'LOGIN_ACTION':
   return {
    auth: action.payload
   }
   case 'REGISTER_ACTION':
   return {
   	...state,
    userid: action.payload
   }
  default:
   return state
 }
}