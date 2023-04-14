import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { database } from "../database/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {createChannels} from '../components/alert';
import {handleNotification} from '../components/alert';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersData, setUsers] = useState([]);

  useEffect(() => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        let user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });
        setUsers(user); 
      });
      GoogleSignin.configure();
      createChannels();
  }, []);


  
   const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      handleNotification(userInfo.user.name, 'Welcome');
      navigation.navigate('DrawerNav');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {``
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const loginUser = async () => {
    let count = 0;
    for (let index = 0; index < usersData.length; index++) {
      if (
        email == usersData[index].email &&
        password == usersData[index].password
      ) {
        count = 1;
        await AsyncStorage.setItem(
          "currentuser",
          JSON.stringify(usersData[index])
        );
      }
    }
    if (count == 1) {
        navigation.navigate("DrawerNav");
        handleNotification(usersData.fname,'welcome')
    } else {
      alert("User doesnot exists");
    }
  };

  const validation = () => {
    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (email == "") {
      alert("Please enter email");
      return false;
    } else if (password == "") {
      alert("Please enter password");
      return false;
    } else if (apos < 1 || dotpos - apos < 2) {
      alert("Enter a valid Email address");
      return false;
    } else {
      loginUser();
    }
  };

  return (
    <ImageBackground source={{uri:'https://cdn1.vectorstock.com/i/1000x1000/65/50/supermarket-food-items-seamless-background-vector-1876550.jpg'}} style={{ height: '100%' }}>
    <View style={styles.container}>
      <View style={styles.centerizedView}>
        <View style={styles.authBox}>
        <Text style={styles.loginTitleText}>Login</Text>
          <View style={styles.hr}></View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize={false}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              placeholder="Enter email"
              value={email}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize={false}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              placeholder="Enter password"
              value={password}
            />
          </View>
          <View style={{marginTop:20}}>        
             <TouchableOpacity style={styles.loginButton} onPress={validation}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          </View>
 
          <View style={{alignItems:'center'}}>
            <Text style={{color:'white',marginTop:8,fontSize:20}}>OR</Text>
          </View>
          <View style={{alignItems:'center',marginBottom:10}}>
          <TouchableOpacity 
          onPress={signIn}>
            <Image source={{uri:'https://core-jobs.com/wp-content/uploads/job-manager-uploads/company_logo/2022/04/google.png'}} style={{width:50,height:100}}/>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}> 
            <Text style={styles.registerText}>
              Don't have an account? Register Now
            </Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerizedView: {
    width: "100%",
    top: "10%",
  },
  authBox: {
    width: "90%",
    height:480,
    backgroundColor: "black",
    borderRadius: 90,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  logoBox: {
    width: 200,
    height: 100,
    backgroundColor: "black",
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -50,
    marginBottom: -50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    color:'white',
  },
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
    color:'white',
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "red",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 30,
  },
  loginButtonText: {
    flexDirection:'row',
    alignItems:'center',
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 25,
    fontWeight:'bold',
    color:'red'
  },
  forgotPasswordText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
});

