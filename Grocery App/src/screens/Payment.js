import { View, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../database/config'
import CartStore from '../mobxStores/CartStore'
import { TextInput } from 'react-native-paper'
import { Text } from 'react-native-paper'
import CustomHeader from '../components/CustomHeader'
import { handleNotification } from '../components/alert'
import { createChannels } from '../components/alert'

export default function Payment({ navigation }) {

    const cartItems = CartStore.cartItems
    const [cardNumber, setCardNumber] = useState('')
    const [cvv, setCvv] = useState('')
    const [expiry, setExpiry] = useState('')
    const [storedDetails, setStoredDetails] = useState([])

    useEffect(() => {
        database
            .ref('cardDetails')
            .once('value')
            .then(item => {
                let details = [];
                item.forEach(chidSnapshot => {
                    details.push(chidSnapshot.val());
                });
                setStoredDetails(details);
            });
        createChannels();
    }, []);

    const payment = () => {
        let flag = 0;
        for (let i = 0; i < storedDetails.length; i++) {
            if (storedDetails[i].cardNumber == cardNumber && storedDetails[i].expiry == expiry && storedDetails[i].cvv == cvv) {
                purchase()
                flag = 1;
            }
        }
        if (flag == 0) {
            const FailedNotify = {
                id: Number(new Date()),
                status: 'unordered',
                message: 'Transaction UnSuccessful!!'
            }
            database.ref('customerNotification').update({ [FailedNotify.id]: FailedNotify })
            handleNotification('Warning', 'Transaction Failed');
            navigation.navigate('Failed')
        }

    }

    const purchase = () => {
        let orderedItems = []
        cartItems.forEach(elem => {
            console.log(elem)
            const items = {
                id: elem.id,
                name: elem.name,
                image: elem.image,
                price: elem.price,
                discountedprice: elem.discountedprice,
                orderqty: elem.orderqty
            }
            orderedItems.push(items)
        });
        const newDate = new Date().toLocaleDateString()
        const newTime = new Date().toLocaleTimeString()
        const orderTime = newDate + ' ' + newTime
        const finalorder = {
            items: orderedItems,
            totalPrice: CartStore.totalprice,
            transactionid: Number(new Date()),
            status: 'ordered',
            orderTime: orderTime
        }
        const successNotify = {
            id: finalorder.transactionid,
            status: 'ordered',
            message: 'Transaction Successful!!'
        }
        database
            .ref('orderList')
            .update({ [finalorder.transactionid]: finalorder })
            .then(() => {
                database.ref('customerNotification').update({ [successNotify.id]: successNotify })
                console.log('Data is inserted...');
                CartStore.EmptyCart()
                handleNotification(finalorder.transactionid, 'transaction Successful')
                navigation.navigate('Successful', finalorder.transactionid)
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <View style={styles.mainContainer}>
            <CustomHeader
                icon={'arrow-back'}
                title={'Payments'}
                val1={() => navigation.navigate('notification')}
                val2={() => navigation.navigate('Cart')}
                val3={() => navigation.navigate('DrawerNav')}
            />
            <Text variant="headlineLarge" style={{ color: 'white' }}>Enter Card Details</Text>
            <TextInput
                style={styles.textInput}
                label='Enter Card Number'
                mode='flat'
                onChangeText={(text) => setCardNumber(text)}
            />
            <TextInput
                style={styles.textInput}
                label='Enter expiry'
                mode='flat'
                onChangeText={(text) => setExpiry(text)}
            />
            <TextInput
                style={styles.textInput}
                label='Enter CVV'
                mode='flat'
                onChangeText={(text) => setCvv(text)}
            />
            <Button title='Proceed' color={'red'} onPress={payment} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5,
        backgroundColor: 'black'
    },
    textInput: {
        marginTop: 15,
        color: 'white'
    }
})