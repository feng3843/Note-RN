import {
  //DO_LOGIN,
  //DO_REGISTER,
  //DO_LOGOUT,

  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../actions/actionTypes';
import {AsyncStorage} from 'react-native';

// function getCurrentUser(){
//   AsyncStorage.getItem('currentUser',(error,currentUserJSON)=>{
//         var currentUser = JSON.parse(currentUserJSON);
//         console.log("currentUser",currentUser);
//         return currentUser;
//   });
// }


const userReducer = (user ={},action)=>{
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS');
      console.log("用户保存......");
      AsyncStorage.setItem('currentUser',JSON.stringify(action.user),(e)=>{
        console.log("用户保存......11111");
         if(!e){
           console.log("用户保存成功");
         }else{
           console.log("用户保存shibai");
         }
       });
      return  action.user;
    case LOGIN_FAIL:
      return  null;
    case REGISTER_SUCCESS:
      return  action.user;
    case REGISTER_FAIL:
        return  null;
    case LOGOUT_SUCCESS:
        return  null;
    case LOGOUT_FAIL:
        return  user;
    default:
        return  user;
  }
}
export default userReducer;
