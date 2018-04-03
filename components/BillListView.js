/**
 * Created by zhuxinhua on 2018/3/19.
 */

import React , {Component} from  'react';
import  {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    InteractionManager,
}from 'react-native';

import LoginModalContainer from '../container/LoginModalContainer';

import PcikerContainer from '../container/PcikerContainer';
import  AV from  'leancloud-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import {List,Detail}from './NavName';

class FlatItemrender extends  Component{

    render(){
        var  path = '';
        var  kind = this.props.item.attributes.kind;
        if(kind == "衣服"){
            path = 'ic_shirt';
        }else  if(kind == "饮食"){
            path = 'ic_food';
        }else  if(kind == "居住"){
            path = 'ic_home';
        }else  if(kind == "交通"){
            path = 'ic_car';
        }else  if(kind == "人情往来"){
            path = 'ic_gift';
        }else  if(kind == "医疗"){
            path = 'ic_medical';
        }else  if(kind == "娱乐"){
            path = 'ic_game';
        }else  if(kind == "其他"){
            path = 'ic_other';
        }else {
            path = 'ic_other';
        }


        return(
            <View>
                <View style = {{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10,marginTop:10}}>
                    <Image
                        style={{height:36,width:36,borderRadius:6,marginLeft:15}}
                        source={{uri:path}}
                    ></Image>
                    <View style = {{flexDirection:"row",justifyContent:"space-between",alignItems:"stretch",marginRight:40}}>
                        <View style = {{justifyContent:"space-between",flex:1}}>
                            <View style = {{flexDirection:"row",justifyContent:"space-between",height:30,alignItems:"center",marginLeft:20,marginBottom:5,marginRight:50}}>
                                <Text style={{fontSize:14}}>{this.props.item.attributes.date}</Text>
                                <Text style={{fontSize:14,color:"tomato"}}>{this.props.item.attributes.count}</Text>
                            </View>
                            <View>
                                <Text style = {{fontSize:14,color:"#aaaaaa",marginLeft:20}}>备注：  {this.props.item.attributes.detail}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{width:50,height:50,justifyContent:"center",alignItems:"center",alignSelf:"center"}}
                            onPress={()=>{
                                console.log("navigate",this.props.navigation.navigate);
                                this.props.father.props.goEditBill(this.props.item,this.props.user,this.props.navigation);
                            }}
                        >
                            <Image
                                source={require('../icons/compose.png')}
                                style={{width:28,height:28,marginRight:20}}
                                resizeMode='contain'
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{backgroundColor : "#f3f3f3",height:2}}></View>

            </View>
        );
    };
}



export  default class BillListView extends  Component {
    static navigationOptions = ({navigation})=>{
        let header = null;
        return {header};
    }


