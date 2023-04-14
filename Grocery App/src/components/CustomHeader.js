import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import CartStore from '../mobxStores/CartStore';
import { observer } from 'mobx-react';
import Ionicon from 'react-native-vector-icons/Ionicons';



function CustomHeader({ icon,title, val1, val2, val3 }) {
  return (
    <View style={styles.header}>

      <Ionicon name={icon}
        size={35}
        onPress={val3}
        color={'black'}
      />
      <Text style={{ color: 'white' }}>{title}</Text>

      <View style={{ flexDirection: 'row', marginLeft: 100 }}>
        <Ionicon name="notifications"
          size={35}
          onPress={val1}
          color={'black'}
        />
        <Ionicon name="cart"
          size={35}
          onPress={val2}
          color={'black'}
        />
        <Text style={{ color: 'white' }}>{CartStore.cartItems.length}</Text>
      </View>
    </View>


  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    letterSpacing: 1,

  }

})
export default observer(CustomHeader);