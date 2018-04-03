// import {put , takeLatest} from 'redux-saga/effects';
// import AV from 'leancloud-storage';
// import {
//   DO_SELECT_DATE,
//
//   FATCH_BILL_SUCCESS ,
//   FATCH_BILL_FAIL ,
//
//   DO_NETWORKING,
//   DO_NETWORK_END
// } from '../actions/actionTypes';
//
// function* selectDate(action){
//     console.log('selectDate....');
//
//     yield put({type:DO_FATCH_BILL,user:action.user,date:action.date});
// }
//
// export function* watchSelectDate(){
//    yield takeLatest(DO_SELECT_DATE,selectDate);
// }
//
// function* fatchBill(action){
//    try {
//       yield put({type:DO_NETWORKING});
//       console.log('fatchBill....');
//
//      var query = new AV.Query('Bill');
//      query.addDescending('date');
//      query.equalTo('owner', action.user);
//      query.limit(1000);
//      if(action.date != null && action.date != ""){
//          query.contains('date', action.date);
//      }
//      const billList = yield query.find();
//      console.log('billList',billList);
//
//      yield put({type:FATCH_BILL_SUCCESS,billList:billList});
//      yield put({type:DO_NETWORK_END});
//    } catch (e) {
//      console.log("FATCH_BILL_FAIL!!!!!");
//      console.error(e);
//      yield put({type:FATCH_BILL_FAIL});
//      yield put({type:DO_NETWORK_END});
//    }
//
// }
//
// export function* watchFatchBill(){
//    yield takeLatest(DO_FATCH_BILL,fatchBill);
// }