    constructor(props) {
        super(props);
        this.state = {
            user: null,
            billData: [],
            date:'',
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



    renderData() {
        console.log("renderData1111111111");
        // alert('renderData');
        var total = 0;
        var clothes = 0;
        var eat = 0;
        var home = 0;
        var car = 0;
        var gift = 0;
        var mac = 0;
        var game = 0;
        var other = 0;
        for (var i = 0 ; i <  this.props.billList.length ;i++){
            var item = this.props.billList[i];
            var kind = item.attributes.kind;
            total += item.attributes.count;
            if(kind == "衣服"){
                clothes+=item.attributes.count;
            }else  if(kind == "饮食"){
                eat+=item.attributes.count;
            }else  if(kind == "居住"){
                home+=item.attributes.count;
            }else  if(kind == "交通"){
                car+=item.attributes.count;
            }else  if(kind == "人情往来"){
                gift+=item.attributes.count;
            }else  if(kind == "医疗"){
                mac+=item.attributes.count;
            }else  if(kind == "娱乐"){
                game+=item.attributes.count;
            }else  if(kind == "其他"){
                other+=item.attributes.count;
            }
        }
        clothes = this.changeTwoDecimal_f(clothes);
        eat = this.changeTwoDecimal_f(eat);
        home = this.changeTwoDecimal_f(home);
        car = this.changeTwoDecimal_f(car);
        mac = this.changeTwoDecimal_f(mac);
        gift = this.changeTwoDecimal_f(gift);
        game = this.changeTwoDecimal_f(game);
        other = this.changeTwoDecimal_f(other);
        total = this.changeTwoDecimal_f(total);

        const {navigation} =  this.props;
        let  params = {
            father:this,
            user:this.state.user
        };


        return (
            <View style={[styles.container, {backgroundColor: "#f3f3f3"}]}>
                <LoginModalContainer
                isOpen={this.props.showModal}
                ref = {"loginModal"}
                />
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 60}}>
                    <TouchableOpacity
                        onPress = {()=>{
                           this.props.onloginOut();
                        }}
                    >
                        <Image
                            style={{height: 40, width: 40, marginLeft: 20}}
                            source={require('../icons/btn_logout.png')}
                        ></Image>
                    </TouchableOpacity>

                    <Text style={styles.text}>我的账单</Text>
                    <TouchableOpacity
                        onPress = {()=>{
                          console.log('date',this.props.date,'user',this.props.user);
                            this.props.onFatchBill(this.props.date,this.props.user);
                        }}
                    >
                        <Image
                            style={{height: 36, width: 36, marginRight: 20}}
                            source={require('../icons/btn_refresh.png')}
                        ></Image>
                    </TouchableOpacity>

                </View>

                <View style={{height: 1, backgroundColor: "#333333", marginTop: 5, marginBottom: 5}}></View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{marginLeft: 20}}>总支出:</Text>
                        <Text style={{color: "tomato", marginLeft: 5, marginRight: 5}}>{total}</Text>
                        <Text>元</Text>
                    </View>
                     <PcikerContainer />
                </View>
                <View style={{height: 1, backgroundColor: "#333333", marginTop: 5, marginBottom: 5}}></View>

                <View style={styles.kindViewContainer}>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>衣        服</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{clothes}元</Text>
                    </View>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>饮        食</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{eat}元</Text>
                    </View>
                </View>

                <View style={styles.kindViewContainer}>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>居        住</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{home}元</Text>
                    </View>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>交        通</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{car}元</Text>
                    </View>
                </View>

                <View style={styles.kindViewContainer}>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>人情往来</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{gift}元</Text>
                    </View>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>医        疗</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{mac}元</Text>
                    </View>
                </View>

                <View style={styles.kindViewContainer}>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>娱        乐</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{game}元</Text>
                    </View>
                    <View style={styles.kindView}>
                        <TouchableOpacity>
                            <Text style={styles.kindLable}>其        他</Text>
                        </TouchableOpacity>
                        <Text style={styles.countLabel}>{other}元</Text>
                    </View>
                </View>


                <FlatList
                    ref = 'billlistview'
                    data={this.props.billList}
                    style={{marginTop: 7, backgroundColor: "#d3d3d3"}}
                    renderItem={({item, index})=> {
                        return (<FlatItemrender item={item} index={index} navigation={this.props.navigation} father = {this}></FlatItemrender>);
                    }}
                    keyExtractor={(item, index)=>item.id}
                ></FlatList>

                <View style={{justifyContent: "center", alignItems: "center", height: 60}}>
                    <TouchableOpacity style={{justifyContent: "center", alignItems: "center", height: 60, width: 100}}
                                      onPress = {()=>{
                                          this.props.goAddNewBill(this.props.user,navigation);
                                      }}
                    >
                        <Image
                            style={{height: 36, width: 36}}
                            source={require('../icons/btn_plus.png')}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <Toast
                    ref="mytoast"
                    position='center'
                />

            </View>

        );
    };


    render() {
        return this.renderData();
    }

}





const  styles = StyleSheet.create({
    container :{flex:1},
    actcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text:{textAlign:"center",fontSize:20,color:"black",fontWeight:"bold"},
    kindViewContainer :{flexDirection : "row",alignItems:"center",justifyContent:"space-between",marginLeft:20,marginRight:20,height:25},
    kindView:{flexDirection : "row",alignItems:"center",justifyContent:"flex-start",flex:1},
    kindLable : {fontSize:16,paddingRight:15},
    countLabel:{fontSize:16,paddingRight:15,color:"tomato"},
});
