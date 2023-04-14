import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function OrderSuccessful({ route, navigation }) {
    const id = route.params
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ alignItems: 'center' }} >
                    <Ionicon
                        name='shield-checkmark'
                        size={50}
                        color={'black'}
                    />
                    <Text style={styles.headerText}>Order Successful</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.titleText}>Transaction id: {id}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.linkText}>Back to Home page</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },

    linkText: {
        fontSize: 15,
        color: 'blue',

        textAlign: 'center'
    },
});