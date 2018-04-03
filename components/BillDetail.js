import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TextInput,
    TouchableOpacity,
    Image,
    Picker
} from 'react-native';

import AV from 'leancloud-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast, {DURATION} from 'react-native-easy-toast';

export  default  class  BillDetail extends  Component {
    static navigationOptions = ({navigation})=>{
        let header = null;
        return {header};
    }

    constructor(props){
        super(props);
        console.log("this.props.navgation",this.props.navigation);
        console.log("this.props.item",this.props.item);
        console.log("this.props.user",this.props.user);
        this.state = {
            item: null== this.props.item?null:this.props.item,
            kind: null== this.props.item||this.props.item.attributes.kind==""?"衣服":this.props.item.attributes.kind,
            isDateTimePickerVisible: false,
            count:null== this.props.item?'':this.props.item.attributes.count,
            date:null== this.props.item?this.getNowFormatDate():this.props.item.attributes.date,
            detail:null== this.props.item?'':this.props.item.attributes.detail,
        };
    }



    changeTwoDecimal_f(x) {
        try {
            let f_x1 = parseFloat(x);
            if (isNaN(f_x1)) {
                return x;
            }
            let f_x = Math.round(x * 100) / 100;
            let s_x = f_x.toString();
            let pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        } catch (e) {
            return '0.00';
        }
    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var formatdate = year + seperator1 + month + seperator1 + strDate;
        this.setState({date:formatdate});
        this._hideDateTimePicker();
    };


    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    render(){


        return(
            <KeyboardAwareScrollView>
                <View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <TouchableOpacity
                            style = {{alignSelf:"center",marginLeft:20}}
                            onPress = {()=>{
                                this.props.navigation.goBack(null);}}
                        >
                            <Image
                                style = {{width:42,height:42,alignSelf:"center"}}
                                source = {require('../icons/backArrow.png')}
                                resizeMode='contain'
                            ></Image>
                        </TouchableOpacity>
                        <Text style = {{flex:1,fontSize:40,marginTop:20,textAlign:"center",marginBottom:20}}>{this.props.item == null ?"新增账单    " :"账单明细    "}</Text>
                    </View>

                    <Text style = {styles.bodyText}>消费日期：</Text>
                    <View style = {{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <Text style = {styles.inputText}>{this.state.date}</Text>
                        <TouchableOpacity
                            onPress={this._showDateTimePicker}
                            style = {{marginLeft:20,backgroundColor:"#4097ff",borderRadius:6,marginRight:60,height:40,width:100,justifyContent:"center",alignItems:"center"}}
                        >
                            <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>选择日期</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                    <Text style = {styles.bodyText}>消费类型：</Text>
                    <View style = {{backgroundColor:"#4097ff",borderRadius:8,borderWidth:1,marginTop:5,marginBottom:5,marginLeft:40,height:40,width:150,justifyContent:"center"}}>
                        <Picker
                            selectedValue={this.state.kind}
                            onValueChange={(value)=>{this.setState({kind:value})}}
                            style={[{color:"white"}]}
                            mode={'dialog'}
                        >
                            <Picker.Item label = "衣服" value = "衣服" />
                            <Picker.Item label = "饮食" value = "饮食" />
                            <Picker.Item label = "居住" value = "居住" />
                            <Picker.Item label = "交通" value = "交通" />
                            <Picker.Item label = "人情往来" value = "人情往来" />
                            <Picker.Item label = "医疗" value = "医疗" />
                            <Picker.Item label = "娱乐" value = "娱乐" />
                            <Picker.Item label = "其他" value = "其他" />
                        </Picker>
                    </View>

                    <Text style = {styles.bodyText}>消费金额：</Text>
                    <TextInput style = {styles.inputBox}
                               placeholder = '请输入金额'
                               underlineColorAndroid='transparent'
                               onChangeText={(text)=>{this.setState({count:text})}}
                    >{this.state.count}</TextInput>

                    <Text style = {styles.bodyText}>备注：</Text>

                    <TextInput style = {styles.inputBox}
                               placeholder = '消费详细说明...'
                               underlineColorAndroid='transparent'
                               onChangeText={(text)=>{this.setState({detail:text})}}
                    >{this.state.detail}</TextInput>

                    <TouchableOpacity
                        style = {styles.loginBtnVew}
                        onPress = {()=>{
                          var count = parseFloat(this.changeTwoDecimal_f(this.state.count));
                          if (!count){
                              this.refs.mytoast.show('请正确输入金额！');
                              return;
                          }
                          // 保存到云端
                          if (this.props.item == null){
                            console.log("addNewBilltap",this.props.item);
                            // 声明类型
                            var Bill = AV.Object.extend('Bill');
                            // 新建对象
                            var newbill = new Bill();
                            // 设置属性
                            newbill.set('owner',this.props.user);
                            newbill.set('kind',this.state.kind);
                            newbill.set('count',count);
                            newbill.set('date',this.state.date);
                            newbill.set('detail',this.state.detail);
                                this.props.onAddbill(newbill,this.props.user,this.props.date,this.props.navigation);
                          }else {
                            console.log("saveBillltap",this.props.item);
                              var bill = AV.Object.createWithoutData('Bill', this.props.item.id);
                              // 修改属性
                              bill.set('kind',this.state.kind);
                              bill.set('count',count);
                              bill.set('date',this.state.date);  
                              bill.set('detail',this.state.detail);
                              console.log(this.state.kind);
                              this.props.onEditBill(bill,this.props.user,this.props.date,this.props.navigation);
                          }



                        }}
                    >
                        <Text style={styles.loginText}>{this.state.item == null ?"新    增" :"修    改"}</Text>
                    </TouchableOpacity>

                    {this.state.item != null?
                        <TouchableOpacity
                            style = {[styles.loginBtnVew,{backgroundColor:"tomato"}]}
                            onPress = {()=>{
                              var bill = AV.Object.createWithoutData('Bill', this.state.item.id);
                              this.props.onDeleteBill(bill,this.props.user,this.props.date,this.props.navigation);
                            }}
                        >
                            <Text style={styles.loginText}>删    除</Text>
                        </TouchableOpacity>
                        :null}


                    <Toast
                        ref="mytoast"
                        position='center'
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const  styles = StyleSheet.create({
    bodyText:{fontSize:15,fontWeight:"bold",color:"#444444",marginTop:5,marginBottom:5,marginLeft:20},
    inputText:{fontSize:15,color:"#999999",marginTop:5,marginBottom:5,marginLeft:40},
    inputBox:{height:40,borderRadius:5,borderWidth:1,borderColor:"#444444",fontSize:15,color:"#999999",marginLeft:20,paddingLeft:20,marginRight:40,marginTop:3,marginBottom:3},
    loginBtnVew : {marginLeft:80,marginRight:80,marginTop:30,borderRadius:10,height:40,backgroundColor:"blue",justifyContent:"center"},
    loginText:{textAlign:"center",color:"white",fontSize:20,fontWeight:"bold"},
});
