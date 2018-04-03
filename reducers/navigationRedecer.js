
import {
  GO_NEW_BILL,
  GO_EDIT_BILL
} from '../actions/actionTypes';


const  navigationRedecer = (navigation = null,action)=>{
  switch (action.type) {
    case GO_NEW_BILL:
        return action.navigation;
    case GO_EDIT_BILL:
        return action.navigation;
    default:
      return navigation;
  }
}


export default navigationRedecer;
