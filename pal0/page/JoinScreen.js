import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity ,Text,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button,RadioButton,TextInput} from 'react-native-paper';
import { Picker } from "@react-native-community/picker";
import axios from 'axios';
import {AuthContext} from '../src/context'

export default function JoinScreen(props) {
    const {signIn} = React.useContext(AuthContext);
    const [loading, setLoading] = useState(false);  
    let [pk, setPk] = useState(0);
    let [userId, setUserId] = useState('');
    let [userPw, setUserPw] = useState('');
    let [age, setAge] = React.useState(0);
    let [checked, setChecked] = React.useState(0);

    let pknum = 0;

    const checkJoin = () => {
        console.log('-- 가입 정보 체크 -- ')
    
        console.log(userId)
        console.log(userPw)
        console.log(age) 
        console.log(checked) 

        if(userId==''){
            Alert.alert('아이디를 입력하세요')
        }else if(userPw==''){
            Alert.alert('비밀번호를 입력하세요')
        }else if(age==0){
            Alert.alert('연령대를 선택해 주세요')
        }else if(checked==0){
            Alert.alert('성별을 선택해주세요')
        }else if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(userPw)){
            Alert.alert("비밀번호는 8~20자 이상의 숫자+영문자+특수문자입니다");
        }else {
            console.log('-- axios test --')
            setUserId(userId)
            setUserPw(userPw)
            // 이메일 중복 체크 then 회원가입 cath alert 
            axios.post("http://k3d102.p.ssafy.io:8000/accounts/checked/",{
                username : userId
            })
            .then( res =>{
                console.log(res)
                Alert.alert('이미 존재하는 아이디 입니다!');
            }).catch(err=>{
                join()
                console.log(pk)
                
            })
        
        }
    
    };

    const join = async () =>{
        await  axios.post("http://k3d102.p.ssafy.io:8000/accounts/signup/",{
            username : userId,
            password1: userPw,
            password2: userPw,

            })
            .then(res=>{
                console.log(res.data.user);
                pknum = res.data.user.pk
                setPk(pknum)
                console.log(pknum)
                setLogin(userId);
                initinfo()
            }).catch(err=>{
                console.log(err)
                Alert.alert('회원가입 중 문제가 발생했습니다.');
            })
    }

    const initinfo = async () =>{
        console.log(pknum)
        await axios.post(`http://k3d102.p.ssafy.io:8000/accounts/initinfo/${pknum}/`,{
            gender : checked,
            age : age
            })
            .then(res=>{
                console.log(res);
                // props.navigation.push('Home');
            }).catch(err=>{
                console.log(err)
                Alert.alert('회원가입 중 문제가 발생했습니다.');
            })
    }

    const setLogin = async (userId) =>{
        console.log('로그인 유지 시키깅...');
        try {
        await AsyncStorage.setItem('userId', userId)
        signIn(userId)
        } catch (e) {
        console.log(e)
        }
        }


  return (
    <View style={styles.root}>
        <Text style={styles.welcometxt}>Welcome Palette</Text>
        <View style={styles.inputView} >
            <Text style={styles.labels}>ID</Text>
          <TextInput  
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            onChangeText={userId => setUserId(userId)}/>
        </View>

        <View style={styles.inputView} >
            <Text style={styles.labels}>PW</Text>
            <TextInput  
                style={styles.inputText}
                placeholderTextColor="#003f5c"
                onChangeText={userPw => setUserPw(userPw)}/>
        </View>


        <View style={styles.select}>
            <View style={styles.pickerset}>
              <Text style={styles.pickertxt}>Age</Text>
              <Picker
                style={styles.picker} //스타일 지정
                selectedValue={age} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(v) => setAge(v)}
                >            
                <Picker.Item label="나이를 입력하세요" value="0" />
                <Picker.Item label="10대" value="1" />
                <Picker.Item label="20대" value="2" />
                <Picker.Item label="30대" value="3" />
                <Picker.Item label="40대" value="4" />
                <Picker.Item label="50대 이상" value="5" />      
            </Picker>
            </View>
        </View>
        <View style={styles.select}>
            <View style={styles.sex}>
                <Text style={styles.sextxt}>👦Man</Text>
                <RadioButton
                value="1"
                status={ checked === 1 ? 'checked' : 'unchecked' }
                color="purple"
                onPress = {() =>setChecked(1)}
                testID = "남자"
                />
            </View>
            <View style={styles.sex}>
                <Text style={styles.sextxt}>👩Woman</Text>
                <RadioButton
                value="2"
                status={ checked === 2 ? 'checked' : 'unchecked' }
                color="purple"
                onPress = {() =>setChecked(2)}
                />
            </View>
        </View>
 

        <TouchableOpacity 
        onPress={checkJoin}
        loading={loading}
        style={styles.nextbtn}
        >
        <Text style={styles.loginText}>NEXT</Text>
        </TouchableOpacity>

       
    </View>
  );
}

const styles = StyleSheet.create({
 root : {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",

},
welcometxt:{
    fontFamily : "Golden Plains",
    fontSize:40,
    marginBottom:70,
},
inputView: {
    marginBottom: 10,
    justifyContent: "center",
    flexDirection: 'row'
},
inputText: {
    height: 50,
    padding: 10,
    color: "gray",
    width: 250,
    height: 20,
    backgroundColor: "transparent"
},
nextbtn: {
    width: "70%",
    backgroundColor: "#C8B6E5",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 10
},
loginText: {
    color: "white",
    fontFamily: 'BMHANNAAir_ttf',
},
labels: {
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:16,
    marginRight:10,
    width:40
},
select : {
    flexDirection: 'row',
    alignItems: "center",
    width:'100%',
    justifyContent: 'center',

},
sex:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "45%",
    marginRight:5,
    marginLeft:5,
    borderRadius:10,
},
sextxt : {
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:16

},
pickerset :{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%'
},
picker : {
    width:'70%',
    // marginTop: 10,
    marginBottom: 10,

},
pickertxt :{
    width: '10%',
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:16
}
});
