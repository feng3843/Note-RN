import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../actions/actionTypes';
import React,{Component} from 'react';
import {ToastAndroid,AsyncStorage} from 'react-native';

// function getCurrentUser(){
//   AsyncStorage.getItem('currentUser',(error,currentUserJSON)=>{
//         var currentUser = JSON.parse(currentUserJSON);
//         console.log("currentUser",currentUser);
//         return currentUser;
//   });
// }


const showModalReducer = (showModal = true,action)=>{
  switch (action.type) {
    case LOGIN_SUCCESS:
      ToastAndroid.show("登录成功！",ToastAndroid.SHORT);
      return  false;
    case LOGIN_FAIL:
    ToastAndroid.show("登录失败！",ToastAndroid.SHORT);
      return  true;
    case REGISTER_SUCCESS:
    ToastAndroid.show("注册成功！",ToastAndroid.SHORT);
      return  false;
    case REGISTER_FAIL:
    ToastAndroid.show("注册失败！",ToastAndroid.SHORT);
        return  true;
    case LOGOUT_SUCCESS:
    ToastAndroid.show("登出！",ToastAndroid.SHORT);
        return  true;
    case LOGOUT_FAIL:
    ToastAndroid.show("登出失败！",ToastAndroid.SHORT);
        return  false;
    default:
        return  showModal;
  }
}
export default showModalReducer;
