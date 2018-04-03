import {connect} from 'react-redux';
import LoginModal from '../components/LoginModal';

// import {loginAction,registerAction} from '../actions';
//
//
// const onmapStateToProps=(state)=>{
//   return {
//
//   };
// }
//
// const onmapDispatchToProps=(dispatch)=>{
//   return {}
//
// }

// const LoginModalContainer = connect(onmapStateToProps,onmapDispatchToProps)(LoginModal);
const LoginModalContainer = connect()(LoginModal);
export default LoginModalContainer;
