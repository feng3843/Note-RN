import {connect} from 'react-redux';
import LoginAndRegister from '../components/LoginAndRegister';

import {loginAction,registerAction} from '../actions';


const onmapStateToProps=(state)=>{
  return {
    user:state.userReducer?state.userReducer:null,
    showNetWorking:state.netStatusReducer?state.netStatusReducer:false,
  };
}

const onmapDispatchToProps=(dispatch)=>{
  return {
    onLogin:(name,pwd)=>{
        dispatch(loginAction(name,pwd));
    },
    onRegist:(name,pwd)=>{
        dispatch(registerAction(name,pwd));
    },

  };
}

const LoginAndResContainer = connect(onmapStateToProps,onmapDispatchToProps)(LoginAndRegister);
export default LoginAndResContainer;
