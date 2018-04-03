import {connect} from 'react-redux';
import Picker from '../components/Picker';

import {selectDateAction} from '../actions';

const onmapStateToProps=(state)=>{
  return {
    date:state.dateReducer?state.dateReducer:"",
    user:state.userReducer?state.userReducer:null,
  };
}

const onmapDispatchToProps=(dispatch)=>{
  return {
      onSelectData:(date,user)=>{
        console.log("onSelectData::::",date);
        dispatch(selectDateAction(date,user));
      }
  };
}

const PickerContainer = connect(onmapStateToProps,onmapDispatchToProps)(Picker);
export default PickerContainer;
