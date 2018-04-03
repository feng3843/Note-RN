import {combineReducers} from 'redux';
import billReducer from './billReducer';
import userReducer from './userReducer';
import netStatusReducer from './netStatusReducer';
import showModalReducer from './showModalReducer';
import dateReducer from './dateReducer';
import navigationRedecer from './navigationRedecer';
import itemReducer from './itemReducer';


const allReducers = combineReducers({
  billReducer,
  userReducer,
  netStatusReducer,
  showModalReducer,
  dateReducer,
  navigationRedecer,
  itemReducer,
});

export default allReducers;
