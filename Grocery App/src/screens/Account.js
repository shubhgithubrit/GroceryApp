import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CustomHeader from "../components/CustomHeader";

export default function Account({ navigation }) {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [mobile, setMobile] = useState(" ");
  const [loginStatus, setloggedInStatus] = useState(false);
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState("");

  const SignedCheck = async () => {
    const signin = await GoogleSignin.isSignedIn();
    if (signin) {
      getData();
    } else {
      console.log('Dear users please login again');
    }
  };

  let currentUser;
  const getData = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo)
      setData(userInfo);
      setloggedInStatus(true);
      setIsLoading(false);
      console.log(userInfo.user)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        console.log('login problem')
      }
    }
  };

  const logout = async () => {
    setloggedInStatus(false);
    if (data == null) {
      await AsyncStorage.removeItem('currentuser');
      navigation.navigate("Login");
      console.log(data);
    }
    else {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setData(null);
        navigation.navigate("Login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(async () => {
    SignedCheck();
    currentUser = JSON.parse(await AsyncStorage.getItem("currentuser"));
    setEmail(currentUser.email);
    setName(currentUser.name);
    setImage(currentUser.image);
    setId(currentUser.id);
    setMobile(currentUser.mobile);
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        icon1={{ uri: 'https://cdn.iconscout.com/icon/free/png-128/burger-227-461853.png' }}
        title={'MyProfile'}
        val3={() => navigation.openDrawer()}
      />
      {isLoading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : (
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {data !== null ? (<Image source={{ uri: data.user.photo }}
              style={styles.avatar}
            />) : (<Image source={{ uri: image }}
              style={styles.avatar}
            />)}
            {data !== null ? (<Text
              style={styles.name}>

              {data.user.name}
            </Text>) : (<Text
              style={styles.name}>
              {name}
            </Text>)}
            {data !== null ? (<Text
              style={styles.name}>
              9691776519
            </Text>) : (<Text
              style={styles.name}>
              {mobile}
            </Text>)}
            {data !== null ? (<Text
              style={styles.name}>
              {data.user.email}
            </Text>) : (<Text
              style={styles.name}>
              {email}
            </Text>)}
          </View>
        </View>
      )}
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PasswordEdit", { id: id })}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,

  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "black",
    height: 500,
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    height: 50,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 6,
  },
});
