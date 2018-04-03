import React,{Component} from 'react';
import { AppRegistry } from 'react-native';


import  BillNavContainer from './container/BillNavContainer';

import  AV from  'leancloud-storage';

const appId = 'lNq2g7FCNVoWwRqiydUEXOwF-gzGzoHsz';
const appKey = 'I2p0vTv0FImDAtJwoYTPtGnr';
AV.init({
    appId,
    appKey,
});


import LoginAndResContainer from './container/LoginAndResContainer';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

 let store = createStore(allReducers,applyMiddleware(sagaMiddleware));
const App = ()=>(
  <Provider store = {store}>
    <BillNavContainer />
  </Provider>
);
sagaMiddleware.run(rootSaga);
// AppRegistry.registerComponent('kiss', () => BillNav);
AppRegistry.registerComponent('kiss', () => App);
