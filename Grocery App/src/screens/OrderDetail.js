import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { database } from '../database/config'
import { Card } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';

export default function OrderDetail({ route, navigation }) {
    const [orders, setOrders] = useState([])
    const [loading, setLoader] = useState(true)
    const id = route.params;

    useEffect(() => {
        database
            .ref(`orderList/${id}/items`)
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
                icon={'arrow-back'}
                title={'Orders-Detail'}
                val3={() => navigation.navigate('DrawerNav')}
            />
            {loading ?
                <ActivityIndicator /> :
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ paddingVertical: 5 }}>
                            <Card style={{ padding: 10 }}>
                                <View style={styles.cardImageText}>
                                    <Card.Cover source={{ uri: item.image }} style={styles.cardimageContainer} />
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={styles.textTitle}>{item.name}</Text>
                                        <Text>{item.discountedprice}</Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    )}
                />
            }
        </View >
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
    textTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardImageText: {
        flexDirection: 'row',
        paddingBottom: 10
    }
})