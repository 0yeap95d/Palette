import React, { useEffect, useState,View } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './src/context'


import MainScreen from './page/MainScreen';  // 메인 로그인 버튼 
import LoginScreen from './page/LoginScreen';  // 로그인
import JoinScreen from './page/JoinScreen';  // 닉네임 성별 나이 기입 
import HomeScreen from './page/HomeScreen';  // Home
import CameraScreen from './page/CameraScreen'; // 영상 & 음성
import ResultScreen from './page/ResultScreen'; // 결과 페이지




const userStack  = createStackNavigator();
const UserStackScreen = () => (
    <userStack.Navigator>
        <userStack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <userStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <userStack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}}/>
    </userStack.Navigator>
);

const loginStack = createStackNavigator();
const LoginStackScreen = () => (
    <loginStack.Navigator>
        <loginStack.Screen name="Main" component={MainScreen} />
        <loginStack.Screen name="Join" component={JoinScreen} options={{headerShown: false}}/>
        <loginStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
    </loginStack.Navigator>
);

const ResultStack = createStackNavigator();
const ResultStackScreen = () => (
    <ResultStack.Navigator>
        <ResultStack.Screen name="Result" component={ResultScreen} options={{headerShown: false}}/>
    </ResultStack.Navigator>
);

const App = () => {

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
      };

      const loginReducer = (prevState, action) => {
        switch( action.type ) {
          case 'RETRIEVE_TOKEN': 
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGIN': 
            return {
              ...prevState,
              userName: action.id,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGOUT': 
            return {
              ...prevState,
              userName: null,
              userToken: null,
              isLoading: false,
            };
          case 'REGISTER': 
            return {
              ...prevState,
              userName: action.id,
              userToken: action.token,
              isLoading: false,
            };
        }
      };

      const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    
      const authContext = React.useMemo(()=>({
        signIn : async (foundUser) =>{
            console.log(foundUser)
            const userToken = foundUser;
            const userName = foundUser

            try {
                await AsyncStorage.setItem('userId', userToken);
              } catch(e) {
                console.log(e);
              }
              // console.log('user token: ', userToken);
              dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut : async () =>{
            try {
                await AsyncStorage.removeItem('userId');
              } catch(e) {
                console.log(e);
              }
              dispatch({ type: 'LOGOUT' });
        },
        signUp: () =>{

        }
    }));

    useEffect(() => {
        setTimeout(async() => {
          // setIsLoading(false);
          let userToken;
          userToken = null;
          try {
            userToken = await AsyncStorage.getItem('userId');
            console.log('여긴 app3:'+userToken)
          } catch(e) {
            console.log(e);
          }
          // console.log('user token: ', userToken);
          dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
      }, []);


    // if( loginState.isLoading ) {
    //     return(
    //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //         <ActivityIndicator size="large"/>
    //     </View>
    //     );
    // }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                    loginState.userToken !== null ? (
                        <UserStackScreen/>
                        ) :
                        <LoginStackScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
export default App;