import {
GO_NEW_BILL,
GO_EDIT_BILL
} from '../actions/actionTypes';


const  itemReducer = (item = null,action)=>{
  switch (action.type) {
    case GO_NEW_BILL:
        return action.item;
    case GO_EDIT_BILL:
        return action.item;
    default:
      return item;
  }
}


export default itemReducer;
