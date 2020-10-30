import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const checkLogin = () => {
    // AsyncStorage.setItem('userId','');
    console.log('-- 로그인 체크 -- ')
    setLoading(true);
    AsyncStorage.getItem('userId').then(id => {
        console.log('id');
        if(id){ // 로그인 한 적 있으면 카메라로 ㄱㄱ 
            setLoading(false);
            console.log('로그인 기록 있음')
            props.navigation.push('Camera');
        } else {
            // 로그인 안했으면 로그인 페이지
            setLoading(false);
            console.log('로그인 기록 없음');
            props.navigation.push('Login');
        }
    },[userId])
  };
  

  return (
    <View style={styles.root}>
      <ImageBackground 
      style={styles.content}
      source={require("../assets/img/main.png")}
      resizeMode="cover"
      >
        <Text style={styles.logotxt}>Palette</Text>
        <TouchableOpacity 
          onPress={checkLogin}
          loading={loading}
          style={styles.startbtn}>
          <Text style={styles.starttxt}>
            시작하기
          </Text>
        </TouchableOpacity>
     
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height : '100%',
    alignItems: "center",
  },
  logotxt: {
    height: 70,
    marginTop:40,
    alignItems: "center",
    fontSize: 60,
    fontFamily : "Golden Plains"
  },
  startbtn:{
    position:'absolute',
    bottom:0,
    width:"70%",
    backgroundColor:"#C8B6E5",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:40,
  },
  starttxt : {
    color:'white',
    fontFamily : 'BMHANNAAir_ttf'
  }
});
