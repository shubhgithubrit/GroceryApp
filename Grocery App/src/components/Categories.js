import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export default class Categories extends Component {
    render() {
        return (
            <View style={{ height: 100, width: 130, marginLeft: 10, borderWidth: 0.5, borderColor: 'red' }}>
                <View style={{ flex: 2 }}>
                    <Image source={this.props.imgUri} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ color: 'white' }}>{this.props.name}</Text>
                </View>
            </View>
            )
    }
}
