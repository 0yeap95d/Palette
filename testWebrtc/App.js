import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './screens/MainScreen';  // 메인 로그인 버튼 
import LoginScreen from './screens/LoginScreen';  // 메인 로그인 버튼 
import InsertInfoScreen from './screens/InsertInfoScreen'; // 닉네임, 성별, 나이 기입
import CallScreen from './screens/CallScreen'; 
import CameraScreen from './screens/CameraScreen'; // 영상 & 음성
import ResultScreen from './screens/ResultScreen'; // 결과 페이지


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main" 
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login" 
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Info" 
          component={InsertInfoScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Call" 
          component={CallScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{headerShown: false}}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;