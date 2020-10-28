import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const checkLogin = () => {
    console.log('-- 로그인 체크 -- ')
    setLoading(true);
    AsyncStorage.getItem('userId').then(id => {
        console.log('id');
        if(id){ // 로그인 한 적 있으면 카메라로 ㄱㄱ 
            setLoading(false);
            props.navigation.push('Camera');
        } else {
            // 로그인 안했으면 가입 유무 체크 ...
            checkJoin();
        }
    },[userId])
  };
  
    const checkJoin = () => {
        console.log('-- 가입 체크 --')
        props.navigation.push('Join');
        setLoading(false);
    }; 

  return (
    <View style={styles.root}>
      <ImageBackground 
      style={styles.content}
      source={require("../assets/img/main.png")}
      resizeMode="cover"
      >
        <Text style={styles.logotxt}>Palette</Text>
        <Button
          mode="contained"
          onPress={checkLogin}
          loading={loading}
          style={styles.startbtn}
          >
          시작하기
        </Button>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height : '100%',
    alignItems: "center",
  },
  logotxt: {
    height: 70,
    alignItems: "center",
    fontSize: 60,
    fontFamily : "Golden Plains"
  },
  startbtn:{
    position: "absolute",
    bottom: 10,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily : 'BMHANNAAir_ttf'
  }
});
