import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../database/config';
import { Card } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoader] = useState(true)

  useEffect(() => {
    database
      .ref('orderList')
      .once('value')
      .then(item => {
        let products = [];
        item.forEach(chidSnapshot => {
          products.push(chidSnapshot.val());
        });
        setOrders(products);
        setLoader(false)
      });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title={'Orders'}
        val3={() => navigation.navigate('DrawerNav')}
      />
      {loading ?
        <ActivityIndicator /> :
        <>
          <Text style={{ textAlign: 'center' }}>Touch for Order Details</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.transactionid}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 10 }}>
                <Card onPress={() => navigation.navigate('OrderDetail', item.transactionid)} style={{ padding: 10 }} >
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.textTitle}>Order id: {item.transactionid}</Text>
                    <Text>Sub Total: {item.totalPrice}</Text>
                    <Text>Order Time: {item.orderTime}</Text>
                    <Text>Status: {item.status}</Text>
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
    padding: 10
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
    fontWeight: 'bold'
  }
})