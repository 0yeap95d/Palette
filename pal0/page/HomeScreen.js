import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {CalendarList} from 'react-native-calendars';

/* 
✔ 주의사항!!!!

경로 node_module / react-native-calendar / calendar-list / index.js

calendarWidth: width, 에서
calendarWidth: 350, 으로 변경해야함

캘린더 width값이 고정되어있어서 이렇게 안하면 커스텀불가능😢
*/

export default function MainScreen(props) {

  const markColor = [
    '#dba491',  // 분노, 주황
    '#b1c2ae',  // 혐오, 다크그린
    '#c6c1db',  // 두려움, 보라색 
    '#e3c1d4',  // 행복, 핑크
    '#BFC8D7',  // 슬픔, 연하늘
    '#dbdab4',  // 놀람, 옐로그린 
    '#ded5bd',  // 평온, 베이지 
  ]

  const emotion = [
    '결과없음',
    '분노',
    '혐오',
    '두려움',
    '행복',
    '슬픔',
    '놀람',
    '평온'
  ]

  const mainText = [
    [
      '나의 감정을 돌아보며',
      '가끔씩 힘껏 달려보는건 어떨까요?',
      '바쁜 일상 속 가끔은 아무생각없이 쉬어보세요',
      '음악을 들으면서 마음을 가라앉혀보세요',
      '친구와 함께하는 운동을 즐겨보세요',
      '가끔 아침에 조깅을 해보는건 어떨까요?',
      '조용히 혼자 요가를 해보는걸 추천할게요',
      '밖에서 가벼운 산책을 하는건 어떨까요?',
    ],
    [
      '오늘의 하루는 어떤 색이었는지',
      '매콤한 음식도 먹으면서',
      '친구들과 수다도 떨면서',
      '가장 좋아하는 음식을 먹으면서',
      '넘치는 행복을 주변사람들과 나누면서',
      '우울할 때에는 달콤한 디저트와 함께',
      '따뜻한 차를 마시면서',
      '조용히 마음을 돌이켜보세요',
    ],
    [
      '물감으로 기록해 보세요.',
      '쌓였던 스트레스를 해소해보아요',
      '마음 속 이야기들을 풀어보세요',
      '안좋았던 감정들을 내려놓아요',
      '좋은 에너지를 공유해보세요',
      '속상한 감정을 날려버리세요',
      '놀랐던 마음을 진정시켜보세요',
      '당신의 하루가 특별한 날이 되기를 바랄게요!',
    ],
  ]

  let [markList, setMarkList] = useState(null);
  const [monthEmo, setMonthEmo] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [curMonth, setCurMonth] = useState(null);

  const setMarkedDates = (datas) => {
    console.log(datas);
    console.log(monthEmo);
    datas.forEach((data) => {
      console.log(data);
      markList = {
        ...markList,
        [data[0]]: {
          customStyles: {
            container: {
              backgroundColor: markColor[data[1]]
            },
            text: {
              color: 'white',
              fontWeight: 'bold'
            }
          }
        }
      }
    })
    setMarkList(markList)
  }
  
  const getEmotionByDate = async () => {
    await axios.get(`http://k3d102.p.ssafy.io:8000/emotion/calendar/?username=${userToken}`
        ).then(res => { 
          setMonthEmo(res.data.count);
          setMarkedDates(res.data.emotions);
          console.log(monthEmo);
        }
        ).catch(err => { console.log(err) }
    )
  }

  useEffect(() => {
    AsyncStorage.getItem('userId', async (err, userId) => {
      userToken = userId;
      var day = new Date();
      setCurMonth(day.getMonth() + 1)
      await getEmotionByDate();
    });
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground 
        style={styles.content}
        source={require("../assets/img/bg4.jpg")}
        resizeMode="stretch">

        {/* menubar */}
        <View style={styles.menubar}>
            <Text style={{
              fontSize: 18,
              margin: 15,
              fontFamily: 'Gellatio Regular',
            }}>Palette</Text>
        </View>

        {/* calendar */}
        <View style={{
          flex: 7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={styles.calView}>
            <Text style={{
              fontFamily: 'Cafe24Oneprettynight' ,
              paddingEnd: 15,
              width: '100%',
              justifyContent: 'flex-end',
              textAlign: 'right'
            }}></Text>
            <CalendarList
              style={styles.calContainer}
              
              horizontal={true}
              pagingEnabled={true}
              pastScrollRange={11}
              futureScrollRange={0}

              markingType={'custom'}
              markedDates={markList}

              onVisibleMonthsChange={(months) => { setCurMonth(months[0].month) }}
              
              // 캘린더의 여러 파트들에 스타일들을 지정해줄 수 있습니다. 기본값은 {}입니다.
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: 'gray',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#8469ff',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: 'black',
                indicatorColor: 'gray',
                textDayFontFamily: 'Cafe24Oneprettynight',
                textMonthFontFamily: 'Cafe24Oneprettynight',
                textDayHeaderFontFamily: 'Cafe24Oneprettynight',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
          
        </View>

          {/* contents */}
          <View style={styles.contents}>
            <ImageBackground
              style={styles.title}
              resizeMode="stretch">
              <Text style={{
                height: '40%',
                fontSize: 20,
                color: 'black',
                fontFamily: 'Cafe24Oneprettynight',
              }}> {monthEmo[curMonth - 1] == 0 ? 
                    `${curMonth}월은 측정결과가 없어요..` : 
                    `${curMonth}월은 '${emotion[monthEmo[curMonth - 1]]}' 감정이 많았네요${"\n\n\n"}`}</Text>
            </ImageBackground>
            <Text style={{ fontFamily: 'Cafe24Oneprettynight', marginBottom: 7 }}>{mainText[0][monthEmo[curMonth - 1]]}</Text>
            <Text style={{ fontFamily: 'Cafe24Oneprettynight', marginBottom: 7 }}>{mainText[1][monthEmo[curMonth - 1]]}</Text>
            <Text style={{ fontFamily: 'Cafe24Oneprettynight', marginBottom: 7 }}>{mainText[2][monthEmo[curMonth - 1]]}</Text>
          </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  menubar: {
    height: 50,
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  calView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: "100%",
    height: 370,
  },
  calContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 80,
  },
  contents: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
});
