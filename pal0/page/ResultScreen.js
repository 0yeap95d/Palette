import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image,Alert,ScrollView ,NativeModules, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {AuthContext} from '../src/context'
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal'
import {BarChart} from 'react-native-chart-kit'
import { color } from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg'

export default function ResultScreen(props) {
  let userToken = null;
  const [userId,setuserid] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isModal,setModal] = useState(false);
  const [isreceived,setIsreceived] = useState(false);
  const [threeEmo,setThreeEmo] = useState([]);
  const [totalMood,setTotalMood] = useState(null);
  const [moodComment,setMoodComment] = useState(null);
  const [music,setMusic] = useState([])
  const [chartdata,setchartData] = useState([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]);
  const [age,setAge] = useState(0);
  const [gender,setGender] = useState(0);
  const [time,setTime] = useState(0);
  const [pharse,setPharse] = useState([]);
  const {exitResult} = React.useContext(AuthContext);
  let [qrvalue,setqrvalue] = useState("qr")

  let data = {
    labels: [ chartdata[0][0], chartdata[1][0],chartdata[2][0],chartdata[3][0],chartdata[4][0],chartdata[5][0],chartdata[6][0],chartdata[7][0],chartdata[8][0],chartdata[9][0],],
    datasets: [
      {
        data: [chartdata[0][1],chartdata[1][1],chartdata[2][1],chartdata[3][1],chartdata[4][1],chartdata[5][1],chartdata[6][1],chartdata[7][1],chartdata[8][1],chartdata[9][1],],
        strokeWidth: 2, // optional
        
      }
    ],
  };


  const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: () => ('#835EBE'), 
    // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.3,
    propsForLabels : { 
      fontSize : '10' , 
      fontWeight:'bold'
    } , 
    fillShadowGradient: '#835EBE', // THIS
    fillShadowGradientOpacity: 1, // THIS
  };

  // 암호화 aes 
  var Aes = NativeModules.Aes
 
  const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)
   
  const encryptData = (text, key) => {
      return Aes.randomKey(16).then(iv => {
          return Aes.encrypt(text, key, iv).then(cipher => ({
              cipher,
              iv,
          }))
      })
  }

  const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

  const toggleModal = () => {
    console.log('큐알코드~?')

    var qrstring = (
      ""+userId+
      "/"+(new Date().toISOString().slice(0,10))+
      "/"+totalMood
    )

    // setqrvalue(qrstring)

    console.log(qrstring)
    axios.get(`http://k3d102.p.ssafy.io:8000/emotion/qr/?username=${userId}`)
    .then(res =>{
      if(res.data.check==0) {
        setIsreceived(false)
      
        try {
          generateKey('palette', 'emotion', 5000, 256).then(key => {
            console.log('Key:', key)
            encryptData(qrstring, key)
              .then(({ cipher, iv }) => {
                  console.log('Encrypted:', cipher)
                  setqrvalue(cipher)
              })
              .catch(error => {
                  console.log(error)
              })
          })
      } catch (e) {
          console.error(e)
      }
      
      } //선물 안 받은거
      else setIsreceived(true) //선물 받았음
      setModal(!isModal);
    }).catch(err =>{
      console.log(err)
    })
    setModal(!isModal);
  }    // qr코드 모달 ~~~~
 
  const colorarr = [
  require('../assets/img/color1.png'),
  require('../assets/img/color2.png'),
  require('../assets/img/color3.png'),
  require('../assets/img/color4.png'),
  require('../assets/img/color5.png'),
  require('../assets/img/color6.png'),
  require('../assets/img/color7.png'),]
  let colorimg = [colorarr[0],colorarr[1],colorarr[2]];
  

  const goHome = () => {
      exitResult()
  }


  const getResult = () =>{
    console.log('결과 주세요')
      axios.get(`http://k3d102.p.ssafy.io:8000/emotion/result/?username=${userToken}`)
      .then(res =>{
        console.log(res.data)
        
        var emocolorarr = [];
        for(var i=0;i<3;i++){
          switch(res.data.emotions[i][0]){
            case 0 :
              colorimg[i] = colorarr[0]
              emocolorarr.push("분노")
              break;
            case 1 :
              colorimg[i] = colorarr[1]
              emocolorarr.push("혐오")
              break;
            case 2 :
              colorimg[i] = colorarr[2]
              emocolorarr.push("두려움")
              break;
            case 3 :
              colorimg[i] = colorarr[3]
              emocolorarr.push("행복")
              break;
            case 4 :
              colorimg[i] = colorarr[4]
              emocolorarr.push("슬픔")
              break;
            case 5 :
              colorimg[i] = colorarr[5]
              emocolorarr.push("놀람")
              break;
            case 6 :
              colorimg[i] = colorarr[6]
              emocolorarr.push("평범")
              break;
              
          }
        }
        // console.log(emocolorarr)
        setThreeEmo(emocolorarr)
        setTotalMood(res.data.finalEmotion)         
        setMoodComment(res.data.comment)
        setchartData(res.data.statistic.idx)
        setAge(res.data.statistic.age)
        setMusic(res.data.music)

        if(res.data.statistic.gender == 1) {
          setGender("남성")
        }else setGender("여성")
        setTime(res.data.statistic.time)
        setPharse(res.data.text)

        

        setLoading(false)
      }).catch(err =>{
          console.log(err)
      })
  }
  
  useEffect(() => {
    if(userToken==null){
      setTimeout(async() => {
        try {
          userToken = await AsyncStorage.getItem('userId');
          console.log('여긴 result:'+userToken)
          setuserid(userToken)
          getResult()
        } catch(e) {
          console.log(e);
        }
      }, 1000);
    } 
    // console.log('결과 페이지: '+userId)
  }, []);

  if(loading) {
    return (
      <View style={{flex:1,justifyContetn:'center',alignItems:'center'}}>
        {/* <ActivityIndicator size ="large"/> */}      
        <View style={styles.content}>
          <Text style={styles.txt}>당신의 상태를 확인 하는 중입니다.</Text>
          <LottieView 
          style={styles.loader}
          source={require('../assets/img/loader3.json')} autoPlay roof/>
        </View>
      </View>
    );
  }

  return (
    <ScrollView  style={styles.root}>
      <TouchableOpacity 
        onPress={goHome}>
          <Text>
            홈으로 가기
          </Text>
      </TouchableOpacity>
      <ImageBackground
        style={styles.content}
        source={require("../assets/img/bg4.jpg")}
        resizeMode="stretch"
      >
{/* --------------감정색깔------------------------------ */}
        <View style={styles.top}>
        <Text style={styles.toptxt}>당신의 결과는 ?</Text>
        </View>
        <View style={styles.emotioncolor}>
            <View style={styles.maincolor}>
              <ImageBackground
              style={styles.imgs}
              source={colorimg[0]} >
                <Text style={styles.colortxt}>{threeEmo[0]}</Text>
              </ImageBackground>
            </View>

            <View style={styles.anothercolor}>
              <View style={styles.color}>
              <ImageBackground
                style={styles.imgs}
                source={colorimg[1]} >
                  <Text style={styles.colortxt}>{threeEmo[1]}</Text>
                </ImageBackground>
              </View>
              <View style={styles.color}>
              <ImageBackground
                style={styles.imgs}
                source={colorimg[2]} >
                  <Text style={styles.colortxt}>{threeEmo[2]}</Text>
                </ImageBackground>
              </View>
            </View>
        </View>
{/* ------------감정 설명------------------------------- */}
        <View style={styles.decswrap}>
        <View style={styles.decs}> 
          <Text style={styles.decstitle}>{totalMood}</Text>
          <Text style={styles.decscontent}>
            {moodComment}
          </Text>
            <Text style={styles.pharsetxt}>
            {pharse[0]} 
            </Text>
            <Text style={styles.pharsetxt}>
            - {pharse[1]} -
            </Text>
        </View>
{/* ------------추천 리스트-------------------------- */}
        <View style={styles.decs}>
        <Text style={styles.decstitle}>당신을 위한 추천리스트</Text>
          <Text style={styles.decscontent}>
            당신을 위해 노래를 준비했어요! {'\n'}
            울적함을 달래고 에너지를 줄 수 있길 바라요. {'\n\n'}

          </Text>

          <Text
            style={styles.musictxt}
            onPress={() => Linking.openURL('https://www.youtube.com/results?search_query='+music[0][0]+' '+music[0][1])}
          >🎵 {music[0][0]} - {music[0][1]}{'\n\n'}</Text>
          <Text
            style={styles.musictxt}
            onPress={() => Linking.openURL('https://www.youtube.com/results?search_query='+music[1][0]+' '+music[1][1])}
          >🎵 {music[1][0]} - {music[1][1]}{'\n\n'}</Text>
          <Text
            style={styles.musictxt}
            onPress={() => Linking.openURL('https://www.youtube.com/results?search_query='+music[2][0]+' '+music[2][1])}
          >🎵 {music[2][0]} - {music[2][1]}{'\n\n'}</Text>

          <Text style={styles.decscontent}>
           노래를 들으며 달콤한 코코아차 한잔 어떠신가요? {'\n'}
           코코아는 아침 식전에 마시면 활력을 주는 역할을 합니다.
          어쩌구 저쩌구 어쩌구 궁시렁 궁시렁 
          </Text>
        </View>
        
{/* ------------성별,시간대,연령에 맞는 통계-------------------------- */}
        <Text style={styles.avgtitle}>{time}시, {age}0대 {gender}들의 결과는?</Text>
          <View style={styles.avgresult}>
          <View style={styles.avgchart}>
          <BarChart
          data={data}
          width={350}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          fromZero={true}

          showValuesOnTopOfBars={true}
          withHorizontalLabels={false}
          style={{marginLeft:-35,}}
          />
          </View>
          </View>
        

        <View style={styles.present}>
          <Text style={styles.presenttxt}>
            당신을 위해 저희가 작은 선물을 준비했어요.</Text>
          <Text style={styles.presenttxt}>
            근처에 팔레트 자판기가 있다면 아래 버튼을 클릭해주세요.
          </Text>

          <TouchableOpacity 
            style={styles.qrbtn}
            onPress={toggleModal}
          >
          <Text style={styles.btntxt}>🎁선물 받기🎁</Text>
          <Modal isVisible={isModal}
            onBackdropPress={()=>setModal(false)}
          >
            <View style={styles.qr}>
              
                {
                  isreceived? (
                    <View style={styles.qrreceived}>
                      <LottieView 
                      style={{width:80,height:80,marginBottom:20,}}
                      source={require('../assets/img/sad.json')} autoPlay roof/>
                    <Text style={styles.qrtxt}>선물은 하루에 한번만 제공됩니다!</Text>
                    </View>
                  ) : (
                    <View style={styles.qrmodal}>
                      <View>
                        <QRCode
                          value={qrvalue}
                        />
                      </View>
                    <Text style={styles.qrtitle}>코드를 팔레트 자판기에 인식 시켜주세요!</Text>
                    </View>
                  )
                }
            </View>
          </Modal>
          </TouchableOpacity>
        </View>
        </View>
        </ImageBackground>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  pharsetxt: {
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:13,

  },
  top : {
    alignItems:"center",
    justifyContent:"center",
  },
  toptxt: {
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:35,
    marginBottom:40,
    marginTop:20,
  },
  qrtitle :{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:15,
    marginTop:20,
  },
  qrtxt:{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:16,
  },
  qrreceived:{
    backgroundColor:'white',
    height:180,
    width:330,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
  },
  qrmodal:{
    backgroundColor:'white',
    height:300,
    width:330,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,

  },
  qr : {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  qrbtn:{
    width:250,
    backgroundColor:"#C8B6E5",
    borderRadius:60,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,

  },
  btntxt :{
    color:"white",
    fontFamily : 'BMHANNAAir_ttf'
  },
  present : {
    marginTop:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presenttxt : {
    fontSize:12,
    fontFamily : 'BMHANNAAir_ttf',
  },  
  decswrap: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50,
  },
  avgresult:{
    marginBottom:20,
  },
  avgchart:{
    borderWidth:1,
    borderRadius:25,
    height:230,
    width:330,
    borderColor:'gray',
    paddingTop:10,
  },
  avgtitle:{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:13,
    fontWeight:'bold',
    marginBottom:7,
    marginTop:30,

  },
  decstitle:{
    width:260,
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:15,
    fontWeight:'bold',
    marginBottom:7,
  },  
  decs:{
    width:260,  
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    // backgroundColor:'red',
  },
  musictxt:{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:13,
    width:'100%'
  },
  decscontent:{
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:13,
    lineHeight:18,
    marginBottom:10,
    width:'100%',
  },
  root: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  content :{
    width: '100%',
    height : '100%',
    alignItems: "center",
  },
  emotioncolor:{
    width:'100%',
    alignItems:"center",
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  color:{
    width:120,
    alignItems:"center",
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  maincolor:{
    width:90,
    alignItems:"center",
    justifyContent: 'center',
  },
  anothercolor:{
    flexDirection:'row',
  } ,
  imgs:{
    width:150,
    height:130,
    resizeMode:'stretch',
    alignItems:"center",
    justifyContent:"center",
  }, 
  content:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader:{
    marginTop:40,
  },
  colortxt:{
    color:'white',
    fontSize:22,
    // fontWeight:'bold',
    fontFamily : 'BMHANNAAir_ttf'
  },
  txt:{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:17,
  }
});
