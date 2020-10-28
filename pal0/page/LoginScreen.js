import React, { useState } from 'react';
import { Text, Alert, Button, View, StyleSheet,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { not } from 'react-native-reanimated';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');


  return (
    <View style={styles.root}>
        <Text style={styles.logo}>Palette</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Signup</Text>
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
    fontFamily : 'BMHANNAAir_ttf'
  },
  loginBtn:{
    width:"70%",
    backgroundColor:"#C3B1F2",
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
