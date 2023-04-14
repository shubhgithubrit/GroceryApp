import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import CartStore from "../mobxStores/CartStore";


export default function ProductDetail({ route, navigation }) {
  const { data } = route.params;

  const addToCart = (data) => {
    CartStore.AddToCart(data);
  }


  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <CustomHeader
        title={'Product-Detail'}
        icon2={{ uri: 'https://static.thenounproject.com/png/489194-200.png' }}
        icon3={{ uri: 'https://img.favpng.com/12/18/15/shopping-cart-icon-png-favpng-e5DiMUYLNYaTjdsibphFUCAxC.jpg' }}
        val1={() => navigation.navigate('notification')}
        val2={() => navigation.navigate('Cart')}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.imageContainer}>
          <Image
            source={{
              uri: data.image,
            }}
            style={{ height: 250, width: 250 }}
          />
        </View>
        <View style={style.details}>
          <View style={style.nameContainer}>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>{data.name}</Text>
          </View>
          <Text style={style.detailsText}>Price: {data.price} /-</Text>
           </View>
           <Button
title="Add to cart"
          onPress={()=>addToCart(data)}
          color={'black'}
          />   
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: "red",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontWeight: 'bold',
    fontSize: 20,
    color: "black",

  },
  cartButton: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 180,
    marginLeft: 28,
  },
  cartButtonText: {
    fontSize: 20,
    marginTop: 3,
  },
  cartContainer: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#b3ffd9",
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
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 280,
  },
});
