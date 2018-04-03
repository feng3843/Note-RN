import {
FATCH_BILL_SUCCESS,
FATCH_BILL_FAIL,
ADD_BILL_SUCCESS,
ADD_BILL_FAIL,
UPDATE_BILL_SUCCESS,
UPDATE_BILL_FAIL,
DELETE_BILL_SUCCESS,
DELETE_BILL_FAIL,
} from '../actions/actionTypes';

import React,{Component} from 'react';   
import {ToastAndroid} from 'react-native';

const  billReducer = (billList = [],action)=>{
  switch (action.type) {
    case FATCH_BILL_SUCCESS:
    ToastAndroid.show("刷新成功！",ToastAndroid.SHORT);
        return action.billList;
    case FATCH_BILL_FAIL:
        return billList;
    // case ADD_BILL_SUCCESS:
    //     return billList.unshift(action.newBill);
    // case ADD_BILL_FAIL:
    //     return billList;
    // case UPDATE_BILL_SUCCESS:
    //
    // case UPDATE_BILL_FAIL:
    //       return billList;
    // case DELETE_BILL_SUCCESS:
    //
    // case DELETE_BILL_FAIL:
    //       return billList;

    default:
      return billList;
  }
}


export default billReducer;
