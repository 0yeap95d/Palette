import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground,TouchableOpacity,Text,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {CalendarList} from 'react-native-calendars';

export default function MainScreen(props) {

  let [markList, setMarkList] = useState({});

  let userToken = "aaaa@bbbb.com"

  const setMarkedDates = (datas) => {
    console.log(datas);
    datas.forEach((data) => {
      markList = {
        ...markList,
        [data[0]]: {
          selected: true,
          marked: true
        }
      }
    })

    console.log(markList);
  }
  
  const getEmotionByDate = () => {
    // axios.get(`http://k3d102.p.ssafy.io:8000/emotion/calendar/?username=${userToken}`
    //     ).then(res => { setMarkedDates(res.data.emotions) }
    //     ).catch(err => { console.log(err) }
    // )

    var datas = [
      ['2020-11-03', 2],
      ['2020-11-05', 2],
      ['2020-11-07', 2]
    ]
    setMarkedDates(datas);
  }

  useEffect(() => {
    AsyncStorage.getItem('userId', (err, userId) => {
      // userToken = userId;
      getEmotionByDate();
    });
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground 
      style={styles.content}
      source={require("../assets/img/canvas.jpg")}
      resizeMode="stretch"
      >
        {/* menubar */}
        <View style={styles.menubar}>
          <Text>menubar</Text>
        </View>

        {/* calendar */}
        <View style={styles.calView}>
          <CalendarList
            style={styles.calContainer}
            horizontal={true}
            pagingEnabled={true}
            pastScrollRange={24}
            futureScrollRange={0}

            // markingType={'custom'}
            markedDates={markList}
            
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
              monthTextColor: 'gray',
              indicatorColor: 'gray',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>
        
        {/* contents */}
        <View style={styles.contents}>
          <Text>contents</Text>
          <Text>1) 이러한 속성을 사용할 때의 성능은 기본적으로 좋지 않습니다. iOS는 모든 투명 콘텐츠와 모든 하위 뷰를 포함하여 뷰의 정확한 픽셀 마스크를 가져 와서 그림자를 계산하기 때문입니다. 이는 CPU 및 GPU 집약적입니다. 2) iOS 그림자 속성은 CSS box-shadow 표준의 구문 또는 의미와 일치하지 않으며 Android에서 구현할 수 없을 것입니다. 3) 우리는 layer.shadowPath레이어 그림자에서 좋은 성능을 얻는 데 중요한 속성을 노출하지 않습니다 .</Text>
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
    backgroundColor: 'gray',
  },
  content:{
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  menubar: {
    flex: 1,
    width: '100%',
  },
  calView: {
    flex: 5,
  },
  calContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  contents: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
});
