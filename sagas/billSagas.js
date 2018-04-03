
import {put , takeLatest} from 'redux-saga/effects';
import AV from 'leancloud-storage';
import {

  DO_FATCH_BILL,
  DO_ADD_BILL,
  DO_UPDATE_BILL,
  DO_DELETE_BILL,
  DO_SELECT_DATE,

  FATCH_BILL_SUCCESS ,
  FATCH_BILL_FAIL ,
  ADD_BILL_SUCCESS ,
  ADD_BILL_FAIL ,
  UPDATE_BILL_SUCCESS ,
  UPDATE_BILL_FAIL,
  DELETE_BILL_SUCCESS ,
  DELETE_BILL_FAIL,

  DO_NETWORKING,
  DO_NETWORK_END,


    GO_NEW_BILL,
    GO_EDIT_BILL,
} from '../actions/actionTypes';

import {List,Detail}from '../components/NavName';


function* deleteBill(action){
  console.log("deleteBill",action);
  try {
     yield put({type:DO_NETWORKING});
    const result = yield action.bill.destroy();
    console.log('删除成功');
    yield put({type:DO_FATCH_BILL,user:action.user,date:action.date});
    action.navigation.goBack(null);
    yield put({type:DO_NETWORK_END});
  } catch (e) {
    console.log("服务器错误!!!!!");
    console.error(e);
    yield put({type:DO_NETWORK_END});
  }
}

export function* watchDeleteBill(){
   yield takeLatest(DO_DELETE_BILL,deleteBill);
}



function* editBill(action){
  console.log("editBill",action);
  try {
     yield put({type:DO_NETWORKING});
    const bill = yield action.bill.save();;
    console.log('保存成功',bill);
    yield put({type:DO_FATCH_BILL,user:action.user,date:action.date});
    yield put({type:DO_NETWORK_END});
    action.navigation.goBack(null);
  } catch (e) {
    console.log("s保存hibai!!!!!");
    console.error(e);
    yield put({type:DO_NETWORK_END});
  }
}

export function* watchEditBill(){
   yield takeLatest(DO_UPDATE_BILL,editBill);
}



function* addNewBill(action){
  console.log("addNewBill",action);
  try {
     yield put({type:DO_NETWORKING});
    const bill = yield action.bill.save();;
    console.log('保存成功',bill);
    yield put({type:DO_FATCH_BILL,user:action.user,date:action.date});
    yield put({type:DO_NETWORK_END});
    action.navigation.goBack(null);
  } catch (e) {
    console.log("s保存hibai!!!!!");
    console.error(e);
    yield put({type:DO_NETWORK_END});
  }
}

export function* watchAddNewBill(){
   yield takeLatest(DO_ADD_BILL,addNewBill);
}





function* goNewBill(action){
  console.log("goNewBillaction",action);
    action.navigation.navigate(Detail);
}

export function* watchGoNewBill(){
   yield takeLatest(GO_NEW_BILL,goNewBill);
}

function* goEditBill(action){
    console.log("goEditBillaction",action);
    action.navigation.navigate(Detail);
}

export function* watchGoEditBill(){
   yield takeLatest(GO_EDIT_BILL,goEditBill);
}

function* selectDate(action){
    console.log('selectDate....');
    console.log('action....',action);
    yield put({type:DO_FATCH_BILL,user:action.user,date:action.date});
}

export function* watchSelectDate(){
   yield takeLatest(DO_SELECT_DATE,selectDate);
}

function* fatchBill(action){
   try {
      yield put({type:DO_NETWORKING});
      console.log('fatchBill....');

     var query = new AV.Query('Bill');
     query.addDescending('date');
     query.equalTo('owner', action.user);
     query.limit(1000);
     if(action.date != null && action.date != ""){
         query.contains('date', action.date);
     }
     const billList = yield query.find();
     console.log('billList',billList);

     yield put({type:FATCH_BILL_SUCCESS,billList:billList});
     yield put({type:DO_NETWORK_END});
   } catch (e) {
     console.log("FATCH_BILL_FAIL!!!!!");
     console.error(e);
     yield put({type:FATCH_BILL_FAIL});
     yield put({type:DO_NETWORK_END});
   }

}

export function* watchFatchBill(){
   yield takeLatest(DO_FATCH_BILL,fatchBill);
}
