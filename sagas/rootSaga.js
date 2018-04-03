import {fork} from 'redux-saga/effects';
import {watchLogin,watchRegist,watchLogout} from './loginSagas';
import {watchFatchBill,watchSelectDate,watchGoEditBill,watchGoNewBill,watchAddNewBill,watchEditBill,watchDeleteBill} from './billSagas';

export default function* rootSaga(){
  yield[
    fork(watchLogin),
    fork(watchRegist),
    fork(watchFatchBill),
    fork(watchSelectDate),
    fork(watchGoEditBill),
    fork(watchGoNewBill),
    fork(watchAddNewBill),
    fork(watchEditBill),
    fork(watchDeleteBill),
    fork(watchLogout),
  ];
}
