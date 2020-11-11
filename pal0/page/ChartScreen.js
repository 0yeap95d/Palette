import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image,Alert,ScrollView } from 'react-native';
import {Animated,Component} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Picker } from "@react-native-community/picker";


export default function ChartScreen(props) {
    let [age, setAge] = React.useState(1);
    let [time,setTime]  = React.useState(0);
    let timeimg  = [require('../assets/img/time1.png'),require('../assets/img/time2.png'),require('../assets/img/time3.png'),require('../assets/img/time4.png'),]

    const fivelabelcolor = ['#de0102','#01c5c4','#b8de6f','#f1e189','#f39233']
    const tenlabelcolor = ['#de0102','#01c5c4','#b8de6f','#f1e189','#f39233','red','yellow','black','green','blue']
    
    let total = {
        datasets : [10,12,33,24,15,10,12,84,24,15],
        labels : ['외로움','우울함','행복함','즐거움','기쁨','외로움','우울함','행복함','즐거움','기쁨']
    }
    let woman = {
        datasets : [10,12,33,24,15],
        labels : ['외로움','우울함','행복함','즐거움','기쁨']
    }
    let man = {
        datasets : [10,12,33,24,15],
        labels : ['외로움','우울함','행복함','즐거움','기쁨']
    }
    let timechart = {
        datasets : [80,52,73,14,25],
        labels : ['외로움','우울함','행복함','즐거움','기쁨']
    }



    // var total  = null;

    useEffect(()=>{
        axios.get("http://k3d102.p.ssafy.io:8000/emotion/total/")
          .then(res =>{
            console.log(res.data)
            // total = res.data.all
          }).catch(err =>{
              console.log(err)
          })
          console.log(age+" "+time)
          axios.get(`http://k3d102.p.ssafy.io:8000/emotion/search/?age=${age}&time=${time}`)
          .then(res =>{
            console.log(res.data)
            
          }).catch(err =>{
              console.log(err)
          })


    }, []);

    const gettimeimg = (time) =>{
        var i = 0;
        if(time==0 || time==1 || time == 7) i = 0;
        else if(time==2) i=1;
        else if(time==3 || time==4|| time==5) i=2;
        else i=3;

        return timeimg[i]
    }

    const totaldatastyle= (color,index) =>{
        return {
            width: 10,
            height:color,
            backgroundColor:tenlabelcolor[index],
            justifyContent: 'flex-end',
            // alignContent:'center',
            marginLeft:11,
            marginRight:11,
            borderRadius:2,
        }
    }
    const womandatastyle= (color,index) =>{
        return {
            width: color,
            height:10,
            backgroundColor:'orange',
            justifyContent: 'center',
            alignContent:'center',
            marginBottom:8,
            marginTop:8,
            borderRadius:2,
        }
    }
    const mandatastyle= (color,index) =>{
        return {
            width: color,
            height:10,
            backgroundColor:'green',
            justifyContent: 'center',
            alignContent:'center',
            marginBottom:8,
            marginTop:8,
            borderRadius:2,
        }
    }
    const timedatastyle= (color,index) =>{
        return {
            width: 10,
            height:color,
            backgroundColor:fivelabelcolor[index],
            justifyContent: 'flex-end',
            marginLeft:8,
            marginRight:8,
            borderRadius:2,
        }
    }
    const totaldata = total.datasets.map(
        (dataset,index) =>  (<View style={totaldatastyle(dataset,index)}></View>)
        );
    const totallabel = total.labels.map(
        (label) =>  (<View style={styles.tenlabel}><Text style={styles.totallabeltext}>{label}</Text></View>)
    );
    // --------------------------------------------------------------------------------------------------------
    const womandata = woman.datasets.map(
    (dataset,index) =>  (<View style={womandatastyle(dataset,index)}></View>)
    );
    const womanlabel = woman.labels.map(
        (label) =>  (<View style={styles.fivelabel}><Text style={styles.labeltxt}>{label}</Text></View>)
    );
    const mandata = man.datasets.map(
        (dataset,index) =>  (<View style={mandatastyle(dataset,index)}></View>)
    );
    const manlabel = man.labels.map(
        (label) =>  (<View style={styles.fivelabel}><Text style={styles.labeltxt}>{label}</Text></View>)
    );
    // --------------------------------------------------------------------------------------------------------
    const timedata = timechart.datasets.map(
        (dataset,index) =>  (<View style={timedatastyle(dataset,index)}></View>)
    );
    const timelabel = timechart.labels.map(
        (label) =>  (<View style={styles.fivelabel}><Text style={styles.labeltxt}>{label}</Text></View>)
    );
   return (
    <ScrollView  style={styles.root}>
        <ImageBackground
        style={styles.content}
        source={require("../assets/img/bg4.jpg")}
        resizeMode="stretch"
        >
        <View style={styles.headerstyle}>

        </View>


{/* ---------------전체 차트-------------------------- */}
        <Text style={styles.headertxt}>'행복함'을 가장 많이 느끼고 있어요</Text>
        <View style={styles.totalbox}>
            <View style={{flexDirection:'row',height:180,alignItems:'flex-end'}}>{totaldata}</View>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>{totallabel}</View>
        </View>
{/* -------------성별 차트---------------------- */}
        <Text style={styles.headertxt}>여자는 '외로움', 남자는 '우울함'</Text>
        <View style={styles.peoplebox}>
            <View style={styles.people}>
                <Image style={styles.peopleimg} 
                source={require("../assets/img/woman.png")}></Image>
                <Text style={styles.womantxt}>여자</Text>
            </View>
            <View style={styles.people}>
                <Image style={styles.peopleimg} 
                source={require("../assets/img/man.png")}></Image>
                <Text style={styles.mantxt}>남자</Text>
            </View>

            <View style={styles.peoplechart}>
                <View style={styles.fivelabelbox}>{womanlabel}</View>
                <View style={styles.fivedatawomanbox}>{womandata}</View>
                
                <View style={styles.fivedatamanbox}>{mandata}</View>
                <View style={styles.fivelabelbox}>{manlabel}</View>
            </View>
        </View>

{/* --------------시간 & 나이 차트------------------------------- */}
   <Text style={styles.headertxt}>이 시간 {age}0대는?</Text>
    <View style={styles.etcbox}>
    <View style={{width:'90%',alignItems: 'flex-end',flexDirection:'row',justifyContent:'center'}}>
            <Picker
                style={{flex:1,height:40,borderColor:'black',borderWidth:1,}}
                selectedValue={age}
                onValueChange={(v)=>setAge(v)}
            >
                <Picker.Item label="~10대" value='1'/>
                <Picker.Item label="20대" value='2'/>
                <Picker.Item label="30대" value='3'/>
                <Picker.Item label="40대" value='4'/>
                <Picker.Item label="50대~" value='5'/>
            </Picker>
            <Picker
                style={{flex:1,height:40,borderColor:'black',borderWidth:1,}}
                selectedValue={time}
                onValueChange={(v)=>setTime(v)}
            >
                <Picker.Item label="0시~3시" value='0'/>
                <Picker.Item label="3시~6시" value='1'/>
                <Picker.Item label="6시~9시" value='2'/>
                <Picker.Item label="9시~12시" value='3'/>
                <Picker.Item label="12시~15시" value='4'/>
                <Picker.Item label="15시~18시" value='5'/>
                <Picker.Item label="18시~21시" value='6'/>
                <Picker.Item label="21시~24시" value='7'/>

            </Picker>
        </View>

        <View style={styles.etcinner}>
            <View style={styles.etcimg}>
                    <Image style={{resizeMode:'cover',width:130,height:130,marginTop:10}}
                    source={gettimeimg(time)}/>
            </View>
            <View style={styles.etcchart}>
                <View style={{flexDirection:'row',alignItems:'flex-end',flex:1}}>{timedata}</View>
                <View style={{flexDirection:'row',alignItems:'flex-end'}}>{timelabel}</View>
            </View>
        </View>

    </View>

    <View style={{marginBottom:30,}}></View>

    </ImageBackground>
    </ScrollView>
   );
}

