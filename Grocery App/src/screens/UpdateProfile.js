import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import { database } from "../database/config";
export default function PasswordEdit({ route, navigation }) {
  const { id } = route.params;
  let currentUser;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [usermobile, setUsermobile] = useState("");
  const [userDob, setUserDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("Change Password");

  useEffect(() => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        let users = [];
        item.forEach((user) => {
          if (user.val().id == id) {
            currentUser = user.val();
          }
          users.push(user.val());
        });
        console.log(users);
        console.log(currentUser.name);
        setFname(currentUser.fname);
        setLname(currentUser.lname);
        setUserEmail(currentUser.email);
        setUserImage(currentUser.image);
        setUserDob(currentUser.dob);
        setPassword(currentUser.password);
        setUsermobile(currentUser.mobile);
        setConfirmPassword(currentUser.password);
      });
  }, []);
  const saveDetail = () => {
    if (!fname) {
      setErrMsg("First name can't empty");
    }
    else if (!lname) {
      setErrMsg("Last name can't empty");
    }
    else {
      const Name = fname + ' ' + lname;
      const data = {
        id: id,
        name: Name,
        email: userEmail,
        dob: userDob,
        password: password,
        confirmPassword: password,
        image: userImage,
        mobile: usermobile,
      };
      console.log("data: " + data);
      database
        .ref("users")
        .update({ [data.id]: data })
        .then(() => {
          console.log("Inserted");
        })
        .catch((error) => {
          console.log(error);
        });
      setErrMsg("Changes Successfully");
      navigation.navigate("DrawerNav");
    }
  };
  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={{ uri: "https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg" }}
    >
      <Text style={styles.heading}>Edit Page</Text>
      <Text>{errMsg}</Text>
      <Text style={styles.label}>First-Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFname(text)}
        value={fname}
        placeholder={fname}
      />
      <Text style={styles.label}>Lost-Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLname(text)}
        value={lname}
        placeholder={lname}
      />
      <TouchableOpacity style={styles.Btn} onPress={saveDetail}>
        <Text style={styles.loginText}>Save</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
     },

  image: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 20,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 25,
    width: 250,
  },
  label: {
    fontSize: 18,
    paddingTop: 20,
  },
  Btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "skyblue",
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
