import React, { useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default function LoginScreen(props) {
  let [userId, setUserId] = useState('');
  let [userPw, setUserPw] = useState('');

    const goLogin = () =>{
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
                AsyncStorage.setItem('userId', '')
                props.navigation.push('Camera');
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
        } catch (e) {
          console.log(e)
        }
    }

  return (
    <View style={styles.root}>
        <Text style={styles.logo}>Palette</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="ID..." 
            placeholderTextColor="#003f5c"
            onChangeText={userId => setUserId(userId)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Pw..." 
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

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    fontFamily : "Golden Plains",
    fontSize:80,
    marginBottom:40,
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
