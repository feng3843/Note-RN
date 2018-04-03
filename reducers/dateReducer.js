
import {
DO_SELECT_DATE
} from '../actions/actionTypes';


const  dateReducer = (date = "",action)=>{
  switch (action.type) {
    case DO_SELECT_DATE:
        console.log("DO_SELECT_DATE ",action.date);
        return action.date;
    default:
      return date;
  }
}


export default dateReducer;
