import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image,Alert,ScrollView } from 'react-native';
import {Animated,Component} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BarChart} from 'react-native-chart-kit'


export default function ChartScreen(props) {
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
    let time = {
        datasets : [],
        labels : [],
    }
    let age = {
        datasets : [],
        labels : []
    }
    useEffect(()=>{
        // axios.get("http://k3d102.p.ssafy.io:8000/emotion/total/")
        //   .then(res =>{
        //     // console.log(res.data.man)
            
        //   }).catch(err =>{
        //       console.log(err)
        //   })
    }, []);

    const fivelabelcolor = ['red','yellow','black','green','blue']
    const tenlabelcolor = ['red','yellow','black','green','blue','red','yellow','black','green','blue']

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
    const totaldata = total.datasets.map(
        (dataset,index) =>  (<View style={totaldatastyle(dataset,index)}></View>)
        );
    const totallabel = total.labels.map(
        (label) =>  (<View style={styles.tenlabel}><Text style={styles.totallabeltext}>{label}</Text></View>)
    );
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

   

   return (
    <ScrollView  style={styles.root}>
        <ImageBackground
        style={styles.content}
        source={require("../assets/img/bg4.jpg")}
        resizeMode="stretch"
        >
{/* ---------------전체 차트-------------------------- */}
        <View style={styles.totalbox}>
            <View style={{flexDirection:'row',height:200,alignItems:'flex-end'}}>{totaldata}</View>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>{totallabel}</View>
        </View>
{/* -------------성별 차트---------------------- */}
        <View style={styles.peoplebox}>
            <View style={styles.people}>
                <Image style={styles.peopleimg} 
                source={require("../assets/img/woman1.png")}></Image>
                <Text style={styles.womantxt}>여자</Text>
            </View>
            <View style={styles.people}>
                <Image style={styles.peopleimg} 
                source={require("../assets/img/man1.png")}></Image>
                <Text style={styles.mantxt}>남자</Text>
            </View>

            <View style={styles.peoplechart}>
                <View style={styles.fivelabelbox}>{womanlabel}</View>
                <View style={styles.fivedatawomanbox}>{womandata}</View>
                
                <View style={styles.fivedatamanbox}>{mandata}</View>
                <View style={styles.fivelabelbox}>{manlabel}</View>
            </View>
        </View>
{/* ---------------나이 차트----------------------------- */}
    <View style={styles.etcbox}>


    </View>
{/* --------------시간 차트------------------------------- */}
    <View style={styles.etcbox}>


    </View>

    <View style={{marginBottom:100,}}></View>

    </ImageBackground>
    </ScrollView>
   );
}

const styles = StyleSheet.create({ 
totallabeltext:{
    fontFamily: 'BMHANNAAir_ttf',
    fontSize:11,
    marginLeft:9,
    marginTop:10,
},
labeltxt:{
    fontFamily: 'BMHANNAAir_ttf',
    fontSize:10,
},
fivelabel:{   //라벨 개별
    width:30,
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignContent:'center',
    marginBottom:8,
    marginTop:8,
},  
fivedatawomanbox:{ // 데이터 wrapper
    // display:flex,
    width:50,
    height:150,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems:'flex-end', //여자는 flex end , 남자는  flex start
    marginRight:1,
},
fivedatamanbox:{ // 데이터 wrapper
    // display:flex,
    width:50,
    height:150,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems:'flex-start', //여자는 flex end , 남자는  flex start
    marginLeft:1,
},
fivelabelbox:{ //라벨 wrapper
    width:30,
    height:150,
    justifyContent: 'center',
    alignItems:'center'
},
etcbox:{
    width: '100%',
    height: 200,
    borderColor:'black',
    borderWidth:1,
    justifyContent: 'center',
    marginTop:10,
    alignItems: 'center'
},
totalbox:{
    width: '100%',
    height: 300,
    borderColor:'black',
    borderWidth:1,
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
},
womantxt:{
    fontFamily: 'BMHANNAAir_ttf',
    marginTop:5,
    color:'orange'
},  
mantxt:{
    fontFamily: 'BMHANNAAir_ttf',
    marginTop:5,
    color:'green'
},  
peoplechart : {
    // backgroundColor:'yellow',
    flex: 2,
    height: 180,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center'
},
people: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    marginLeft:3,
},
peopleimg: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius:300,
    borderWidth:3,
    overflow:"hidden",
},
peoplebox: {
    flexDirection: 'row',
    width: '100%',
    height: 200,
    borderColor:'black',
    borderWidth:1,
    justifyContent: 'center',
    marginTop:10,
    alignItems: 'center'
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