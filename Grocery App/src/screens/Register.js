import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { database } from "../database/config";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { createChannels, handleNotification } from "../components/alert";

export default function Register({ navigation }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [sdate, setDate] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [usersData, setUsers] = useState([]);

  useEffect(() => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });

        setUsers(user); // updating state
        console.log(usersData);
        createChannels();
      });
  }, []);

  const pickImage = async () => {
    const options = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
    };
    await launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        setUserImage(response.assets[0].uri);
      }
    });
  };

  const verifyUser = () => {
    var count = 0;
    for (let index = 0; index < usersData.length; index++) {
      if (email == usersData[index].email) count = 1;
    }
    if (count == 1) {
      alert("user already exist");
    } else {
      signup();
      alert("You are successfully registerd");
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var dateToFormat = date;
    const newDate = Moment(dateToFormat).format("YYYY-MM-DD");
    setDate(newDate);
    hideDatePicker();
  };

  const validation = () => {
    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (fname == "") {
      alert("Please enter firstname");
      return false;
    }
    else if (lname == "") {
      alert("Please enter Lastname");
      return false;
    }
    else if (email == "") {
      alert("Please enter email");
      return false;
    } else if (password == "") {
      alert("Please enter password");
      return false;
    } else if (confirmPassword == "") {
      alert("Please enter Confirm password");
      return false;
    } else if (password != confirmPassword) {
      alert("Passwords must be same");
      return false;
    } else if (apos < 1 || dotpos - apos < 2) {
      alert("Enter a valid Email address");
      return false;
    } else if (sdate == "") {
      alert("Please enter Dob");
      return false;
    }
    else if (mobile == NaN) {
      alert('not a number');
    } else if (mobile.length != 10) {
      alert('enter correct no');
    }
    else {
      verifyUser();
    }
  };
  const signup = () => {
    const Name = fname + ' ' + lname;
    const data = {
      id: Number(new Date()),
      name: Name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      dob: sdate,
      mobile: mobile,
      image: userImage ? userImage : "https://image.shutterstock.com/image-vector/vector-man-profile-icon-260nw-570414868.jpg",
    };
    database
      .ref("users")
      .update({ [data.id]: data })
      .then(() => {
        console.log("Inserted");
        handleNotification(data.name, 'Account Created SuccessFully')
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("Login");
  };

  return (
    <ImageBackground source={{ uri: 'https://cdn1.vectorstock.com/i/1000x1000/65/50/supermarket-food-items-seamless-background-vector-1876550.jpg' }} style={{ height: '100%' }}>
      <ScrollView style={styles.container}>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <TouchableOpacity onPress={pickImage}>
                {userImage ? (
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                    source={{ uri: userImage }}
                  />
                ) : (
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                    source={{ uri: 'https://image.shutterstock.com/image-vector/round-black-button-vector-illustration-260nw-1483485734.jpg' }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>First-Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                placeholder="First-Name"
                onChangeText={(fname) => setFname(fname)}
                value={fname}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Last-Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                placeholder="Lost-Name"
                onChangeText={(lname) => setLname(lname)}
                value={lname}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Mobile-Numver</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                placeholder="Enter your mobile number"
                onChangeText={(mobile) => setMobile(mobile)}
                value={mobile}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                placeholder="Email."
                onChangeText={(email) => setEmail(email)}
                value={email}
              />
            </View>
            <Text style={styles.inputLabel1}>DOB</Text>
            <View style={styles.inputDate}>
              <TouchableOpacity onPress={showDatePicker}>
                <Image
                  style={styles.stretch}
                  source={{ uri: 'https://siliconvalleyyouthbridge.org/wp-content/uploads/2020/12/Calendar-900x500-1.jpg' }}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <TextInput
                style={styles.DateInput}
                placeholder={"Enter DOB"}
                value={sdate ? sdate : ""}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(confirmPassword) =>
                  setconfirmPassword(confirmPassword)
                }
                value={confirmPassword}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={validation}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerizedView: {
    width: "100%",
    top: "2%",
  },
  authBox: {
    width: "80%",
    backgroundColor: "black",
    borderRadius: 60,
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
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -20,
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
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
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
    color: 'white'
  },
  inputLabel1: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white'
  },

  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 45,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "red",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
  inputDate: {
    marginTop: 2,
    flexDirection: "row",
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 10,
    width: 250,
    alignSelf: "center",
    justifyContent: "space-between",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  stretch: {
    width: 30,
    height: 30,
  },
});
