import {
  DO_LOGIN,
  DO_REGISTER,
  DO_LOGOUT,
  DO_FATCH_BILL,
  DO_ADD_BILL,
  DO_UPDATE_BILL,
  DO_DELETE_BILL,
  DO_SELECT_DATE,

  GO_NEW_BILL,
  GO_EDIT_BILL
} from './actionTypes';


export const goNewBillAction = (user,navigation)=>{
  return {
    type:GO_NEW_BILL,
    item:null,
    user:user,
    navigation:navigation
  };
}

export const goEditBillAction = (item,user,navigation)=>{
  return {
    type:GO_EDIT_BILL,
    item:item,
    user:user,
    navigation:navigation
  };
}


export const selectDateAction = (date,user)=>{
  return {
    type:DO_SELECT_DATE,
    date:date,
    user:user
  };
}

export const loginAction = (name,pwd)=>{
  return {
    type:DO_LOGIN,
    name:name,
    pwd:pwd
  };
}

export const registerAction = (name,pwd)=>{
  return {
    type:DO_REGISTER,
    name:name,
    pwd:pwd
  };
}

export const logoutAction = ()=>{
  return {
    type:DO_LOGOUT
  };
}

export const fatchAction = (date,user)=>{
  return {
    type:DO_FATCH_BILL,
    date:date,
    user:user
  };
}

export const addBillAction = (bill={},user,date,navigation)=>{
  return {
    type:DO_ADD_BILL,
    bill:bill,
    user:user,
    date:date,
    navigation:navigation
  };
}

export const updateBillAction = (bill={},user,date,navigation)=>{
  return {
    type:DO_UPDATE_BILL,
    bill:bill,
    user:user,
    date:date,
    navigation:navigation
  };
}

export const deleteBillAction = (bill={},user,date,navigation)=>{
  return {
    type:DO_DELETE_BILL,
    bill:bill,
    user:user,
    date:date,
    navigation:navigation
  };
}
