/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import  { 
  RTCPeerConnection , 
  RTCIceCandidate , 
  RTCSessionDescription , 
  RTCView , 
  MediaStream , 
  MediaStreamTrack , 
  mediaDevices , 
  registerGlobals 
}  from  'react-native-webrtc' ;


const App: () => React$Node = () => {
  return (
    <View>
        <Text style={styles.button}>Hello</Text>
    </View>
      
  );
};

const styles = StyleSheet.create({
  button : {
    fontSize: 30, 
    backgroundColor : 'red'
  }
});

export default App;
