import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const checkLogin = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('userId', userId);
      setLoading(false);
      props.navigation.push('Camera');
    } catch (err) {
      console.log('Error', err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground 
      style={styles.content}
      source={require("./assets/img/main.png")}
      resizeMode="cover"
      >
        <Text style={styles.logotxt}></Text>
        <Button
          mode="contained"
          onPress={checkLogin}
          loading={loading}>
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
    width: 100,
    height : 100
  },
  logotxt: {
    height: 60,
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 30,
  },
});