const styles = StyleSheet.create({ 
headerstyle:{
    height:150,
},
headertxt:{
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 18,
    fontWeight:'bold',
    width:'90%',
    marginTop:10,
    paddingTop:10,
    borderTopColor:'gray',
    borderBottomColor:'transparent',
    borderRightColor:'transparent',
    borderLeftColor:'transparent',
    borderWidth:0.3
},
etcchart:{
    flex:1,
    height:160,
    marginLeft:20,
    marginRight:3,
    backgroundColor:'white',
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
},
etcinner : {
    flex:1,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
},
totallabeltext: {
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 11,
    marginLeft: 7,
    marginTop: 10,
},
labeltxt: {
    fontFamily: 'BMHANNAAir_ttf',
    fontSize: 10
},
fivelabel: { //라벨 개별
    width: 30,
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 8,
    marginTop: 8
},
fivedatawomanbox: { // 데이터 wrapper
    // display:flex,
    width: 50,
    height: 150,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'flex-end', //여자는 flex end , 남자는  flex start
    marginRight: 1
},
fivedatamanbox: { // 데이터 wrapper
    // display:flex,
    width: 50,
    height: 150,
    justifyContent: 'center',
    alignItems: 'flex-start', //여자는 flex end , 남자는  flex start
    marginLeft: 1
},
fivelabelbox: { //라벨 wrapper
    width: 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
},
etcbox: {
    width: '98%',
    height: 230,
    // backgroundColor:'#dce6f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius:10,
},

totalbox: {
    width: '95%',
    height: 200,
    backgroundColor:'white',
    marginTop: 10,
    paddingBottom:8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
womantxt: {
    fontFamily: 'BMHANNAAir_ttf',
    marginTop: 5,
    color: 'orange'
},
mantxt: {
    fontFamily: 'BMHANNAAir_ttf',
    marginTop: 5,
    color: 'green'
},
peoplechart: {
    flex: 5,
    height: 180,
    marginLeft: 7,
    marginRight: 7,
    backgroundColor:'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
},
people: {
    flex: 2,
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 3
},
peopleimg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 300,
    borderWidth: 3,
    overflow: "hidden"
},
peoplebox: {
    flexDirection: 'row',
    width: '98%',
    height: 200,
    // backgroundColor:'#E6F3EF',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    borderRadius:10,

},
root: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
},
content: {
    width: '100%',
    height: '100%',
    alignItems: "center"
}
})