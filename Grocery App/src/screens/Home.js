import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

import Carousel from "../Corousel/carousel";
import { dummyData } from "../Corousel/dummyData";
import Categories from "../components/Categories";
import CustomHeader from "../components/CustomHeader";
export default function Home({ navigation }) {
  return (
    <ScrollView>
      <CustomHeader
        icon={'menu'}
        title={'Dashboard'}
        icon2={{ uri: 'https://static.thenounproject.com/png/489194-200.png' }}
        icon3={{ uri: 'https://img.favpng.com/12/18/15/shopping-cart-icon-png-favpng-e5DiMUYLNYaTjdsibphFUCAxC.jpg' }}
        val3={() => navigation.openDrawer()}
        val2={() => navigation.navigate('Cart')}
        val1={() => navigation.navigate('notification')}
      />
      <ScrollView style={{ backgroundColor: 'black' }}>
        <View>
          <View style={{}}>
            <Carousel data={dummyData} />
          </View>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Feature Products</Text>
          </View>
          <ScrollView
            horizontal
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Drink");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://thumbs.dreamstime.com/z/bottles-assorted-global-soft-drinks-poznan-poland-may-drink-market-dominated-brands-few-multinational-companies-founded-93282714.jpg' }}
                name="Soft Drink"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BabyCare");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://moh.org.in/wp-content/uploads/2020/08/child-care-baby-care-mother-child-love.jpg' }}
                name="Baby-Care  "
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SkinCare");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://beautyarmy.co.uk/wp-content/uploads/2022/06/What-Is-Meant-By-Iope-Skin-Care.jpg' }}
                name="Skin-Care"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Fruits");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://media.istockphoto.com/photos/assortment-of-fresh-exotic-fruits-as-background-top-view-picture-id1310236336?b=1&k=20&m=1310236336&s=170667a&w=0&h=dZvGD_sVLOIz91XW-k6LpqVMlLC0vW2CyTlSAeGopMM=' }}
                name="Fruits"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Oats");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://s3-eu-west-1.amazonaws.com/whitesoats/_950x640_crop_center-center_80/whites_7-health-benefits-of-whites-oats.jpg' }}
                name="Oats"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Masala");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://assets.telegraphindia.com/telegraph/2020/Jul/1595975251_shutterstock_577601638.gif' }}
                name="Masala-item"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Snacks");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://gumlet.assettype.com/afaqs%2F2022-01%2F9052cdb2-7a6e-4d34-abfb-d8396c19593b%2Fimage002__2_.jpg?format=webp&w=400&dpr=2.6' }}
                name="Snacks"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Vegetables");
              }}
            >
              <Categories
                imgUri={{ uri: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/643188-gettyimages-153946385-ca1ccfaad9be44325afc434b305adc0d.jpg' }}
                name="Vegetables"
              />
            </TouchableOpacity>
          </ScrollView>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Offer Products</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.containerOne}>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Vegetables");
                }}
              >
                <Image source={{
                  uri: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/643188-gettyimages-153946385-ca1ccfaad9be44325afc434b305adc0d.jpg',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Snacks");
                }}
              >
                <Image source={{
                  uri: 'https://gumlet.assettype.com/afaqs%2F2022-01%2F9052cdb2-7a6e-4d34-abfb-d8396c19593b%2Fimage002__2_.jpg?format=webp&w=400&dpr=2.6',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Snacks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Masala");
                }}
              >
                <Image source={{
                  uri: 'https://assets.telegraphindia.com/telegraph/2020/Jul/1595975251_shutterstock_577601638.gif',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Masala</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerTwoThree}>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Oats");
                }}
              >
                <Image source={{
                  uri: 'https://s3-eu-west-1.amazonaws.com/whitesoats/_950x640_crop_center-center_80/whites_7-health-benefits-of-whites-oats.jpg',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Oats</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Fruits");
                }}
              >
                <Image source={{
                  uri: 'https://media.istockphoto.com/photos/assortment-of-fresh-exotic-fruits-as-background-top-view-picture-id1310236336?b=1&k=20&m=1310236336&s=170667a&w=0&h=dZvGD_sVLOIz91XW-k6LpqVMlLC0vW2CyTlSAeGopMM=',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Fruits</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("SkinCare");
                }}
              >
                <Image source={{
                  uri: 'https://beautyarmy.co.uk/wp-content/uploads/2022/06/What-Is-Meant-By-Iope-Skin-Care.jpg',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Skin-Care</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerTwoThree}>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("BabyCare");
                }}
              >
                <Image source={{
                  uri: 'https://moh.org.in/wp-content/uploads/2020/08/child-care-baby-care-mother-child-love.jpg',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Baby-Care</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Drink");
                }}
              >
                <Image source={{
                  uri: 'https://thumbs.dreamstime.com/z/bottles-assorted-global-soft-drinks-poznan-poland-may-drink-market-dominated-brands-few-multinational-companies-founded-93282714.jpg',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Soft-Drinks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTop}
                onPress={() => {
                  navigation.navigate("Fruits");
                }}
              >
                <Image source={{
                  uri: 'https://www.giggsmeat.com/wp-content/uploads/2021/08/chicken-drumstick-recipe.jpg',
                }} style={{ width: '90%', height: '75%', borderRadius: 20 }}>
                </Image>
                <Text style={styles.buttonText}>Fruits</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: 'white',

  },
  buttonTop: {
    backgroundColor: "red",
    height: 100,
    width: "30%",
    alignItems: "center",
    borderRadius: 5,

  },
  buttonTop1: {
    backgroundColor: "red",
    height: 120,
    width: "90%",
    alignItems: "center",
    borderRadius: 1,
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: 'white'
  },
  containerOne1: {
    flexDirection: "row",
    justifyContent: 'center',
    borderColor: 'white'
  },
  containerTwoThree: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: 'white',
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 5,
    borderColor: 'white'

  },
});
