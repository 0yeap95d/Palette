import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../src/context'

export default function MainScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const {signOut,goResult} = React.useContext(AuthContext);

  const logout = async () =>{
    console.log('로그아웃');
    try {
      await AsyncStorage.setItem('userId','')
      signOut()
    } catch (e) {
      console.log(e)
    }
    // props.navigation.push('Main');
  }

  const goCamera = () =>{
    // goResult()
    props.navigation.push('Chart');
  }

  return (
    <View style={styles.root}>
        <Text style={styles.logout}
          onPress={logout}
        >logout </Text>

        <View style={styles.content}>
          <TouchableOpacity style={styles.btns} 
          onPress={goCamera}
          loading={loading}>
            <Image style={styles.btnimg} 
            source={require("../assets/img/camera.png")}/>
            <Text style={styles.btntxt}>
                감정 기록
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btns} 
          loading={loading}
          >
            <Image style={styles.btnimg} 
            source={require("../assets/img/books.png")}/>
            <Text style={styles.btntxt}>
                다이어리
            </Text>
          </TouchableOpacity>
        </View>


    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout:{
    backgroundColor:'red',
    width:60,
    height:30,
  },  
  content:{
    flex:1,
    justifyContent: 'center',
    // borderColor:'gray',
    // borderWidth:1,
    // borderRadius:30,
    marginTop:20,
    marginBottom:20,
    padding:10,
  },
  btns:{
    flexDirection:'row',
    width:300,
    height:80,
    alignItems:"center",
    marginBottom:30,
    backgroundColor:'#ECEBF2',
    borderRadius:20,
    padding:10,
  },
  btnimg:{
    width:100,
    height:70,
    resizeMode:'contain',
    marginRight:30,
  },
  btntxt:{
    padding:20,
    justifyContent: 'center',
    fontSize:18,
    height:60,
    width:150,
    fontFamily: 'BMHANNAAir_ttf',
  },

});
