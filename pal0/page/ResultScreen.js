import React, {useState,useEffect} from 'react';
import {View, StyleSheet,TouchableOpacity,Text,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default function ResultScreen(props) {
  const [loading, setLoading] = useState(false);



  return (
    <View style={styles.root}>
        <Text style={styles.txt}>RESULT PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt:{
    fontFamily : 'BMHANNAAir_ttf'
  }
});
