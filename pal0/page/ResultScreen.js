import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image,Alert,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {AuthContext} from '../src/context'
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal'
import {BarChart} from 'react-native-chart-kit'

export default function ResultScreen(props) {
  const [loading, setLoading] = useState(false);
  const [isModal,setModal] = useState(false);
  const data = {
    labels: ["경멸", "당혹", "격분", "수치심", "혼란", "설렘","낙관","반감","우울함","놀람"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43,45, 28, 80, 99, 43],
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

  const chartConfiguration = {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio : false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  
}; 

  const {exitResult} = React.useContext(AuthContext);
  
  const toggleModal = () => {
    setModal(!isModal);
  }

  const colorarr = [
  require('../assets/img/color1.png'),
  require('../assets/img/color2.png'),
  require('../assets/img/color3.png')]
  let color1 = colorarr[0], color2 = colorarr[1], color3 = colorarr[2];
  let userToken = null;

  const goHome = () => {
      exitResult()
  }

  const getResult = () =>{
    console.log('결과 주세요')
      axios.get(`http://k3d102.p.ssafy.io:8000/emotion/result/?username=${userToken}`)
      .then(res =>{
        console.log(res.data)
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
              source={color1} >
                <Text style={styles.colortxt}>슬픔</Text>
              </ImageBackground>
            </View>

            <View style={styles.anothercolor}>
              <View style={styles.color}>
              <ImageBackground
                style={styles.imgs}
                source={color2} >
                  <Text style={styles.colortxt}>분노</Text>
                </ImageBackground>
              </View>
              <View style={styles.color}>
              <ImageBackground
                style={styles.imgs}
                source={color3} >
                  <Text style={styles.colortxt}>두려움</Text>
                </ImageBackground>
              </View>
            </View>
        </View>
{/* ------------감정 설명------------------------------- */}
        <View style={styles.decswrap}>
        <View style={styles.decs}> 
          <Text style={styles.decstitle}>우울함</Text>
          <Text style={styles.decscontent}>
            당신의 현재 감정상태 중 가장 크게 느끼고 있는 감정은 슬픔입니다.
            그 다음으로 분노, 두려움을 느끼고 있군요.
            결과를 토대로 우리가 예측한 당신의 감정은 우울함으로 예상됩니다.
            살아가면서 누구나 예상치 못한 어려움을 겪게 되고, 
            울적한 기분이 들지만 우울해지는 뚜렷한 이유가 있고
             시간이 지나면 평소처럼 회복이 됩니다.
          </Text>
        </View>
{/* ------------추천 리스트-------------------------- */}
        <View style={styles.decs}>
        <Text style={styles.decstitle}>당신을 위한 추천리스트</Text>
          <Text style={styles.decscontent}>
            당신을 위해 노래를 준비했어요! {'\n'}
            울적함을 달래고 에너지를 줄 수 있길 바라요. {'\n\n'}
            🎵 샤이니 - 투명우산{'\n\n'}
            🎵 prep - Turn The Music up{'\n\n'}
            🎵 이하이 - 홀로{'\n\n'}

           노래를 들으며 달콤한 코코아차 한잔 어떠신가요? {'\n'}
           코코아는 아침 식전에 마시면 활력을 주는 역할을 합니다.
          어쩌구 저쩌구 어쩌구 궁시렁 궁시렁 
          </Text>
        </View>
        
{/* ------------성별,시간대,연령에 맞는 통계-------------------------- */}
        <Text style={styles.avgtitle}>오전 12시, 20대 남성들의 결과는?</Text>
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
              <View style={styles.qrmodal}>
                <Text style={styles.qrtxt}>QR code</Text>
              </View>
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
  qrtxt:{
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:19,
  },
  qrmodal:{
    backgroundColor:'white',
    height:400,
    width:330,
    alignItems:"center",
    justifyContent:"center",
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
  decscontent:{
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily : 'BMHANNAAir_ttf',
    fontSize:13,
    lineHeight:18,
    marginBottom:10,
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
