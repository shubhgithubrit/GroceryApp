import { useEffect }  from 'react';
import React from 'react';
import{View,Animated,Text}from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const jumpValue = new Animated.Value(0);
  const ActiveAnim = () => {
    Animated.spring(jumpValue, {
      toValue: 1,
      friction: 1,
      useNative:true
    }).start(() => jumpValue.setValue(0));
  };

// const getData=async()=>{
//   let data=await AsyncStorage.getItem('currentuser');
//   console.log(data);
//   console.log("email",data.length);
// }
  useEffect(()=>{
    ActiveAnim();
    setTimeout(()=>{
navigation.navigate('Login');
    },3000)

  },[])

  return (
    <View style={{flex:1,justifyContent:'center',backgroundColor:'black'}}>
      <Animated.Image
        style={{ backfaceVisibility:'hidden',marginLeft:130,transform: [{ scale: jumpValue }], width: 120, height: 120, marginBottom: 30,justifyContent:'center',alignItems:'center' }}
        source={{uri:'https://img.freepik.com/premium-vector/red-hot-chili-pepper-fire-flame-white-background_212889-1745.jpg'}}
      >
      </Animated.Image>
      <Text style={{color:'white',fontWeight:'bold',fontSize:25,alignItems:'center',justifyContent:'center',marginLeft:150}}>Red Chili</Text>
    </View>
  )
}

export default SplashScreen;