import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image} from 'react-native';

export default function MainScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const getUserId = async () =>{
    try {
      var id = await AsyncStorage.getItem('userId')
      setUserId(id)
      console.log(userId)
    } catch (e) {
      console.log(e)
    }
  }

  const checkLogin = () => {
    console.log('-- 로그인 체크 -- ')
    getUserId()
    setLoading(true);
    if(userId){ // 로그인 한 적 있으면 카메라로 ㄱㄱ 
        setLoading(false);
        console.log('로그인 기록 있음')
        props.navigation.push('Home');
    } else {
        // 로그인 안했으면 로그인 페이지
        setLoading(false);
        console.log('로그인 기록 없음');
        props.navigation.push('Login');
    }
  };
  

  return (
    <View style={styles.root}>
      <ImageBackground 
      style={styles.content}
      source={require("../assets/img/main.png")}
      resizeMode="cover"
      >
        <Text style={styles.logotxt}>Palette</Text>

        <ImageBackground
          style={styles.startbtn}
          source={require("../assets/img/brush1.png")}
        >
        <TouchableOpacity 
          onPress={checkLogin}
          loading={loading}>
          <Text style={styles.starttxt}>
            시작하기
          </Text>
        </TouchableOpacity>
      </ImageBackground>
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
    width:300,
    height:80,
    resizeMode:'stretch',
    alignItems:"center",
    justifyContent:"center",
    marginBottom:30,
  },
  starttxt : {
    color:'white',
    fontSize:18,
    fontFamily : 'BMHANNAAir_ttf'
  }
});
