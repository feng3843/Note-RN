import React, { Component } from 'react';
import{
    View,
    Picker
} from 'react-native';


export  default  class   extends  Component {



    render(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        var maxDate =  year + seperator1 + month;
        var array = [];
        for (var i =2017;i<year+1;i++){
            for (var j = 1;j<13;j++){
                if (j >= 1 && j <= 9) {
                    j = "0" + j;
                }
                var date = i + seperator1 + j;
                if (date <= maxDate){
                    array.unshift(date);
                }
            }
        }



        return(
            <View style = {{backgroundColor:"#4097ff",borderRadius:8,borderWidth:1,marginRight:20,marginLeft:40,height:40,width:130,justifyContent:"center"}}>
                <Picker
                    selectedValue={this.props.date}
                    onValueChange = {(value)=>{
                       if (value == this.props.date) {
                         return;
                       }
                       console.log("this.props.user=====",this.props.user);
                        this.props.onSelectData(value,this.props.user);
                    }}
                    style={[{color:"white"}]}
                    mode={'dialog'}
                >
                    < Picker.Item label="筛选"   value=""/>
                    {
                        array.map((date,index)=>  <Picker.Item label={date} value={date} key={index} />)
                    }
                </Picker>
            </View>
        );
    }
}
