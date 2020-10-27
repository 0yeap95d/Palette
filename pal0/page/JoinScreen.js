import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground ,Text,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button,RadioButton,TextInput} from 'react-native-paper';
import { Picker } from "@react-native-community/picker";
import axios from 'axios';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState('male');
  const [value, setValue] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  const checkJoin = () => {
    console.log('-- 가입 정보 체크 -- ')
    // 성별 선택 했는지 
    // 닉넴 입력 했는지
    // 나이 선택 했는지
    console.log(nickname)
    console.log(value)
    console.log(checked) 

    if(nickname==''){
        Alert.alert('닉네임을 입력하세요')
    }else if(value==''){
        Alert.alert('연령대를 선택해 주세요')
    }else if(checked==''){
        Alert.alert('성별을 선택해주세요')
    }else {
        setLoading(true);
        console.log('-- axios test --')
        axios.get("http://127.0.0.1:8000/emotion/top/")
        .then( res =>{
            setLoading(false);
            console.log(res);
        }).catch(err=>{
            setLoading(false);
            console.log(err);
        })
    }
  
  };
  

  return (
    <View style={styles.root}>
        <View style={styles.content}>
            <Text style={styles.infotxt}> 당신의 정보를 알려주세요.{"\n"} 결과를 분석하는데 도움이 됩니다</Text>
        </View>
        <TextInput
        label="닉네임을 입력해 주세요"
        onChangeText={nickname => setNickname(nickname)}
        value={nickname}
        />
        <View styles={styles.select}>
            <View styles={styles.sex}>
                <Text styles={styles.sextxt}>👦남자</Text>
                <RadioButton
                value="1"
                status={ checked === 'male' ? 'checked' : 'unchecked' }
                color="purple"
                onPress = {() =>setChecked('male')}
                testID = "남자"
                />
            </View>
            <View styles={styles.sex}>
                <Text styles={styles.sextxt}>👩여자</Text>
                <RadioButton
                value="2"
                status={ checked === 'female' ? 'checked' : 'unchecked' }
                color="purple"
                onPress = {() =>setChecked('female')}
                />
            </View>
        </View>
        <View styles={styles.select}>
              <Text styles={styles.agetxt}>나이</Text>
              <Picker
                styles={styles.picker} //스타일 지정
                selectedValue={value} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(v) => setValue(v)}
                >            
                <Picker.Item label="나이를 입력하세요" value="" />
                <Picker.Item label="10대" value="1" />
                <Picker.Item label="20대" value="2" />
                <Picker.Item label="30대" value="3" />
                <Picker.Item label="40대" value="4" />
                <Picker.Item label="50대 이상" value="5" />      
            </Picker>
        </View>

        <View styles={styles.buttons}>
        <Button
          mode="contained"
          onPress={checkJoin}
          loading={loading}
          styles={styles.nextbtn}>
          다음
        </Button>
        </View>
       
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
    alignItems: "center",
},
infotxt: {
    fontFamily : 'BMHANNAAir_ttf',
    fontWeight: 'bold',
    fontSize: 19,
},
select : {
    flexDirection : 'row',
    flex:1
},
sex : {
    flex :1
},
agetxt : {
    flex : 1
},
picker : {
    flex:3
},
nextbtn : {
    position: "absolute",
    bottom: 0,
    width:'100%'
  }
});
