export default (state = {auth : false}, action) => {
 switch (action.type) {
  case 'LOGIN_ACTION':
   return {
    auth: action.payload
   }
  default:
   return state
 }
}