import React, { Component } from "react"
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Linking
} from 'react-native'

export default ({url, children}) => (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    text: {
        color: "#3498db"
    }
})
