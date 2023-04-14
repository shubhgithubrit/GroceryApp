import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import CartStore from '../mobxStores/CartStore';
import { observer } from 'mobx-react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import CustomHeader from "../components/CustomHeader";

function Cart({ navigation }) {
  const Items = CartStore.cartItems;
  const totalPrice = CartStore.totalprice;

  const purchase = () => {
    navigation.navigate('Payment')
  }

  const removeFromCart = (removeItem) => {
    CartStore.RemoveFromCart(removeItem)
  }

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title={'Carts'}
        val3={() => navigation.navigate('DrawerNav')}
      />
      {Items.length == 0 ?
        <Text style={{ color: 'white', fontSize: 30, marginTop: 200, marginLeft: 70 }}>Cart is empty</Text> :
        <>
          <View>
            <Text style={styles.subTotalText}>Total price:  {'\u20B9'}{totalPrice}</Text>
            <Button title='Proceed to Buy'
              color={'red'}
              onPress={purchase} />
          </View>
          <FlatList
            data={Items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 10 }}>
                <Card style={{ padding: 10 }}>
                  <View style={styles.cardImageText}>
                    <Card.Cover source={{ uri: item.image }} style={styles.cardimageContainer} />
                    <View style={{ paddingLeft: 10 }}>
                      <Text style={styles.textTitle}>{item.name}</Text>
                      <Text style={{ color: 'black' }}>{item.discountedprice}</Text>
                    </View>
                  </View>
                  <View style={styles.quantityRemove}>
                    <View style={styles.quantity}>
                      <Ionicon name="remove-circle"
                        size={25}
                        onPress={() => CartStore.DecrementQuantity(item)}
                      />
                      <Text>{item.orderqty}</Text>
                      <Ionicon name="add-circle"
                        size={25}
                        onPress={() => CartStore.IncrementQuantity(item)}
                      />
                    </View>
                    <Ionicon name="trash"
                      size={25}
                      onPress={() => removeFromCart(item)}
                    />
                  </View>
                </Card>
              </View>
            )}
          />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 10,
    width: '30%',
  },
  cardimageContainer: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    height: 100,
    width: 100
  },
  quantityRemove: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  textTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardImageText: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  subTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default observer(Cart)