import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import {
    useTheme,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';


import{ AuthContext } from '../src/context';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {/* <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                        <Image
                            style={styles.coverimg}
                            source={require('../assets/img/pic1.png')}
                        ></Image>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            label="Home"
                            labelStyle={{
                                fontFamily:'Golden Plains',
                                fontSize:25,
                            }}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            label="Camera"
                            labelStyle={{
                                fontFamily:'Golden Plains',
                                fontSize:25,
                            }}
                            onPress={() => {props.navigation.navigate('Camera')}}
                        />
                        <DrawerItem 
                            label="Chart"
                            labelStyle={{
                                fontFamily:'Golden Plains',
                                fontSize:25,
                            }}
                            onPress={() => {props.navigation.navigate('Chart')}}
                        />
                        <DrawerItem 
                            label="Onboard"
                            labelStyle={{
                                fontFamily:'Golden Plains',
                                fontSize:25,
                            }}
                            onPress={() => {props.navigation.navigate('Onboard')}}
                        />
                        <DrawerItem 
                            label="Result"
                            labelStyle={{
                                fontFamily:'Golden Plains',
                                fontSize:25,
                            }}
                            onPress={() => {props.navigation.navigate('Result')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    label="logout"
                    labelStyle={{
                        fontFamily:'Golden Plains',
                        fontSize:25,
                    }}
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      
    },
    coverimg:{
        width:220,
        height:220,
        resizeMode:'contain',
        // backgroundColor:'red',
        marginTop:0,
        marginLeft:20,
        // opacity:0.5
    },
    userInfoSection: {
    //   paddingLeft: 20,
    // flexDirection: 'row',
    //   alignItems: 'center',
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: -15,
    },
    bottomDrawerSection: {
        // borderTopColor: '#f4f4f4',
        // borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });