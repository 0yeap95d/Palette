import React, { useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Alert,ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {AuthContext} from '../src/context'

export default function LoginScreen(props) {
  let [userId, setUserId] = useState('');
  let [userPw, setUserPw] = useState('');

    const {signIn} = React.useContext(AuthContext);

    const goLogin = () =>{
      console.log('로그인 버튼 !!')
        if(userId==''){
            Alert.alert('아이디를 입력하세요')
        }else if(userPw==''){
            Alert.alert('비밀번호를 입력하세요')
        }else {
            // axios login 
          console.log('-- axios login --')
          axios.post("http://k3d102.p.ssafy.io:8000/accounts/checked/",{
             username : userId
          })
          .then( res =>{
            axios.post("http://k3d102.p.ssafy.io:8000/accounts/user/login/",{
                username : userId,
                password : userPw
            })
            .then(res =>{
                console.log(res)
                setLogin(userId);
            }).catch(err =>{
                console.log(err)
                Alert.alert('비밀번호를 확인하세요')
            })
            }).catch(err=>{
            console.log(err)
            Alert.alert('존재하지 않는 아이디 입니다.');
          })
        }
    }
    const goSignup = () =>{
        props.navigation.push('Join');
    }

    const setLogin = async (userId) =>{
      console.log('로그인 유지 시키깅...');
      try {
        await AsyncStorage.setItem('userId', userId)
        signIn(userId)
        console.log('유저아이디'+userId)
      } catch (e) {
        console.log(e)
      }
  }

  return (
    <View style={styles.root}>
          <ImageBackground
        style={styles.content}
        source={require("../assets/img/bg4.jpg")}
        resizeMode="stretch"
      >
        <Text style={styles.logo}>Palette</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="ID..." 
            underlineColor='#ECEBF2'
            placeholderTextColor="#003f5c"
            onChangeText={userId => setUserId(userId)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Pw..." 
            underlineColor='#ECEBF2'
            placeholderTextColor="#003f5c"
            onChangeText={userPw => setUserPw(userPw)}/>
        </View>

        <TouchableOpacity 
        style={styles.loginBtn}
        onPress={goLogin}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text 
          style={styles.forgot}
          onPress={goSignup}
          >Signup</Text>
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
  content :{
    width: '100%',
    height : '100%',
    alignItems: "center",
  },
  logo:{
    fontFamily : "Golden Plains",
    fontSize:80,
    marginBottom:40,
    marginTop:100,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#ECEBF2",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"gray",
    backgroundColor:'transparent',
  },
  forgot:{
    height:30,
    width:40,
    color:"gray",
    fontSize:11,
    marginTop:10,
    fontFamily : 'BMHANNAAir_ttf'
  },
  loginBtn:{
    width:"70%",
    backgroundColor:"#C8B6E5",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontFamily : 'BMHANNAAir_ttf'
  }
});
