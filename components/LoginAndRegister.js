/**
 * Created by zhuxinhua on 2018/3/21.
 */
/**
 * Created by zhuxinhua on 2018/3/19.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, {DURATION} from 'react-native-easy-toast';



export  default class LoginAndRegister extends  Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            pwd:'',
            repwd:'',
            showLogin:true
        };
        this.getCurrentUser();
    }

    getCurrentUser(){
      this2 = this;
      AsyncStorage.getItem('currentUser',(error,currentUserJSON)=>{
            var currentUser = JSON.parse(currentUserJSON);
            console.log("currentUser++++",currentUser);
            if (currentUser != null){
              this2.setState({name:currentUser.username});
            }
      });
    }


    login(){
        this.props.onLogin(this.state.name,this.state.pwd);
    }

    register() {
      this.props.onRegist(this.state.name,this.state.pwd);
    }


    renderLogin(){
        return(
            <KeyboardAwareScrollView style = {styles.container}>
            <ActivityIndicator
          animating={this.props.showNetWorking}
          style={{position:'absolute',padding:8,height:80,width:80,left:(Dimensions.get('window').width-80)*0.5,top:(Dimensions.get('window').height-80)*0.5}}
          size="large" />
                <Text style = {styles.title}>欢迎使用</Text>
                <View style = {styles.textInputView}>
                    <Text style={styles.text}>用户名</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = '请输入用户名'
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{this.setState({name:text})}}
                    >{this.state.name}</TextInput>
                </View>
                <View style = {styles.textInputView}>
                    <Text style={styles.text}>密    码</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = '请输入密码'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{this.setState({pwd:text})}}
                    >{this.state.pwd}</TextInput>
                </View>
                <TouchableOpacity
                    style = {styles.loginBtnVew}
                    onPress = {()=>{
                        this.login();
                    }}
                >
                    <Text style={styles.loginText}>登    录</Text>
                </TouchableOpacity>
                <View style = {styles.resView}>
                    <Text style={styles.needText}>我还没有账号，我要</Text>
                    <TouchableOpacity
                        style = {[styles.loginBtnVew,{margin:0,marginRight:20,height:30}]}
                        onPress = {()=>{
                            this.setState({name:'',pwd:'',repwd:'',showLogin:false});
                        }}
                    >
                        <Text style={styles.resbtn}>注册</Text>
                    </TouchableOpacity>

                </View>
                <Toast ref={toast=>{
                      this.toast=toast
                  }}/>
            </KeyboardAwareScrollView>
        );
    };

    renderRegister(){
        return(
            <KeyboardAwareScrollView style = {styles.container}>
                <Text style = {styles.title}>注册新用户</Text>
                <View style = {styles.textInputView}>
                    <Text style={styles.text}>用户名</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = '请输入用户名'
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{this.setState({name:text})}}
                    >{this.state.name}</TextInput>
                </View>
                <View style = {styles.textInputView}>
                    <Text style={styles.text}>密    码</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = '请输入密码'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{this.setState({pwd:text})}}
                    >{this.state.pwd}</TextInput>
                </View>
                <View style = {styles.textInputView}>
                    <Text style={styles.text}>密    码</Text>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = '请再次输入密码'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{this.setState({repwd:text})}}
                    >{this.state.repwd}</TextInput>
                </View>
                <TouchableOpacity
                    style = {styles.loginBtnVew}
                    onPress = {()=>{
                        this.register();
                    }}
                >
                    <Text style={styles.loginText}>注册并登录</Text>
                </TouchableOpacity>

                <View style = {styles.resView}>
                    <Text style={styles.needText}>我已有账号，我要</Text>
                    <TouchableOpacity
                        style = {[styles.loginBtnVew,{margin:0,marginRight:20,height:30}]}
                        onPress = {()=>{
                            this.setState({name:'',pwd:'',repwd:'',showLogin:true});
                        }}
                    >
                        <Text style={styles.resbtn}>登录</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    };


    render(){
        if (this.state.showLogin){
            return this.renderLogin();
        }
    return this.renderRegister();
    }
}


const  styles = StyleSheet.create({
    container : {flex: 1,backgroundColor : "#f3f3f3"},
    title : {margin:40,fontSize:30,fontWeight:"bold",textAlign:"center"},
    textInputView : {flexDirection : "row",margin:20,alignItems:"center"},
    text:{fontSize:20,width:60,textAlign:"right"},
    textInput:{marginLeft:20,padding:10,fontSize:20,flex:1,borderWidth:1,borderColor:"#999",borderRadius:5},
    loginBtnVew : {margin:40|0,borderRadius:10,height:40,backgroundColor:"blue",justifyContent:"center"},
    loginText:{textAlign:"center",color:"white",fontSize:20,fontWeight:"bold"},
    resView : {flexDirection:"row",justifyContent:"flex-end",alignItems:"center"},
    needText:{textAlign:"right",color:"#999999",fontSize:16,},
    resbtn:{textAlign:"center",color:"white",fontSize:20,fontWeight:"bold",padding:0|10}
});
