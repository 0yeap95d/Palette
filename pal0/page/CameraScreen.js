import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  

  return (
    <View style={styles.root}>
      <Text>Campage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
