import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './page/MainScreen';  // 메인 로그인 버튼 
import LoginScreen from './page/LoginScreen';  // 로그인
import JoinScreen from './page/JoinScreen';  // 닉네임 성별 나이 기입 
import HomeScreen from './page/HomeScreen';  // Home
import CameraScreen from './page/CameraScreen'; // 영상 & 음성
import ResultScreen from './page/ResultScreen'; // 결과 페이지


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
          name="Join" 
          component={JoinScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login" 
          component={LoginScreen}
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
         <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{headerShown: false}}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
