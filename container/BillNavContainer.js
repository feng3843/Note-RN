import {connect} from 'react-redux';
import BillNav from '../components/BillNav';

// const onmapStateToProps=(state)=>{
//   return {};
// }
//
// const onmapDispatchToProps=(dispatch)=>{
//   return {};
// }

const BillNavContainer = connect()(BillNav);
// const BillNavContainer = connect(onmapStateToProps,onmapDispatchToProps)(BillNav);
export default BillNavContainer;
