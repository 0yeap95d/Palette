import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {AuthContext} from '../src/context'




export default function CameraScreen(props)  {
    const Dots = ({selected}) => {
        let backgroundColor;
    
        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    
        return (
            <View 
                style={{
                    width:6,
                    height: 6,
                    borderRadius:30,
                    marginHorizontal: 3,
                    backgroundColor
                }}
            />
        );
    }
    
    const Skip = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:20}}
            {...props}
        >
            <Text style={styles.bottombtn}>Skip</Text>
        </TouchableOpacity>
    );
    
    const Next = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:20}}
            {...props}
        >
            <Text style={styles.bottombtn}>Next</Text>
        </TouchableOpacity>
    );
    
    const Done = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:20}}
            {...props}
        >
            <Text style={styles.bottombtn}>Done</Text>
        </TouchableOpacity>
    );
    
    
    const {welcome} = React.useContext(AuthContext);
 
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={welcome}
        onDone={welcome}
        pages={[
          {
            backgroundColor: '#e5c1c5',
            image: <Image source={require('../assets/img/boarder1.png')} style={styles.imgcontainer} />,
            title: '팔레트에 오신것을 환영합니다!',
            subtitle: '반갑습니당',
          },
          {
            backgroundColor: '#f2eee5',
            image: <Image source={require('../assets/img/boarder2.png')} style={styles.imgcontainer} />,
            title: '간편하게 카메라로 감정을 측정해보세요!',
            subtitle: '수리수리마수리',
          },
          {
            backgroundColor: '#c3e2dd44',
            image: <Image source={require('../assets/img/boarder3.png')}  style={styles.imgcontainer}/>,
            title: '알록달록',
            subtitle: "콩쥐팥쥐",
          },
        ]}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        bottomBarHighlight={false}
        bottomBarHeight={50}
        // imageContainerStyles ={styles.imgcontainer}
      />
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgcontainer:{
    width:350,
    height:350,
    // backgroundColor:'red',
    resizeMode:'stretch',
    paddingBottom:0,
    marginTop:-50,
  },
  title:{
      fontFamily:'BMHANNAAir_ttf',
      marginTop:-80
  },
  subtitle:{
    fontFamily:'BMHANNAAir_ttf'
  },
  bottombtn:{
      fontSize:13,
      fontFamily:'BMHANNAAir_ttf',

  }

});