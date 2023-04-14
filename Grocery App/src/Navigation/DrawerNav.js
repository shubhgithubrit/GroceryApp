import React,{useState,useEffect} from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    
} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin,statusCodes } from "@react-native-google-signin/google-signin";
import Home from "../screens/Home";
import Ionicon from 'react-native-vector-icons/Ionicons';
import Account from "../screens/Account";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
function CustomDrawerContent(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userImgUrl, setImgUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [userData,setUserData]=useState(null);
    const [loginStatus,setloggedInStatus]=useState(false);
    let currentUser;
    const  getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          console.log(userInfo)
          setUserData(userInfo);
          loginStatus(true);
          console.log(userInfo.user)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
   
          } else {
        
            console.log('login problem')
          }
        }
      };
    useEffect(async() => {
        currentUser = JSON.parse(await AsyncStorage.getItem('currentuser'));
     
       getCurrentUserInfo();
        setUserEmail(currentUser.email);
        setUserName(currentUser.name);
        setImgUrl(currentUser.image);
       
    }, [])
    return (
        <DrawerContentScrollView {...props}>
            <ImageBackground
                source={{ uri: 'https://thumbs.dreamstime.com/b/serving-kitchen-table-black-food-background-serving-kitchen-table-black-food-background-top-view-free-space-your-text-164640790.jpg' }}
                style={styles.imageBack}>
                {userData !== null ?( <Image source={{ uri: userData.user.photo }}
                    style={styles.profileImage}
                />):<Image source={{ uri: userImgUrl }}
                    style={styles.profileImage}
                />}
                {userData !== null?<Text
                    style={styles.name}>
                    {userData.user.name}
                </Text>:<Text
                    style={styles.name}>
                    {userName}
                </Text>}
                
            </ImageBackground>
            <View style={styles.container}></View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}


export default function DrawerNav() {

    const Drawer = createDrawerNavigator();
    return (
        
        
        <Drawer.Navigator initialRouteName="Dashboard"
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
            <Drawer.Screen name="Dashboard" component={Home}
                options={{
                    drawerIcon: () => (
                    <Ionicon
                    name='home'
                    size={25}
                    color={'black'}
                    />    
                    )
                    ,headerShown:false
                }} />
                <Drawer.Screen name="Cart" component={Cart}
                options={{
                    drawerIcon: () => (
                        <Ionicon
                    name='cart'
                    size={25}
                    color={'black'}
                    />    
                   
                    )
                    ,headerShown:false
                }} />
              <Drawer.Screen name="Orders" component={Orders}
                options={{
                    drawerIcon: () => (
                        <Ionicon
                        name='file-tray'
                        size={25}
                        color={'black'}
                        />    
                       
                        )
                    ,headerShown:false
                }} />

             <Drawer.Screen name="Account" component={Account}
                options={{
                    drawerIcon: () => (
                        <Ionicon
                        name='person'
                        size={25}
                        color={'black'}
                        />    
                       
                        )
                    ,headerShown:false
                }} />

        </Drawer.Navigator>
        
    )
}

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
    },
    container: {
        padding: 20,
        borderTopWidth: 1
    },
    imageBack: {
        padding: 30,
        height: 200
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 60,
        marginTop: 5,
        alignItems:'center'
    },
    name: {
        color: "white",
        fontSize: 25,
        marginBottom: 5,
        marginLeft: 5,
        fontWeight: "bold",
    },
});