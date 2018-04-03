import {connect} from 'react-redux';
import BillDetail from '../components/BillDetail';
import {addBillAction,updateBillAction,deleteBillAction} from '../actions';

const onmapStateToProps=(state)=>{
  return {
    item:state.itemReducer?state.itemReducer:null,
    navigation:state.navigationRedecer?state.navigationRedecer:null,
    user:state.userReducer?state.userReducer:null,
    date:state.dateReducer?state.dateReducer:""
  };
}

const onmapDispatchToProps=(dispatch)=>{
  return {  
    onAddbill:(bill,user,date,navigation)=>{
        dispatch(addBillAction(bill,user,date,navigation));
    },
    onEditBill:(bill,user,date,navigation)=>{
      dispatch(updateBillAction(bill,user,date,navigation));
    },
    onDeleteBill:(bill,user,date,navigation)=>{
      dispatch(deleteBillAction(bill,user,date,navigation));
    },

  };
}

const BillDetailContainer = connect(onmapStateToProps,onmapDispatchToProps)(BillDetail);
export default BillDetailContainer;
