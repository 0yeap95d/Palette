import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {AuthContext} from '../src/context'
import LottieView from 'lottie-react-native';

export default function ResultScreen(props) {
  const [loading, setLoading] = useState(false);
  const {exitResult} = React.useContext(AuthContext);
  
  const colorarr = [
  require('../assets/img/brush1.png'),
  require('../assets/img/brush2.png'),
  require('../assets/img/brush3.png')]
  let color1 = colorarr[0], color2 = colorarr[1], color3 = colorarr[2];
  let userToken = null;

  const goHome = () => {
      exitResult()
  }

  const getResult = () =>{
    console.log('결과 주세요')
      axios.get("http://k3d102.p.ssafy.io:8000/emotion/result/",{
        username : userToken,
      })
      .then(res =>{
        console.log(res.data)
        setLoading(false)
      }).catch(err =>{
          console.log(err)
      })
  }
  
  useEffect(() => {
    if(userToken==null){
      setTimeout(async() => {
        try {
          userToken = await AsyncStorage.getItem('userId');
          console.log('여긴 result:'+userToken)
          // getResult()
        } catch(e) {
          console.log(e);
        }
      }, 1000);
    } 
    // console.log('결과 페이지: '+userId)
  }, []);

  if(loading) {
    return (
      <View style={{flex:1,justifyContetn:'center',alignItems:'center'}}>
        {/* <ActivityIndicator size ="large"/> */}      
        <View style={styles.content}>
          <Text style={styles.txt}>당신의 상태를 확인 하는 중입니다.</Text>
          <LottieView 
          style={styles.loader}
          source={require('../assets/img/loader3.json')} autoPlay roof/>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
        <View style={styles.colorbox}>
            <View style={styles.color}>
              <Image
              style={styles.imgs}
              source={color1} />
            </View>
            <View style={styles.color}>
              <Image
              style={styles.imgs}
              source={color1} />
            </View>
            <View style={styles.color}>
              <Image
              style={styles.imgs}
              source={color1} />
            </View>
        </View>

        <TouchableOpacity style={styles.btns} 
          onPress={goHome}>
              <Text style={styles.btntxt}>
                홈으로 가기
              </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorbox:{
    width:300,
    flexDirection:'row',
    alignItems:"center",
    justifyContent: 'center',
  },
  color:{
    width:100,
    alignItems:"center",
    justifyContent: 'center',
    marginBottom:30,
    backgroundColor:'#ECEBF2',
    padding:10,
  },
  imgs:{
    width:90,
    height:70,
    backgroundColor:'yellow',
    resizeMode:'contain',
  },  
  content:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader:{
    marginTop:40,
  },
  
  txt:{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:17,
  }
});
