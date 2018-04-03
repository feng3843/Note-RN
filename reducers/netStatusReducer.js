import {
DO_NETWORKING ,
DO_NETWORK_END
} from '../actions/actionTypes';


const  netStatusReducer = (showNetWorking = false ,action)=>{
  switch (action.type) {
    case DO_NETWORKING:
        console.log('DO_NETWORKING');
        return true;
    case DO_NETWORK_END:
    console.log('DO_NETWORK_END');
        return false;
    default:
    console.log('default');
      return showNetWorking;
  }
}


export default netStatusReducer;
