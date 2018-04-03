
import {put , takeLatest,call} from 'redux-saga/effects';
import AV from 'leancloud-storage';
import React,{Component} from 'react';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  DO_LOGIN,
  DO_REGISTER,
  DO_LOGOUT,
  DO_NETWORKING,
  DO_NETWORK_END,
  DO_FATCH_BILL
} from '../actions/actionTypes';

function* logout(action){
   try {
    yield put({type:DO_NETWORKING});
      console.log('logout....');
     yield AV.User.logOut();
     yield put({type:LOGOUT_SUCCESS});
     yield put({type:DO_NETWORK_END});
   } catch (e) {
     console.log("shibai!!!!!");
     console.error(e);
     yield put({type:DO_NETWORK_END});
   }

}

export function* watchLogout(){
   yield takeLatest(DO_LOGOUT,logout);
}


function* login(action){
   try {
      yield put({type:DO_NETWORKING});
      console.log('login....');
     const user = yield AV.User.logIn(action.name, action.pwd);
     console.log('user',user);
     yield put({type:LOGIN_SUCCESS,user:user});
     yield put({type:DO_FATCH_BILL,user:user,date:""});
     yield put({type:DO_NETWORK_END});
   } catch (e) {
     console.log("shibai!!!!!");
     console.error(e);
     yield put({type:LOGIN_FAIL});
     yield put({type:DO_NETWORK_END});
   }

}

export function* watchLogin(){
   yield takeLatest(DO_LOGIN,login);
}

function* regist(action){
   try {
      yield put({type:DO_NETWORKING});
      console.log('regist....');
      // 新建 AVUser 对象实例
        var user = new AV.User();
        // 设置用户名
        user.setUsername(action.name);
        // 设置密码
        user.setPassword(action.pwd);
        const loginUser = yield user.signUp();
        console.log('loginUser',loginUser);

     yield put({type:REGISTER_SUCCESS,user:loginUser});
     yield put({type:DO_FATCH_BILL,user:user,date:""});
     yield put({type:DO_NETWORK_END});
   } catch (e) {
     console.log("shibai!!!!!");
     console.error(e);
     yield put({type:LOGIN_FAIL});
     yield put({type:DO_NETWORK_END});
   }

}

export function* watchRegist(){
   yield takeLatest(DO_REGISTER,regist);
}
