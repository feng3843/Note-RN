/**
 * Created by zhuxinhua on 2018/3/21.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import  Modal from  'react-native-modalbox';
import LoginAndResContainer from '../container/LoginAndResContainer';

export  default  class  LoginModal extends  Component{

    constructor(props){
        super(props);
    }
  
    showLoginNav=()=>{
        this.refs.myModal.open();
    }
    //
    // closeModal = () =>{
    //     this.refs.myModal.close();
    // }
    //
    // saveUser = (user)=>{
    //     console.log("Modal saveUser");
    //     this.props.father.saveUser(user);
    // }

    render(){
        return(
            <Modal
                ref = {"myModal"}
                style = {{flex:1}}
                isOpen = {this.props.isOpen}
            >
               <LoginAndResContainer/>
            </Modal>
        );
    }

}
