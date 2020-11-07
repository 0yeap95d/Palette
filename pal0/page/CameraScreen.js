import React, {useState,useEffect} from 'react';
import {View, StyleSheet,TouchableOpacity,Text,Alert,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Voice from 'react-native-voice'
import axios from 'axios';
import {AuthContext} from '../src/context'


export default function CameraScreen(props) {
  // const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRecord,setIsRecord] = useState(false);
  const buttonLabel = isRecord ? 'Stop' : 'Start';
  let getuserId = null;
  let [Qcount, setCount] = useState(30);
  let [Qnum, setNum] = useState(1);
  let [errormsg, setError] = useState('');
  let [questions, setQuestions] = useState(`최근에는 어떠한 기분을 가지고 생활하셨는지${'\n'} 상세하게 설명해주세요`);
  let answer = '';
  let num = 1;
  const {goResult} = React.useContext(AuthContext);

  const voiceLabel = isRecord
    ? '이야기를 듣는 중입니다' // say something 
    : errormsg; //press start button
    

  const _onSpeechStart = () => {
    console.log('--녹음 시작--');
    console.log(getuserId)
    setError('');
  };
  const _onSpeechEnd = () => {
    console.log('--녹음 끝--');
  };
  const _onSpeechResults = (event) => {
    setLoading(true)
    num = num +1;
    if(num>3){
      goResult();
    }
    console.log('--녹음 결과--');
    answer = event.value[0]
    console.log(answer);

    var sendnum = num;
    console.log('질문'+sendnum+'유저아이디'+getuserId)
    axios.post("http://k3d102.p.ssafy.io:8000/emotion/text/",{
      text : answer,
      username : getuserId,
      questionNo : sendnum
    })
    .then(res =>{
        console.log(res.data.que)
        setQuestions(res.data.que)
        setNum(num)
        setLoading(false)

    }).catch(err =>{
        console.log(err)
    })


  };
  const _onSpeechError = (event) => {
    console.log('_onSpeechError');
    console.log(event.error.message);
    setError('다시 한번 녹음을 해주세요!')    
  }

  const _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('ko-KR');
    }
    setIsRecord(!isRecord);
  };

  

  useEffect(() => {
    if(getuserId==null){
    setTimeout(async() => {
      try {
        getuserId = await AsyncStorage.getItem('userId');
        console.log('카메라 페이지:'+getuserId)
        // setUserId(getuserId)
      } catch(e) {
        console.log(e);
      }
    }, 1000);
    }
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;
    
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={styles.root}>
      <View style={styles.camera}>
        <Text style={styles.txt}>Campage</Text>
      </View>

      <View style={styles.message}>

        {
          loading?
          (
            <>
            <ActivityIndicator size="large"/>
            </>
          ):
          (
            <>
            <View style={styles.btns}>
              <Text style={styles.txt}>Q{Qnum}.</Text>
              <Text style={styles.txt}>{questions}</Text>
            {/* <Text style={styles.txt}>⏱:{Qcount}</Text> */}
            </View>
            <View style={styles.btns}>
              <TouchableOpacity 
              style={styles.nextBtn}
              onPress={_onRecordVoice}
              >
              <Text style={styles.txt}>{buttonLabel}</Text>
              </TouchableOpacity>
          </View>
          </>
          )
        }

        <Text style={styles.txt}>{voiceLabel}</Text>

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
  camera : {
    flex :4,
    width: 350,
    marginTop:20,
    marginBottom:10,
    backgroundColor: 'yellow'
  },
  message :{
    flex:1,
    width: 350,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  btns:{
    flexDirection:'row',
    justifyContent: 'center',
  },  
  nextBtn:{
    width:50,
    backgroundColor:"#C8B6E5",
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  },
  txt:{
    color:"white",
    fontFamily : 'BMHANNAAir_ttf'
  }
});
