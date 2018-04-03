
import React , {Component} from  'react';
import  {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
}from 'react-native';

import  {StackNavigator} from  'react-navigation';
import {List,
    Detail}from './NavName';

import BillDetailContainer from  '../container/BillDetailContainer';
import BillListViewContainer from  '../container/BillListViewContainer';





const  Nav = StackNavigator({
    List:{
        screen:BillListViewContainer,
    },
    Detail:{
        screen:BillDetailContainer,
    }
});
  
const  BillNav = ()=>(<Nav/>)

export  default class Billnav extends Component{

    render(){
        return(
            <BillNav>

            </BillNav>
        );
    };
}
