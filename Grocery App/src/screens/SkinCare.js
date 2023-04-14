import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { database } from "../database/config";
import SearchBar from "react-native-dynamic-search-bar";
import CustomHeader from "../components/CustomHeader";
import CartStore from "../mobxStores/CartStore";


export default function SkinCare({ navigation }) {
  const [skincare, setSkinCare] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);

  const hideModal = () => {
    setModalVisible(false);
  };
  const lowToHigh = () => {
    skincare.sort(function (a, b) {
      return a.price - b.price;
    });
    hideModal();
  };
  const highToLow = () => {
    skincare.sort(function (a, b) {
      return -a.price + b.price;
    });
    hideModal();
  };
  const noFilter = () => {
    fetchSkinCare();
    hideModal();
  };

  useEffect(() => {
    fetchSkinCare();
  }, []);

  const fetchSkinCare = () => {
    setIsLoading(true);
    database
      .ref("categories/CareProduct")
      .once("value")
      .then((item) => {
        let users = [];
        item.forEach((childSnapshot) => {
          users.push(childSnapshot.val());
        });
        setSkinCare(users);
        setIsLoading(false);
      });
  };
  const addToCart = (item) => {
    CartStore.AddToCart(item);
  }

  const storyItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'black' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductDetail", { data: item });
          }}
        >
          <View style={styles.mainContainer}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={styles.imageItem}
              ></Image>
            </View>
            <View style={styles.containerName}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Price = {item.price}</Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => {
                    addToCart(item)
                  }}
                >
                  <Text style={styles.cartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const searchSkinCare = (textToSearch) => {
    setFilterData(
      skincare.filter((item) =>
        item.name.toUpperCase().includes(textToSearch.toUpperCase())
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        icon={'arrow-back'}

        title={'Fruits'}
        val1={() => navigation.navigate('notification')}
        val2={() => navigation.navigate('Cart')}
        val3={() => navigation.navigate('DrawerNav')}
      />
      <SearchBar
        placeholder="Search here"
        onChangeText={(text) => {
          setInput(text);
          searchSkinCare(text);
        }}
        value={input}
        style={{ width: "100%", backgroundColor: "white" }}
      />
      {isLoading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : (
        <FlatList
          data={
            filterData.length == 0 ? (input != "" ? [] : skincare) : filterData
          }
          keyExtractor={(item) => item.id}
          renderItem={storyItem}
        />
      )}
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3318/3318734.png",
            }}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalCloseBtn}>
              <TouchableOpacity onPress={hideModal}>
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardText}>Sort on Price</Text>
            <View style={{ marginTop: "5%" }}>
              <Button
                title="Low to High"
                color={'red'}
                onPress={() => {
                  lowToHigh();
                }}
              />
            </View>
            <View style={{ marginTop: "5%" }}>
              <Button
                title="High to Low"
                color={'red'}
                onPress={() => {
                  highToLow();
                }}
              />
            </View>
            <View style={{ marginTop: "5%" }}>
              <Button
                title="None"
                color={'red'}
                onPress={() => {
                  noFilter();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 30,
    paddingBootom: 20,
    fontSize: 20,
    textAlign: "center",
  },

  BooksContainer: {
    borderWidth: 1,
    borderTopColor: "red",
    flex: 1,
    backgroundColor: "blue",
  },

  buttonView: {
    flexDirection: "row",
    marginTop: 10,
  },

  mainContainer: {
    marginTop: 10,
    padding: 30,
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  name: {
    fontSize: 20,
    color: "white",
    marginRight: 10,
    fontStyle: "bold",
  },
  details: {
    fontSize: 14,
    color: "white",
    fontStyle: "italic",
  },
  cartButton: {
    backgroundColor: "black",
    height: "120%",
    width: "70%",
    alignItems: "center",
    borderRadius: 30,
  },
  cartButtonText: {
    fontSize: 20,
    color: 'black',
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 20
  },
  containerName: {
    marginLeft: 40,
  },
  cartContainer: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
    alignSelf: "flex-end",
  },
  cartQuantity: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "black",
  },
  cartBagImage: {
    width: 24,
    height: 24,
  },
  imageItem: {
    height: 120,
    width: 100,
    borderRadius: 30,
  },
  loaderStyle: {
    marginVertical: 160,
    alignItems: "center",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    borderRadius: 15,
    backgroundColor: "white",
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseBtn: {
    alignSelf: "flex-end",
  },
  cardText: {
    color: "black",
  },
});
