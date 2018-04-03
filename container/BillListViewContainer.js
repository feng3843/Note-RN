import {connect} from 'react-redux';
import BillListView from '../components/BillListView';

import {fatchAction,logoutAction,goNewBillAction,goEditBillAction} from '../actions';

const onmapStateToProps=(state)=>{
  console.log("state",state);
  return {
    showModal:state.showModalReducer?state.showModalReducer:false,
    billList:state.billReducer?state.billReducer:[],
    user:state.userReducer?state.userReducer:null,
    date:state.dateReducer?state.dateReducer:""
  };
}

const onmapDispatchToProps=(dispatch)=>{
  return {
      onFatchBill:(date,user)=>{
        dispatch(fatchAction(date,user));
      },

      onloginOut:()=>{
        dispatch(logoutAction());
      },
      goAddNewBill:(user,navgation)=>{
        dispatch(goNewBillAction(user,navgation));
      },
      goEditBill:(item,user,navgation)=>{
        dispatch(goEditBillAction(item,user,navgation));
      }
  };
}

const BillListViewContainer = connect(onmapStateToProps,onmapDispatchToProps)(BillListView);
export default BillListViewContainer;
